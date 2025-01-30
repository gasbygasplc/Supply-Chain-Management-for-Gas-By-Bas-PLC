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
                    totalPrice,
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
                    - Total: ${totalPrice}
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
                    <p><strong>Total:</strong> ${totalPrice}</p>
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

        const gasRequest = await GasRequest.findOne({ requestId }).populate("userId", "name email phone");

        if (!gasRequest) {
            return res.status(404).json({ success: false, message: "Gas request not found." });
        }

        let hasStatusChanged = false;
        let hasPriorityChanged = false;

        if (status && validStatuses.includes(status)) {
            if (gasRequest.status !== status) {
                gasRequest.status = status;
                hasStatusChanged = true;
            }
        }

        if (priorityLevel && validPriorityLevels.includes(priorityLevel)) {
            if (gasRequest.priorityLevel !== priorityLevel) {
                gasRequest.priorityLevel = priorityLevel;
                hasPriorityChanged = true;
            }
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

        if (gasRequest.paymentReceived === "Yes" && gasRequest.cylinderReceived === "Yes") {
            gasRequest.priorityLevel = "Priority";
            hasPriorityChanged = true;
        }

        await gasRequest.save();

        const { name, email, phone } = gasRequest.userId;
        const normalizedPhone = phone.startsWith('94') ? phone : `94${phone.replace(/^0/, '')}`;
        const tokenNumber = gasRequest.tokenNumber;
        const gasType = gasRequest.gasType;
        const quantity = gasRequest.quantity;
        const updatedStatus = gasRequest.status;
        const updatedPriority = gasRequest.priorityLevel;

        let smsMessage = `Gas Request Update:\n- Token: ${tokenNumber}\n- Status: ${updatedStatus}\n- Priority: ${updatedPriority}\n- Gas Type: ${gasType}\n- Quantity: ${quantity}`;

        let emailSubject = "Gas Request Status Update";
        let emailHtml = `
            <h1>Gas Request Update</h1>
            <p>Hello ${name},</p>
            <p>Your gas request status has been updated.</p>
            <p><strong>Token:</strong> ${tokenNumber}</p>
            <p><strong>Status:</strong> ${updatedStatus}</p>
            <p><strong>Priority Level:</strong> ${updatedPriority}</p>
            <p><strong>Gas Type:</strong> ${gasType}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p>Thank you for using our service!</p>
        `;

        if (hasStatusChanged || hasPriorityChanged) {
            await sendSms(normalizedPhone, smsMessage.trim(), "GasByGas");
            await sendEmail(email, emailSubject, smsMessage.trim(), emailHtml);
        }

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
    try {
        console.log("Received Checkout Payload:", req.body);

        const { userId, outletId, items, totalPrice, expectedPickupDate } = req.body;

        if (!userId || !outletId || !items || items.length === 0) {
            console.error("Error: Missing required fields in request.");
            return res.status(400).json({ success: false, message: "Missing required fields or cart is empty." });
        }

        if (isNaN(totalPrice) || totalPrice <= 0) {
            console.error("Error: Invalid Total Price.");
            return res.status(400).json({ success: false, message: "Invalid total price." });
        }

        const user = await User.findById(userId);
        if (!user) {
            console.error("Error: User not found.");
            return res.status(404).json({ success: false, message: "User not found." });
        }

        const outlet = await Outlet.findById(outletId);
        if (!outlet) {
            console.error("Error: Outlet not found.");
            return res.status(404).json({ success: false, message: "Outlet not found." });
        }

        const tokenNumber = generateToken();

        const qrCodeUrl = `${process.env.BASE_URL || "http://localhost:4000"}/api/qrcode/${tokenNumber}`;
        const qrCodeImage = await generateQrCode({ tokenNumber, items, userId });

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 14);

        const formattedItems = items.map((item) => ({
            gasType: item.gasType,
            quantity: Number(item.quantity),
            price: Number(item.price),
            totalPrice: Number(item.totalPrice),
        }));

        const gasRequest = new GasRequest({
            userId,
            requestId: `REQ-${Date.now()}`,
            tokenNumber,
            outletId,
            qrCodeUrl,
            items: formattedItems,
            expectedPickupDate: expectedPickupDate || null,
            expiration: expirationDate,
            totalPrice: Number(totalPrice || 0),
            priorityLevel: "Standard",
        });

        await gasRequest.save();
        console.log("Gas Request Saved:", gasRequest);

        const itemsDetails = formattedItems
            .map(
                (item) => `- ${item.gasType} Gas x${item.quantity} → LKR ${item.totalPrice.toFixed(2)}`
            )
            .join("\n");

        const smsMessage = `
        Gas Order:
        Token: ${tokenNumber}
        Outlet: ${outlet.outletName}, ${outlet.address || "N/A"}
        Pickup: ${expectedPickupDate || "Not Specified"}
        Exp: ${expirationDate.toDateString()}
        Items: ${formattedItems.map((item) => `${item.gasType} x${item.quantity} - LKR ${item.totalPrice.toFixed(0)}`).join(", ")}
        Total: LKR ${Number(totalPrice || 0).toFixed(0)}
        QR: ${qrCodeUrl}
        `;
        await sendSms(user.phone, smsMessage.trim(), "GasByGas");
        

        const emailSubject = "Gas Order Confirmation";
        const emailHtml = `
            <h1>Gas Order Confirmation</h1>
            <p>Your gas order has been successfully placed.</p>
            <p><strong>Token:</strong> ${tokenNumber}</p>
            <p><strong>Outlet:</strong> ${outlet.outletName}, ${outlet.address}, Phone: ${outlet.phone}</p>
            <p><strong>Pickup Date:</strong> ${expectedPickupDate || "Not Specified"}</p>
            <p><strong>Expiration:</strong> ${expirationDate.toDateString()}</p>
            <h2>Items Ordered:</h2>
            <ul>
                ${formattedItems
                    .map(
                        (item) => `
                        <li>
                            <strong>Type:</strong> ${item.gasType} Gas<br/>
                            <strong>Quantity:</strong> ${item.quantity}<br/>
                            <strong>Price:</strong> LKR ${item.totalPrice.toFixed(2)}
                        </li>
                    `
                    )
                    .join("")}
            </ul>
            <p><strong>Total:</strong> LKR ${Number(totalPrice || 0).toFixed(2)}</p>
            <p>QR Code:</p>
            <img src="${qrCodeImage}" alt="QR Code" style="width:150px;height:150px;" />
            <p>Thank you for using our service!</p>
        `;
        await sendEmail(user.email, emailSubject, smsMessage.trim(), emailHtml);

        res.status(201).json({
            success: true,
            message: "Checkout successful!",
            gasRequest,
        });
    } catch (error) {
        console.error("Error during checkout:", error);
        res.status(500).json({ success: false, message: "Error during checkout." });
    }
};
