import React from 'react'
import { assets } from './assets/assets'
import LoginPage from './Pages/LoginPage'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  
  return (
    
    <div>
      <LoginPage/>
      <ToastContainer/>
    </div>
  )
}

export default App