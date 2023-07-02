import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import CreateMessage from "./CreateMessage"
import { UserContext } from "../contexts/UserProvider"
import { Timestamp,collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"
import Loading from "../components/Loading";
import Messages from "../components/Messages";

const APP_URL = import.meta.env.VITE_APP_URL

export default function MyMessages(){
    const [userMessages, setUserMessages] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const {uid} = useParams()
    const navigate = useNavigate()

    const { userData, isLoggedIn } = useContext(UserContext)

    useEffect(()=>{
        (
            async () => {
                setIsLoading(true)
                const q = query(collection(db, "messages"), where("user", "==", userData.uid));
                const querySnapshot = await getDocs(q);
                let messages = []
                querySnapshot.forEach((doc) => {
                    messages.push({...doc.data(),id:doc.id, messageLink: APP_URL + '/message/' + doc.id})
                });
                const messagesWithMeta = messages.map((message) => {
                    const timeNow = Timestamp.now().toDate()
                    let expired = false
                    if (message.durationType == 'views'){
                        if(message.duration < 1) expired = true
                    } else if (message.durationType == 'hours'){
                        const expirationTime = message.expirationTime.toDate()
                        if(timeNow > expirationTime) expired = true
                    } else if (message.durationType == 'days'){
                        const expirationTime = message.expirationTime.toDate()
                        if(timeNow > expirationTime) expired = true
                    }
                    return message = {...message, expired:expired}
                })
                await setUserMessages(messagesWithMeta)
                setIsLoading(false)
            }

        )()
    },[userData])

    console.log({userMessages})

    // console.log('User is logged in',isLoggedIn)
    return(
        <>
            { isLoggedIn ? 
            <>
                <h1>Wecomme {userData.email}</h1>
                {isLoading && <Loading />}
                
                    <>
                        { 
                            !isLoading && userMessages.length > 0 ? 
                            <>
                                <h2>My messages</h2>
                                <Messages messages={userMessages} />
                            </>
                            : 
                            'No Messages found!'
                        }
                    </>
                <Link to='/create-message' state={{uid}}>Create message</Link>
            </>
            :
            <>
                <h1>Please login to view messages</h1>
                <Link to='/login'>Login</Link>
            </>
            }
        </>
    )
}