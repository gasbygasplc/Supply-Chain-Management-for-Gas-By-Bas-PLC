import axios from "axios";
import { createContext, useState } from "react";

export const OutletContext = createContext();

const OutletContextProvider = (props) => {

    const [outletlocation , setOutletLocation] = useState([]);

    const [districts , setDistricts] = useState('');

    //++++++++++++++++++++++++++++++++++++++++++++++++++ Get outlet Location ++++++++++++++++++++++++++++++++++++++++++++++++

    const getOutletLocation = async() => {

        try 
        {

            const response = await axios.get('http://localhost:4000/api/outlet/location');

            if(response.data.success)
            {   

                setOutletLocation(response.data.district);

            }
            else
            {

                console.error("Failed to fetch outlet locations:", response.data.message);

            }
        
        } catch (error) 
        {

            console.error("Error fetching outlet locations:", error.response ? error.response.data : error.message);
        
        }

    }

    //+++++++++++++++++++++++++++++++++++++++++++++ Get City Using Districts ++++++++++++++++++++++++++++++++++++++++++++++++

    
    

    const value = 
    {

        outletlocation,
        getOutletLocation,
        setDistricts,
        districts,
    }

    return (

        <OutletContext.Provider value={value}>

            {props.children}

        </OutletContext.Provider>
    )

}

export default OutletContextProvider;