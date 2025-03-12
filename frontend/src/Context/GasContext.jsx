import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const GasContext = createContext();

const GasContextProvider = (props) => {
    const [gasDetails, setGasDetails] = useState(null);
    const [organizationGasDetails, setOrganizationGasDetails] = useState([]);
    const [gasQuantity, setGasQuantity] = useState(1);
    const [userData, setUserData] = useState({});
    const [userId, setUserId] = useState(null);
    const [gasOrder, setGasOrder] = useState(() => {
        const savedCart = localStorage.getItem("gasOrder");
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

    //============================================= fetch organization gas Details ==============================================

    const fetchOrganizationGasDetails = async () => 
    {
        try 
        {
            const response =  await axios.get(`${backendURL}/api/organization/organization-gas`);

            if(response.status === 200)
            {
                setOrganizationGasDetails(response.data.gasTypes);
            }
            else
            {
                toast.error("Failed to fetch organization gas details.");
            }

        } catch (error) 
        {
            console.error("Error fetching organization gas details:", error);
            
            toast.error(`Error fetching organization gas details: ${error.message}`);
        }
    }

    const saveGasOrder = async (order) => {
        try {
            const response = await axios.get(`${backendURL}/api/gas/pending-orders`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { userId },
            });
    
            if (!response || typeof response.data.orders === "undefined") {
                console.log("Saving order:", order);
                console.log("Current gasOrder before update:", gasOrder);

                toast.warning("Could not verify pending orders. Adding to the cart without validation.");
                const updatedOrder = [...gasOrder, order];
                setGasOrder(updatedOrder);
                localStorage.setItem("gasOrder", JSON.stringify(updatedOrder));
                return;
            }
    
            const pendingOrders = response.data.orders;
            const totalPendingGases = pendingOrders.reduce((count, o) => count + o.quantity, 0);
            const maxGasesAllowed = userData.role === "Organization" ? 10 : 2;
    
            if (totalPendingGases + order.quantity > maxGasesAllowed) {
                toast.error(`You cannot have more than ${maxGasesAllowed} gases in pending or active requests.`);
                return;
            }
    
            const updatedOrder = [...gasOrder, order];
            setGasOrder(updatedOrder);
            localStorage.setItem("gasOrder", JSON.stringify(updatedOrder));
            toast.success("Your gas has been added to the cart!");
        } catch (error) {
            console.error("Error fetching or verifying pending orders:", error.message || error);
            toast.error("Unable to verify pending orders. Please try again.");
        }
    };
    
    
    // Clear the cart
    const clearCart = () => {
        setGasOrder([]);
        localStorage.removeItem("gasOrder");
    };

    const fetchGasDetails = async (type) => {
        try {
            const response = await axios.get(`${backendURL}/api/gas/${type}`);
            if (response.status === 200) {
                setGasDetails(response.data);
            } else {
                toast.error("Failed to fetch gas details.");
            }
        } catch (error) {
            console.error("Error fetching gas details:", error);
            toast.error(`Error fetching gas details: ${error.message}`);
        }
    };

    const handleGasSelection = (type) => {
        fetchGasDetails(type);
    };

    const checkoutCart = async () => {
        if (isProcessingCheckout) return;
        setIsProcessingCheckout(true);
    
        if (!token) {
            toast.error("You must be logged in to complete the checkout.");
            setIsProcessingCheckout(false);
            return;
        }
    
        if (gasOrder.length === 0) {
            toast.error("Your cart is empty. Add items before checking out.");
            setIsProcessingCheckout(false);
            return;
        }
    
        const totalAmount = gasOrder.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);
    
        if (isNaN(totalAmount) || totalAmount <= 0) {
            toast.error("Invalid total amount. Please check your cart.");
            setIsProcessingCheckout(false);
            return;
        }
    
        try {
            const response = await axios.post(
                `${backendURL}/api/auth/profile`,
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (!response.data.success) {
                toast.error("Session expired. Please log in again.");
                setIsProcessingCheckout(false);
                return;
            }
    
            const { emailVerified, phoneVerified } = response.data.user;
    
            if (!emailVerified || !phoneVerified) {
                toast.error("You must verify your email and phone number before checkout.");
                setIsProcessingCheckout(false);
    
                setTimeout(() => {
                    window.location.href = "/my-profile";
                }, 2000);
    
                return;
            }
        } catch (error) {
            toast.error("Error verifying user status. Please log in again.");
            setIsProcessingCheckout(false);
            return;
        }
    
        if (!gasOrder[0]?.outletId) {
            toast.error("Error: Missing Outlet ID. Please try again.");
            setIsProcessingCheckout(false);
            return;
        }
    
        const checkoutRequest = {
            userId,
            outletId: gasOrder[0]?.outletId,
            items: gasOrder.map((item) => ({
                gasType: item.type,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice,
            })),
            totalPrice: Number(totalAmount || 0),
            expectedPickupDate: gasOrder[0]?.expectedPickupDate || null,
        };
    
        console.log("Payload being sent to backend:", checkoutRequest);
    
        try {
            const response = await axios.post(`${backendURL}/api/gas/checkout`, checkoutRequest, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            console.log("Checkout Response:", response);
    
            if (response.status === 201) {
                toast.success(`Checkout successful! Total: LKR ${Number(totalAmount || 0).toFixed(2)}. You will receive notifications shortly.`);
                clearCart();
            } else {
                console.error("Checkout failed. Response:", response.data);
                toast.error("Checkout failed. Please try again later.");
            }
        } catch (error) {
            console.error("Error during checkout:", error.response?.data || error.message);
            toast.error(`Error during checkout: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsProcessingCheckout(false);
        }
    };
    
    
    const updateGasQuantity = (operation) => {
        setGasQuantity((prev) => {
            const maxQuantity = userData.role === "Organization" ? 10 : 2;
            if (operation === "+" && prev < maxQuantity) return prev + 1;
            if (operation === "-" && prev > 1) return prev - 1;
            return prev;
        });
    };

    useEffect(() => {
        const storedUserData = localStorage.getItem("userdata");
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData(parsedData);
            setUserId(parsedData._id);
        } else {
            setUserData({});
            setUserId(null);
        }
    }, [token]);

    const value = {
        gasDetails,
        fetchGasDetails,
        handleGasSelection,
        token,
        setToken,
        userId,
        userData,
        setUserData,
        gasQuantity,
        setGasQuantity,
        updateGasQuantity,
        gasOrder,
        setGasOrder,
        saveGasOrder,
        checkoutCart,
    };

    return <GasContext.Provider value={value}>{props.children}</GasContext.Provider>;
};

export default GasContextProvider;
