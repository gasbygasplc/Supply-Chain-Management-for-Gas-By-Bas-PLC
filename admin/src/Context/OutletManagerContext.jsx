import { createContext, useState } from "react";

export const OutletContext = createContext();

const OutletContextProvider = (props) => {


    const value = {

       

    }

    return (

        <OutletContext.Provider value={value}>

            {props.children}

        </OutletContext.Provider>
    )
}

export default OutletContextProvider;