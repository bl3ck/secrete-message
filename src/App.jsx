import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import CreateMessage from './pages/CreateMessage'
import Login from './pages/Login'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import ViewMessage from './pages/ViewMessage'
import SignUp from './pages/SignUp'
import MyMessages from './pages/MyMessages'

export default function App () { 
    return(
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/create-message' element={<CreateMessage />}/>
                    <Route path='/login' element={<Login />} />
                    <Route path='/sign-up' element={<SignUp/>} />
                    <Route path='/:uid/messages' element={<MyMessages/>} />
                    <Route path='/message/:messageID' element={<ViewMessage />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}
