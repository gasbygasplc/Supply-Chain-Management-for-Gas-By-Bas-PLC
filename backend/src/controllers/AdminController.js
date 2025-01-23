import validator from 'validator';

import jwt from 'jsonwebtoken';

import outletModel from '../models/OutletModule.js';

import bcrypt from 'bcrypt'

import outletManagermodel from '../models/outletManager.js';



const addOutlet = async(req , res) => {

    try 
    {
        const {outletName ,district ,Location , phoneNumber, email ,password , deliveryCapacity , currentStock , maxCapacity ,minimumRequestLevel } = req.body;

        if(!outletName || !district ||!Location || !phoneNumber|| !email || !password || !deliveryCapacity || !currentStock || !maxCapacity ||!minimumRequestLevel)
        {

            return res.json({success:false , message: "Missing Information"});

        }

        if(!validator.isEmail(email))
        {

            return res.json({success : false , message: "Please Enter a valied Email"});

        }

        const location = await outletModel.findOne({Location});

        if(location)
        {

            return res.status(400).json({success:false , message:"Location already exist"});
            
        }

        if(password.length < 8)
        {

            return res.json({success : false , message: "Password must be 8 charactor"});

        }

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password , salt)


        const outletData = {

            outletName,

            Location, 

            district,

            phoneNumber,

            password : hashPassword,

            email, 

            deliveryCapacity, 

            currentStock,

            maxCapacity,

            minimumRequestLevel
        }

        const newAddOutlet = new outletModel(outletData);

        await newAddOutlet.save();

        return res.json({success: true , message: "Outlet Created Successfully"})
    } 
    catch (error) 
    {

        console.log(error);

        res.json({success: false , message: error.message}); 

    }

}

//==================================================== Outlet Manager Create =================================================

const addOutletManager = async(req , res) => {

    try 
    {

        const {name , outletName , email , password , phoneNumber ,  userRole } = req.body;

        if(!name , !outletName , !email , !password , !phoneNumber , !userRole) 
        {
            return res.json({success:false , message : 'Missing information'})
        }

        if(!validator.isEmail(email))
        {
            return res.json({success:false , message : 'Missing information'})
        }

        if(password.length < 8)
        {
            return res.json({success : false , message: "Password must be 8 charactor"})
        }

        const salt = await bcrypt.genSalt(10)

        const hashPassword = await bcrypt.hash(password , salt)

        const outletManagerData = {

            name ,
            outletName,
            email,
            password :hashPassword,
            phoneNumber,
            userRole
        }

        const newOutletManager = new outletManagermodel(outletManagerData);

        await newOutletManager.save();

        res.json({success: true , message: "Outlet Manager added" })
        
    } catch (error) 
    {
        console.log(error);

        res.json({success: false , message: error.message});    
    }

}

//==================================================== API for Admin login =================================================

const adminLogin = async(req , res) => {

    try 
    {
        
        const {email , password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {

            const atoken = jwt.sign(email + password , process.env.JWT_SECRET);

            res.json({success: true , atoken});

        }
        else
        {

            res.json({success: false , message: "Invalid Access"});

        }
    } 
    catch (error) 
    {

        console.log(error);

        res.json({success: false , message: error.message}); 

    }
}

//============================================== get all the Outlet and current Stock =========================================

const getOutletDetails = async(req , res) => {

    try 
    {

        const outeltDetails = await outletModel.find({} , {outletName : 1, currentStock:1 , _id : 0});

        res.json({success:true , outeltDetails})
        
    } 
    catch (error) 
    {

        console.error(error);
        res.json({ success: false, message: error.message });
        
    }
}


export {addOutlet , adminLogin , addOutletManager , getOutletDetails};