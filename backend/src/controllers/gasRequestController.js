import GasRequest from '../models/GasRequest.js';
import User from '../models/User.js';
import { generateToken } from '../utils/tokenService.js';
import { sendSms } from '../utils/smsService.js';
import { generateQrCode } from '../utils/qrCodeService.js';
import { sendEmail } from '../utils/emailService.js';
import Outlet from '../models/OutletModule.js';
import deliverySchedule from '../models/DeliveryScheduleModel.js';
import moment from 'moment-timezone';

const getNextAvailablePickupTime = async (outletId) => {
    try {
        const latestOrder = await GasRequest.findOne({ outletId })
            .sort({ expectedPickupDate: -1 })
            .select("expectedPickupDate");     

        const openingTime = moment().set({ hour: 8, minute: 0, second: 0 });
        const closingTime = moment().set({ hour: 20, minute: 0, second: 0 });

        let nextPickupTime = openingTime;

        if (latestOrder && latestOrder.expectedPickupDate) {
            const lastPickup = moment(latestOrder.expectedPickupDate);

            nextPickupTime = lastPickup.add(10, "minutes");

            if (nextPickupTime.isAfter(closingTime)) {
                nextPickupTime = openingTime.add(1, "day");
            }
        }

        return nextPickupTime.toDate();
    } catch (error) {
        console.error("Error finding next pickup time:", error);
        return null;
    }
};


