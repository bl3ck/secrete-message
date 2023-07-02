import Message from "./Message"

export default function Messages({messages}){
    return(
        <>
        <ul role="list" className="messages">
            {
                messages.map((message) =>{
                    return <Message key={message.uid} message={message} />
                })
            }
        </ul>
        </>
    )
}