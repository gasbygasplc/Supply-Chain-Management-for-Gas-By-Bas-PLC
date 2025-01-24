
import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import LoginPopUp from './Components/LoginPopUp'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Pages/Cart'
import DeliveryShedule from './Pages/DeliveryShedule'
import QRCodePage from './Pages/QRCodePage';
import MyProfile from './Pages/MyProfile';
import MyGasOrders from './Pages/MyGasOrders';
import Notifications from './Pages/Notifications';
import ResetPassword from './Pages/ResetPassword';
import VerifyEmail from "./Pages/VerifyEmail";

const App = () => {

  const [showSignIn , setShowSignIn] = useState(false);

  return (

    <div>

      <ToastContainer/>

      {showSignIn ? <LoginPopUp setShowSignIn = {setShowSignIn}/> : <></>}

      <div className='mx-4 sm:mx-[10%]'>

      <Navbar setShowSignIn = {setShowSignIn}/>

      <Routes>

        <Route path='/' element ={<Home/>}/>

        <Route path='/gas-cart' element={<Cart/>}/>

        <Route path='/delivery-shedule' element = {<DeliveryShedule/>}/>

        <Route path="/qrcode/:token" element={<QRCodePage />} />

        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-gas-orders" element={<MyGasOrders />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

      </Routes>

      <Footer/>

      </div>
    
    </div>

  )

}

export default App