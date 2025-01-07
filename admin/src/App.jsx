import React, { useContext } from 'react'
import LoginPage from './Pages/LoginPage'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './Context/AdminContext';

const App = () => {

  const {aToken} = useContext(AdminContext);
  
  return aToken ? (
    
    <div>

      <ToastContainer/>

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