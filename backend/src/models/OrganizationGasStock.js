import mongoose from 'mongoose';

const StockHistorySchema = new mongoose.Schema(

    {

        dateReceived: {type: Date, required: true, default: Date.now, },

        quantity: { type: Number, required: true},

    },

    { _id: false }

);

