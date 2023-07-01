import { useContext } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserProvider'

export default function Header(){
    const {isLoggedIn, setIsLoggedIn, userData, logOut} = useContext(UserContext)
    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userData')
        setIsLoggedIn(false)
    }
    const url = location.pathname + location.search + location.hash;
    return(
        <>
            <header className="">
                <nav>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/create-message'>Create message</NavLink></li>
                        {
                            !isLoggedIn ? 
                            <>
                                <li><NavLink to='/login'>Login</NavLink></li>
                                <li><NavLink to='/sign-up'>Sign up</NavLink></li>
                            </>
                            :
                            <>
                                <li><NavLink to={url} state={{next:url}}>Messages</NavLink></li>
                                <li><NavLink to='/logout' onClick={logout}>Logout</NavLink></li>
                            </>
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}