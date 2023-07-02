import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext()

export default function UserProvider({children}){
    const [userData, setUserData] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState()

    const logOut = () => {
       setIsLoggedIn(false)
       setUserData(null)
       localStorage.removeItem('accessToken')
       localStorage.removeItem('userData')
    }

    useEffect(() => { 
        (async ()=>{
            const token = await localStorage.getItem('accessToken')
            const data = await JSON.parse(localStorage.getItem('userData'))
            token ? setIsLoggedIn(true) : setIsLoggedIn(false)
            data ? setUserData(data) : setUserData()
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