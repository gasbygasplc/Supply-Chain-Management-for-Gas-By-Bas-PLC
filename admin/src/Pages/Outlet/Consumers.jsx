import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import RegisterConsumer from "./RegisterConsumer";
import { jwtDecode } from "jwt-decode";

const Consumers = () => {
  const [consumers, setConsumers] = useState([]);
  const [outletId, setOutletId] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("Otoken");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        if (decodedToken.id) {
          setOutletId(decodedToken.id);
        } else {
          toast.error("Outlet ID is missing in token. Please log in again.");
        }
      } catch (error) {
        toast.error("Invalid session. Please log in again.");
        console.error("Error decoding token:", error);
      }
    } else {
      toast.error("Outlet Manager not logged in. Please log in.");
    }
  }, []);

  useEffect(() => {
    if (outletId) {
      fetchConsumers();
    }
  }, [outletId]);

  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [gasRequest, setGasRequest] = useState({
    consumerId: "",
    gasType: "",
    quantity: 1,
    priorityLevel: "Standard",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConsumers, setFilteredConsumers] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredConsumers(consumers);
      return;
    }

    const filtered = consumers.filter(
      (consumer) =>
        consumer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consumer.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consumer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consumer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredConsumers(filtered);
  }, [searchQuery, consumers]);

  const fetchConsumers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/auth/consumers?outletId=${outletId}`
      );
      if (response.data.success) {
        setConsumers(response.data.consumers);
      } else {
        toast.error("No consumers found.");
      }
    } catch (error) {
      console.error("Error fetching consumers:", error);
      toast.error("Failed to fetch consumers.");
    }
  };

  const handleSubmitGasRequest = async (e) => {
    e.preventDefault();
    if (!selectedConsumer || !selectedConsumer._id) {
      toast.error("Please select a consumer.");
      return;
    }

    const requestPayload = [
      {
        userId: selectedConsumer._id,
        gasType: gasRequest.gasType,
        quantity: gasRequest.quantity,
        priorityLevel: gasRequest.priorityLevel,
        outletId: outletId,
      },
    ];

    try {
      const response = await axios.post(
        "http://localhost:4000/api/gas/request",
        requestPayload
      );

      if (response.data.success) {
        toast.success("Gas request placed successfully!");
        setGasRequest({
          userId: "",
          gasType: "",
          quantity: 1,
          priorityLevel: "Standard",
        });
        setSelectedConsumer(null);
        setIsRequestModalOpen(false);
      } else {
        toast.error(response.data.message || "Failed to submit gas request.");
      }
    } catch (error) {
      console.error(
        "Error placing gas request:",
        error.response?.data || error.message
      );
      toast.error("Failed to place gas request.");
    }
  };

  const handleConsumerCreated = (newConsumer) => {
    setConsumers((prevConsumers) => [...prevConsumers, newConsumer]);
  };

  const handleRequestGas = (consumer) => {
    setSelectedConsumer(consumer);
    setGasRequest((prev) => ({ ...prev, consumerId: consumer._id }));
    setIsRequestModalOpen(true);
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-semibold mb-6">Manage Consumers</h1>

      <RegisterConsumer onConsumerCreated={handleConsumerCreated} />

      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by Name, NIC, Phone, or Email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Registered Consumers</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">NIC</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredConsumers.length > 0 ? (
              filteredConsumers.map((consumer) => (
                <tr key={consumer._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {consumer.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {consumer.nic}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {consumer.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {consumer.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center border border-gray-300 px-4 py-2"
                >
                  No consumers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {isRequestModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-[90%] sm:w-[400px]">
              <h2 className="text-xl font-semibold mb-4">
                Place Gas Request for {selectedConsumer.name}
              </h2>
              <form
                onSubmit={handleSubmitGasRequest}
                className="flex flex-col gap-4"
              >
                <select
                  name="gasType"
                  value={gasRequest.gasType}
                  onChange={(e) =>
                    setGasRequest({
                      ...gasRequest,
                      [e.target.name]: e.target.value,
                    })
                  }
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Gas Type</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>

                <input
                  type="number"
                  name="quantity"
                  value={gasRequest.quantity}
                  onChange={(e) =>
                    setGasRequest({
                      ...gasRequest,
                      [e.target.name]: e.target.value,
                    })
                  }
                  placeholder="Quantity"
                  required
                  className="w-full p-2 border rounded"
                />

                <select
                  name="priorityLevel"
                  value={gasRequest.priorityLevel}
                  onChange={(e) =>
                    setGasRequest({
                      ...gasRequest,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="Standard">Standard</option>
                  <option value="Urgent">Urgent</option>
                </select>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsRequestModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consumers;
