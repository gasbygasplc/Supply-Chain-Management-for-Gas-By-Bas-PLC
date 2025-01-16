import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeliveryStatus = () => {
  const [deliveryDetails, setDeliveryDetails] = useState(null);

  // Fetch delivery details from the backend
  useEffect(() => {
    const fetchDeliveryDetails = async () => {
      try {
        const deliveryId = "<deliveryId>"; // Replace this with the actual delivery ID
        const response = await axios.get(`/api/delivery/details/${deliveryId}`);
        setDeliveryDetails(response.data.delivery);
      } catch (error) {
        console.error('Error fetching delivery details:', error);
      }
    };

    fetchDeliveryDetails();
  }, []);

  if (!deliveryDetails) {
    return <div className="text-center mt-10 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="bg-blue-100 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 text-white py-4 px-6 text-center">
          <h1 className="text-2xl font-bold">Delivery Status</h1>
        </div>

        {/* Delivery Details Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-blue-500">Order ID: {deliveryDetails.orderId}</h2>
            <span
              className={`px-3 py-1 rounded-full text-white ${
                deliveryDetails.status === 'Delivered'
                  ? 'bg-green-500'
                  : deliveryDetails.status === 'Dispatched'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            >
              {deliveryDetails.status}
            </span>
          </div>

          <div className="text-gray-700">
            <p>
              <span className="font-bold">Customer Name:</span> {deliveryDetails.customerName}
            </p>
            <p>
              <span className="font-bold">Address:</span> {deliveryDetails.address}
            </p>
            <p>
              <span className="font-bold">Delivery Date:</span>{' '}
              {new Date(deliveryDetails.deliveryDate).toLocaleDateString()}
            </p>
          </div>

          {/* Progress Tracker Section */}
          <div className="mt-6">
            <h3 className="text-blue-500 font-bold text-lg mb-4">Progress Tracker</h3>
            <div className="relative w-full bg-gray-200 rounded-full h-4">
              <div
                className={`absolute top-0 left-0 h-4 rounded-full transition-all ${
                  deliveryDetails.status === 'Delivered'
                    ? 'bg-green-500 w-full'
                    : deliveryDetails.status === 'Dispatched'
                    ? 'bg-yellow-500 w-2/3'
                    : 'bg-red-500 w-1/3'
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-blue-500 py-4 text-center text-white mt-6">
          <p>Thank you for choosing GasByGas!</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryStatus;
