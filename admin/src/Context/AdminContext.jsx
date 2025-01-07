import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [aToken , SetAToken] = useState("");

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const value = {

        aToken,
        SetAToken,
        backendURL

    }

    return (

        <AdminContext.Provider value={value}>

            {props.children}

        </AdminContext.Provider>
    )
}

export default AdminContextProvider;