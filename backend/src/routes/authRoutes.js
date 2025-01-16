import express from 'express';
import { registerUser, loginUser, resetPassword } from '../controllers/authController.js';

const router = express.Router();

const validateRegistration = (req, res, next) => {

    const { name, nic, phone, email, password } = req.body;

    if (!name || !nic || !phone || !email || !password) {

        return res.status(400).json({ success: false, message: "All fields are required." });

    }

    if (!/^[0-9]{12}[VXvx]$/.test(nic)) {

        return res.status(400).json({ success: false, message: "Invalid NIC format." });

    }

    const phoneRegex = /^(94\d{9}|0\d{9})$/; 

    if (!phoneRegex.test(phone)) {

        return res.status(400).json({ 

            success: false, 

            message: "Invalid phone number format. Must start with '94' or '0' and contain 11 or 10 digits respectively." 

        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        return res.status(400).json({ success: false, message: "Invalid email format." });

    }

    next();
};

const validateLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({ success: false, message: "Email and password are required." });

    }

    next();
};

const validateResetPassword = (req, res, next) => {

    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {

        return res.status(400).json({ success: false, message: "All fields are required." });

    }

    if (newPassword !== confirmPassword) {

        return res.status(400).json({ success: false, message: "Passwords do not match." });

    }

    if (newPassword.length < 8) {

        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });

    }

    next();
};

router.post('/register', validateRegistration, registerUser);

router.post('/login', validateLogin, loginUser);

router.post('/reset-password', validateResetPassword, resetPassword);

export default router;
