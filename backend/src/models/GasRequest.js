import mongoose from "mongoose";

const GasRequestSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requestId: { type: String, unique: true, required: true },
    requestedDate: { type: Date, default: Date.now },
    outletId: { type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: true },
    tokenNumber: { type: String, required: true },
    qrCodeUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Collected", "Rescheduled", "Cancelled"],
      default: "Pending",
    },
    items: [
      {
        gasType: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
    expectedPickupDate: { type: Date },
    expiration: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    priorityLevel: {
      type: String,
      enum: ["Standard", "Priority"],
      default: "Standard",
    },
    paymentReceived: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    cylinderReceived: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    collectionOverdue: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  { timestamps: true }
);

export default mongoose.model("GasRequest", GasRequestSchema);
