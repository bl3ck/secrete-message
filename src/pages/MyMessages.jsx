import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import CreateMessage from "./CreateMessage"
import { UserContext } from "../contexts/UserProvider"

export default function MyMessages(){
    const location = useLocation()
    const {uid} = useParams()
    const navigate = useNavigate()

    const { userData, isLoggedIn } = useContext(UserContext)
    console.log({userData})

    // console.log('User is logged in',isLoggedIn)
    return(
        <>
        { isLoggedIn ? (
            <>
                <h1>Wecomme {userData.email}</h1>
                <h2>My messages</h2>
                <ul></ul>
                <Link to='/create-message' state={{uid}}>Create message</Link>
            </>
        ) : (
            <>
                <h1>Please login to view messages</h1>
                <Link to='/login'>Login</Link>
            </>
        )}
        </>
    )
}