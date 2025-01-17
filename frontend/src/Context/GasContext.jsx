import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const GasContext = createContext();

const GasContectProvider = (props) => {

    const [gasDetails , setGasDetails] = useState(null);

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



    const value = {

        gasDetails,
        fetchGasDetails,
        handleGasSelection,
        token,
        setToken
    }

    return(

        <GasContext.Provider value={value}>

            {props.children}

        </GasContext.Provider>
    )
}

export default GasContectProvider;