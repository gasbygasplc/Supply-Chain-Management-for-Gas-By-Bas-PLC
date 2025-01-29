import { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const OutletContext = createContext();

const OutletContextProvider = (props) => {
    const [Otoken, setOtoken] = useState(localStorage.getItem('Otoken') || "");
    const [outletNames, setOutletNames] = useState([]);
    const [gasRequest, setGasRequest] = useState([]);
    const [gasSheduleReq, setGasSheduleReq] = useState([]);
    const [loadingOutlets, setLoadingOutlets] = useState(false);

    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    //============================================== Get Outlet Names ====================================================
    const getOutletName = async () => {
        try {
            setLoadingOutlets(true);
            const response = await axios.get(`${backendURL}/api/outlet/outletName`);

            if (response.data.success) {
                if (Array.isArray(response.data.outletName)) {
                    setOutletNames(response.data.outletName);
                } else {
                    console.error("Invalid response format:", response.data);
                    setOutletNames([]);
                }
            } else {
                console.error("Error fetching outlets:", response.data.message);
                setOutletNames([]);
            }
        } catch (error) {
            console.error("Error fetching outlets:", error.message);
            setOutletNames([]);
        } finally {
            setLoadingOutlets(false);
        }
    };

    //============================================== Get Gas Requests ====================================================
    const getGasRequest = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/outlet/gas-request`, {
                headers: { Authorization: `Bearer ${Otoken}` },
            });

            if (data.success && Array.isArray(data.gasRequests)) {
                setGasRequest([...data.gasRequests].reverse());
            } else {
                toast.error(data.message || "Failed to fetch gas requests.");
            }
        } catch (error) {
            console.error('Error in getGasRequest:', error.message);
            toast.error("Failed to fetch gas requests.");
        }
    };

    //============================================ Get Gas Schedule Requests ===============================================
    const fetchGasReq = async () => {
        try {
            const response = await axios.get(`${backendURL}/api/outlet/fetch-gas-request`, {
                headers: { Authorization: `Bearer ${Otoken}` },
            });

            if (response.data.success) {
                setGasSheduleReq(response.data.request);
            } else {
                console.error("Error fetching scheduled gas requests:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching gas schedule requests:", error);
        }
    };

    useEffect(() => {
        getOutletName();
    }, []);

    const value = {
        Otoken,
        setOtoken,
        outletNames,
        getOutletName,
        getGasRequest,
        gasRequest,
        gasSheduleReq,
        fetchGasReq,
        loadingOutlets,
    };

    return (
        <OutletContext.Provider value={value}>
            {props.children}
        </OutletContext.Provider>
    );
};

export default OutletContextProvider;
