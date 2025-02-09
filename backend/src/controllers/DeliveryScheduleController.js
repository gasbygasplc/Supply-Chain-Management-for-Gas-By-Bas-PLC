import mongoose from "mongoose";
import GasRequest from "../models/GasRequest.js";
import Outlet from "../models/OutletModule.js";
import DeliverySchedule from "../models/DeliveryScheduleModel.js";
import { sendEmail } from "../utils/emailService.js";
import { sendSms } from "../utils/smsService.js";
import { scheduleNotification, scheduleCancellation } from "../utils/notificationScheduler.js";

// ================================== Create Delivery Schedule ==================================

const getNextAvailablePickupTime = (startDate, count) => {
    let pickupTime = new Date(startDate);
    pickupTime.setHours(8, 0, 0, 0);
    pickupTime.setMinutes(pickupTime.getMinutes() + count * 10);

    while (pickupTime.getHours() >= 20) {
        pickupTime.setDate(pickupTime.getDate() + 1);
        pickupTime.setHours(8, 0, 0, 0);
    }    

    return pickupTime;
};

export const createDeliverySchedule = async (req, res) => {
    const { outletId, stockAllocation, deliveryDate } = req.body;

    if (!outletId || !stockAllocation?.length || !deliveryDate) {   
        return res.status(400).json({ success: false, message: "Missing required fields." });  
    }  
  
    try {  
        const outlet = await Outlet.findById(outletId);  
        if (!outlet) return res.status(404).json({ success: false, message: "Outlet not found." });      

        for (const allocation of stockAllocation) {
            const gasTypeInfo = outlet.gasTypes.find((type) => type.gasType === allocation.gasType);
            if (!gasTypeInfo) return res.status(400).json({ success: false, message: `Gas type '${allocation.gasType}' not found.` });

            if (gasTypeInfo.currentStock + allocation.quantity > gasTypeInfo.maxCapacity) {
                return res.status(400).json({ success: false, message: `Allocation exceeds max capacity for '${allocation.gasType}'.` });
            }
            gasTypeInfo.currentStock += allocation.quantity;
        }
        await outlet.save();

        const parsedDeliveryDate = new Date(deliveryDate);
        if (parsedDeliveryDate <= new Date()) {
            return res.status(400).json({ success: false, message: "Delivery date must be in the future." });
        }

        const newDeliverySchedule = new DeliverySchedule({
            outletId,
            stockAllocation,
            deliveryDate: parsedDeliveryDate,
            totalStockAllocated: stockAllocation.reduce((sum, item) => sum + item.quantity, 0),
            status: "Scheduled",
        });
        await newDeliverySchedule.save();

        await updateGasRequestsOnSchedule(outletId, parsedDeliveryDate, "Scheduled");

        res.status(200).json({ success: true, message: "Stock allocated and delivery scheduled successfully." });
    } catch (err) {
        console.error("Error allocating stock:", err);
        res.status(500).json({ success: false, message: "Server error while allocating stock." });
    }
};

const updateGasRequestsOnSchedule = async (outletId, deliveryDate, status) => {
    const gasRequests = await GasRequest.find({ 
        outletId, 
        status: { $in: ["Pending", "Approved", "Rescheduled"] } 
    }).populate("userId");

    if (!gasRequests.length) return;

    let count = 0;
    let processedRequests = new Set();

    for (const request of gasRequests) {
        if (processedRequests.has(request._id.toString())) continue;
        processedRequests.add(request._id.toString());

        if (request.status === status) continue;

        request.status = status === "Cancelled" ? "Pending" : "Approved";
        request.expectedPickupDate = getNextAvailablePickupTime(deliveryDate, count++);
        await request.save();

        if (request.userId?.email && request.userId?.phone) {
            const message = `Your gas request is now ${request.status}. Pickup at ${request.expectedPickupDate.toLocaleString()}`;

            if (!request.notificationSent) {
                await sendSms(request.userId.phone, message, "GasByGas");
                await sendEmail(request.userId.email, "Gas Request Update", message, `<h1>${message}</h1>`);
                
                scheduleNotification(request.userId.phone, request.userId.email, request.expectedPickupDate, "Reminder");
                scheduleCancellation(request._id, request.expectedPickupDate);
                
                request.notificationSent = true;
                await request.save();
            }
        }
    }
};


