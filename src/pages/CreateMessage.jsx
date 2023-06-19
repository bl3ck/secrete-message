import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase"
import copy from "clipboard-copy"

export default function CreateMessage () {
    const [message, setMessage] = useState('')
    const [messageLink, setMessageLink] = useState('')
    const [duration, setDuration] = useState({})
    const [isCopied, setIsCopied] = useState(false);

    const addMessage = async (msg_data) => {
        try {
            const docRef = await addDoc(collection(db, "messages"), msg_data);
            setMessageLink(`http://localhost:5173/message/${docRef.id}`)
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleSendMessage = async (e) => {
        let msg = document.getElementById('message').value
        let duration_type = Array.from(document.getElementsByName('duration_type')).find( (item) => item.checked ).value
        let duration = +document.getElementById('duration').value

        let msg_data = {msg,duration,duration_type,messageLink}

        setMessage(msg)
        setDuration({duration_type:duration})
        addMessage(msg_data)
    }

    const handleClickCopy = (link) => {
        copy(link)
        setIsCopied(true)
    }

    return(
        <>
            <h1>Create Secret Message</h1>
            <p><textarea name="message" id="message" placeholder="enter your secrete message" cols="30" rows="10"></textarea></p>
            <p>
                <label htmlFor="views"><input type="radio" value='views' name="duration_type" id="views" defaultChecked />Views</label>
                <label htmlFor="hours"><input type="radio" value='hours' name="duration_type" id="hours" />Hours</label>
                <label htmlFor="days"><input type="radio" value='days' name="duration_type" id="days" />Days</label>
            </p>
            <p>
               Duration <input type="number" name="duration" id="duration" />
            </p>
            <button onClick={(e) => handleSendMessage()}>Send Message</button>
            {
                message === '' ? <p><i>No Message provided</i></p>
                : <p>Here's your message: <b>{message}</b></p>
            }
            {
                message && 
                <>
                    <p>Your secret message link is: <i>{messageLink}</i></p>
                    <p><b onClick={(e) => handleClickCopy(messageLink) } >{isCopied ? 'Copied!' : 'Click to Copy'}</b></p>
                </>
            }
        </>
    )
}