import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(

    {
        orderId: { type: String, required: true },

        customerName: { type: String, required: true },

        address: { type: String, required: true },

        deliveryDate: { type: Date, required: true },

        status: { type: String, enum: ['Pending', 'Dispatched', 'Delivered'], default: 'Pending' },

        notificationSent: { type: Boolean, default: false },

    },
    
    { timestamps: true }
);

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;