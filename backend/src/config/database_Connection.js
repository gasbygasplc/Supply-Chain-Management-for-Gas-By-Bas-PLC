import mongoose from "mongoose";

export const databaseConnection = async() => {

    try 
    {

        await mongoose.connect
        (
            `mongodb+srv://gasbygasplc:${process.env.DB_PASSWORD}@gasbygas.lrxn8.mongodb.net/GasByGas`,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
            }
        );

        console.log("Database connected successfully");
    } 
    catch (error)
    {
        console.log('Database Connection Failed' , error.message);  
        
        process.exit(1);
    }
}


