import { sendSms } from './smsService.js';
import { sendEmail } from './emailService.js';
import GasRequest from '../models/GasRequest.js';

export const scheduleNotification = async (phone, email, pickupDate, type) => {
    if (!pickupDate) return console.warn("Cannot schedule notification: pickupDate is missing.");

    const reminderTime = new Date(pickupDate);
    reminderTime.setHours(pickupDate.getHours() - 48);

    if (reminderTime < new Date()) return console.warn("Cannot schedule notification in the past.");

    setTimeout(async () => {
        let message = type === "Reminder"
            ? `Reminder: Your gas pickup is scheduled for ${pickupDate.toLocaleString()}.`
            : `Your gas stock has been delivered. Collect it by ${pickupDate.toLocaleString()}.`;

        if (phone) await sendSms(phone, message, "GasByGas");
        if (email) await sendEmail(email, "Gas Pickup Reminder", message, `<h1>${message}</h1>`);
    }, reminderTime.getTime() - Date.now());
};

export const scheduleCancellation = async (requestId, pickupDate) => {
    if (!pickupDate) return console.warn(`Cannot schedule cancellation: Missing pickup date for request ${requestId}.`);

    const cancelTime = new Date(pickupDate);
    cancelTime.setHours(pickupDate.getHours() + 48);

    if (cancelTime < new Date()) return console.warn(`Cannot schedule cancellation for request ${requestId} in the past.`);

    setTimeout(async () => {
        const request = await GasRequest.findById(requestId);
        if (!request || request.status === "Collected") return;

        request.status = "Cancelled";
        request.expectedPickupDate = null;
        await request.save();

        const message = `Your gas request has been cancelled as it was not collected within 48 hours.`;
        if (request.userId?.phone) await sendSms(request.userId.phone, message, "GasByGas");
        if (request.userId?.email) await sendEmail(request.userId.email, "Gas Request Cancelled", message, `<h1>${message}</h1>`);
    }, cancelTime.getTime() - Date.now());
};
