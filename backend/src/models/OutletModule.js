import mongoose from 'mongoose';

const outLet = new mongoose.Schema({
    outletName: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    deliveryCapacity: { type: Number, required: true },
    currentStock: { type: Number, required: true },
    maxCapacity: { type: Number, required: true },
    minimumRequestLevel: { type: Number, required: true },
});

const Outlet = mongoose.models.Outlet || mongoose.model('Outlet', outLet);

export default Outlet;
