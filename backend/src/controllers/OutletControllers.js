
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import outletModel from '../models/OutletModule.js';
import GasRequest from '../models/GasRequest.js';
import outletManagermodel from '../models/outletManager.js';

// const outletLogin = async(req , res) => {


//     try 
//     {

//         const {email , password} = req.body;

//         if(!email , !password)
//         {

//             return res.status(400).json({success: false , message: "Missing Information"});
            
//         }

//         const outlet = await outletModel.findOne({email});

//         if(!outlet)
//         {

//             return res.status(400).json({success:false , message:"Invalid Email Please try again"});
//         }

//         const isMatch = await bcrypt.compare(password , outlet.password);

//         if(!isMatch)
//         {

//             return res.status(400).json({success:false , message:"Invalid Password Please try again"});
//         }
        
//         const Otoken = jwt.sign({id:outlet._id} , process.env.JWT_SECRET , { expiresIn: '1d' });

//         res.json({success:true , message:"Login Success" , Otoken , outlet});

        
//     } catch (error) 
//     {

//         console.error(error);

//         res.status(500).json({success:false , message:"Server Error"});
        
//     }

// }

const outletLogin = async(req , res) => {

    try 
    {

        const {email , password} = req.body;

        if(!email || !password)
        {

            return res.status(400).json({success: false , message: "Missing Information"});

        }

        const outletManager = await outletManagermodel.findOne({email});

        if(!outletManager)
        {

            return res.status(400).json({success:false , message:"Invalid Email Please try again"});

        }

        const isMatch = await bcrypt.compare(password , outletManager.password);

        if(!isMatch)
        {

            return res.status(400).json({success:false , message:"Invalid Password Please try again"});

        }

        const Otoken = jwt.sign({id:outletManager.outletId} , process.env.JWT_SECRET , { expiresIn: '1d' });

        res.json({success:true , message:"Login Success" , Otoken , outletManager})

        
        
    } catch (error) 
    {

        console.error(error);

        res.status(500).json({success:false , message:"Server Error"});
        
    }
}

//============================================== get the outlet Location ====================================================

const getOutletLocation = async(req , res) => {

    try 
    {

        const district = await outletModel.find({} , 'district _id');

        if(!district.length)
        {

            return res.status(400).json({success:false , message:"No Location Found"});

        }

        res.status(200).json({success:true , message: 'Outlet locations and IDs retrieved successfully.' , district});


        
    } catch (error) 
    {

        console.error(error);

        res.status(500).json({ message: 'An error occurred while fetching outlet locations and IDs.' });
        
    }

}

//============================================== Fetch the Cities ====================================================

const getCity = async(req , res) => {

    try 
    {

        const {district} = req.params;

        const city = await outletModel.find({district} , 'city _id');

        if(!city.length)
        {

            return res.status(400).json({success:false , message:"No City Found"});

        }

        res.status(200).json({ success: true, message: "Cities retrieved successfully.", city });
        
    } catch (error) 
    {

        console.error(error);

        res.status(500).json({ success: false, message: "Server error." });
        
    }

}

//============================================== Get Outlet Name ====================================================

const getOutletName = async(req , res) => {


    try 
    {

        const {city} = req.params;

        const outletName = await outletModel.find({city} , 'outletName _id');

        if(!outletName.length)
        {

            return res.status(400).json({success:false , message:"No Outlet Found"});

        }
        
        res.status(200).json({success:true , message:"Outlet Name retrieved successfully" , outletName});
        
    } 
    catch (error) 
    {

        console.error(error);

        res.status(500).json({ success: false, message: "Server error." });
        
    }

}

//================================================ Get Gas Request ====================================================


const gasRequest = async(req , res) => {


    try 
    {

        const { outletId } = req.body;

        const gasRequest = await GasRequest.find({ outletId: outletId });

        res.json({success:true , gasRequest});
        
    } 
    catch (error) 
    {

        console.log(error);

        res.json({success: false , message: error.message});
        
    }

}

//=============================================== Send Gas Request ==========================================================

const sendGasRequestForDeliveryShedule = async(req , res) => {
    
    
}

export {outletLogin , getOutletLocation , getCity , getOutletName , gasRequest};