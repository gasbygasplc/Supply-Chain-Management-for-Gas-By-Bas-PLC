import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const GasContext = createContext();

const GasContectProvider = (props) => {

    const [gasDetails , setGasDetails] = useState(null);

    const [gasQuantity , setGasQuantity] = useState(1);

    const [userData , setUserData] = useState({});

    const [userId , setUserId] = useState(null);

    const [gasOrder , setGasOrder] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [token , setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    //========================================== fetch Gas Details =================================================

    const fetchGasDetails = async(type) => {

        try 
        {

            const response = await axios.get(`${backendURL}/api/gas/${type}`);

            if(response.status === 200)
            {

                setGasDetails(response.data);
                
            }
            else
            {

                toast.error("Failed to fetch gas details")
            }
            
        } catch (error) 
        {

            toast.error(`Error fetching gas details: ${error.message}`);
            
        }
    }

    //============================================= Handle Gas selection code ===========================================

    const handleGasSelection = (type) => {

        fetchGasDetails(type);
    }

    //============================================= update gas details ===========================================

    const saveGasOrder = order => {

        setGasOrder((previousOrder) => [...previousOrder , order])
    }
    

    useEffect(() => {

        const StoreUserData = localStorage.getItem('userdata');

        if(StoreUserData)
        {
            setUserData(JSON.parse(StoreUserData))
        }

        console.log(gasOrder)


    }, [token , gasDetails , gasOrder]);


    //============================================= User Increment of quantity ===========================================

    const updateGasQuantity = (operation) => {

        setGasQuantity((previousData) => {

            if(!userData.role)
            {

                toast.error("Please Login.")

            }

            const maximumQuantity = userData.role === "Organization" ? 10 : 2;

            if(operation === '+' && previousData < maximumQuantity)
            {

                return previousData + 1;

            }
            else if (operation === '-' && previousData > 1)
            { 

                return previousData - 1;

            }

            return previousData
        })


    }

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
        saveGasOrder

    }

    return(

        <GasContext.Provider value={value}>

            {props.children}

        </GasContext.Provider>
    )
}

export default GasContectProvider;