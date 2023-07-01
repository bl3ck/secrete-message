import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import InputField from "../components/InputField";
import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFlash } from "../contexts/FlashProvider";

export default function SignUp(){
    const emailField = useRef()
    const passwordField = useRef()
    const navigate = useNavigate()
    const flash = useFlash()

    const [formErrors, setFormErrors] = useState({})
    const [authErrors, setAuthErrors] = useState()
    
    const onSubmit = async (e) => {
        e.preventDefault()
        const email = emailField.current.value
        const password = passwordField.current.value
        
        const errors = {}
        if(!email) errors.email = 'Email can not be empty'
        if(!password) errors.password ='Password can not be empty'
        
        setFormErrors(errors)
        console.log(formErrors)
        if(Object.keys(errors).length > 0){
            return
        }
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
            const uid = userCredential.uid
            setAuthErrors({})
            setFormErrors({})
            console.log(uid)
            flash('Your registration has been completed', 'success')
            navigate('/login')
        }).catch((error) => {
            const authErrors = error.message
            setAuthErrors(authErrors)
            console.log(formErrors)
            flash(authErrors,'error')
        })
    }

    useEffect(() => {
        emailField.current.focus()
    },[])

    return(
        <>
         <div className="auth-form">
        <h1>Sign up</h1>
        <form onSubmit={onSubmit} errors={authErrors}>
            {authErrors && <span className="error">{authErrors}</span>}
            <InputField label='Enter email' type='email' name='email' fieldRef={emailField} error={formErrors.email}  />
            <InputField label='Enter password' type='password' name='password' fieldRef={passwordField} error={formErrors.password}  />
            <p><button type="submit" >Create Account</button></p>
        </form>
        <p className="form-footer">Already have an account? <Link to='/login'>Login</Link></p>
        </div>
        </>
    )
}