export const submitGasRequest = async (req, res) => {
    const orders = req.body;

    if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or empty order data' });
    }

    try {
        const savedRequests = await Promise.all(
            orders.map(async (order) => {
                const { userId, gasType, quantity, outletId, priorityLevel } = order;

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
                const qrCodeUrl = `${process.env.BASE_URL || 'http://35.196.212.150:4000'}/api/qrcode/${tokenNumber}`;
                const qrCodeImage = await generateQrCode({ tokenNumber, gasType, quantity, userId });

                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 14);

                const gasStock = outlet.gasTypes.find((g) => g.gasType === gasType);
                if (!gasStock || gasStock.currentStock < quantity) {
                    throw new Error(`Insufficient stock for ${gasType} at ${outlet.outletName}`);
                }

                gasStock.currentStock -= quantity;
                await outlet.save();

                let expectedPickupDate;
                try {
                    expectedPickupDate = await getNextAvailablePickupTime(outletId);
                } catch (error) {
                    console.error("Error finding next available pickup time:", error);
                    expectedPickupDate = new Date();
                }

                const gasPrice = gasStock.price || 0;
                const totalPrice = gasPrice * quantity;

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
                    status: "Approved",
                });

                await gasRequest.save();

                const smsMessage = `Gas Request Approved!\n- Token: ${tokenNumber}\n- Gas: ${gasType} x${quantity}\n- Outlet: ${outlet.outletName}, ${outlet.address}\n- Pickup: ${expectedPickupDate.toLocaleString()}\n- Exp: ${expirationDate.toDateString()}\n- Total: LKR ${totalPrice.toFixed(2)}\n- QR: ${qrCodeUrl}`;
                await sendSms(normalizedPhone, smsMessage.trim(), "GasByGas");

                const emailSubject = "Gas Request Approved!";
                const emailHtml = `
                    <h1>Gas Request Approved</h1>
                    <p>Your gas request has been successfully processed.</p>
                    <p><strong>Token:</strong> ${tokenNumber}</p>
                    <p><strong>Gas Type:</strong> ${gasType}</p>
                    <p><strong>Quantity:</strong> ${quantity}</p>
                    <p><strong>Outlet:</strong> ${outlet.outletName}, ${outlet.address}, Phone: ${outlet.phone}</p>
                    <p><strong>Pickup Date:</strong> ${expectedPickupDate.toLocaleString()}</p>
                    <p><strong>Expiration:</strong> ${expirationDate.toDateString()}</p>
                    <p><strong>Total Price:</strong> LKR ${totalPrice.toFixed(2)}</p>
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
            message: "Gas requests approved successfully!",
            requests: savedRequests,
        });
    } catch (error) {
        console.error("Error submitting gas request:", error.message || error);
        res.status(500).json({ success: false, message: "Error submitting gas request" });
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

        const { userId, outletId, items, totalPrice } = req.body;

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

        const expectedPickupDate = await getNextAvailablePickupTime(outletId);

        items.forEach(item => {
            const gasStock = outlet.gasTypes.find((g) => g.gasType === item.gasType);
            if (gasStock && gasStock.currentStock >= item.quantity) {
                gasStock.currentStock -= item.quantity;
            } else {
                throw new Error(`Insufficient stock for ${item.gasType} at ${outlet.outletName}`);
            }
        });
        await outlet.save();

        const qrCodeUrl = `${process.env.BASE_URL || "http://35.196.212.150:4000"}/api/qrcode/${tokenNumber}`;
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
            expectedPickupDate,
            expiration: expirationDate,
            totalPrice: Number(totalPrice || 0),
            priorityLevel: "Standard",
            status: "Approved",
        });

        await gasRequest.save();
        console.log("Gas Request Saved:", gasRequest);

        const itemsDetails = formattedItems
            .map(
                (item) => `- ${item.gasType} Gas x${item.quantity} → LKR ${item.totalPrice.toFixed(2)}`
            )
            .join("\n");

        const smsMessage = `
        Gas Order Approved!
        Token: ${tokenNumber}
        Outlet: ${outlet.outletName}, ${outlet.address || "N/A"}
        Pickup: ${moment(expectedPickupDate).format("YYYY-MM-DD HH:mm")}
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
            <p><strong>Pickup Date:</strong> ${moment(expectedPickupDate).format("YYYY-MM-DD HH:mm")}</p>
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


export const sendReminder = async (req, res) => {
    try {
        const { requestId } = req.body;

        if (!requestId) {
            return res.status(400).json({ success: false, message: "Request ID is required." });
        }

        const gasRequest = await GasRequest.findById(requestId).populate("userId", "email phone name");

        if (!gasRequest) {
            return res.status(404).json({ success: false, message: "Gas request not found." });
        }

        if (gasRequest.reminderSent === "Sent") {
            return res.status(400).json({ success: false, message: "Reminder already sent." });
        }

        const { name, email, phone } = gasRequest.userId;
        const tokenNumber = gasRequest.tokenNumber;
        const gasDetails = gasRequest.items
            .map((item) => `${item.gasType} x${item.quantity} → LKR ${item.totalPrice.toFixed(2)}`)
            .join(", ");

        const smsMessage = `
            Reminder: Gas Order Pending!
            - Token: ${tokenNumber}
            - Gas: ${gasDetails}
            - Status: ${gasRequest.status}
            - Payment: ${gasRequest.paymentReceived}
            - Cylinder Received: ${gasRequest.cylinderReceived}
            - Please take necessary action.
        `;
        await sendSms(phone, smsMessage.trim(), "GasByGas");

        const emailSubject = "Reminder: Pending Gas Order";
        const emailHtml = `
            <h1>Reminder: Pending Gas Order</h1>
            <p>Hello ${name},</p>
            <p>This is a reminder regarding your gas request.</p>
            <p><strong>Token:</strong> ${tokenNumber}</p>
            <p><strong>Gas:</strong> ${gasDetails}</p>
            <p><strong>Status:</strong> ${gasRequest.status}</p>
            <p><strong>Payment:</strong> ${gasRequest.paymentReceived}</p>
            <p><strong>Cylinder Received:</strong> ${gasRequest.cylinderReceived}</p>
            <p>Please take necessary action as soon as possible.</p>
            <p>Thank you!</p>
        `;
        await sendEmail(email, emailSubject, smsMessage.trim(), emailHtml);

        gasRequest.reminderSent = "Sent";
        await gasRequest.save();

        return res.status(200).json({ success: true, message: "Reminder sent successfully!" });
    } catch (error) {
        console.error("Error sending reminder:", error);
        return res.status(500).json({ success: false, message: "Error sending reminder." });
    }
};




