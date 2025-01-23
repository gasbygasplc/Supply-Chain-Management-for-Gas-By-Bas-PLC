import GasRequest from '../models/GasRequest.js';
import User from '../models/User.js';
import { generateToken } from '../utils/tokenService.js';
import { sendSms } from '../utils/smsService.js';
import { generateQrCode } from '../utils/qrCodeService.js';
import { sendEmail } from '../utils/emailService.js';
import outletModel from '../models/OutletModule.js';

export const submitGasRequest = async (req, res) => 
{

    const { userId, gasType, quantity , locationId } = req.body;

    console.log(req.body);


    if (!userId || !gasType || !quantity , !locationId) 
    {
    
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    
    }

    try 
    {
        const user = await User.findById(userId);

        if (!user) 
        {

            return res.status(404).json({ success: false, message: 'User not found' });

        }

        const OlocationId = await outletModel.findById(locationId);

        if(!OlocationId)
        {

            return res.status(404).json({ success: false, message: 'Outlet Location not found' });

        }

        const { email, phone } = user;

        const normalizedPhone = phone.startsWith('94') ? phone : `94${phone.replace(/^0/, '')}`;

        const tokenNumber = generateToken();

        const qrCodeUrl = await generateQrCode({ tokenNumber, gasType, quantity, userId });

        const gasRequest = new GasRequest({

            userId,

            requestId: `REQ-${Date.now()}`,

            tokenNumber,

            locationId,

            qrCodeUrl,

            gasType,

            quantity,

        });


        await gasRequest.save();

        const smsMessage = `Gas Request Confirmation:\nToken: ${tokenNumber}\nQR Code: ${qrCodeUrl}`;

        const smsResponse = await sendSms(normalizedPhone, smsMessage, 'GasByGas');

        if (!smsResponse.success) 
        {
        
            console.error(`Failed to send SMS to ${normalizedPhone}: ${smsResponse.message}`);

        }

        const emailSubject = 'Gas Request Confirmation';

       const emailText = `Your gas request has been submitted successfully.\nToken: ${tokenNumber}\nPlease show this token or scan the QR code to pick up your gas\nPickup Deadline: ${pickupDeadline.toDateString()}\nTolerance Deadline: ${toleranceDeadline.toDateString()}`;

        const emailHtml = `
            <h1>Gas Request Confirmation</h1>
            <p>Your gas request has been submitted successfully.</p>
            <p><strong>Token:</strong> ${tokenNumber}</p>
            <p>QR Code:</p>
            <img src="${qrCodeUrl}" alt="QR Code" style="width:100px;height:100px;" />
            <p>Thank you for using our service!</p>
        `;

        const emailResponse = await sendEmail(email, emailSubject, emailText, emailHtml);

        if (!emailResponse.success) 
        {
        
            console.error(`Failed to send email to ${email}: ${emailResponse.message}`);
        
        }

        return res.status(201).json({

            success: true,

            message: 'Gas request submitted successfully',

            tokenNumber,

            qrCodeUrl,

        });

    } catch (error) 
    {

        console.error('Error submitting gas request:', error);

        return res.status(500).json({ success: false, message: 'Error submitting gas request' });

    }
};

export const handleCheckout = async (req, res) => {

    const { userId, items } = req.body;

    if (!userId || !items || items.length === 0 || items.some(item => !item.locationId)) 
    {
    
        return res.status(400).json({ success: false, message: 'Missing required fields or cart is empty.' });

    }

    try 
    {

        const user = await User.findById(userId);

        if (!user) 
        {
        
            return res.status(404).json({ success: false, message: 'User not found.' });
        
        }

        const { email, phone } = user;

        const normalizedPhone = phone.startsWith('94') ? phone : `94${phone.replace(/^0/, '')}`;

        const requests = await Promise.all(
            items.map(async (item) => {
                const tokenNumber = generateToken();
                const qrCodeUrl = await generateQrCode({
                    tokenNumber,
                    gasType: item.type,
                    quantity: item.quantity,
                    userId,
                });

                const gasRequest = new GasRequest({
                    userId,
                    requestId: `REQ-${Date.now()}`,
                    tokenNumber,
                    qrCodeUrl,
                    gasType: item.type,
                    quantity: item.quantity,
                    locationId: item.locationId,
                });

                await gasRequest.save();

                return { tokenNumber, qrCodeUrl, gasType: item.type, quantity: item.quantity };
            })
        );

        const smsMessage = requests
            .map(
                (request) =>
                    `Gas Type: ${request.gasType}\nQuantity: ${request.quantity}\nToken: ${request.tokenNumber}\nQR Code: ${request.qrCodeUrl}`
            )
            .join('\n\n');

        const smsResponse = await sendSms(normalizedPhone, smsMessage, 'GasByGas');
        if (!smsResponse.success) {
            console.error(`Failed to send SMS to ${normalizedPhone}: ${smsResponse.message}`);
        }

        const emailSubject = 'Gas Order Confirmation';
        const emailHtml = `
            <h1>Gas Order Confirmation</h1>
            <p>Your gas order has been successfully placed.</p>
            <p>Below are the details of your order:</p>
            <ul>
                ${requests
                    .map(
                        (request) => `
                        <li>
                            <strong>Gas Type:</strong> ${request.gasType}<br/>
                            <strong>Quantity:</strong> ${request.quantity}<br/>
                            <strong>Token:</strong> ${request.tokenNumber}<br/>
                            <img src="${request.qrCodeUrl}" alt="QR Code" style="width:100px;height:100px;" />
                        </li>`
                    )
                    .join('')}
            </ul>
            <p>Thank you for using our service!</p>
        `;

        const emailText = requests
            .map(
                (request) =>
                    `Gas Type: ${request.gasType}\nQuantity: ${request.quantity}\nToken: ${request.tokenNumber}\nQR Code: ${request.qrCodeUrl}`
            )
            .join('\n\n');

        const emailResponse = await sendEmail(email, emailSubject, emailText, emailHtml);
        if (!emailResponse.success) {
            console.error(`Failed to send email to ${email}: ${emailResponse.message}`);
        }

        return res.status(201).json({
            success: true,
            message: 'Checkout successful!',
            requests,
        });
    } catch (error) {
        console.error('Error during checkout:', error);
        return res.status(500).json({ success: false, message: 'Error during checkout.' });
    }
};
