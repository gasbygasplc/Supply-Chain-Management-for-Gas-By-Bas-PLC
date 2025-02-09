import mongoose from 'mongoose';

const deliveryScheduleSchema = new mongoose.Schema({
    outletId: { type: mongoose.Schema.Types.ObjectId, ref: 'Outlet', required: true },


    stockAllocation: [
        {
            gasType: { type: String, required: true },
            quantity: { type: Number, required: true },
        },
    ],

    deliveryDate: {
        type: Date,
        required: true,
    },
     
    status: {
        type: String,
        enum: ['Scheduled', 'Dispatched', 'Rescheduled', 'Delivered', 'Cancelled'],
        default: 'Scheduled',
    },
       
    totalStockAllocated: {
        type: Number,   
        required: true,
    },
        
    comments: {   
        type: String,
        default: '',
    },
}, { timestamps: true });
const DeliverySchedule = 
    mongoose.models.DeliverySchedule || mongoose.model('DeliverySchedule', deliveryScheduleSchema);

export default DeliverySchedule;
    