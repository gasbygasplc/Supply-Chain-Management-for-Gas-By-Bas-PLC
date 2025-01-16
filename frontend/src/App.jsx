import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import Price from './Components/Price';
import Footer from './Components/Footer';
import DeliveryStatus from './Components/DeliveryStatus'; 

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Delivery Status Page */}
        <Route path="/delivery-status/:deliveryId" element={<DeliveryStatus />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
