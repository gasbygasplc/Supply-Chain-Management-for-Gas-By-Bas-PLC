import {v2 as cloudinary} from 'cloudinary';

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


    } catch (error) {
        
    }

}