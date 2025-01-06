import mongoose from 'mongoose';

const outLet = new mongoose.Schema(

    {

        outletName : {type:String , required : true},

        Location : {type:String , required : true},

        phoneNumber : {type:String , required : true},

        email : {type:String , required : true},

        deliveryCapacity : {type:Number , required : true},

        currentStock : {type:Number , required : true},

        maxCapacity : {type:Number , required : true},

        minimumRequestLevel : {type:Number , required : true}

    }
)

const outletModel = mongoose.models.outLet || mongoose.model('outlets' , outLet);

export default outletModel;