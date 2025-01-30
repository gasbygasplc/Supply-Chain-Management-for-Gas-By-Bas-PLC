import React, { useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./Context/AdminContext";
import { OutletContext } from "./Context/OutletContext";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddOutlet from "./Pages/Admin/AddOutlet";
import AddOutletManager from "./Pages/Admin/AddOutletManager";
import AddMainStock from "./Pages/Admin/AddMainStock";
import GasRequest from "./Pages/Outlet/GasRequest";
import StockRequest from "./Pages/Outlet/StockRequest";
import Delivery from "./Pages/Outlet/Delivery";
import DeliverySchedule from "./Pages/Admin/DeliverySchedule";
import OutletDashboard from "./Pages/Outlet/OutletDashboard";
import LoginPage from "./Pages/LoginPage";

const App = () => {

  const { aToken } = useContext(AdminContext);

  const { Otoken } = useContext(OutletContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return aToken || Otoken ? (

    <div className="bg-gray-50">

      <ToastContainer />

      <div className="fixed w-full z-50 top-0 left-0 bg-white">

        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      </div>

      <div className="flex h-screen pt-16"> 

        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">

          <Routes>

            {aToken && <Route path="/" element={<DeliverySchedule/>} />}

            {/* ++++++++++++++++++++++++++++++++++++++++++ Admin Route ++++++++++++++++++++++++++++++++++++++++++++ */}

            <Route path='/delivery-schedule' element={<DeliverySchedule/>}/>

            <Route path="/add-outlet" element={<AddOutlet />} />

            <Route path="/add-outlet-manager" element={<AddOutletManager />} />

            <Route path="/manage-stock" element={<AddMainStock />} />

            {/* ++++++++++++++++++++++++++++++++++++++++++ Outlet Route ++++++++++++++++++++++++++++++++++++++++++++ */}

            {Otoken && <Route path='/outlet-dashboard' element = {<OutletDashboard/>}/>}

            <Route path="/gas-request" element={<GasRequest />} />

            <Route path="/stock-request" element={<StockRequest />} />

            <Route path="/delivery-status" element={<Delivery />} />

          </Routes>

        </div>

      </div>

    </div>

  ) : (
    <>
      <LoginPage />

      <ToastContainer />

    </>
  );
};

export default App;
