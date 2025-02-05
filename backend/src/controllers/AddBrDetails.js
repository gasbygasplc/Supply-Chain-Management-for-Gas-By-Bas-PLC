import { v2 as cloudinary } from 'cloudinary';

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

        
        
    } catch (error) {
        
    }
}