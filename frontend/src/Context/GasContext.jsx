import { createContext, useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";


export const GasContext = createContext();

const GasContextProvider = (props) => 
    {

    const [gasDetails, setGasDetails] = useState(null);

    const [gasQuantity, setGasQuantity] = useState(1);

    const [userData, setUserData] = useState({});

    const [userId, setUserId] = useState(null);

    const [gasOrder, setGasOrder] = useState(() => 
    {

        const savedCart = localStorage.getItem("gasOrder");

        return savedCart ? JSON.parse(savedCart) : [];

    });

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);


    //========================================== fetch Gas Details =================================================
    const saveGasOrder = (order) => 
    {
    
        if (!order.type || !order.quantity || !order.price) 
        {
        
            toast.error("Invalid gas order details.");
        
            return;
        
        }
    
        const updatedOrder = [...gasOrder, order];
    
        setGasOrder(updatedOrder);
    
        localStorage.setItem("gasOrder", JSON.stringify(updatedOrder)); // Save to localStorage
    
    };

    const clearCart = () => 
    {
    
        setGasOrder([]);
    
        localStorage.removeItem("gasOrder");
    
    };



    const fetchGasDetails = async (type) => 
    {
    
        try 
        {

            const response = await axios.get(`${backendURL}/api/gas/${type}`);
        
            if (response.status === 200) 
            {
            
                setGasDetails(response.data);
            
            } 
            else 
            {
            
                toast.error("Failed to fetch gas details");
            
            }
        
        } 
        catch (error) 
        {
        
            console.error("Error fetching gas details:", error);
        
            toast.error(`Error fetching gas details: ${error.message}`);
        
        }

    };

    //============================================= Handle Gas selection code ===========================================
    const handleGasSelection = (type) => 
    {
    
        fetchGasDetails(type);
    
    };

    //============================================= update gas details ===========================================
    const checkoutCart = async () => 
    {
    
        if (isProcessingCheckout) return;
    
        setIsProcessingCheckout(true);
    

        if (!token) 
        {
        
            toast.error("You must be logged in to complete the checkout.");
        
            setIsProcessingCheckout(false);
        
            return;
        
        }

        if (gasOrder.length === 0) 
        {
        
            toast.error("Your cart is empty. Add items before checking out.");
        
            setIsProcessingCheckout(false);
        
            return;
        
        }

        const userId = userData._id || null;
    

        if (!userId) 
        {
        
            toast.error("User ID is missing. Please log in again.");
        
            setIsProcessingCheckout(false);
        
            return;
        
        }

        const payload = 
        {

            userId,

            items: gasOrder,

        };

        console.log("Checkout Payload:", payload);

        try 
        {

            const response = await axios.post( `${backendURL}/api/gas/checkout`, payload, { headers: { Authorization: `Bearer ${token}` } });

            if (response.status === 201) 
            {
            
                toast.success("Checkout successful! You will receive notifications shortly.");
            
                clearCart();
            
            } 
            else 
            {
            
                toast.error("Checkout failed. Please try again later.");
            
            }
        
        } catch (error) 
        {

            console.error("Error during checkout:", error.response?.data || error.message);

            toast.error(`Error during checkout: ${error.response?.data?.message || error.message}`);

        } 
        finally 
        {

            setIsProcessingCheckout(false);

        }

    };

    //============================================= User Increment of quantity ===========================================
    const updateGasQuantity = (operation) => 
    {
    
        setGasQuantity((previousData) => 
        {
        
            if (!userData.role) 
            {
            
                toast.error("Please log in to adjust quantity.");
            
                return previousData;
            
            }

            const maximumQuantity = userData.role === "Organization" ? 10 : 2;

            if (operation === "+" && previousData < maximumQuantity) 
            {
            
                return previousData + 1;
            
            } 
            else if (operation === "-" && previousData > 1) 
            {
            
                return previousData - 1;
            
            }

            return previousData;

        });

    };

    useEffect(() => {

        const storedUserData = localStorage.getItem("userdata");
    
        if (storedUserData) 
        {
        
            const parsedData = JSON.parse(storedUserData);
        
            setUserData(parsedData);
        
            setUserId(parsedData._id);
        
        } 
        else 
        {
        
            setUserData({});
        
            setUserId(null);
        
        }

        console.log("Gas Order:", gasOrder);

    }, [token, gasDetails, gasOrder]);

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
        
        saveGasOrder,
        
        checkoutCart,
        

    };

    return <GasContext.Provider value={value}>{props.children}</GasContext.Provider>;
};

export default GasContextProvider;
