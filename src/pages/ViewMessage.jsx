import { Timestamp, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase"


export default function ViewMessage(){
    const [message, setMessage] = useState({})
    const {messageID} = useParams()
    const [hasExpired, setHasExpired] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    useEffect( () => {
        const getMessage = async (entryId) => {
            setIsLoading(true)
            const docRef = doc(db, 'messages', entryId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const data = { ...docSnap.data(), id: docSnap.id };
                setMessage(data)
                const timeNow = Timestamp.now().toDate()
                if (data.duration_type == 'views'){
                    const newDuration = data.duration - 1;
                    console.log(newDuration)
                    await updateDoc (docRef, {
                        duration: newDuration
                    })
                    if(data.duration < 1) setHasExpired(true)
                } else if (data.duration_type == 'hours'){
                    const expirationTime = data.expirationTime.toDate()
                    timeNow > expirationTime ? setHasExpired(true) : setHasExpired(false)
                    console.log({ timeNow, expirationTime, expired: timeNow > expirationTime})
                } else if (data.duration_type == 'days'){
                    const expirationTime = data.expirationTime.toDate()
                    timeNow > expirationTime ? setHasExpired(true) : setHasExpired(false)
                    console.log({ timeNow, expirationTime, expired: timeNow > expirationTime})
                }
            } else {
                setMessage({msg:'Message does not exist'})
            }
            setIsLoading(false)
        }
        getMessage(messageID)
    }, [])

    return(
        <>
            <p>You are viewing the message with ID: <b>{messageID}</b></p>
            { isLoading &&
                <p>Loading...</p>
            }
            <h1>{
                !isLoading ?
                    !hasExpired ? message.msg : 'Message has expired'
                : ''
            }</h1>
        </>
    )
}