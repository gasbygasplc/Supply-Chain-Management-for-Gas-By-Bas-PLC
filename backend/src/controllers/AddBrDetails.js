import { v2 as cloudinary } from 'cloudinary';
import BRModel from '../models/BRModule';

const addBr = async(req , res) => {
    try {

        const {userId , BRNumber} = req.body;

        const imageFile = req.file;

        if(!userId || !BRNumber)
        {
            return res.status(400).json({ success: false, message: "Missing required fields: User , BR Number" });
        }

        if (!imageFile) //file validation
        {

            return res.status(400).json({ success: false, message: "Image file is required" });

        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, 
        {

            resource_type: "image",

        });

        const imageURL = imageUpload.secure_url;

        const BRData = {
            userId,
            image : imageURL,
            BRNumber
        }

        const BR = new BRModel(BRData);

        await BR.save();

        return res.status(201).json({ success: true, message: "BR sended" });
        
    } catch (error) {
        console.error(error);

        return res.status(500).json({ success: false, message: "Error uploading image or saving BR" });
    }
}
export {addBr};