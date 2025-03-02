import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { AdminContext } from "./Context/AdminContext";
import { OutletContext } from "./Context/OutletContext";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AddOutlet from "./Pages/Admin/AddOutlet";
import AddOutletManager from "./Pages/Admin/AddOutletManager";
import AddMainStock from "./Pages/Admin/AddMainStock";
import GasRequest from "./Pages/Outlet/GasRequest";
import StockRequest from "./Pages/Outlet/StockRequest";
import DeliverySchedule from "./Pages/Admin/DeliverySchedule";
import OutletDashboard from "./Pages/Outlet/OutletDashboard";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Admin/Dashboard";
import GasRequestForm2 from "./Pages/Outlet/GasRequestForm2";
import RegisterConsumer from "./Pages/Outlet/RegisterConsumer";
import Consumers from "./Pages/Outlet/Consumers";
import OutletReport from "./Pages/Outlet/OutletReport";
import AddOrganizationGas from "./Pages/Admin/AddOrganizationGas";

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
            {/* Default Route: Redirect Based on Token */}
            <Route path="/" element={aToken ? <Navigate to="/admin-dashboard" /> : Otoken ? <Navigate to="/outlet-dashboard" /> : <Navigate to="/login" />} />

            {/* Admin Routes */}
            {aToken && (
              <>
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/delivery-schedule" element={<DeliverySchedule />} />
                <Route path="/add-outlet" element={<AddOutlet />} />
                <Route path="/add-outlet-manager" element={<AddOutletManager />} />
                <Route path="/manage-stock" element={<AddMainStock />} />
                <Route path="/add-organization-gas" element={<AddOrganizationGas/>}/>
              </>
            )}

            {/* Outlet Routes */}
            {Otoken && (
              <>
                <Route path="/outlet-dashboard" element={<OutletDashboard />} />
                <Route path="/gas-request" element={<GasRequestForm2 />} />
                <Route path="/stock-request" element={<StockRequest />} />
                <Route path="/register-consumer" element={<RegisterConsumer />} />
                <Route path="/consumers" element={<Consumers />} />
                <Route path="/outlet-report" element={<OutletReport />} />
              </>
            )}

            {/* Catch-All Route (For Unknown Paths) */}
            <Route path="*" element={<Navigate to="/" />} />
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
