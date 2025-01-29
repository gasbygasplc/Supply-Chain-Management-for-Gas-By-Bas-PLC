import GasRequest from '../models/GasRequest.js';
import User from '../models/User.js';
import { generateToken } from '../utils/tokenService.js';
import { sendSms } from '../utils/smsService.js';
import { generateQrCode } from '../utils/qrCodeService.js';
import { sendEmail } from '../utils/emailService.js';
import Outlet from '../models/OutletModule.js';
import deliverySchedule from '../models/DeliveryScheduleModel.js';

export const submitGasRequest = async (req, res) => {
    const orders = req.body;

    if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or empty order data' });
    }

    try {
        const savedRequests = await Promise.all(
            orders.map(async (order) => {
                const { userId, gasType, quantity, outletId, expectedPickupDate, priorityLevel } = order;

                if (!userId || !gasType || !quantity || !outletId || !priorityLevel) {
                    throw new Error('Missing required fields');
                }

                const user = await User.findById(userId);
                if (!user) throw new Error('User not found');

                const outlet = await Outlet.findById(outletId);
                if (!outlet) throw new Error('Outlet not found');

                const { email, phone } = user;
                const normalizedPhone = phone.startsWith('94') ? phone : `94${phone.replace(/^0/, '')}`;
                const tokenNumber = generateToken();
                const qrCodeUrl = `${process.env.BASE_URL || 'http://localhost:4000'}/api/qrcode/${tokenNumber}`;
                const qrCodeImage = await generateQrCode({ tokenNumber, gasType, quantity, userId });

                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 14);

                const gasRequest = new GasRequest({
                    userId,
                    requestId: `REQ-${Date.now()}`,
                    tokenNumber,
                    outletId,
                    qrCodeUrl,
                    gasType,
                    quantity,
                    expectedPickupDate,
                    expiration: expirationDate,
                    priorityLevel,
                });

                await gasRequest.save();

                const smsMessage = `
                    Gas Request Confirmation:
                    - Token: ${tokenNumber}
                    - Gas Type: ${gasType}
                    - Quantity: ${quantity}
                    - Outlet: ${outlet.outletName}, ${outlet.address}, Phone: ${outlet.phone}
                    - Pickup Date: ${expectedPickupDate}
                    - Expiration: ${expirationDate.toDateString()}
                    - Priority: ${priorityLevel}
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
                    <p><strong>Outlet:</strong> ${outlet.outletName}, ${outlet.address}, Phone: ${outlet.phone}</p>
                    <p><strong>Pickup Date:</strong> ${expectedPickupDate}</p>
                    <p><strong>Expiration:</strong> ${expirationDate.toDateString()}</p>
                    <p><strong>Priority:</strong> ${priorityLevel}</p>
                    <p>QR Code:</p>
                    <img src="${qrCodeImage}" alt="QR Code" style="width:150px;height:150px;" />
                    <p>Thank you for using our service!</p>
                `;
                await sendEmail(email, emailSubject, smsMessage.trim(), emailHtml);

                return gasRequest;
            })
        );

        res.status(201).json({
            success: true,
            message: 'Gas requests submitted successfully',
            requests: savedRequests,
        });
    } catch (error) {
        console.error('Error submitting gas request:', error.message || error);
        res.status(500).json({ success: false, message: 'Error submitting gas request' });
    }
};

export const cancelGasOrder = async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ success: false, message: "Order ID is required." });
    }

    try {
        const order = await GasRequest.findById(orderId);

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found." });
        }

        if (order.status !== "Pending") {
            return res.status(400).json({ success: false, message: "Only pending orders can be cancelled." });
        }

        order.status = "Cancelled";
        await order.save();

        res.status(200).json({ success: true, message: "Order cancelled successfully." });
    } catch (error) {
        console.error("Error cancelling order:", error.message || error);
        res.status(500).json({ success: false, message: "Failed to cancel order." });
    }
};

export const updateGasRequestStatus = async (req, res) => {
    const { requestId, status, priorityLevel, paymentReceived, cylinderReceived, collectionOverdue } = req.body;

    if (!requestId) {
        return res.status(400).json({ success: false, message: "Request ID is required." });
    }

    try {
        const validStatuses = ["Pending", "Approved", "Collected", "Rescheduled", "Cancelled"];
        const validPriorityLevels = ["Standard", "Priority"];
        const validYesNo = ["Yes", "No"];

        const gasRequest = await GasRequest.findOne({ requestId });

        if (!gasRequest) {
            return res.status(404).json({ success: false, message: "Gas request not found." });
        }

        if (status && validStatuses.includes(status)) {
            gasRequest.status = status;
        }

        if (priorityLevel && validPriorityLevels.includes(priorityLevel)) {
            gasRequest.priorityLevel = priorityLevel;
        }

        if (paymentReceived && validYesNo.includes(paymentReceived)) {
            gasRequest.paymentReceived = paymentReceived;
        }

        if (cylinderReceived && validYesNo.includes(cylinderReceived)) {
            gasRequest.cylinderReceived = cylinderReceived;
        }

        if (collectionOverdue && validYesNo.includes(collectionOverdue)) {
            gasRequest.collectionOverdue = collectionOverdue;
        }

        await gasRequest.save();

        res.status(200).json({
            success: true,
            message: "Gas request updated successfully.",
            gasRequest,
        });
    } catch (error) {
        console.error("Error updating gas request status:", error);
        res.status(500).json({ success: false, message: "Error updating status." });
    }
};


