import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
    const [profile, setProfile] = useState({
        name: "",
        phone: "",
        email: "",
        emailVerified: false,
        phoneVerified: false,
    });
    const [editing, setEditing] = useState(false);
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);
    const [otp, setOtp] = useState("");
    const [verifying, setVerifying] = useState({ type: null, requested: false });

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUserData = localStorage.getItem("userdata");

        if (storedToken && storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            setUserId(parsedUserData._id);
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (userId && token) {
            const fetchProfile = async () => {
                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
                        { userId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (response.data.success) {
                        setProfile(response.data.user);
                    } else {
                        toast.error(response.data.message || "Failed to fetch profile.");
                    }
                } catch (error) {
                    toast.error("Failed to fetch profile.");
                }
            };
            fetchProfile();
        }
    }, [userId, token]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
                { userId, name: profile.name, phone: profile.phone, email: profile.email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                toast.success("Profile updated successfully.");
                setEditing(false);
            } else {
                toast.error(response.data.message || "Failed to update profile.");
            }
        } catch (error) {
            toast.error("Failed to update profile.");
        }
    };

    const requestVerification = async (type) => {
        try {
            const endpoint = type === "phone" ? "send-phone-otp" : "send-email-verification";
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/${endpoint}`,
                { userId, [type]: profile[type] },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                setVerifying({ type, requested: true });
                toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} verification requested.`);
            } else {
                toast.error(response.data.message || `Failed to request ${type} verification.`);
            }
        } catch (error) {
            toast.error(`Failed to request ${type} verification.`);
        }
    };

    const handleOtpSubmit = async () => {
        try {
            const endpoint = verifying.type === "phone" ? "verify-phone" : "verify-email";
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/${endpoint}`,
                { userId, otp },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                toast.success(`${verifying.type.charAt(0).toUpperCase() + verifying.type.slice(1)} verified successfully.`);
                setProfile({ ...profile, [`${verifying.type}Verified`]: true });
                setVerifying({ type: null, requested: false });
                setOtp("");
            } else {
                toast.error(response.data.message || "Failed to verify.");
            }
        } catch (error) {
            toast.error("Failed to verify.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">My Profile</h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Name:</label>
                        <input
                            type="text"
                            value={profile.name}
                            disabled={!editing}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className={`w-full px-4 py-2 border ${
                                editing ? "border-blue-400" : "border-gray-300"
                            } rounded-md focus:outline-none ${
                                editing ? "focus:border-blue-600" : "cursor-not-allowed"
                            }`}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Phone:</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    value={profile.phone}
                                    disabled={!editing}
                                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                    className={`w-full px-4 py-2 border ${
                                        editing ? "border-blue-400" : "border-gray-300"
                                    } rounded-md focus:outline-none ${
                                        editing ? "focus:border-blue-600" : "cursor-not-allowed"
                                    }`}
                                />
                                {profile.phoneVerified ? (
                                    <span className="text-green-500 text-sm">Verified</span>
                                ) : (
                                    <button
                                        onClick={() => requestVerification("phone")}
                                        className="text-red-500 text-sm underline"
                                    >
                                        Verify
                                    </button>
                                )}
                            </div>
                            {verifying.type === "phone" && verifying.requested && (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                                    />
                                    <button
                                        onClick={handleOtpSubmit}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                    >
                                        Submit OTP
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Email:</label>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4">
                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled={!editing}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className={`w-full px-4 py-2 border ${
                                        editing ? "border-blue-400" : "border-gray-300"
                                    } rounded-md focus:outline-none ${
                                        editing ? "focus:border-blue-600" : "cursor-not-allowed"
                                    }`}
                                />
                                {profile.emailVerified ? (
                                    <span className="text-green-500 text-sm">Verified</span>
                                ) : (
                                    <button
                                        onClick={() => requestVerification("email")}
                                        className="text-red-500 text-sm underline"
                                    >
                                        Verify
                                    </button>
                                )}
                            </div>
                            {verifying.type === "email" && verifying.requested && (
                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                                    />
                                    <button
                                        onClick={handleOtpSubmit}
                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                    >
                                        Submit OTP
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => setEditing(!editing)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                    {editing && (
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
