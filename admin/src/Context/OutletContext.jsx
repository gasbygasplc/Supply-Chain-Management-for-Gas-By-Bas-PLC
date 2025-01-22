import { createContext, useState } from "react";

export const OutletContext = createContext();

const OutletContextProvider = (props) => {

    const [Otoken , setOtoken] = useState(localStorage.getItem('Otoken') ? localStorage.getItem('Otoken') : "");


    const value = {

        Otoken,
        setOtoken
    }

    return (

        <OutletContext.Provider value={value}>

            {props.children}

        </OutletContext.Provider>
    )
}

export default OutletContextProvider;