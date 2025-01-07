import React, { useContext } from 'react'
import LoginPage from './Pages/LoginPage'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';

const App = () => {

  const {aToken} = useContext(AdminContext);
  
  return aToken ? (
    
    <div className='bg-gray-50'>

      <ToastContainer/>

      <Navbar/>

    </div> 

  ) :

  (

    <>

      <LoginPage/>

      <ToastContainer/>

    </>

  )

}

export default App