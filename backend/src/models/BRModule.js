import mongoose from 'mongoose';

const BRschema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image : {type:String , required:true},
    BRNumber:{type:Number , required:true}
});

const BRModel = mongoose.models.BRModel || mongoose.model('BRModel' , BRschema);

export default BRModel;