import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import LoginPopUp from './Components/LoginPopUp';
import RequestResetPassword from './Components/RequestResetPassword';
import ResetPassword from './Pages/ResetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './Pages/Cart';
import DeliveryShedule from './Pages/DeliveryShedule';
import QRCodePage from './Pages/QRCodePage';
import MyProfile from './Pages/MyProfile';
import MyGasOrders from './Pages/MyGasOrders';
import Notifications from './Pages/Notifications';
import ChangePassword from './Pages/ChangePassword';
import VerifyEmail from "./Pages/VerifyEmail";
import ScrollToAnchor from "./Components/ScrollToAnchor";

const App = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div>
      <ToastContainer />
      {showSignIn ? <LoginPopUp setShowSignIn={setShowSignIn} /> : null}

      <div className="mx-4 sm:mx-[10%]">
        {/* Navbar Component */}
        <Navbar setShowSignIn={setShowSignIn} />

        {/* ScrollToAnchor for smooth hash navigation */}
        <ScrollToAnchor />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gas-cart" element={<Cart />} />
          <Route path="/delivery-shedule" element={<DeliveryShedule />} />
          <Route path="/qrcode/:token" element={<QRCodePage />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-gas-orders" element={<MyGasOrders />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password-request" element={<RequestResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>

        {/* Footer Component */}
        <Footer />
      </div>
    </div>
  );
};

export default App;
