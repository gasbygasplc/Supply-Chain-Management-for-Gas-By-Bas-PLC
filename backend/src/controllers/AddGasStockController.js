import {v2 as cloudinary} from 'cloudinary'
import gasStockmodel from '../models/GasStockModels.js';

const addStock = async(req, res) => {

    try 
    {

        const {type , weightKG , price , totalStock , stockHistroy} = req.body;

        const imageFile = req.file;

        if(!type || !weightKG || !price || !totalStock || !stockHistroy )
        {

            return res.json({success:false , message : "Missing Information"})

        }

        if(totalStock < 0)
        {
            
            return res.json({success: false , message: "Please Enter valid Stock Amount"});

        }

        const existingStockType = await gasStockmodel.findOne({type});

        if(existingStockType)
        {
            existingStockType.totalStock += Number(totalStock);

            const newStockHistory = JSON.parse(stockHistroy);

            existingStockType.stockHistroy.push(...newStockHistory);

            await existingStockType.save();

            res.json({success:true , message:`Gas stock updated successfully.`})
        }
        else
        {
            try 
            {

                const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});

                const imageURL = imageUpload.secure_url;

                const gasStockData = {

                    type,
                    weightKG,
                    price,
                    image : imageURL,
                    totalStock,
                    stockHistroy : JSON.parse(stockHistroy)

                }

                const gasStock = new gasStockmodel(gasStockData);

                await gasStock.save();

                res.json({success:true , message: "Gas Stock Added"});

                
            } catch (error) 
            {

                console.log(error);

                res.json({success:false , message: error.message})
                
            }
            
        }

        
    } catch (error) 
    {

        console.log(error);
        res.json({success:false , message: error.message})
        
    }

}

export {addStock}