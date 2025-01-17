
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import LoginPopUp from './Components/LoginPopUp'
import { ToastContainer } from 'react-toastify'

const App = () => {

  const [showSignIn , setShowSignIn] = useState(false);

  return (

    <>

      {showSignIn ? <LoginPopUp setShowSignIn = {setShowSignIn}/> : <></>}

      <div className='mx-4 sm:mx-[10%]'>

      <Navbar setShowSignIn = {setShowSignIn}/>

      <Routes>

        <Route path='/' element ={<Home/>}/>

      </Routes>

      <Footer/>

      </div>
    
    </>

  )

}

export default App