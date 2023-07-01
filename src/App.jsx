import {useState, useEffect, useContext} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CreateMessage from './pages/CreateMessage'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ViewMessage from './pages/ViewMessage'
import SignUp from './pages/SignUp'
import MyMessages from './pages/MyMessages'
import FlashProvider from './contexts/FlashProvider'
import FlashMessage from './components/FlashMessage'
import UserProvider from './contexts/UserProvider'

export default function App () {

    return(
        <>
            <div className='container'>
                <BrowserRouter>
                    <UserProvider>
                        <FlashProvider>
                            <Header/>
                            <div className="page-content">
                                <FlashMessage/>
                                <Routes>
                                    <Route path='/' element={<Home />}/>
                                    <Route path='/create-message' element={<CreateMessage />}/>
                                    <Route path='/login' element={<Login />} />
                                    <Route path='/sign-up' element={<SignUp/>} />
                                    <Route path='/:uid/messages' element={<MyMessages/>} />
                                    <Route path='/message/:messageID' element={<ViewMessage />} />
                                    <Route path='*' element={<Navigate to='/' />} />
                                </Routes>
                            </div>
                            <Footer />
                        </FlashProvider>
                    </UserProvider>
                </BrowserRouter>
            </div>
        </>
    )
}
