import { createContext, useState } from "react";
import axios from 'axios';
import { useEffect } from "react";
import { toast } from 'react-toastify';


export const OutletContext = createContext();

const OutletContextProvider = (props) => {

    const [Otoken , setOtoken] = useState(localStorage.getItem('Otoken') ? localStorage.getItem('Otoken') : "");

    const [outletNames , setOutletNames] = useState([]);

    const [gasRequest , setGasRequest] = useState([]);

    const [gasSheduleReq , setGasSheduleReq] = useState([]);

    //============================================== get Outlet ====================================================

    const getOutletName = async() => {

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


    //================================================= get Gas request ================================================

    // Fetch Gas Requests
    const getGasRequest = async () => {

        try 
        {

            const { data } = await axios.get('http://localhost:4000/api/outlet/gas-request', { headers: { Authorization: `Bearer ${Otoken}` }, });
    
            if (data.success) 
            {

                setGasRequest(data.gasRequest.reverse());

            } 
            else 
            {

                toast.error(data.message);

            }

        } catch (error) 
        {
            console.log('Error in getGasRequest:', error.message);

            toast.error(error.message);

        }
    };

    //============================================ get Gas Shedule request ===============================================

    const fetchGasReq = async() => {

        try 
        {

            const response = await axios.get("http://localhost:4000/api/outlet/gas-requests" , {} , {headers:{Otoken}});

            if(response.data.success)
            {
                setGasSheduleReq(response.data.request);
            }

            
            
        } catch (error) 
        {
            console.error("Error fetching gas requests:", error);
        }

    }

    useEffect(() => {

        if(Otoken)
        {
            fetchGasReq();
        }
    } , [Otoken])
    

    


    const value = {

        Otoken,
        setOtoken,
        outletNames, // Only provide what's necessary
        getOutletName,
        getGasRequest,
        gasRequest,
        gasSheduleReq
    }
    

    return (

        <OutletContext.Provider value={value}>

            {props.children}

        </OutletContext.Provider>
    )
}

export default OutletContextProvider;