import { useEffect, useRef, useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login(){
    const emailField = useRef()
    const passwordField = useRef()
    const navigate = useNavigate()

    const [formErrors, setFormErrors] = useState({})
    const [authErrors, setAuthErrors] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const onSubmit = async (e) => {
        e.preventDefault()

        const email = emailField.current.value
        const password = passwordField.current.value

        const errors = {}
        if(!email) errors.email = 'Email can not be empty'
        if(!password) errors.password ='Password can not be empty'
        
        setFormErrors(errors)
        if(Object.keys(errors).length > 0){
            return
        }

        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password).then( (userCredential) => {
            const user = {...userCredential}
            const uid = userCredential.user.uid
            setAuthErrors({})
            setFormErrors({})
            navigate(`/${uid}/messages`,{state: {isLoggedIn:true}})
            
        }).catch((error)=>{
            const err = error.message
            setAuthErrors(err)
        })

        // if(isLoggedIn){
        //     console.log(isLoggedIn)
        //     navigate(`/${userData.user.uid}/messages`, {state: isLoggedIn})
        // }

    }

    useEffect(()=>{
        emailField.current.focus()
    },[])

    return(
        <>
            <h1>Login Page</h1>
            <form onSubmit={onSubmit} errors={authErrors}>
                {authErrors && <span className="error">{authErrors.message}</span>}
                <InputField label='Enter email' type='email' name='email' fieldRef={emailField} error={formErrors.email}  />
                <InputField label='Enter password' type='password' name='password' fieldRef={passwordField} error={formErrors.password}  />
                <button type="submit" >Login</button>
            </form>
            <p><Link to='/sign-up'>Register</Link></p>
        </>
    )
}