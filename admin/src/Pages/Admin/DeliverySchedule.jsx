import React, { useState, useEffect } from 'react';

import axios from 'axios';

const DeliverySchedule = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [outlets, setOutlets] = useState([]);
    const [selectedOutlet, setSelectedOutlet] = useState(null);
    const [gasRequests, setGasRequests] = useState([]);
    const [stockAllocation, setStockAllocation] = useState([]);
    const [error, setError] = useState(null);
    const [selectedDateTime, setSelectedDateTime] = useState('');
    const [deliverySchedules, setDeliverySchedules] = useState([]);
    const [filterOutletName, setFilterOutletName] = useState('');
    const [filterDeliveryDate, setFilterDeliveryDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [rescheduledDates, setRescheduledDates] = useState({});




    const handleSearch = async () => {
        setError(null);
        if (!searchQuery.trim()) {
            setError('Please enter a search query.');
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:4000/api/delivery-schedule/search-outlets?searchQuery=${searchQuery}`
            );
            if (response.data.success && response.data.outlets.length > 0) {
                setOutlets(response.data.outlets);
            } else {
                setError('No outlets found for the given query.');
                setOutlets([]);
            }
        } catch (err) {
            console.error('Error fetching outlets:', err);
            setError('Failed to fetch outlets. Please try again.');
            setOutlets([]);
        }
    };

    const fetchGasRequests = async (outletId) => {
        try {
            const response = await axios.get(
                `http://localhost:4000/api/delivery-schedule/outlet/${outletId}/gas-requests`
            );
    
            if (response.data.success && Array.isArray(response.data.gasRequests)) {
                setGasRequests(response.data.gasRequests);
            } else {
                console.warn("No gas requests found for the selected outlet.");
                setGasRequests([]);
            }
        } catch (err) {
            console.error("Error fetching gas requests:", err);
            setGasRequests([]);
        }
    };
    

    const handleSelectOutlet = (outlet) => {
        setSelectedOutlet(outlet);
        setOutlets([]);
        setSearchQuery(outlet.outletName);
        fetchGasRequests(outlet._id);
    };

    const handleStockAllocationChange = (gasType, quantity) => {
        const updatedAllocation = [...stockAllocation];
        const existingIndex = updatedAllocation.findIndex((item) => item.gasType === gasType);

        if (existingIndex !== -1) {
            updatedAllocation[existingIndex].quantity = quantity;
        } else {
            updatedAllocation.push({ gasType, quantity });
        }

        setStockAllocation(updatedAllocation);
    };

    const handleSubmit = async () => {
        if (!selectedOutlet) {
            setError('Please select an outlet.');
            return;
        }
    
        if (!selectedDateTime) {
            setError('Please select a delivery date and time.');
            return;
        }
    
        if (!stockAllocation.length) {
            setError('Please allocate stock for at least one gas type.');
            return;
        }
    
        const totalAllocation = stockAllocation.reduce((sum, item) => sum + item.quantity, 0);
    
        if (
            selectedOutlet.gasTypes &&
            selectedOutlet.gasTypes.reduce((sum, type) => sum + type.currentStock, 0) + totalAllocation >
            selectedOutlet.gasTypes.reduce((sum, type) => sum + type.maxCapacity, 0)
        ) {
            setError('Allocation exceeds max capacity of the outlet.');
            return;
        }
    
        const payload = {
            outletId: selectedOutlet._id,
            stockAllocation,
            deliveryDate: selectedDateTime,
        };
    
        console.log("Payload being sent to backend:", payload);
    
        try {
            await axios.post(`http://localhost:4000/api/delivery-schedule/create`, payload);
            alert('Stock allocation submitted successfully.');
            setStockAllocation([]);
            setSelectedDateTime('');
        } catch (err) {
            console.error('Error submitting stock allocation:', err);
            setError('Failed to submit allocation. Please try again.');
        }
    };
       
    useEffect(() => {
        if (selectedOutlet && gasRequests.length) {
            const allocation = selectedOutlet.gasTypes.map((type) => {
                const gasRequest = gasRequests.find((request) => request._id === type.gasType);
                const requestedQuantity = gasRequest ? gasRequest.totalQuantity : 0;
    
                const availableCapacity = type.maxCapacity - type.currentStock;
    
                const recommendedAllocation = Math.min(availableCapacity, requestedQuantity + availableCapacity);
    
                return { gasType: type.gasType, quantity: recommendedAllocation };
            });
    
            setStockAllocation(allocation);
        }
    }, [selectedOutlet, gasRequests]);

    const fetchDeliverySchedules = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/delivery-schedule');
            console.log("Fetched delivery schedules:", response.data);
            if (response.data.success) {
                setDeliverySchedules(response.data.deliverySchedules);
            } else {
                console.error('Failed to fetch delivery schedules');
            }
        } catch (error) {
            console.error('Error fetching delivery schedules:', error);
        }
    };
    
    
    useEffect(() => {
        fetchDeliverySchedules();
    }, []);
    

    const handleStatusChange = async (scheduleId, newStatus) => {
        const selectedSchedule = deliverySchedules.find(s => s._id === scheduleId);
        if (!selectedSchedule) return;
    
        if (newStatus === "Rescheduled") {
            setRescheduledDates((prev) => ({
                ...prev,
                [scheduleId]: selectedSchedule.deliveryDate || "",
            }));
        }
    
        const updatedDeliveryDate = newStatus === "Rescheduled" ? rescheduledDates[scheduleId] : selectedSchedule.deliveryDate;
    
        await updateGasRequests(selectedSchedule.outletId, updatedDeliveryDate, newStatus);
    
        const payload = { status: newStatus };
        if (newStatus === "Rescheduled") {
            payload.newDeliveryDate = rescheduledDates[scheduleId];
        }
    
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/delivery-schedule/${scheduleId}/status`,
                payload
            );
    
            if (response.data.success) {
                alert("Status updated successfully!");
                fetchDeliverySchedules();
            } else {
                alert("Failed to update status.");
            }
        } catch (error) {
            console.error("Error updating status:", error.response?.data || error.message);
            alert("Failed to update status: " + (error.response?.data?.message || "Unknown error"));
        }
    };
    
    
    
    const updateGasRequests = async (outletId, deliveryDate, status) => {
        try {
            const response = await axios.post(
                `http://localhost:4000/api/delivery-schedule/update-requests`, 
                { outletId, deliveryDate, status }
            );
    
            if (response.data.success) {
                console.log("Gas requests updated successfully.");
            } else {
                console.warn("Failed to update gas requests.");
            }
        } catch (error) {
            console.error("Error updating gas requests:", error);
        }
    };

    const handleConfirmReschedule = async (scheduleId) => {
        const newDeliveryDate = rescheduledDates[scheduleId];
    
        if (!newDeliveryDate) {
            alert("Please select a new delivery date.");
            return;
        }
    
        const payload = {
            status: "Rescheduled",
            newDeliveryDate,
        };
    
        try {
            const response = await axios.patch(
                `http://localhost:4000/api/delivery-schedule/${scheduleId}/status`,
                payload
            );
    
            if (response.data.success) {
                alert("Delivery rescheduled successfully!");
                fetchDeliverySchedules();
            } else {
                alert("Failed to reschedule delivery.");
            }
        } catch (error) {
            console.error("Error rescheduling delivery:", error);
            alert("Error rescheduling delivery.");
        }
    };
    
    
    
    
    const filteredSchedules = deliverySchedules.filter((schedule) => {
        const matchesOutletName =
            filterOutletName === '' ||
            schedule.outletName.toLowerCase().includes(filterOutletName.toLowerCase());
        const matchesDeliveryDate =
            filterDeliveryDate === '' || schedule.deliveryDate.startsWith(filterDeliveryDate);
        const matchesStatus = filterStatus === '' || schedule.status === filterStatus;
    
        return matchesOutletName && matchesDeliveryDate && matchesStatus;
    });
    
    
    
    

    return (
        <div className="w-full flex flex-wrap my-8 border rounded-md">
<div className="w-full sm:w-1/2 bg-white px-8 py-8 border-r">
    <form className="flex flex-col gap-4 text-gray-700 text-base">
        <div>
            <label className="font-semibold">Search Outlet:</label>
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search outlet by name or city"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                    Search
                </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {outlets.length > 0 && (
                <ul className="border mt-2 rounded-md shadow-md bg-white max-h-40 overflow-y-auto">
                    {outlets.map((outlet) => (
                        <li
                            key={outlet._id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectOutlet(outlet)}
                        >
                            {outlet.outletName} - {outlet.city}, {outlet.district}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </form>
    <div className="w-full overflow-x-auto">
    <div className="flex flex-wrap gap-4 my-4">
        <input
            type="text"
            value={filterOutletName}
            onChange={(e) => setFilterOutletName(e.target.value)}
            placeholder="Filter by Outlet Name"
            className="px-4 py-2 border rounded-md"
        />
        <input
            type="date"
            value={filterDeliveryDate}
            onChange={(e) => setFilterDeliveryDate(e.target.value)}
            className="px-4 py-2 border rounded-md"
        />
        <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-md"
        >
            <option value="">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
        </select>
    </div>
    <table className="min-w-full bg-white border mt-4">
        <thead>
            <tr>
                <th className="px-4 py-2 border">Outlet Name</th>
                <th className="px-4 py-2 border">Delivery Date</th>
                <th className="px-4 py-2 border">Stock Allocations</th>
                <th className="px-4 py-2 border">Status</th>
            </tr>
        </thead>
        <tbody>
            {filteredSchedules.length > 0 ? (
                filteredSchedules.map((schedule) => (
                    <tr key={schedule._id}>
                        <td className="px-4 py-2 border">{schedule.outletName}</td>
                        <td className="px-4 py-2 border">
                            {new Date(schedule.deliveryDate).toLocaleString()}
                        </td>
                        <td className="px-4 py-2 border">
                            {schedule.stockAllocation.map((allocation) => (
                                <p key={allocation.gasType}>
                                    {allocation.gasType}: {allocation.quantity}
                                </p>
                            ))}
                        </td>
                        <td className="px-4 py-2 border">
                            <select
                                value={schedule.status}
                                onChange={(e) => handleStatusChange(schedule._id, e.target.value)}
                                className="px-2 py-1 border rounded-md"
                            >
                                <option value="Scheduled">Scheduled</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Rescheduled">Rescheduled</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                            {schedule.status === "Rescheduled" && (
    <div className="mt-2">
        <label className="block text-sm font-semibold">New Delivery Date:</label>
        <input
            type="datetime-local"
            value={rescheduledDates[schedule._id] || ""}
            onChange={(e) =>
                setRescheduledDates((prev) => ({
                    ...prev,
                    [schedule._id]: e.target.value,
                }))
            }
            className="mt-1 px-2 py-1 border rounded-md w-full"
        />

        <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition"
            onClick={() => handleConfirmReschedule(schedule._id)}
            disabled={!rescheduledDates[schedule._id]}
        >
            Confirm Reschedule
        </button>
    </div>
)}


                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="text-center px-4 py-2 border">
                        No delivery schedules found.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>
</div>


<div className="w-full sm:w-1/2 bg-white px-8 py-8">
    {selectedOutlet ? (
        <div>
            <h2 className="font-bold text-xl mb-4">Outlet Details</h2>
            <p className="mb-2">
                <span className="font-semibold">Outlet Name:</span> {selectedOutlet.outletName}
            </p>
            <p className="mb-2">
                <span className="font-semibold">City:</span> {selectedOutlet.city}
            </p>
            <p className="mb-2">
                <span className="font-semibold">District:</span> {selectedOutlet.district}
            </p>

            <h3 className="font-bold text-lg mt-6">Stock Details</h3>
            {selectedOutlet.gasTypes?.length > 0 ? (
                selectedOutlet.gasTypes.map((type) => (
                    <div key={type.gasType} className="mb-2">
                        <p>
                            <span className="font-semibold">{type.gasType}:</span> Current Stock: {type.currentStock} / Max Capacity: {type.maxCapacity}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No gas type information available.</p>
            )}

{gasRequests.length > 0 && (
    <div>
        <h3 className="font-bold text-lg mt-6">Total Gas Requests</h3>
        <ul className="mt-2">
            {gasRequests.map((request) => (
                <li key={request.gasType} className="mb-2">
                    <span className="font-semibold">{request.gasType}:</span> {request.totalQuantity} units
                </li>
            ))}
        </ul>
    </div>
)}

{gasRequests.length === 0 && (
    <p className="text-gray-500">No gas requests for this outlet.</p>
)}


            <h3 className="font-bold text-lg mt-6">Delivery Date & Time</h3>
            <input
                type="datetime-local"
                value={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
            />

            <h3 className="font-bold text-lg mt-6">Recommended Stock</h3>
            {selectedOutlet.gasTypes && selectedOutlet.gasTypes.length > 0 ? (
                <div className="flex flex-col gap-4 mt-2">
                    {selectedOutlet.gasTypes.map((type) => (
                        <div key={type.gasType} className="flex items-center gap-4">
                            <label className="font-semibold w-20">{type.gasType}:</label>
                            <input
                                type="number"
                                value={
                                    stockAllocation.find((item) => item.gasType === type.gasType)?.quantity || 0
                                }
                                onChange={(e) =>
                                    handleStockAllocationChange(type.gasType, parseInt(e.target.value) || 0)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No gas type information available.</p>
            )}

            <button
                onClick={handleSubmit}
                className="bg-[#2563EB] mt-4 rounded-md text-white font-medium py-[10px] w-full"
            >
                Submit Allocation
            </button>
        </div>
    ) : (
        <p className="text-gray-500">Select an outlet to see its details.</p>
    )}
</div>
        </div>
    );
};

export default DeliverySchedule;