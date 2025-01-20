import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const GasContext = createContext();

const GasContectProvider = (props) => {

    const [gasDetails , setGasDetails] = useState(null);

    const [gasQuantity , setGasQuantity] = useState(1);

    const [userData , setUserData] = useState({});

    const [userId , setUserId] = useState(null);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [gaspriceAmount , setGasPrice] = useState();

    const [token , setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    //========================================== fetch Gas Details =================================================

    const fetchGasDetails = async(type) => {

        try 
        {

            const response = await axios.get(`${backendURL}/api/gas/${type}`);

            if(response.status === 200)
            {

                setGasDetails(response.data);

                setGasPrice(response.data.price)
                
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

    //============================================= Quantity Increment ===========================================

    // const updateQuantity = async(operation) =>{

    //     setGasQuantity((previousQuantity) => {

    //         const updateQuantity = operation === 'Increment' ? previousQuantity + 1
    //     })
    // }

    useEffect(() => {

        const StoreUserData = localStorage.getItem('userdata');

        if(StoreUserData)
        {
            setUserData(JSON.parse(StoreUserData))
        }

        gasPrice();


    }, [token , gasDetails , gasQuantity]);

    //============================================ Gas Price ============================================================

    const gasPrice = () => {

        if(gasDetails && gasDetails.price)
        {

            const totalPrice = gasDetails.price * gasQuantity;

            setGasPrice(totalPrice.toFixed(2))

            console.log(gaspriceAmount)

        }
    }

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
        gaspriceAmount

    }

    return(

        <GasContext.Provider value={value}>

            {props.children}

        </GasContext.Provider>
    )
}

export default GasContectProvider;