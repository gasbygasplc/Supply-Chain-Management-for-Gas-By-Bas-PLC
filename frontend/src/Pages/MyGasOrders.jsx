import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MyGasOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [collapsedSections, setCollapsedSections] = useState({
        pending: false,
        approved: false,
        collected: false,
        cancelled: false,
        expired: false,
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("userdata");

        if (storedToken && storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserId(parsedUserData._id);
            setToken(storedToken);
        } else {
            toast.error("User not logged in. Please log in to view orders.");
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!userId || !token) return;

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/api/gas/orders`,
                    { userId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.data.success) {
                    setOrders(response.data.orders);
                } else {
                    toast.error(response.data.message || "Failed to fetch orders.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast.error("Error fetching orders.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId, token]);

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/gas/cancel`,
                { orderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success("Order cancelled successfully.");
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: "Cancelled" } : order
                    )
                );
            } else {
                toast.error(response.data.message || "Failed to cancel order.");
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
            toast.error("Error cancelling order.");
        }
    };

    const isExpired = (expirationDate) => {
        return new Date() > new Date(expirationDate);
    };

    const toggleSection = (section) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const categorizeOrders = (filterFunc) => {
        return orders.filter(filterFunc);
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading orders...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Gas Orders</h1>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No gas orders found.</p>
            ) : (
                ["Pending", "Approved", "Collected", "Cancelled", "Expired"].map((status) => {
                    const filterFunc =
                        status === "Expired"
                            ? (order) => isExpired(order.expiration) && order.status === "Pending"
                            : (order) => order.status === status;
                    const ordersByStatus = categorizeOrders(filterFunc);

                    return (
                        <div key={status} className="mb-6">
                            <div
                                className="cursor-pointer bg-gray-200 p-4 rounded-md"
                                onClick={() => toggleSection(status.toLowerCase())}
                            >
                                <h2 className="text-lg font-semibold">
                                    {status} Orders ({ordersByStatus.length}){" "}
                                    <span>
                                        {collapsedSections[status.toLowerCase()] ? "▼" : "▲"}
                                    </span>
                                </h2>
                            </div>
                            {!collapsedSections[status.toLowerCase()] && (
                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
                                    {ordersByStatus.map((order) => (
                                        <div
                                            key={order._id}
                                            className="border rounded-lg p-4 shadow-md bg-white"
                                        >
                                            <h2 className="text-xl font-semibold mb-2">
                                                Request ID: {order.requestId}
                                            </h2>
                                            <p><strong>Status:</strong> {order.status}</p>
                                            <p><strong>Priority:</strong> {order.priorityLevel || "Standard"}</p>
                                            <p><strong>Token:</strong> {order.tokenNumber}</p>
                                            <p><strong>Outlet:</strong> {order.outletId?.outletName || "Unknown"}</p>
                                            <p><strong>Address:</strong> {order.outletId?.address || "Unknown"}</p>
                                            <p><strong>Phone:</strong> {order.outletId?.phoneNumber || "Unknown"}</p>

                                            <div className="mt-2">
                                                <h3 className="font-semibold">Ordered Items:</h3>
                                                <ul className="list-disc list-inside">
                                                    {order.items?.map((item, index) => (
                                                        <li key={index}>
                                                            {item.gasType} Gas x{item.quantity} - LKR {Number(item.totalPrice || 0).toFixed(2)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <p><strong>Pickup Date:</strong> {order.expectedPickupDate ? new Date(order.expectedPickupDate).toLocaleDateString() : "Not specified"}</p>
                                            <p><strong>Expiration:</strong> {new Date(order.expiration).toLocaleDateString()}</p>
                                            <p className="text-lg font-semibold text-blue-600">
                                                Total: LKR {Number(order.totalPrice || 0).toFixed(2)}
                                            </p>

                                            {status !== "Cancelled" && status !== "Expired" && (
                                                <img
                                                    src={order.qrCodeUrl}
                                                    alt="QR Code"
                                                    className="mt-2 w-32 h-32"
                                                />
                                            )}

                                            {status === "Pending" && !isExpired(order.expiration) && (
                                                <button
                                                    onClick={() => handleCancelOrder(order._id)}
                                                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                                                >
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default MyGasOrders;
