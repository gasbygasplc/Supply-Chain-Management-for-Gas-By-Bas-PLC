import validator from 'validator';

import jwt from 'jsonwebtoken';

import outletModel from '../models/OutletManagerModule.js';

const addOutlet = async(req , res) => {

    try 
    {
        const {outletName ,location , phoneNumber, email , deliveryCapacity , currentStock , maxCapacity ,minimumRequestLevel } = req.body;

        if(!outletName ||!location || !phoneNumber|| !email || !deliveryCapacity || !currentStock || !maxCapacity ||!minimumRequestLevel)
        {

            return res.json({success:false , message: "Missing Information"});

        }

        if(!validator.isemail(email))
        {

            return res.json({success : false , message: "Please Enter a valied email"});

        }

        const outletData = {

            outletName,

            location, 

            phoneNumber,

            email, 

            deliveryCapacity, 

            currentStock,

            maxCapacity,

            minimumRequestLevel
        }

        const newAddOutlet = new outletModel(outletData);

        console.log(newAddOutlet);

        await newAddOutlet.save();

        return res.json({success: true , message: "Outlet Created Successfully"})
    } 
    catch (error) 
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

        if(email === process.env.ADMIN_email && password === process.env.ADMIN_PASSWORD)
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

export {addOutlet , adminLogin};