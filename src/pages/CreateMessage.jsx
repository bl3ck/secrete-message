import { useContext, useRef, useState } from "react"
import { collection, addDoc, Firestore, Timestamp } from "firebase/firestore"
import { db } from "../firebase"
import copy from "clipboard-copy"
import { Link, useLocation } from "react-router-dom"
import InputField from "../components/InputField"
import TextAreaInput from "../components/TextAreaField"
import RadioField from "../components/RadioField"
import Loading from "../components/Loading"
import { useFlash } from "../contexts/FlashProvider"
import { UserContext } from "../contexts/UserProvider"

const APP_URL = import.meta.env.VITE_APP_URL

export default function CreateMessage () {

    const flash = useFlash()
    const { userData } = useContext(UserContext)

    const messageRef = useRef({})
    const durationTypeRef = useRef([])
    const durationRef = useRef()
    
    const [formErrors, setFormErrors] = useState({})
    const [message, setMessage] = useState({})
    const [isCopied, setIsCopied] = useState(false);

    const addMessage = async (message) => {
        try {
            const docRef = await addDoc(collection(db, "messages"), message);
            setMessage((prevState) => ({
                ...prevState,
                messageLink: APP_URL + '/message/' + docRef.id
            }))
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        let msg_data = {}
        
        const formErrors = {}
        let msg = messageRef.current.value
        let durationType = durationTypeRef.current.find( (entry) => entry.current.checked )
        durationType = durationType == undefined ? undefined : durationType.current.value
        let duration = durationRef.current.value

        // Checking all fields if they have values atleast
        if(!msg) formErrors.message = "Please specify a message"
        if(!durationType) formErrors.durationType = "Please specify duration type"
        if(!duration) formErrors.duration = "Please specify duration"
        setFormErrors(formErrors)
        if( Object.keys(formErrors).length > 0 ) {
            return
        }

        const timeStamp = Timestamp.now()
        const timeNow = Timestamp.now().toDate()
        if(durationType === 'hours'){
            const expirationTime = new Date(timeNow.getTime() + (duration * 60 * 60 * 1000));
            msg_data = {msg,duration,durationType,timeStamp, expirationTime}
        }else if(durationType === 'days'){
            const expirationTime = new Date(timeNow.getTime() + (duration * 24 * 60 * 60 * 1000));
            msg_data = {msg,duration,durationType,timeStamp, expirationTime}
        }
        else{
            console.log('got here')
            msg_data = {msg,duration,durationType,timeStamp}
            console.log(msg_data)
        }

        if( userData && userData.uid ){
            msg_data = {...msg_data, user:userData.uid}
        }

        setMessage(msg_data)
        addMessage(msg_data)
    }

    const handleClickCopy = (link) => {
        copy(link)
        setIsCopied(true)
    }

    return(
        <>

            <h1>Create Secret Message</h1>
            <form onSubmit={handleSendMessage} errors={formErrors}>
                <div className="form-container">
                    <div className="form-row">
                        <div>
                            <h2>Message</h2>
                            <p>This message can be anything and can be visible only with unique link</p>
                        </div>
                        <div>
                            <TextAreaInput name='message' label='Message' fieldRef={messageRef} error={formErrors.message} placeholder="Enter secrete message" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <h2>Duration type</h2>
                            <p>Select the duration type</p>
                        </div>
                        <div className="">
                            <RadioField name='duration_type' values={[{label:'Views', value:'views'},{label:'Hours', value:'hours'},{label:'Days', value:'days'}]} error={formErrors.durationType} fieldRef={durationTypeRef} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div>
                            <h2>Duration</h2>
                            <p>Specify the duration units</p>
                        </div>
                        <div>
                            <InputField type='number' fieldRef={durationRef} label='Duration' name='duration' error={formErrors.duration} />
                        </div>
                    </div>
                    <button type="submit">Send Message</button>
                </div>
            </form>
            
            {
                message.messageLink != undefined ? 
                <>
                    <div className="bg-gray-50 p-3 mt-6 space-y-4 gap-2 grid sm:grid-cols-1">
                        <p>Your secret message link is: <b><i>{message.messageLink}</i></b></p>
                    </div>
                    <p><b onClick={(e) => handleClickCopy(message.messageLink) } >{isCopied ? 'Copied!' : 'Click to Copy'}</b></p>
                </>
                :
                <>
                { Object.keys(message).length > 0 && <Loading/> }
                </>
            }
        </>
    )
}