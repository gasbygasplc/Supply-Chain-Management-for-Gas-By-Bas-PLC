
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import outletModel from '../models/OutletModule.js';

const outletLogin = async(req , res) => {


    try 
    {

        const {email , password} = req.body;

        if(!email , !password)
        {

            return res.status(400).json({success: false , message: "Missing Information"});
            
        }

        const outlet = await outletModel.findOne({email});

        if(!outlet)
        {

            return res.status(400).json({success:false , message:"Invalid Email or Password"});
        }

        const isMatch = await bcrypt.compare(password , outlet.password);

        if(!isMatch)
        {

            return res.status(400).json({success:false , message:"Invalid Email or Password"});
        }
        
        const Otoken = jwt.sign({id:outlet._id} , process.env.JWT_SECRET);

        res.json({success:true , message:"Login Success" , Otoken , outlet});

        
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

        const city = await outletModel.find({} , 'city _id');

        if(!city.length)
        {

            return res.status(400).json({success:false , message:"No Location Found"});

        }

        res.status(200).json({success:true , message: 'Outlet locations and IDs retrieved successfully.' , city});


        
    } catch (error) 
    {

        console.error(error);

        res.status(500).json({ message: 'An error occurred while fetching outlet locations and IDs.' });
        
    }

}

export {outletLogin , getOutletLocation};