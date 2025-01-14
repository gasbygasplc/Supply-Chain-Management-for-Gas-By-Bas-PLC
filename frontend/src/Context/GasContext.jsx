import { createContext } from "react";

export const gasContext = createContext();

const GasContectProvider = (props) => {

    const value = {


    }

    return(

        <gasContext.Provider value={value}>

            {props.children}

        </gasContext.Provider>
    )
}

export default GasContectProvider;