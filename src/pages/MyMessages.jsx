import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import CreateMessage from "./CreateMessage"
import { UserContext } from "../contexts/UserProvider"
import { Timestamp,collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase"
import Loading from "../components/Loading";
import Messages from "../components/Messages";
import { useReducer } from "react";
import { INITIAL_STATE, MessagesReducer } from "../MessagesReducer";

const APP_URL = import.meta.env.VITE_APP_URL

export default function MyMessages(){
    const {uid} = useParams()

    const { userData, isLoggedIn } = useContext(UserContext)
    
    const [state, dispatch] = useReducer(MessagesReducer, INITIAL_STATE)
    
    useEffect(()=>{
        (
            async () => {
                dispatch({type:'FETCH_START'})
                const q = query(collection(db, "messages"), where("user", "==", uid));
                const querySnapshot = await getDocs(q);
                let messages = []
                await querySnapshot.forEach((doc) => {
                    messages.push({...doc.data(),id:doc.id, messageLink: APP_URL + '/message/' + doc.id})
                });
                const messagesWithMeta = messages.map((message) => {
                    const timeNow = Timestamp.now().toDate()
                    let expired = false
                    if (message.durationType == 'views'){
                        if(message.duration < 1) expired = true
                    } else if (message.durationType == 'hours' || message.durationType == 'days'){
                        const expirationTime = message.expirationTime.toDate()
                        if(timeNow > expirationTime) expired = true
                    }
                    return message = {...message, expired:expired}
                })
                dispatch({type:'FETCH_SUCCESS',payload:messagesWithMeta})
            }
        )()
    },[userData])

    return(
        <>
            { isLoggedIn ? 
            <>
                <h1>Wecomme {userData.email}</h1>
                {state.isLoading && <Loading />}
                    {
                        !state.isLoading &&
                        <>
                            { 
                                !state.isLoading && state.userMessages.length > 0 ? 
                                <>
                                    <h3>My messages</h3>
                                    <Messages messages={state.userMessages} />
                                </>
                                : 
                                'No Messages found!'
                            }
                        </>
                    }
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