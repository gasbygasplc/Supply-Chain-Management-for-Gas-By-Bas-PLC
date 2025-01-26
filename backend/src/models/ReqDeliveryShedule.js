import mongoose from "mongoose";

const reqDeliveryShedule = new mongoose.Schema({

    outletId:{type:mongoose.Schema.Types.ObjectId , ref:'Outlet' , required : true},
    outletManagerId: {type:mongoose.Schema.Types.ObjectId , ref:'outletManager' , required : true},
    quantityNeeded:{type:Number , required:true},
    current_Quantity_Of_Outlet: {type:Number , required:true}

})

const reqDeliveryModel = mongoose.models.reqDeliveryShedule || mongoose.model('reqDeliveryShedule' , reqDeliveryShedule);

export default reqDeliveryModel;