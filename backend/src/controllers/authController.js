import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendSms } from '../utils/smsService.js';
import { sendEmail } from '../utils/emailService.js';
import { generateOTP, validateOTP, saveOTP } from '../utils/otpService.js';

export const registerUser = async (req, res) => {
    const { name, nic, phone, email, password, role } = req.body;

    try {
        const normalizedPhone = phone.startsWith('94') ? phone.slice(2) : phone.replace(/^0/, '');
        if (!/^\d{9}$/.test(normalizedPhone)) {
            return res.status(400).json({ success: false, message: "Invalid phone number format." });
        }

        const existingUser = await User.findOne({ $or: [{ nic }, { phone: normalizedPhone }, { email }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, nic, phone: normalizedPhone, email, password: hashedPassword, role });
        await newUser.save();

        const smsMessage = `Welcome to Gas By Gas, ${name}! Your account has been successfully created.\nEmail: ${email}`;
        const smsResponse = await sendSms(`94${normalizedPhone}`, smsMessage, '');

        if (!smsResponse.success) 
        {

            console.error(`Failed to send SMS to 94${normalizedPhone}: ${smsResponse.message}`);

        }

        const emailSubject = 'Welcome to Gas By Gas!';
        const emailText = `Dear ${name},\n\nWelcome to Gas By Gas! Your account has been successfully created.\n\nEmail: ${email}\nPhone: ${normalizedPhone}\n\nThank you for joining us!\nGas By Gas Team`;

        const emailHtml = `
            <h1>Welcome to Gas By Gas!</h1>
            <p>Dear ${name},</p>
            <p>Your account has been successfully created.</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${normalizedPhone}</p>
            <p>Thank you for joining us!</p>
            <p>Gas By Gas Team</p>
        `;
        const emailResponse = await sendEmail(email, emailSubject, emailText, emailHtml);

        if (!emailResponse.success) 
        {

            console.error(`Failed to send email to ${email}: ${emailResponse.message}`);

        }
        res.status(201).json({ success: true, message: "User registered successfully.", user: newUser });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Error registering user.", error });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful.", token, user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Error logging in.", error });
    }
};

export const getUserProfile = async (req, res) => {
    const { userId } = req.body;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Error fetching profile." });
    }
};

export const updateUserProfile = async (req, res) => {
    const { userId, name, phone, email } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        if (name) user.name = name;
        if (email && email !== user.email) {
            user.email = email;
            user.emailVerified = false;
        }
        if (phone && phone !== user.phone) {
            user.phone = phone;
            user.phoneVerified = false;
        }

        await user.save();
        res.status(200).json({ success: true, message: "Profile updated successfully.", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Error updating profile." });
    }
};

export const sendPhoneOTP = async (req, res) => {
    const { userId, phone } = req.body;

    try {
        const otp = generateOTP();
        await saveOTP(userId, otp);

        const message = `Your verification code is: ${otp}`;
        await sendSms(`94${phone}`, message);
        res.status(200).json({ success: true, message: "OTP sent successfully." });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ success: false, message: "Error sending OTP." });
    }
};

export const verifyPhoneOTP = async (req, res) => {
    const { userId, otp } = req.body;

    try {
        const isValid = await validateOTP(userId, otp);
        if (!isValid) return res.status(400).json({ success: false, message: "Invalid or expired OTP." });

        const user = await User.findById(userId);
        user.phoneVerified = true;
        await user.save();
        res.status(200).json({ success: true, message: "Phone verified successfully." });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ success: false, message: "Error verifying phone." });
    }
};

export const sendEmailVerification = async (req, res) => {
    const { userId, email } = req.body;
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

        const emailSubject = "Verify Your Email";
        const emailHtml = `
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${verificationLink}">Verify Email</a>
        `;

        const emailResponse = await sendEmail(email, emailSubject, null, emailHtml);

        if (emailResponse.success) {
            res.status(200).json({ success: true, message: "Verification email sent." });
        } else {
            res.status(500).json({ success: false, message: "Failed to send verification email." });
        }
    } catch (error) {
        console.error("Error sending verification email:", error);
        res.status(500).json({ success: false, message: "Error sending verification email." });
    }
};


export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) return res.status(404).json({ success: false, message: "User not found." });

        user.emailVerified = true;
        await user.save();
        res.status(200).json({ success: true, message: "Email verified successfully." });
    } catch (error) {
        console.error("Error verifying email:", error);
        res.status(400).json({ success: false, message: "Invalid or expired token." });
    }
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found." });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ message: "Error resetting password.", error });
    }
};
