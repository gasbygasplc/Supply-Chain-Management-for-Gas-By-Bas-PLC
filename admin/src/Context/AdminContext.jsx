import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken , SetAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : "");

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const [outletStock , setOutletStock] = useState([]);

    const [gasStock , setGasStock] = useState([]);

    const getOutletStock = async() => 
    {

        try 
        {

            const {data} = await axios.post(backendURL + '/api/admin/outlet-stock', {} , {headers:{aToken}});

            if(data.success)
            {
                setOutletStock(data.outeltDetails);
                console.log(data.outeltDetails);
            }
            else
            {
                toast.error(data.message)
            }
            
        } 
        catch (error) 
        {

            toast.error(error.message)
            
        }
    }

    //============================================== Get Gas Stock ========================================================

    

    const value = {

        aToken,
        SetAToken,
        backendURL,
        outletStock,
        getOutletStock

    }

    return (

        <AdminContext.Provider value={value}>

            {props.children}

        </AdminContext.Provider>
    )
}

export default AdminContextProvider;