import mongoose from 'mongoose';

const GasRequestSchema = new mongoose.Schema(

  {

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    requestId: { type: String, unique: true, required: true },

    requestedDate: { type: Date, default: Date.now },

    tokenNumber: { type: String, required: true },

    qrCodeUrl: { type: String, required: true },

    status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },

    gasType: { type: String, required: true },

    quantity: { type: Number, required: true },

  },
  
  { timestamps: true }
  
);

export default mongoose.model('GasRequest', GasRequestSchema);
