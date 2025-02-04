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
    const [isSaving, setIsSaving] = useState(false);
    const [isRequesting, setIsRequesting] = useState(false);

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
                        toast.error(response.data.message || "Session Expired, Please login again.");
                    }
                } catch (error) {
                    toast.error("Session Expired, Please login again.");
                }
            };
            fetchProfile();
        }
    }, [userId, token]);

    const handleUpdate = async () => {
        if (!profile.name.trim() || !profile.phone.trim() || !/\S+@\S+\.\S+/.test(profile.email)) {
            toast.error("Please fill out all fields with valid information.");
            return;
        }

        setIsSaving(true);
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
        } finally {
            setIsSaving(false);
        }
    };

    const requestVerification = async (type) => {
        setIsRequesting(true);
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
        } finally {
            setIsRequesting(false);
        }
    };

    const handleOtpSubmit = async () => {
        if (!otp.trim()) {
            toast.error("Please enter the OTP.");
            return;
        }

        setIsRequesting(true);
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
        } finally {
            setIsRequesting(false);
        }
    };

    return (
        <div className="flex justify-center mt-4 items-center min-h-fit">
            <div className="bg-white border rounded-lg py-8 px-4 w-full md:max-w-md">
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
                        <div className="flex flex-col items-start gap-1">
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
                                    className={`text-red-500 text-sm underline ${isRequesting ? "opacity-50 pointer-events-none" : ""}`}
                                    disabled={isRequesting}
                                >
                                    {isRequesting ? "Requesting..." : "Verify"}
                                </button>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-600 font-medium mb-1">Email:</label>
                        <div className="flex flex-col items-start gap-1">
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
                                    className={`text-red-500 text-sm underline ${isRequesting ? "opacity-50 pointer-events-none" : ""}`}
                                    disabled={isRequesting}
                                >
                                    {isRequesting ? "Requesting..." : "Verify"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-center mt-6">
                    <button
                        onClick={() => setEditing(!editing)}
                        className={`${editing ? 'px-4 w-full py-2 bg-white text-gray-800 border rounded-md hover:bg-gray-100 transition' : "px-4 w-full py-2 bg-primary text-white border rounded-md hover:bg-blue-600 transition"} ${
                            isSaving ? "opacity-50 pointer-events-none" : ""
                        }`}
                        disabled={isSaving}
                    >
                        {editing ? "Cancel" : "Edit"}
                    </button>
                    {editing && (
                        <button
                            onClick={handleUpdate}
                            className={`px-4 w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition ${
                                isSaving ? "opacity-50 pointer-events-none" : ""
                            }`}
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
