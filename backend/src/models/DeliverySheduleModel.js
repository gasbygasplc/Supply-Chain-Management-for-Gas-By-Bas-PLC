import mongoose from 'mongoose'

const deliverySheduleSchema = new mongoose.Schema({

    outletId : {type: mongoose.Schema.Types.ObjectId, ref: 'Outlet' , required:true},

    stockAllocation : [

        {

            gasType: {type:String , required:true},

            quantity : {type:Number , required:true}

        },

    ],

    deliveryDate : {type: Date , required:true},

    status: {

        type: String,

        enum : ['Scheduled', 'Dispatched', 'Rescheduled', 'Delivered', 'Cancelled'],

        default: 'Scheduled',

    },

    totalStock : { type: Number, required: true },

} , {timestamps: true});

const deliveryShedule = mongoose.models.deliveryShedule || mongoose.model('deliveryShedule' , deliverySheduleSchema);

export default deliveryShedule;