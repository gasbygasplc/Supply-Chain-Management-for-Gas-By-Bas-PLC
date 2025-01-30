import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { OutletContext } from '../../Context/OutletContext';
import { toast } from 'react-toastify';

const GasRequestForm = () => {
    const { Otoken } = useContext(OutletContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [gasRequests, setGasRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [filters, setFilters] = useState({
        status: '',
        priorityLevel: '',
        paymentReceived: '',
        cylinderReceived: '',
        collectionOverdue: '',
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
                toast.error('Failed to fetch gas requests.');
            }
        } catch (error) {
            console.error('Error fetching gas requests:', error);
            toast.error('Error fetching gas requests.');
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
                        request.requestId === requestId ? { ...request, [field]: value } : request
                    )
                );
    
            } else {
                toast.error('Failed to update');
            }
        } catch (error) {
            console.error('Error updating request:', error);
            toast.error('Error updating request.');
        }
    };
    

    useEffect(() => {
        let filtered = gasRequests.filter(request => {
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

        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                filtered = filtered.filter(request => request[key] === filters[key]);
            }
        });

        setFilteredRequests(filtered);
    }, [searchQuery, filters, gasRequests]);

    return (
        <form>
            <div className='bg-white border my-4 px-6 py-6'>
                <p className='text-gray-800 text-lg pt-5 font-semibold pb-3'>Gas Request Management</p>
    
                <div className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3'>
                    <input
                        className='w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-1 text-base font-medium text-[#6B7280] outline-none focus:border-[#FED500]'
                        type='text'
                        placeholder='Search by Request ID, Token Number, Consumer Info...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className='grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-4 mt-4'>
                    {[
                        { label: "Status", key: "status", options: ["Pending", "Approved", "Collected", "Rescheduled", "Cancelled"] },
                        { label: "Priority Level", key: "priorityLevel", options: ["Standard", "Priority"] },
                        { label: "Payment Received", key: "paymentReceived", options: ["Yes", "No"] },
                        { label: "Cylinder Received", key: "cylinderReceived", options: ["Yes", "No"] },
                        { label: "Collection Overdue", key: "collectionOverdue", options: ["Yes", "No"] },
                    ].map(filter => (
                        <select
                            key={filter.key}
                            className="border p-1 rounded"
                            value={filters[filter.key]}
                            onChange={(e) => setFilters({ ...filters, [filter.key]: e.target.value })}
                        >
                            <option value="">{filter.label}</option>
                            {filter.options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    ))}
                </div>

                {loading && <p className='text-center text-blue-600 mt-4'>Loading gas requests...</p>}
    
                {!loading && Array.isArray(filteredRequests) && filteredRequests.length > 0 ? (
                    <div className='overflow-x-auto mt-6'>
                        <table className='min-w-full table-auto text-sm text-gray-700 border'>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='px-4 py-2'>Request ID</th>
                                    <th className='px-4 py-2'>User ID</th> 
                                    <th className='px-4 py-2'>Requested Date</th>
                                    <th className='px-4 py-2'>Status</th>
                                    <th className='px-4 py-2'>Priority Level</th>
                                    <th className='px-4 py-2'>Token Number</th>
                                    <th className='px-4 py-2'>Consumer Name</th>
                                    <th className='px-4 py-2'>NIC</th>
                                    <th className='px-4 py-2'>Email</th>
                                    <th className='px-4 py-2'>Phone</th>
                                    <th className='px-4 py-2'>Gas Orders</th>
                                    <th className='px-4 py-2'>Total Price</th> 
                                    <th className='px-4 py-2'>Pickup Date</th>
                                    <th className='px-4 py-2'>Expiration</th>
                                    <th className='px-4 py-2'>Payment Received</th>
<th className='px-4 py-2'>Cylinder Received</th>
<th className='px-4 py-2'>Collection Overdue</th>
<th className='px-4 py-2'>Reminder Status</th>
<th className='px-4 py-2'>Send Reminder</th>

                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((request) => (
                                    <tr key={request._id} className='border-t'>
                                        <td className='px-4 py-2'>{request.requestId}</td>
                                        <td className='px-4 py-2'>{request.userId || "N/A"}</td>
<td className='px-4 py-2'>{new Date(request.requestedDate).toLocaleString() || "N/A"}</td>

                                        <td className='px-4 py-2'>
                                            <select className="border p-1 rounded"
                                                value={request.status}
                                                onChange={(e) => handleUpdate(request.requestId, 'status', e.target.value)}>
                                                <option value="Pending">Pending</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Collected">Collected</option>
                                                <option value="Rescheduled">Rescheduled</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className='px-4 py-2'>
                                            <select className="border p-1 rounded"
                                                value={request.priorityLevel}
                                                onChange={(e) => handleUpdate(request.requestId, 'priorityLevel', e.target.value)}>
                                                <option value='Standard'>Standard</option>
                                                <option value='Priority'>Priority</option>
                                            </select>
                                        </td>
                                        <td className='px-4 py-2'>{request.tokenNumber}</td>
                                        <td className='px-4 py-2'>{request.user?.name ?? "Not Available"}</td>
                                        <td className='px-4 py-2'>{request.user?.nic ?? "Not Available"}</td>
                                        <td className='px-4 py-2'>{request.user?.email ?? "Not Available"}</td>
                                        <td className='px-4 py-2'>{request.user?.phone ?? "Not Available"}</td>
                                        <td className='px-4 py-2'>
    {request.items?.map((item, index) => (
        <div key={index}>
            {item.gasType} x{item.quantity} - LKR {Number(item.totalPrice || 0).toFixed(2)}
        </div>
    ))}
</td>
<td className='px-4 py-2 font-semibold'>
    LKR {Number(request.totalPrice || 0).toFixed(2)}
</td>
                                        <td className='px-4 py-2'>{request.expectedPickupDate || "Not specified"}</td>
                                        <td className='px-4 py-2'>{new Date(request.expiration).toLocaleDateString()}</td>
<td className='px-4 py-2'>
    <select className="border p-1 rounded"
        value={request.paymentReceived || "No"}
        onChange={(e) => handleUpdate(request.requestId, 'paymentReceived', e.target.value)}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
    </select>
</td>

<td className='px-4 py-2'>
    <select className="border p-1 rounded"
        value={request.cylinderReceived || "No"}
        onChange={(e) => handleUpdate(request.requestId, 'cylinderReceived', e.target.value)}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
    </select>
</td>

<td className='px-4 py-2'>
    <select className="border p-1 rounded"
        value={request.collectionOverdue || "No"}
        onChange={(e) => handleUpdate(request.requestId, 'collectionOverdue', e.target.value)}>
        <option value="No">No</option>
        <option value="Yes">Yes</option>
    </select>
</td>

<td className='px-4 py-2'>
    <select className="border p-1 rounded"
        value={request.reminderSent || "Not Sent"}
        onChange={(e) => handleUpdate(request.requestId, 'reminderSent', e.target.value)}
    >
        <option value="Not Sent">Not Sent</option>
        <option value="Sent">Sent</option>
    </select>
</td>

<td className="px-4 py-2">
    {request.reminderSent === "Sent" ? (
        <span className="text-green-600 font-semibold">Reminder Sent</span>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && <p className="text-center text-gray-500 mt-4">No gas requests found.</p>
                )}
            </div>
        </form>
    );    
};

export default GasRequestForm;
