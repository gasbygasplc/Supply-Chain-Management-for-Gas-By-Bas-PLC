import { createContext, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

export const GasContext = createContext();

const GasContectProvider = (props) => {

    const [gas , setGas] = useState([]);

    const [selectedGas , setSelectedGas] = useState(null)

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    //========================================== fetch Gas Details =================================================

    const getgas = async() =>
    {

        try 
        {

            const {gasData} = await axios.get(backendURL + '/api/gas/gas-data');

            if(gasData.success)
            {
                setGas(gasData.gasData);

                setSelectedGas(gasData.gasData[0]);

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

        const selected = gas.find((gas) => gas._id === gasId);

        setSelectedGas(selected);

    }



    const value = {

        getgas,
        gas,
        setGas,
        setSelectedGas,
        selectedGas
    }

    return(

        <GasContext.Provider value={value}>

            {props.children}

        </GasContext.Provider>
    )
}

export default GasContectProvider;