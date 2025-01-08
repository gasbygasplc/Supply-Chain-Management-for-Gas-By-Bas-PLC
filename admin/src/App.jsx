import React, { useContext } from 'react'
import LoginPage from './Pages/LoginPage'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Admin/Dashboard';
import AddOutlet from './Pages/Admin/AddOutlet';
import AddOutletManager from './Pages/Admin/AddOutletManager';
import OutletStockRequest from './Pages/Admin/OutletStockRequest';
import AddMainStock from './Pages/Admin/AddMainStock';

const App = () => {

  const {aToken} = useContext(AdminContext);
  
  return aToken ? (
    
    <div className='bg-gray-50'>

      <ToastContainer/>

      <Navbar/>

      <div className='flex items-start'>

        <Sidebar/>

        <Routes>

          <Route path='/' element={<></>}/>

          <Route path='/admin-dashboard' element={<Dashboard/>}/>

          <Route path='/add-outlet' element={<AddOutlet/>}/>

          <Route path='/add-outlet-manager' element={<AddOutletManager/>}/>

          <Route path='/outlet-stock-request' element={<OutletStockRequest/>}/>

          <Route path='/manage-stock' element = {<AddMainStock/>}/>

        </Routes>

      </div>

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