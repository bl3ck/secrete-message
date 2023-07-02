import { Timestamp } from "firebase/firestore"
import { useEffect } from "react"
import { useState } from "react"

export default function Message({message}){
    const [hasExpired, setHasExpired] = useState(false)
    const timeNow = Timestamp.now().toDate()

    return (
        <li key={message.id} className="message">
            <div className="message-content">
                <div className="status-container">
                    <div className={`status ${ message.expired ? 'expired' : 'active' }`}>
                        <div className="circle"></div>
                    </div>
                    <h2>{message.id}</h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                    <p>{message.msg}</p>
                </div>
            </div>
            <a href={`${message.messageLink}`} target="_blank">View</a>
        </li>
    )
}