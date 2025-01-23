import GasRequest from '../models/GasRequest.js';
import User from '../models/User.js';
import { generateToken } from '../utils/tokenService.js';
import { sendSms } from '../utils/smsService.js';
import { generateQrCode } from '../utils/qrCodeService.js';
import { sendEmail } from '../utils/emailService.js';
import outletModel from '../models/OutletModule.js';

export const submitGasRequest = async (req, res) => {
    const { userId, gasType, quantity, locationId, expectedPickupDate, tolerance } = req.body;

    if (!userId || !gasType || !quantity || !locationId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const outletLocation = await outletModel.findById(locationId);
        if (!outletLocation) {
            return res.status(404).json({ success: false, message: 'Outlet Location not found' });
        }

        const { email, phone } = user;
        const normalizedPhone = phone.startsWith('94') ? phone : `94${phone.replace(/^0/, '')}`;

        const tokenNumber = generateToken();
        const qrCodeUrl = `${process.env.BASE_URL || 'http://localhost:4000'}/api/qrcode/${tokenNumber}`;

        const qrCodeImage = await generateQrCode({ tokenNumber, gasType, quantity, userId });

        const gasRequest = new GasRequest({
            userId,
            requestId: `REQ-${Date.now()}`,
            tokenNumber,
            locationId,
            qrCodeUrl,
            gasType,
            quantity,
            pickupDate,
            expiration,
        });

        await gasRequest.save();

        const smsMessage = `
            Gas Request Confirmation:
            - Token: ${tokenNumber}
            - Gas Type: ${gasType}
            - Quantity: ${quantity}
            - Pickup Date: ${expectedPickupDate}
            - Expiration: ${expiration}%
            - QR Code: ${qrCodeUrl}
        `;
        await sendSms(normalizedPhone, smsMessage.trim(), 'GasByGas');


        const emailSubject = 'Gas Request Confirmation';
        const emailHtml = `
            <h1>Gas Request Confirmation</h1>
            <p>Your gas request has been submitted successfully.</p>
            <p><strong>Token:</strong> ${tokenNumber}</p>
            <p><strong>Gas Type:</strong> ${gasType}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Pickup Date:</strong> ${pickupDate}</p>
            <p><strong>Expiration:</strong> ${expiration}%</p>
            <p>QR Code:</p>
            <img src="${qrCodeImage}" alt="QR Code" style="width:150px;height:150px;" />
            <p>Thank you for using our service!</p>
        `;

        await sendEmail(email, emailSubject, smsMessage.trim(), emailHtml);

        return res.status(201).json({
            success: true,
            message: 'Gas request submitted successfully',
            tokenNumber,
            qrCodeUrl,
        });
    } catch (error) {
        console.error('Error submitting gas request:', error);
        return res.status(500).json({ success: false, message: 'Error submitting gas request' });
    }
};

export const handleCheckout = async (req, res) => {
    const { userId, items } = req.body;

    if (!userId || !items || items.length === 0 || items.some((item) => !item.locationId)) {
        return res.status(400).json({ success: false, message: 'Missing required fields or cart is empty.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const { email, phone } = user;
        const normalizedPhone = phone.startsWith('94') ? phone : `94${phone.replace(/^0/, '')}`;

        const requests = await Promise.all(
            items.map(async (item) => {
                const tokenNumber = generateToken();
                const qrCodeUrl = `${process.env.BASE_URL || 'http://localhost:4000'}/api/qrcode/${tokenNumber}`;

                const qrCodeImage = await generateQrCode({ tokenNumber, gasType: item.type, quantity: item.quantity, userId });

                const gasRequest = new GasRequest({
                    userId,
                    requestId: `REQ-${Date.now()}`,
                    tokenNumber,
                    qrCodeUrl,
                    gasType: item.type,
                    quantity: item.quantity,
                    locationId: item.locationId,
                    expectedPickupDate: item.expectedPickupDate,
                    expiration: item.expiration,
                });

                await gasRequest.save();

                return { tokenNumber, qrCodeUrl, qrCodeImage, gasType: item.type, quantity: item.quantity, expectedPickupDate: item.expectedPickupDate, expiration: item.expiration };
            })
        );

        const smsMessage = requests
            .map(
                (request) => `
                Gas Type: ${request.gasType}
                Quantity: ${request.quantity}
                Token: ${request.tokenNumber}
                Expected Pickup Date: ${request.expectedPickupDate}
                Expiration: ${request.expiration}%
                QR Code: ${request.qrCodeUrl}
            `
            )
            .join('\n\n');

        await sendSms(normalizedPhone, smsMessage.trim(), 'GasByGas');

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
                            <strong>Expected Pickup Date:</strong> ${request.expectedPickupDate}<br/>
                            <strong>Expiration:</strong> ${request.expiration}%<br/>
                            <img src="${request.qrCodeImage}" alt="QR Code" style="width:150px;height:150px;" />
                        </li>`
                    )
                    .join('')}
            </ul>
            <p>Thank you for using our service!</p>
        `;

        await sendEmail(email, emailSubject, smsMessage.trim(), emailHtml);

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
