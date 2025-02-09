import GasRequest from "../models/GasRequest";


export const createDeliveryShedule = async(req , res) => {

    const {outletId , stockAllocation , deliveryDate} = req.body;

    if(!outletId , !stockAllocation , !deliveryDate)
    {

        return res.status(400).json({ success: false, message: 'Missing required fields.' });

    }

    try
    {

        const outlet = await GasRequest.findById(outletId);

        if(!outlet)
        {

            return res.status(404).json({ success: false, message: 'Outlet not found.' });

        }

    }
    catch(error)
    {


    }
}


