export const getPendingOrders = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
    }

    try {
        const orders = await GasRequest.find({
            userId,
            status: { $in: ["Pending", "Approved"] },
        });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching pending orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch pending orders." });
    }
};

export const getGasOrders = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
    }

    try {
        const orders = await GasRequest.find({ userId })
            .populate("outletId")
            .populate("userId", "name nic email phone");

        if (!orders || orders.length === 0) {
            return res.status(404).json({ success: false, message: "No gas orders found." });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching gas orders:", error);
        res.status(500).json({ success: false, message: "Error fetching gas orders." });
    }
};

export const handleCheckout = async (req, res) => {
    const { userId, items } = req.body;

    console.log("Received Checkout Payload:", req.body);

    if (!userId || !items || items.length === 0 || items.some((item) => !item.outletId)) {
        return res.status(400).json({ success: false, message: 'Missing required fields or cart is empty.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const existingRequests = await GasRequest.find({
            userId,
            status: { $in: ["Pending", "Approved"] },
        });

        const totalGases = existingRequests.reduce((count, request) => count + request.quantity, 0);
        const maxGasesAllowed = user.role === "Organization" ? 10 : 2;

        if (totalGases + items.reduce((count, item) => count + item.quantity, 0) > maxGasesAllowed) {
            return res.status(400).json({
                success: false,
                message: `You cannot have more than ${maxGasesAllowed} gases in pending or active requests.`,
            });
        }

        const requests = await Promise.all(
            items.map(async (item) => {
                const outlet = await Outlet.findById(item.outletId);
                if (!outlet) throw new Error(`Outlet not found for ID: ${item.outletId}`);

                const priorityLevel = item.priorityLevel || "Standard";

                const tokenNumber = generateToken();
                const qrCodeUrl = `${process.env.BASE_URL || 'http://localhost:4000'}/api/qrcode/${tokenNumber}`;
                const qrCodeImage = await generateQrCode({
                    tokenNumber,
                    gasType: item.type,
                    quantity: item.quantity,
                    userId,
                });

                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 14);

                const gasRequest = new GasRequest({
                    userId,
                    requestId: `REQ-${Date.now()}`,
                    tokenNumber,
                    outletId: item.outletId,
                    qrCodeUrl,
                    gasType: item.type,
                    quantity: item.quantity,
                    expectedPickupDate: item.expectedPickupDate,
                    expiration: expirationDate,
                    priorityLevel,
                });

                await gasRequest.save();

                return {
                    tokenNumber,
                    qrCodeUrl,
                    qrCodeImage,
                    gasType: item.type,
                    quantity: item.quantity,
                    expectedPickupDate: item.expectedPickupDate,
                    outletName: outlet.outletName,
                    outletAddress: outlet.address,
                    outletPhone: outlet.phone,
                    expiration: expirationDate,
                    priorityLevel,
                };
            })
        );

        const smsMessage = requests
            .map(
                (request) => `
                Gas Type: ${request.gasType}
                Quantity: ${request.quantity}
                Outlet: ${request.outletName}, ${request.outletAddress}, Phone: ${request.outletPhone}
                Token: ${request.tokenNumber}
                Expected Pickup Date: ${request.expectedPickupDate}
                Expiration: ${request.expiration.toDateString()}
                Priority: ${request.priorityLevel}
                QR Code: ${request.qrCodeUrl}
            `
            )
            .join('\n\n');

        await sendSms(user.phone, smsMessage.trim(), 'GasByGas');

        const emailSubject = 'Gas Order Confirmation';
        const emailHtml = `
            <h1>Gas Order Confirmation</h1>
            <p>Your gas order has been successfully placed.</p>
            <ul>
                ${requests
                    .map(
                        (request) => `
                        <li>
                            <strong>Gas Type:</strong> ${request.gasType}<br/>
                            <strong>Quantity:</strong> ${request.quantity}<br/>
                            <strong>Outlet:</strong> ${request.outletName}, ${request.outletAddress}, Phone: ${request.outletPhone}<br/>
                            <strong>Token:</strong> ${request.tokenNumber}<br/>
                            <strong>Expected Pickup Date:</strong> ${request.expectedPickupDate}<br/>
                            <strong>Expiration:</strong> ${request.expiration.toDateString()}<br/>
                            <strong>Priority:</strong> ${request.priorityLevel}</p>
                            <img src="${request.qrCodeImage}" alt="QR Code" style="width:150px;height:150px;" />
                        </li>`
                    )
                    .join('')}
            </ul>
            <p>Thank you for using our service!</p>
        `;

        await sendEmail(user.email, emailSubject, smsMessage.trim(), emailHtml);

        res.status(201).json({
            success: true,
            message: 'Checkout successful!',
            requests,
        });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ success: false, message: 'Error during checkout.' });
    }
};
