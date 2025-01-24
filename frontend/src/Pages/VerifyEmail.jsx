import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const verifyEmail = async () => {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get("token");

            if (!token) {
                setMessage("Invalid verification link.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email`,
                    {
                        params: { token },
                    }
                );

                if (response.data.success) {
                    toast.success(response.data.message);
                    setMessage("Your email has been verified successfully!");
                } else {
                    toast.error(response.data.message || "Verification failed.");
                    setMessage("Verification failed. Please try again.");
                }
            } catch (error) {
                toast.error("Failed to verify email.");
                setMessage("Error occurred during verification.");
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [location.search]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 shadow-lg rounded-md text-center">
                {loading ? (
                    <p>Verifying your email, please wait...</p>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold">{message}</h2>
                        {!loading && (
                            <button
                                onClick={() => navigate("/my-profile")}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Go to Login
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
