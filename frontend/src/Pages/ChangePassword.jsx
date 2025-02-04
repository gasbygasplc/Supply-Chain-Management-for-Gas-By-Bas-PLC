import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("userdata");

        if (storedToken && storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserId(parsedUserData._id);
            setToken(storedToken);
        }
    }, []);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long.");
            return;
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/change-password`,
                { userId, oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                toast.success("Password changed successfully.");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                toast.error(response.data.message || "Failed to change password.");
            }
        } catch (error) {
            toast.error("Error changing password. Please try again.");
        }
    };

    return (
        <div className="flex justify-center mt-6 items-center min-h-fit">
            <div className="bg-white border rounded-lg py-8 px-3 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Change Password
                </h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Old Password
                        </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleChangePassword}
                        className="px-4 py-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
