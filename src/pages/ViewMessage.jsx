import { collection, doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase"


export default function ViewMessage(){
    const [message, setMessage] = useState({})
    const {messageID} = useParams()
    useEffect( () => {
        const getMessage = async (entryId) => {
            const docRef = doc(db, 'messages', entryId);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                const data = { ...docSnap.data(), id: docSnap.id };
                setMessage(data)
            } else {
                setMessage({msg:'Message does not exist'})
            }
        }
        getMessage(messageID)
    }, [])

    return(
        <>
            <h1>You are viewing the message with ID: {messageID}</h1>
            <h2>{message.msg}</h2>
        </>
    )
}