import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const OutletContext = createContext();

const OutletContextProvider = (props) => {

    const [outletlocation , setOutletLocation] = useState([]);

    const [districts , setDistricts] = useState('');

    const [cities , setCities] = useState([]);

    const [ outletName , setOutletName] = useState([]);

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

    const getCity = async(district) => {

        try 
        {

            const response = await axios.get(`http://localhost:4000/api/outlet/city/${district}`)

            if(response.data.success)
            {

                setCities(response.data.city);

            }
            else
            {

                console.error("Failed to fetch cities:", response.data.message);

            }
            
        } catch (error) 
        {

            console.error("Error fetching cities:", error.response ? error.response.data : error.message);

        }
    }

    //+++++++++++++++++++++++++++++++++++++++++++++ Get outlet name Using city ++++++++++++++++++++++++++++++++++++++++++++++++

    const getOutletName = async(city) => {

        try 
        {

            const response = await axios.get(`http://localhost:4000/api/outlet/outletName/${city}`)

            if(response.data.success)
            {

                setOutletName(response.data.outletName);

            }
            else
            {

                console.error("Failed to fetch cities:", response.data.message);

            }
            
        } catch (error) 
        {

            console.error("Error fetching cities:", error.response ? error.response.data : error.message);

        }
    }
    

    const value = 
    {

        outletlocation,
        getOutletLocation,
        setDistricts,
        districts,
        cities,
        getCity,
        getOutletName,
        outletName,
    }

    return (

        <OutletContext.Provider value={value}>

            {props.children}

        </OutletContext.Provider>
    )

}

export default OutletContextProvider;