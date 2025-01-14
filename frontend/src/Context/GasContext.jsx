import { createContext, useState } from "react";

export const gasContext = createContext();

const GasContectProvider = (props) => {

    const [gasDetails , setGasDetails] = useState([]);

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    //========================================== fetch Gas Details =================================================

    const getGasDetails = async() =>
    {

        try 
        {


            
        } catch (error) 
        {

            
            
        }
    }

    const value = {


    }

    return(

        <gasContext.Provider value={value}>

            {props.children}

        </gasContext.Provider>
    )
}

export default GasContectProvider;