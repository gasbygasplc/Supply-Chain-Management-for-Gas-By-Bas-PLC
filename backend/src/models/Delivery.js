import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema(

    {
        orderId: 
        { 
            type: String, 
            required: true, 
            unique: true 
        },

        outletName: 
        { 
            type: String, 
            required: true 
        },

        location: 
        { 
            type: String, 
            required: true 
        },

        deliveryDate: 
        { 
            type: Date, 
            required: true,
            validate: {
                validator: (v) => v > Date.now(),
                message: 'Delivery date must be in the future.'
            }
        },

        stockQuantity: 
        {
            type: Number, 
            required: true 
        },

        status: 
        { 
            type: String, 
            enum: ['Pending', 'Dispatched', 'Delivered', 'Collected'], 
            default: 'Pending' 
        },

        token: 
        { 
            type: String, 
            required: true, 
            unique: true 
        },

        notificationSent: 
        { 
            type: Boolean, 
            default: false 
        }

    },


    { 

        timestamps: true 

    }

);


//**************// Add indexes for frequent querying //**************//
deliverySchema.index({ status: 1 });

deliverySchema.index({ orderId: 1 });


const Delivery = mongoose.model('Delivery', deliverySchema);


export default Delivery;
