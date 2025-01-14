import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const GasContext = createContext();

const GasContectProvider = (props) => {

    const [gasDetails , setGasDetails] = useState([]);

    const [selectedGasDetail , setSelectedGasDetail] = useState(null)

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    //========================================== fetch Gas Details =================================================

    const getGasDetails = async() =>
    {

        try 
        {

            const {gasData} = await axios.get(backendURL + '/api/gas/gas-data');

            if(gasData.success)
            {
                setGasDetails(gasData.gasData);

                setSelectedGasDetail(gasData.gasData[0]);

                console.log(gasData.gasData);
            }
            else
            {
                toast.error(gasData.message)
            }
            
        } catch (error) 
        {

            toast.error(error.message)
            
        }
    }

    //============================================= Handle Gas selection code ===========================================

    const handleGasSelection = gasId => {

        const selected = gasDetails.find((gas) => gas._id === gasId);

        setSelectedGasDetail(selected);

    }



    const value = {

        getGasDetails,
        gasDetails,
        setGasDetails,
        setSelectedGasDetail,
        selectedGasDetail
    }

    return(

        <GasContext.Provider value={value}>

            {props.children}

        </GasContext.Provider>
    )
}

export default GasContectProvider;