import express from 'express';
import { registerUser, loginUser, resetPassword } from '../controllers/authController.js';

const router = express.Router();

const validateRegistration = (req, res, next) => {
    const { nic, phone, email, password } = req.body;
    if (!nic || !phone || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }
    if (!/^[0-9]{9}[VXvx]$/.test(nic)) {
        return res.status(400).json({ success: false, message: "Invalid NIC format." });
    }
    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ success: false, message: "Invalid phone number format." });
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
    next();
};

router.post('/register', validateRegistration, registerUser); 
router.post('/login', validateLogin, loginUser);
router.post('/reset-password', validateResetPassword, resetPassword); 

export default router; 
