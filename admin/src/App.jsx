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
import { OutletContext } from './Context/OutletContext';
import GasRequest from './Pages/Outlet/GasRequest';
import StockRequest from './Pages/Outlet/StockRequest';
import Delivery from './Pages/Outlet/Delivery';
import DeliveryShedule from './Pages/Admin/DeliveryShedule';

const App = () => {

  const {aToken} = useContext(AdminContext);

  const {Otoken} = useContext(OutletContext);
  
  return aToken || Otoken ? (
    
    <div className='bg-gray-50'>

      <ToastContainer/>

      <Navbar/>

      <div className='flex items-start'>

        <Sidebar/>

        <Routes>

          <Route path="/" element={<DeliveryShedule/>} />

          {/* ++++++++++++++++++++++++++++++++++++++++++ Admin Route ++++++++++++++++++++++++++++++++++++++++++++ */}

          <Route path='/delivery-shedule' element={<DeliveryShedule/>}/>

          <Route path='/add-outlet' element={<AddOutlet/>}/>

          <Route path='/add-outlet-manager' element={<AddOutletManager/>}/>

          <Route path='/outlet-stock-request' element={<OutletStockRequest/>}/>

          <Route path='/manage-stock' element = {<AddMainStock/>}/>

          {/* ++++++++++++++++++++++++++++++++++++++++++ Outlet Route ++++++++++++++++++++++++++++++++++++++++++++ */}

          <Route path='/gas-request' element = {<GasRequest/>}/>

          <Route path='/stock-request' element = {<StockRequest/>}/>

          <Route path='/delivery-status' element = {<Delivery/>}/>

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