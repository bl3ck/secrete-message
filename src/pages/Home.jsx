import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
            <h1>Welcome to Secrete Messages</h1>
            <div className="text">
                <p>Secrete Messages is an app which you can use to send message with unique links to anyone. </p>
                <p>These messages expire after a set interval(Days, Hours or Views)</p>
                <ul>
                    <li>Days - Expires after x days</li>
                    <li>Hours - Expires after x hours</li>
                    <li>Views - Expires after x views</li>
                </ul>
                <p>To begin, click on create message</p>
            </div>
        </>
    )
}