import mongoose from 'mongoose';

const GasTypeSchema = new mongoose.Schema({
    gasType: { type: String, required: true },
    currentStock: { type: Number, required: true, default: 0 },
    maxCapacity: { type: Number, required: true },
});

const OutletSchema = new mongoose.Schema({
    outletName: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    gasTypes: [GasTypeSchema],
    deliveryCapacity: { type: Number, required: true },
    minimumRequestLevel: { type: Number, required: true },
});

const Outlet = mongoose.models.Outlet || mongoose.model('Outlet', OutletSchema);

export default Outlet;
