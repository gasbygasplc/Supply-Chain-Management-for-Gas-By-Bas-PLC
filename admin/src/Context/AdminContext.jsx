import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

    const [atoken , Setatoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : "");

    const backendURL = import.meta.env.VITE_BACKEND_URL

    const value = {

        atoken,
        Setatoken,
        backendURL

    }

    return (

        <AdminContext.Provider value={value}>

            {props.children}

        </AdminContext.Provider>
    )
}

export default AdminContextProvider;