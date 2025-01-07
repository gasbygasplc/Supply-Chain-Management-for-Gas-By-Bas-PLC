import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js';

export const registerUser = async (req, res) => {

    const { nic, phone, email, password } = req.body;

    try {

        const existingUser = await User.findOne({ $or: [{ nic }, { phone }, { email }] });

        if (existingUser) {

            return res.status(400).json({ message: "User already exists." });

        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({ nic, phone, email, password: hashedPassword });

        await newUser.save();

        const { password: _, ...userWithoutPassword } = newUser.toObject();

        res.status(201).json({

            message: "User registered successfully.",

            user: userWithoutPassword,
        });

    } catch (error) {

        res.status(500).json({ message: "Error registering user.", error });
        
    }
};


export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const { password: _, ...userWithoutPassword } = user.toObject();

        res.status(200).json({
            message: "Login successful.",
            user: userWithoutPassword,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in.", error });
    }
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password.", error });
    }
};
