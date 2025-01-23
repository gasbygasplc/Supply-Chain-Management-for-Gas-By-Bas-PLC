import Delivery from '../models/Delivery.js';
import { sendEmail } from '../utils/emailService.js';
import { sendSms } from '../utils/smsService.js';


//***************************// Schedule a Delivery to Outlets //***************************//


export const scheduleDeliveryToOutlet = async (req, res) => {

    const { outletName, location, deliveryDate, stockQuantity } = req.body;


    if (!outletName || !location || !deliveryDate || !stockQuantity) 
    {

        return res.status(400).json({ success: false, message: 'Missing required fields' });

    }


    try {
        const delivery = new Delivery({

            outletName,
            location,
            deliveryDate,
            stockQuantity,
            status: 'Scheduled',

        });

        await delivery.save();




        //*****************// Send Email to the Outlet //*****************//

        const emailSubject = `Delivery Scheduled for Outlet: ${outletName}`;

        const emailText = `Your gas delivery is scheduled for ${new Date(deliveryDate).toLocaleDateString()}.\nStock Quantity: ${stockQuantity}.\nPlease ensure the outlet is prepared to receive the stock.`;

        const emailHtml = `

            <h1>Delivery Scheduled!</h1>

            <p>Outlet: <strong>${outletName}</strong></p>

            <p>Delivery Date: <strong>${new Date(deliveryDate).toLocaleDateString()}</strong></p>

            <p>Stock Quantity: <strong>${stockQuantity}</strong></p>

            <p>Please ensure the outlet is ready to receive the stock.</p>

        `;


        await sendEmail(outletName, emailSubject, emailText, emailHtml);




        //******************// Send SMS to the Outlet //******************//


        const smsMessage = `Delivery scheduled for Outlet: ${outletName}. Date: ${new Date(deliveryDate).toLocaleDateString()}. Stock: ${stockQuantity}.`;

        await sendSms(location, smsMessage, '94');

        res.status(201).json({ success: true, message: 'Delivery scheduled successfully', delivery });

    } catch (error) 
    {
        console.error('Error scheduling delivery:', error.message);

        res.status(500).json({ success: false, message: 'Error scheduling delivery' });

    }

};



//***************************// Update Delivery Status //***************************//


export const updateDeliveryStatus = async (req, res) => {

    const { deliveryId } = req.params;

    const { status } = req.body;

    if (!status) 
    {

        return res.status(400).json({ success: false, message: 'Missing status' });

    }


    try {
        const delivery = await Delivery.findById(deliveryId);

        if (!delivery) 
        {

            return res.status(404).json({ success: false, message: 'Delivery not found' });

        }

        delivery.status = status;

        await delivery.save();


        res.status(200).json({ success: true, message: 'Delivery status updated successfully', delivery });

    } catch (error) 
    {
        console.error('Error updating delivery status:', error.message);

        res.status(500).json({ success: false, message: 'Error updating delivery status' });

    }

};



//***************************// Dispatch Delivery Notification //***************************//

export const dispatchDelivery = async (req, res) => {

    const { deliveryId } = req.params;

    try {

        const delivery = await Delivery.findById(deliveryId);

        if (!delivery) 
        {

            return res.status(404).json({ success: false, message: 'Delivery not found' });

        }



        //****************// Update status to Dispatched //****************//

        delivery.status = 'Dispatched';

        await delivery.save();



        //****************// Send SMS to the Outlet //****************//


        const smsMessage = `Gas delivery has been dispatched to Outlet: ${delivery.outletName}. Location: ${delivery.location}.`;

        await sendSms(delivery.location, smsMessage, '94');


        res.status(200).json({ success: true, message: 'Delivery dispatched successfully', delivery });

    } catch (error) 
    {

        console.error('Error dispatching delivery:', error.message);

        res.status(500).json({ success: false, message: 'Error dispatching delivery' });

    }
    
};