import mongoose from "mongoose";

export const databaseConnection = async() => {

    try 
    {

        await mongoose.connect(`mongodb+srv://gasbygasplc:${process.env.DB_PASSWORD}@gasbygas.lrxn8.mongodb.net/GasByGas`).then(() => console.log('Database Connected'));
        
    } 
    catch (error)
    {
        console.log('Database Connection Failed' , error.message);
        
    }
}


