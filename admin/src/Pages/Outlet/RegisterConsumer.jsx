import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const RegisterConsumer = ({ onConsumerCreated }) => {
    const [consumer, setConsumer] = useState({
        name: "",
        nic: "",
        phone: "",
        email: "",
        password: "",
        outletId: ""
    });

    const [outletId, setOutletId] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("Otoken");
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                if (decodedToken.id) {
                    setOutletId(decodedToken.id);
                    setConsumer(prev => ({ ...prev, outletId: decodedToken.id }));
                } else {
                    toast.error("Outlet ID is missing in token. Please log in again.");
                }
            } catch (error) {
                toast.error("Invalid session. Please log in again.");
                console.error("Error decoding token:", error);
            }
        } else {
            toast.error("Outlet Manager not logged in. Please log in.");
        }
    }, []);

    const handleChange = (e) => {
        setConsumer({ ...consumer, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!outletId) {
            toast.error("Outlet ID is missing. Cannot register consumer.");
            return;
        }

        try {
            const response = await axios.post("https://mw.gasbygas.store/api/auth/register-consumer", consumer);

            if (response.data.success) {
                toast.success("Consumer registered successfully!");
                onConsumerCreated(response.data.user);
                setConsumer({ name: "", nic: "", phone: "", email: "", password: "", outletId });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error registering consumer:", error);
            toast.error("Failed to register consumer.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border p-6 rounded bg-white">
            <h3 className="text-xl font-semibold mb-4">Register New Consumer</h3>

            <input
                type="text"
                name="name"
                value={consumer.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 mt-2 border rounded"
                required
            />
            <input
                type="text"
                name="nic"
                value={consumer.nic}
                onChange={handleChange}
                placeholder="NIC"
                className="w-full p-2 mt-2 border rounded"
                required
            />
            <input
                type="text"
                name="phone"
                value={consumer.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-2 mt-2 border rounded"
                required
            />
            <input
                type="email"
                name="email"
                value={consumer.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 mt-2 border rounded"
                required
            />
            <input
                type="password"
                name="password"
                value={consumer.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 mt-2 border rounded"
                required
            />

            <button type="submit" className="bg-blue-600 text-white p-2 mt-4 rounded w-full">
                Register Consumer
            </button>
        </form>
    );
};

export default RegisterConsumer;
