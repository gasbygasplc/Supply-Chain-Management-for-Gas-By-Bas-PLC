import { createContext, useState } from "react";
import axios from 'axios';
import { useEffect } from "react";


export const OutletContext = createContext();

const OutletContextProvider = (props) => {

    const [Otoken , setOtoken] = useState(localStorage.getItem('Otoken') ? localStorage.getItem('Otoken') : "");

    const [outletNames , setOutletNames] = useState([]);

    //============================================== get Outlet ====================================================

    const getOutletName = async(req , res) => {

        try 
        {

            const response = await axios.get('http://localhost:4000/api/outlet/outletName');

            if(response.data.success)
            {

                setOutletNames(response.data.outletName)

            }
            else
            {

                console.error("Error fetching outlets:", response.data.message);

            }

        } catch (error) 
        {

            console.error('Error fetching outlets:', error);
            
        }

    }

    


    const value = {

        Otoken,
        setOtoken,
        outletNames, // Only provide what's necessary
        getOutletName
    }
    

    return (

        <OutletContext.Provider value={value}>

            {props.children}

        </OutletContext.Provider>
    )
}

export default OutletContextProvider;