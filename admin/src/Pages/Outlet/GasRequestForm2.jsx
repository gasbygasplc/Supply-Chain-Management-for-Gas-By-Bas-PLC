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
        `https://mw.gasbygas.store/api/outlet/gas-request`,
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
        `https://mw.gasbygas.store/api/gas/send-reminder`,
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
        `https://mw.gasbygas.store/api/gas/update-status`,
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
    <form className="text-gray-700 text-base">

        <div className="w-full flex flex-col gap-6 mx-auto border py-6 px-6 rounded">

            <div className="flex flex-col items-center gap-4 md:items-start md:gap-5">

                <h1 className='font-semibold text-2xl md:text-3xl'>
                    <span className='text-primary-700'>Gas Request</span> Managment
                </h1>

            </div>

            <div className="flex flex-col gap-6">

                <div className="flex flex-col w-full gap-3">
                        
                    <label className="block" htmlFor="search">Search by Request Id  , Token Number , Consumer Name</label>
                    <input  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary" type="text" id="search" placeholder="Search by Request Id , Token Number , Consumer Name"/>

                </div>

                <div className="flex flex-col gap-3 md:grid md:grid-cols-5">

                    {
                        [
                            {
                                label: "Status",
                                key: "status",
                                options: [
                                    "Pending",
                                    "Approved",
                                    "Collected",
                                    "Rescheduled",
                                    "Cancelled",
                                ],
                            },

                            {

                                label: "Priority Level",
                                key: "priorityLevel",
                                options: ["Standard", "Priority"],
                            },

                            {

                                label: "Payment Received",
                                key: "paymentReceived",
                                options: ["Yes", "No"],
                            },

                            {

                                label: "Cylinder Received",
                                key: "cylinderReceived",
                                options: ["Yes", "No"],
                            },

                            {

                                label: "Collection Overdue",
                                key: "collectionOverdue",
                                options: ["Yes", "No"],
                            },
                            
                        ].map((filter) => (

                            
                            <div className="md:col-span-1 flex flex-col gap-2" key={filter.key}>

                                <label className="block" htmlFor={filter.label}>{filter.label}</label>
                                <select
                                    id={filter.label}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                                    value={filters[filter.key]}
                                    onChange={(e) =>
                                        setFilters({ ...filters, [filter.key]: e.target.value })
                                    } 
                                >
                                    <option disabled>Choose {filter.label}</option>
                                    {
                                        filter.options.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))
                                    }


                                </select>

                            </div>
                        ))
                    }

                </div>

                {
                    loading && (
                        <p className="">Loading gas requests...</p>
                    )
                }

                {
                    !loading && Array.isArray(filteredRequests) &&
                    filteredRequests.length > 0 ? (

                        <div className="text-gray-700 text-base mt-6 rounded-md py-6  md:px-6 bg-white border">

                            <h1 className="font-semibold text-1xl md:text-2xl mb-4">Your Gas Request Here!</h1>

                            <div className="overflow-x-auto max-w-full">

                                <table className="min-w-full table-auto text-sm text-gray-700">

                                    <thead className="bg-gray-100">

                                        <tr>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Request ID</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">User ID</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Requested Date</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Status</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Priority Level</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Token Number</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Consumer Name</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">NIC</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Email</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Phone</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Gas Orders</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Total Price</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Pickup Date</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Expiration</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Payment Received</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Cylinder Received</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Collection Overdue</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Reminder Status</th>
                                            <th className="px-6 whitespace-nowrap py-2 font-medium text-left">Send Reminder</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            filteredRequests.map((request) => (

                                                <tr key={request._id} className="border-t">

                                                    <td className="px-4 py-2 whitespace-nowrap">{request.requestId}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{request.userId || "N/A"}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{new Date(request.requestedDate).toLocaleString() ||"N/A"}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <select className="border p-1 rounded"
                                                            value={request.status}
                                                            onChange={(e) =>
                                                            handleUpdate(
                                                                request.requestId,
                                                                "status",
                                                                e.target.value
                                                            )
                                                            }>
                                                            <option value="Pending">Pending</option>
                                                            <option value="Approved">Approved</option>
                                                            <option value="Collected">Collected</option>
                                                            <option value="Rescheduled">Rescheduled</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <select
                                                            className="border p-1 rounded"
                                                            value={request.priorityLevel}
                                                            onChange={(e) =>
                                                            handleUpdate(
                                                                request.requestId,
                                                                "priorityLevel",
                                                                e.target.value
                                                            )
                                                            }>
                                                            <option value="Standard">Standard</option>
                                                            <option value="Priority">Priority</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">{request.tokenNumber}</td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {request.user?.name ?? "Not Available"}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {request.user?.nic ?? "Not Available"}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {request.user?.email ?? "Not Available"}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {request.user?.phone ?? "Not Available"}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {request.items?.map((item, index) => (
                                                            <div key={index}>
                                                            {item.gasType} x{item.quantity} - LKR{" "}
                                                            {Number(item.totalPrice || 0).toFixed(2)}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className="px-4 py-2 font-semibold whitespace-nowrap">
                                                        LKR {Number(request.totalPrice || 0).toFixed(2)}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                    {request.expectedPickupDate || "Not specified"}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                    {new Date(request.expiration).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                    <select
                                                        className="border p-1 rounded whitespace-nowrap"
                                                        value={request.paymentReceived || "No"}
                                                        onChange={(e) =>
                                                        handleUpdate(
                                                            request.requestId,
                                                            "paymentReceived",
                                                            e.target.value
                                                        )
                                                        }
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                    </td>

                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                    <select
                                                        className="border p-1 rounded whitespace-nowrap"
                                                        value={request.cylinderReceived || "No"}
                                                        onChange={(e) =>
                                                        handleUpdate(
                                                            request.requestId,
                                                            "cylinderReceived",
                                                            e.target.value
                                                        )
                                                        }
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                    </td>

                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                    <select
                                                        className="border p-1 rounded"
                                                        value={request.collectionOverdue || "No"}
                                                        onChange={(e) =>
                                                        handleUpdate(
                                                            request.requestId,
                                                            "collectionOverdue",
                                                            e.target.value
                                                        )
                                                        }
                                                    >
                                                        <option value="No">No</option>
                                                        <option value="Yes">Yes</option>
                                                    </select>
                                                    </td>

                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                    <select
                                                        className="border p-1 rounded"
                                                        value={request.reminderSent || "Not Sent"}
                                                        onChange={(e) =>
                                                        handleUpdate(
                                                            request.requestId,
                                                            "reminderSent",
                                                            e.target.value
                                                        )
                                                        }
                                                    >
                                                        <option value="Not Sent">Not Sent</option>
                                                        <option value="Sent">Sent</option>
                                                    </select>
                                                    </td>

                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                    {request.reminderSent === "Sent" ? (
                                                        <span className="text-green-600 font-semibold">
                                                        Reminder Sent
                                                        </span>
                                                    ) : (
                                                        (request.paymentReceived === "No" ||
                                                        request.cylinderReceived === "No" ||
                                                        request.collectionOverdue === "Yes") && (
                                                        <button
                                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                                            onClick={() => sendReminder(request._id)}
                                                            disabled={request.reminderSent === "Sent"}
                                                        >
                                                            Send Reminder
                                                        </button>
                                                        )
                                                    )}
                                                    </td>

                                                </tr>
                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>
                            
                        </div>
                    ) : (
                        !loading && (
                            <p className="text-center text-gray-500 mt-4">
                                No gas requests found.
                            </p>
                        )
                    )
                }

            </div>

        </div>
    
    </form>
  );
};

export default GasRequestForm2;
