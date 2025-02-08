import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    emailVerified: { type: Boolean, default: false },
    phone: { type: String, unique: true, required: true },
    phoneVerified: { type: Boolean, default: false },
    nic: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User', 'Organization'], default: 'User' },
    outletId: { type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: false },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
