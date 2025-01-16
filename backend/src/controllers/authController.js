import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendSms } from '../utils/smsService.js';
import { sendEmail } from '../utils/emailService.js';

export const registerUser = async (req, res) => {   

    const { name, nic, phone, email, password , role} = req.body;

    try {

        let normalizedPhone = phone.startsWith('94') ? phone.slice(2) : phone.replace(/^0/, '');

        if (!/^\d{9}$/.test(normalizedPhone)) 
        {

            return res.status(400).json({ success: false, message: "Invalid phone number format." });

        }

        const existingUser = await User.findOne({ $or: [{ nic }, { phone: normalizedPhone }, { email }] });

        if (existingUser) 
        {

            return res.status(400).json({ success: false, message: "User already exists." });
            
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, nic, phone: normalizedPhone, email, password: hashedPassword , role});

        await newUser.save();

        const { password: _, ...userWithoutPassword } = newUser.toObject();

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

        res.status(201).json({

            message: "User registered successfully.",

            user: userWithoutPassword,

        });

    } 
    catch (error) 
    {

        console.error("Error during registration:", error);

        res.status(500).json({ message: "Error registering user.", error });

    }

};

export const loginUser = async (req, res) => 
{
    const { email, password } = req.body;

    try 
    {

        const user = await User.findOne({ email });

        if (!user) 
        {

            return res.status(404).json({ message: "User not found." });

        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) 
        {

            return res.status(401).json({ message: "Invalid credentials." });

        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({

            message: "Login successful.",
            
            user: userWithoutPassword,

            token,

        });
    } catch (error) 
    {

        console.error("Error during login:", error);

        res.status(500).json({ message: "Error logging in.", error });

    }

};

export const resetPassword = async (req, res) => 
{

    const { email, newPassword } = req.body;

    try 
    {

        const user = await User.findOne({ email });

        if (!user) 
        {

            return res.status(404).json({ message: "User not found." });

        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: "Password reset successful." });

    } catch (error) 
    {

        console.error("Error resetting password:", error);

        res.status(500).json({ message: "Error resetting password.", error });

    }
    
};
