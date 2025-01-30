import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { OutletContext } from "../../Context/OutletContext";
import { toast } from "react-toastify";

const GasRequestForm2 = () => {
  const { Otoken } = useContext(OutletContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [gasRequests, setGasRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    status: "",
    priorityLevel: "",
    paymentReceived: "",
    cylinderReceived: "",
    collectionOverdue: "",
  });

  const fetchGasRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/outlet/gas-request`,
        { headers: { Authorization: `Bearer ${Otoken}` } }
      );

      if (response.data.success) {
        setGasRequests(response.data.gasRequests);
        setFilteredRequests(response.data.gasRequests);
      } else {
        toast.error("Failed to fetch gas requests.");
      }
    } catch (error) {
      console.error("Error fetching gas requests:", error);
      toast.error("Error fetching gas requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGasRequests();
  }, []);

  const sendReminder = async (requestId) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/gas/send-reminder`,
        { requestId },
        { headers: { Authorization: `Bearer ${Otoken}` } }
      );

      if (response.data.success) {
        toast.success("Reminder sent successfully!");

        handleUpdate(requestId, "reminderSent", "Sent");

        fetchGasRequests();
      } else {
        toast.error(response.data.message || "Failed to send reminder.");
      }
    } catch (error) {
      console.error("Error sending reminder:", error);
      toast.error("Error sending reminder.");
    }
  };

  const handleUpdate = async (requestId, field, value) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/gas/update-status`,
        { requestId, [field]: value },
        { headers: { Authorization: `Bearer ${Otoken}` } }
      );

      if (response.data.success) {
        toast.success(`${field} updated successfully`);

        setGasRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.requestId === requestId
              ? { ...request, [field]: value }
              : request
          )
        );
      } else {
        toast.error("Failed to update");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Error updating request.");
    }
  };

  useEffect(() => {
    let filtered = gasRequests.filter((request) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        request.requestId.toLowerCase().includes(lowerCaseQuery) ||
        request.tokenNumber.toLowerCase().includes(lowerCaseQuery) ||
        request.user?.name?.toLowerCase().includes(lowerCaseQuery) ||
        request.user?.nic?.toLowerCase().includes(lowerCaseQuery) ||
        request.user?.email?.toLowerCase().includes(lowerCaseQuery) ||
        request.user?.phone?.toLowerCase().includes(lowerCaseQuery)
      );
    });

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filtered = filtered.filter((request) => request[key] === filters[key]);
      }
    });

    setFilteredRequests(filtered);
  }, [searchQuery, filters, gasRequests]);

  return (
    <>
        <div className="w-full">

            <div className="flex flex-col items-center gap-4 md:text-start md:flex-row md:items-center md:gap-5">

                <h1 className='font-semibold text-2xl md:text-3xl'>
                    <span className='text-primary-700'>Gas Request</span> Managment
                </h1>

            </div>

            <div className="">

                <div>

                    <label htmlFor="search">Search by Req ID , Token number & Consumer name</label>
                    <input id="search" type="text" />

                </div>
                <div>



                </div>
                <div>



                </div>

            </div>

        </div>
    
    </>
  );
};

export default GasRequestForm2;
