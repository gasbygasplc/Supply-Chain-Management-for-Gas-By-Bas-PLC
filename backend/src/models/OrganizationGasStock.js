import mongoose from 'mongoose';

const StockHistorySchema = new mongoose.Schema(

    {

        dateReceived: {type: Date, required: true, default: Date.now, },

        quantity: { type: Number, required: true},

    },

    { _id: false }

);

const organizationGasSchema = new mongoose.Schema({

    type: {type:String , required: true , enum: ['Small' , 'Medium' , 'Large']},

    weightKG : {type: Number , required: true},

    image : {type : String , required : true},

    price : {type : Number , required : true},

    totalStock : {type: Number , default: 0},

    stockHistroy : [StockHistorySchema] ,//i make it as an array


} , {timestamps: true});

const organizationGasModel  = mongoose.models.organizationGas || mongoose.model('organizationGas', organizationGasSchema);

export default organizationGasModel;