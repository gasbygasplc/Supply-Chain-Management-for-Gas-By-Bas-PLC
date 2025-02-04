
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import outletModel from '../models/OutletModule.js';
import GasRequest from '../models/GasRequest.js';
import outletManagermodel from '../models/outletManager.js';
import User from '../models/User.js';
import gasDeliveryRequest from '../models/ReqDeliveryShedule.js';
import DeliverySchedule from '../models/DeliveryScheduleModel.js';
import mongoose from 'mongoose';


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

        const Otoken = jwt.sign({id:outletManager.outletId , name:outletManager.name} , process.env.JWT_SECRET , { expiresIn: '1d' });

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

export const getOutletName = async (req, res) => {
    try {
        const { city } = req.params;

        const today = new Date();
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(today.getDate() + 14);

        const query = city ? { city } : {};
        const outlets = await outletModel.find(query).lean();

        if (!outlets.length) {
            return res.status(404).json({ success: false, message: "No outlets found." });
        }

        const validOutlets = [];

        for (const outlet of outlets) {
            let hasStockAvailable = false;
            let stockDetails = [];

            for (const gasType of outlet.gasTypes) {
                try {
                    const approvedRequests = await GasRequest.aggregate([
                        {
                            $match: {
                                outletId: new mongoose.Types.ObjectId(outlet._id),
                                status: "Approved",
                                "items.gasType": gasType.gasType,
                            },
                        },
                        { $unwind: "$items" },
                        {
                            $match: {
                                "items.gasType": gasType.gasType,
                            },
                        },
                        {
                            $group: {
                                _id: "$items.gasType",
                                totalRequested: { $sum: "$items.quantity" },
                            },
                        },
                    ]);

                    const totalApproved = approvedRequests.length > 0 ? approvedRequests[0].totalRequested : 0;
                    const availableStock = gasType.currentStock - totalApproved;

                    if (availableStock > 0) {
                        hasStockAvailable = true;
                    }

                    stockDetails.push({
                        cylinderType: gasType.gasType,
                        availableQuantity: availableStock,
                    });
                } catch (err) {
                    console.error("Error fetching gas stock for:", gasType.gasType, err);
                }
            }

            const upcomingDeliveries = await DeliverySchedule.find({
                outletId: outlet._id,
                deliveryDate: { $gte: today, $lte: twoWeeksLater },
                status: "Scheduled",
            }).lean();

            if (hasStockAvailable || upcomingDeliveries.length > 0) {
                validOutlets.push({
                    _id: outlet._id,
                    outletName: outlet.outletName,
                    city: outlet.city,
                    district: outlet.district,
                    stockDetails,
                });
            }
        }

        if (!validOutlets.length) {
            return res.status(404).json({ success: false, message: "No available outlets with stock or scheduled deliveries." });
        }

        res.status(200).json({ success: true, message: "Filtered outlets retrieved successfully.", outletName: validOutlets });

    } catch (error) {
        console.error("Error fetching filtered outlets:", error);
        res.status(500).json({ success: false, message: "Failed to fetch filtered outlets.", error: error.message });
    }
};



//================================================ Get Gas Request ====================================================


const gasRequest = async (req, res) => {
    try {
        const { outletId } = req.body;

        if (!outletId) {
            return res.status(400).json({ success: false, message: "Outlet ID is required." });
        }

        const gasRequests = await GasRequest.find({ outletId });

        const requestsWithUserInfo = await Promise.all(
            gasRequests.map(async (request) => {
                const user = await User.findById(request.userId).select('name nic email phone');

                return {
                    ...request.toObject(),
                    user: user || {},
                };
            })
        );

        res.json({ success: true, gasRequests: requestsWithUserInfo });

    } catch (error) {
        console.error("Error fetching gas requests:", error);
        res.status(500).json({ success: false, message: "Error fetching gas requests." });
    }
};

//=============================================== Send Gas Request ==========================================================

const sendGasRequestForDeliveryShedule = async(req , res) => {
    
 try {

    const { outletManagerName, outletId, smallQty, mediumQty, largeQty, expectedDeliveryDate } = req.body;

    if (!outletId) {
        return res.status(400).json({ success: false, message: "Outlet ID is required in the request body." });
    }
    
    if (smallQty <= 0 && mediumQty <= 0 && largeQty <= 0) {
        return res.status(400).json({ success: false, message: "At least one gas type must be requested." });
    }
    

    const newRequest = new gasDeliveryRequest({
        outletId,
        outletManagerName,
        gasQuantity : {
            Small:smallQty,
            Medium : mediumQty,
            Large : largeQty
        },
        expectedDeliveryDate
    });
    await newRequest.save();

    res.status(201).json({ success: true, message: "Delivery request submitted successfully", request: newRequest });

    
 } catch (error) {

    console.error("Error submitting delivery request:", error);
    res.status(500).json({ success: false, message: "Server Error" });
    
 }
    
}

export const getOutletStockRequests = async (req, res) => {
    try {
        const { outletId } = req.params;

        if (!outletId) {
            return res.status(400).json({ success: false, message: "Outlet ID is required." });
        }

        const stockRequests = await gasDeliveryRequest.find({
            outletId,
            status: "Pending",
        });

        res.status(200).json({
            success: true,
            message: "Stock requests retrieved successfully.",
            stockRequests,
        });

    } catch (error) {
        console.error("Error fetching stock requests:", error);
        res.status(500).json({ success: false, message: "Error fetching stock requests." });
    }
};


const fetchDeliveryShedule = async(req , res) => {

    try {

        const {outletId} = req.body;
    
        if(!outletId)
        {
            return res.status(400).json({ success: false, message: "Outlet ID is required." });
        }

        const request = await gasDeliveryRequest.find({outletId}).sort({createdAt: -1});

        if(!request.length)
        {
            return res.status(404).json({ success: false, message: "No gas requests found for this outlet." });
        }

        res.status(200).json({ success: true, request });

    } catch (error) {

        console.error("Error fetching outlet gas requests:", error);
        res.status(500).json({ success: false, message: "Server Error" });

    }

}

//============================================ Get outlet Stocks ==================================================

const getOutletStock = async(req , res) => {

    try 
    {
        const outletId = req.outletId;

        const outlet = await outletModel.findById(outletId).select('gasTypes');

        if(!outlet)
        {
            return res.status(404).json({ message: 'Outlet not found' });
        }

        return res.status(200).json({ gasTypes: outlet.gasTypes });
        
    } catch (error) 
    {

        return res.status(500).json({ message: 'Server error', error: error.message });
        
    }
}

export {outletLogin , getOutletLocation , getCity , gasRequest , sendGasRequestForDeliveryShedule , fetchDeliveryShedule , getOutletStock};