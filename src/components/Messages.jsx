import Message from "./Message"

export default function Messages({messages}){
    return(
        <>
        <ul role="list" className="messages">
            {
                messages.map((message) => {
                    return <Message key={message.id} message={message} />
                })
            }
        </ul>
        </>
    )
}