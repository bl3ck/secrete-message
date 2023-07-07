export default function Message({message}){
    const {id,msg,messageLink,expired} = message
    return (
        <li key={id} className="message">
            <div className="message-content">
                <div className="status-container">
                    <div className={`status ${ expired ? 'expired' : 'active' }`}>
                        <div className="circle"></div>
                    </div>
                    <h2>{id}</h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                    <p>{msg}</p>
                </div>
            </div>
            <a href={`${messageLink}`} target="_blank">View</a>
        </li>
    )
}