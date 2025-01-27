import mongoose from 'mongoose';
import GasRequest from "../models/GasRequest.js";
import Outlet from "../models/OutletModule.js";

// ================================== Create Delivery Schedule ==================================
import DeliverySchedule from '../models/DeliveryScheduleModel.js';

export const createDeliverySchedule = async (req, res) => {
    const { outletId, stockAllocation, deliveryDate } = req.body;

    if (!outletId || !stockAllocation || !stockAllocation.length || !deliveryDate) {
        return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    try {
        console.log("Received Payload:", { outletId, stockAllocation, deliveryDate });

        const outlet = await Outlet.findById(outletId);
        if (!outlet) {
            return res.status(404).json({ success: false, message: 'Outlet not found.' });
        }

        for (const allocation of stockAllocation) {
            const gasTypeInfo = outlet.gasTypes.find((type) => type.gasType === allocation.gasType);

            if (!gasTypeInfo) {
                return res.status(400).json({
                    success: false,
                    message: `Gas type '${allocation.gasType}' not found for the outlet.`,
                });
            }

            if (gasTypeInfo.currentStock + allocation.quantity > gasTypeInfo.maxCapacity) {
                return res.status(400).json({
                    success: false,
                    message: `Allocation exceeds max capacity for gas type '${allocation.gasType}'.`,
                });
            }

            gasTypeInfo.currentStock += allocation.quantity;
        }

        await outlet.save();

        const parsedDeliveryDate = new Date(deliveryDate);
        if (isNaN(parsedDeliveryDate.getTime())) {
            return res.status(400).json({ success: false, message: 'Invalid delivery date.' });
        }

        if (parsedDeliveryDate <= new Date()) {
            return res.status(400).json({ success: false, message: 'Delivery date must be in the future.' });
        }

        const newDeliverySchedule = new DeliverySchedule({
            outletId: outletId,
            stockAllocation,
            deliveryDate: parsedDeliveryDate,
            totalStockAllocated: stockAllocation.reduce((sum, item) => sum + item.quantity, 0),
            status: 'Scheduled',
        });

        await newDeliverySchedule.save();

        res.status(200).json({ success: true, message: 'Stock allocated and delivery scheduled successfully.' });
    } catch (err) {
        console.error('Error allocating stock:', err);
        res.status(500).json({ success: false, message: 'Server error while allocating stock.' });
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
                    status: { $in: ['Pending', 'Approved', 'Rescheduled'] },
                },
            },
            {
                $group: {
                    _id: '$gasType',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
        ]);

        res.status(200).json({ success: true, gasRequests });
    } catch (err) {
        console.error('Error fetching gas requests:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch gas requests.' });
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

export const updateDeliveryStatus = async (req, res) => {
    const { scheduleId } = req.params;
    const { status } = req.body;

    const validStatuses = ['Scheduled', 'Dispatched', 'Rescheduled', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    try {
        const schedule = await DeliverySchedule.findByIdAndUpdate(
            scheduleId,
            { status },
            { new: true }
        );

        if (!schedule) {
            return res.status(404).json({ success: false, message: 'Delivery schedule not found.' });
        }

        res.status(200).json({ success: true, message: 'Status updated successfully.', schedule });
    } catch (err) {
        console.error('Error updating delivery status:', err);
        res.status(500).json({ success: false, message: 'Failed to update delivery status.' });
    }
};


