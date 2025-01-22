import mongoose from "mongoose";

const outletManagerSchema = new mongoose.Schema({

    name : {type : String , required : true},

    outletName : {type : String , required : true},

    email : {type : String , required : true},

    password : { type : String , required : true},

    phoneNumber : {type : String , required : true},

    userRole : {type : String , required : true }

})

const outletManagermodel = mongoose.models.outletManager || mongoose.model('outletManager' , outletManagerSchema)

export default outletManagermodel;