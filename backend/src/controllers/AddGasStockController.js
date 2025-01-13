import { v2 as cloudinary } from 'cloudinary';
import gasStockmodel from '../models/GasStockModels.js';

const addStock = async (req, res) => {

    try {

        const { type, weightKG, price, totalStock, stockHistroy } = req.body; //fetch the Data from the request

        const imageFile = req.file; //store the image from selected file


        if (!type || !weightKG || !price || totalStock === undefined)  // check empty validation
        {

            return res.status(400).json({ success: false, message: "Missing required fields: type, weightKG, price, or totalStock" });

        }

        if (totalStock < 0) //check stock is empty
        {

            return res.status(400).json({ success: false, message: "Please enter a valid stock amount" });

        }

        if (!imageFile) //file validation
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

        const existingStockType = await gasStockmodel.findOne({ type }); //find the type of gas from all the document

        const newGasStockHistory = 
        {

            dateReceived: new Date(), //set current date

            quantity: Number(totalStock), //set quantity as the same quantity of stock

        };

        if (existingStockType) //if type is available data will updated
        {

            existingStockType.totalStock += Number(totalStock);

            existingStockType.stockHistroy.push(newGasStockHistory);

            await existingStockType.save();

            return res.status(200).json({ success: true, message: "Gas stock updated successfully." });

        } 
        else //else new data will create
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

//================================================ GET STOCK AND GAS TYPE =================================================

const getGasStock = async(req , res) => {

    const data = gasStockmodel.find({})

}

export { addStock };
