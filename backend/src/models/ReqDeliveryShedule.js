import mongoose from 'mongoose';

const gasDeliveryRequestSchema = new mongoose.Schema({

    outletId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Outlet',
        required:true
    },

    outletManagerName : {
        
        type:String,
        required:true
    },
       
    gasQuantity: {   

        Small: {type: Number, default: 0, min: 0 },   
        Medium : {type: Number, default: 0, min: 0},
        Large : {type: Number, default: 0, min: 0}
    },
    
    expectedDeliveryDate: {
        type: Date,
        required: true
    },      
      

    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const gasDeliveryRequest = mongoose.models.GasDeliveryRequest || mongoose.model('GasDeliveryRequest' , gasDeliveryRequestSchema);

export default gasDeliveryRequest;
   