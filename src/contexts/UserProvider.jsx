import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext()

export default function UserProvider({children}){
    const [userData, setUserData] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState()

    const logOut = () => {
       setIsLoggedIn(False)
       setUser(null)
    }

    useEffect(() => {
        (()=>{
            const token = localStorage.getItem('accessToken')
            const data = JSON.parse(localStorage.getItem('userData'))
            token ? setIsLoggedIn(true) : setIsLoggedIn(false)
            data ? setUserData(data) : setUserData()
            console.log({token}, {data})
        })()
    },[])

    return(
        <UserContext.Provider  value={{isLoggedIn, setIsLoggedIn, userData, setUserData ,logOut}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(){
    return useContext(UserContext)
}