export const updateDeliveryStatus = async (req, res) => {
    const { scheduleId } = req.params;
    const { status, newDeliveryDate } = req.body;

    const validStatuses = ["Scheduled", "Dispatched", "Rescheduled", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    try {
        const updateData = { status };
        if (status === "Rescheduled" && newDeliveryDate) {
            updateData.deliveryDate = new Date(newDeliveryDate);
        }

        const schedule = await DeliverySchedule.findByIdAndUpdate(scheduleId, updateData, { new: true });
        if (!schedule) return res.status(404).json({ success: false, message: "Delivery schedule not found." });

        await updateGasRequestsOnSchedule(schedule.outletId, schedule.deliveryDate, status);

        res.status(200).json({ success: true, message: "Status updated successfully.", schedule });
    } catch (err) {
        console.error("Error updating delivery status:", err);
        res.status(500).json({ success: false, message: "Failed to update delivery status." });
    }
};


// ====================================== Search Outlets =======================================

export const searchOutlets = async (req, res) => {
    const { searchQuery } = req.query;

    if (!searchQuery || searchQuery.trim() === '') {
        return res.status(400).json({ success: false, message: 'Search query is required.' });
    }

    try {
        const outlets = await Outlet.find({
            $or: [
                { outletName: { $regex: searchQuery, $options: 'i' } },
                { city: { $regex: searchQuery, $options: 'i' } },
                { district: { $regex: searchQuery, $options: 'i' } }
            ]
        }).select('_id outletName city district gasTypes');

        if (!outlets.length) {
            return res.status(404).json({ success: false, message: 'No outlets found.' });
        }

        res.status(200).json({ success: true, outlets });
    } catch (error) {
        console.error('Error searching outlets:', error);
        res.status(500).json({ success: false, message: 'Server error while searching outlets.' });
    }
};


export const getGasRequestsForOutlet = async (req, res) => {
    const { outletId } = req.params;

    try {
        const gasRequests = await GasRequest.aggregate([
            {
                $match: {
                    outletId: new mongoose.Types.ObjectId(outletId),
                    status: { $in: ["Pending", "Approved", "Rescheduled"] },
                },
            },
            { $unwind: "$items" },
            {
                $group: {
                    _id: "$items.gasType",
                    totalQuantity: { $sum: "$items.quantity" },
                },
            },
            {
                $project: {
                    _id: 0,
                    gasType: "$_id",
                    totalQuantity: 1,
                },
            },
        ]);

        res.status(200).json({ success: true, gasRequests });
    } catch (err) {
        console.error("Error fetching gas requests:", err);
        res.status(500).json({ success: false, message: "Failed to fetch gas requests." });
    }
};

export const getDeliverySchedules = async (req, res) => {
    try {
        const schedules = await DeliverySchedule.find()
            .populate('outletId', 'outletName city district')
            .lean();

        const result = schedules.map((schedule) => ({
            ...schedule,
            outletName: schedule.outletId.outletName,
            city: schedule.outletId.city,
            district: schedule.outletId.district,
        }));

        res.status(200).json({ success: true, deliverySchedules: result });
    } catch (err) {
        console.error('Error fetching delivery schedules:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch delivery schedules.' });
    }
};

export const updateGasRequestsOnDeliveryStatusChange = async (req, res) => {
    try {
        const { outletId, deliveryDate, status } = req.body;

        if (!outletId || !deliveryDate || !status) {
            return res.status(400).json({ success: false, message: "Missing outletId, deliveryDate, or status." });
        }

        const gasRequests = await GasRequest.find({
            outletId,
            status: { $in: ["Pending", "Approved", "Rescheduled"] },
        })
        .populate("userId", "email phone name")
        .sort({ requestedDate: 1 });

        if (!gasRequests.length) {
            return res.status(200).json({ success: false, message: "No gas requests to update." });
        }

        let currentPickupTime = new Date(deliveryDate);
        
        if (currentPickupTime.getHours() < 8) {
            currentPickupTime.setHours(8, 0, 0, 0);
        } else if (currentPickupTime.getHours() >= 20) {
            currentPickupTime.setDate(currentPickupTime.getDate() + 1);
            currentPickupTime.setHours(8, 0, 0, 0);
        }

        let processedRequests = new Set();

        for (const request of gasRequests) {
            if (processedRequests.has(request._id.toString())) continue;
            processedRequests.add(request._id.toString());

            if (request.status === status) continue;

            let newStatus = request.status;
            let notifyNow = false;

            if (status === "Scheduled" || status === "Rescheduled") {
                newStatus = "Approved"; 
                request.expectedPickupDate = new Date(currentPickupTime);
                notifyNow = true;
            } else if (status === "Delivered") {
                newStatus = "Collected"; 
                request.expectedPickupDate = new Date(currentPickupTime);
                notifyNow = true;
            } else if (status === "Cancelled") {
                newStatus = "Pending"; 
                request.expectedPickupDate = null;
                notifyNow = true;
            }

            currentPickupTime.setMinutes(currentPickupTime.getMinutes() + 10);

            if (currentPickupTime.getHours() >= 20) {
                currentPickupTime.setDate(currentPickupTime.getDate() + 1);
                currentPickupTime.setHours(8, 0, 0, 0);
            }

            request.status = newStatus;
            await request.save();

            if (notifyNow && request.userId?.email && request.userId?.phone && !request.notificationSent) {
                let message = `Your gas request is now ${newStatus}.`;
                if (request.expectedPickupDate) {
                    message += ` Pickup scheduled at ${request.expectedPickupDate.toLocaleString()}`;
                }

                await sendSms(request.userId.phone, message, "GasByGas");
                await sendEmail(request.userId.email, "Gas Request Update", message, `<h1>${message}</h1>`);

                if (request.expectedPickupDate && request.expectedPickupDate > new Date()) {
                    scheduleNotification(request.userId.phone, request.userId.email, request.expectedPickupDate, "Reminder");
                }

                if (request.expectedPickupDate && request.expectedPickupDate > new Date()) {
                    scheduleCancellation(request._id, request.expectedPickupDate);
                }

                request.notificationSent = true;
                await request.save();
            }
        }

        return res.status(200).json({ success: true, message: "Gas requests updated & users notified." });
    } catch (error) {
        console.error("Error updating gas requests:", error);
        return res.status(500).json({ success: false, message: "Error updating gas requests." });
    }
};