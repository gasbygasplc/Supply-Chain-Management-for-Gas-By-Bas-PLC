import { createContext } from "react";

export const gasContext = createContext();

const gasContectProvider = (props) => {

    const value = {


    }

    return(

        <gasContext.Provider value={value}>

            {props.children}

        </gasContext.Provider>
    )
}