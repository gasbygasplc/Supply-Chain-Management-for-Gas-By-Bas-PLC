import { v2 as cloudinary } from 'cloudinary';
import gasStockmodel from '../models/GasStockModels.js';

const addStock = async (req, res) => {

    try {

        const { type, weightKG, price, totalStock, stockHistroy } = req.body;

        const imageFile = req.file;


        if (!type || !weightKG || !price || totalStock === undefined) 
        {

            return res.status(400).json({ success: false, message: "Missing required fields: type, weightKG, price, or totalStock" });

        }

        if (totalStock < 0) 
        {

            return res.status(400).json({ success: false, message: "Please enter a valid stock amount" });

        }

        if (!imageFile) 
        {

            return res.status(400).json({ success: false, message: "Image file is required" });

        }

        // Parse or default stock history

        let parsedStockHistory = [];

        if (stockHistroy) 
        {

            try 
            {

                parsedStockHistory = JSON.parse(stockHistroy);

            } 
            catch (error) 
            {

                return res.status(400).json({ success: false, message: "Invalid JSON format for stockHistroy" });

            }

        }

        const existingStockType = await gasStockmodel.findOne({ type });

        const newGasStockHistory = 
        {

            dateReceived: new Date(),

            quantity: Number(totalStock),

        };

        if (existingStockType) 
        {

            existingStockType.totalStock += Number(totalStock);

            existingStockType.stockHistroy.push(newGasStockHistory);

            await existingStockType.save();

            return res.status(200).json({ success: true, message: "Gas stock updated successfully." });

        } 
        else 
        {

            try 
            {

                const imageUpload = await cloudinary.uploader.upload(imageFile.path, 
                {

                    resource_type: "image",

                });

                const imageURL = imageUpload.secure_url;

                const gasStockData = 
                {

                    type,

                    weightKG,

                    price,

                    image: imageURL,

                    totalStock,

                    stockHistroy: parsedStockHistory, // Use the parsed stock history here

                };

                const gasStock = new gasStockmodel(gasStockData);

                await gasStock.save();


                return res.status(201).json({ success: true, message: "Gas Stock Added" });

            } catch (error) 
            {

                console.error(error);

                return res.status(500).json({ success: false, message: "Error uploading image or saving stock" });

            }

        }

    } 
    catch (error) 
    {

        console.error(error);

        return res.status(500).json({ success: false, message: "Internal Server Error" });

    }

};

export { addStock };
