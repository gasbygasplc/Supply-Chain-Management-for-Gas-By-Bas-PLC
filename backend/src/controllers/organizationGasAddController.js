import {v2 as cloudinary} from 'cloudinary';
import organizationGasModel from '../models/OrganizationGasStock';

const organizationGasAdd = async(request , response) => {

    try {
        
        const {gasType , weight , price , stock , stockHistroy} = request.body;

        const imageFile = request.file;

        if(!gasType || !weight || !price || !stock || !imageFile){

            return response.status(400).json({success: false , message : "Information are missing"});
        }

        if(stock < 0){

            return response.status(400).json({success: false , message : "Please enter a valid stock amount"});

        }

        let parsedStockHistory = [];

        if(stockHistroy){
            try {

                parsedStockHistory = JSON.parse(stockHistroy);
                
            } catch (error) {

                return res.status(400).json({ success: false, message: "Invalid JSON format for stockHistroy" });

            }
        }

        const existingStockType = await organizationGasModel.findOne({type});

        const newGasStockHistory = {
            dateReceived: new Date(),
            quantity : stock
        }

        if(existingStockType){
            existingStockType.totalStock += stock;
            existingStockType.stockHistory.push(newGasStockHistory);
            await existingStockType.save();
            return res.status(200).json({ success: true, message: "Gas stock updated successfully." });
        }
        else
        {
            try {
                const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type: "image",});

                const imageURL = imageUpload.secure_url;

                const organizationGasAdd = {
                    type : gasType,
                    weightKG: weight,
                    price: price,
                    image : imageURL,
                }
            } catch (error) {
                
            }
        }




    } catch (error) {
        
    }

}