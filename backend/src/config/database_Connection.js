import mongoose from "mongoose";

import dotenv from 'dotenv';

dotenv.config();

export const connectDb = async () => {

    console.log(process.env.DB_PASSWORD);

    try
    {
        await mongoose.connect(`mongodb+srv://gasbygasplc:${process.env.DB_PASSWORD}@gasbygas.lrxn8.mongodb.net/?retryWrites=true&w=majority&appName=GasByGas`).then(() => console.log('DB connected'));
    }
    catch(error)
    {
        console.log('DB Connection Failed' , error.message);
    }
}