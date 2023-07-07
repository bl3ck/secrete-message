import { useContext, useEffect, useRef, useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext, useUser } from "../contexts/UserProvider";

export default function Login(){
    const emailField = useRef()
    const passwordField = useRef()
    const navigate = useNavigate()
    const {setIsLoggedIn, setUserData} = useContext(UserContext)

    const [formErrors, setFormErrors] = useState({})
    const [authErrors, setAuthErrors] = useState({})
    
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
            const user = userCredential.user
            const uid = userCredential.user.uid
            setAuthErrors({})
            setFormErrors({})
            navigate(`/${uid}/messages`)
            const token = userCredential.user.accessToken
            const userInfo = {uid, email:user.email, displayName:user.displayName}
            localStorage.setItem('accessToken', token )
            localStorage.setItem('userData', JSON.stringify(userInfo))
            setIsLoggedIn(true)
            setUserData(userInfo)
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
            <div className="auth-form">
                <h1>Sign in</h1>
                <form onSubmit={onSubmit} errors={authErrors}>
                    {authErrors && <span className="error">{authErrors.message}</span>}
                    <InputField label='Enter email' type='email' name='email' fieldRef={emailField} error={formErrors.email}  />
                    <InputField label='Enter password' type='password' name='password' fieldRef={passwordField} error={formErrors.password}  />
                    <p><button type="submit" >Login</button></p>
                </form>
                <p className='form-footer'>Don't have an account? <Link to='/sign-up'>Sign up</Link></p>
            </div>
        </>
    )
}