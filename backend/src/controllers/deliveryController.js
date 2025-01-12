import Delivery from '../models/Delivery.js';
import GasRequest from '../models/GasRequest.js';
import { sendEmail } from '../utils/emailService.js';
import { sendSms } from '../utils/smsService.js';

// Schedule a Delivery

export const scheduleDelivery = async (req, res) => {
  const { requestId, driverName, vehicleNumber, scheduledDate } = req.body;

  if (!requestId || !driverName || !vehicleNumber || !scheduledDate) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  if (new Date(scheduledDate) < new Date()) {
    return res.status(400).json({ success: false, message: 'Scheduled date must be in the future.' });
  }

  try {
    const gasRequest = await GasRequest.findById(requestId).populate('userId');
    if (!gasRequest) {
      return res.status(404).json({ success: false, message: 'Gas request not found' });
    }

    const delivery = new Delivery({
      orderId: `DEL-${Date.now()}`,
      customerName: gasRequest.userId.name,
      address: gasRequest.address,
      deliveryDate: scheduledDate,
    });

    await delivery.save();

    try 
    {
      
      // Send Email Notification 

      const emailSubject = 'Delivery Scheduled';
      const emailText = `Your delivery is scheduled on ${new Date(scheduledDate).toLocaleDateString()}.`;
      const emailHtml = `
        <h1>Delivery Scheduled</h1>
        <p>Your delivery is scheduled on <strong>${new Date(scheduledDate).toLocaleDateString()}</strong>.</p>
        <p>Driver: ${driverName}, Vehicle: ${vehicleNumber}</p>
      `;
      await sendEmail(gasRequest.userId.email, emailSubject, emailText, emailHtml);

      // Send SMS Notification

      const smsMessage = `Your delivery is scheduled on ${new Date(scheduledDate).toLocaleDateString()}. Driver: ${driverName}, Vehicle: ${vehicleNumber}`;
      await sendSms(gasRequest.userId.phone, smsMessage, '94');

      res.status(201).json({
        success: true,
        message: 'Delivery scheduled successfully with notifications.',
        delivery,
      });
    } catch (notificationError) {
      console.error('Error sending notifications:', notificationError.message);
      res.status(500).json({
        success: false,
        message: 'Delivery scheduled, but failed to send notifications.',
        delivery,
      });
    }
  } catch (error) {
    console.error('Error scheduling delivery:', error.message);
    res.status(500).json({ success: false, message: 'Error scheduling delivery.' });
  }
};


 // Update Delivery Status

export const updateDeliveryStatus = async (req, res) => {
  const { deliveryId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ success: false, message: 'Missing status' });
  }

  try {
    const delivery = await Delivery.findById(deliveryId);
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    delivery.status = status;
    await delivery.save();

    res.status(200).json({
      success: true,
      message: 'Delivery status updated successfully',
      delivery,
    });
  } catch (error) {
    console.error('Error updating delivery status:', error.message);
    res.status(500).json({ success: false, message: 'Error updating delivery status' });
  }
};


// Get Delivery Details

export const getDeliveryDetails = async (req, res) => {
  const { deliveryId } = req.params;

  try {
    const delivery = await Delivery.findById(deliveryId).populate('requestId');
    if (!delivery) {
      return res.status(404).json({ success: false, message: 'Delivery not found' });
    }

    res.status(200).json({
      success: true,
      delivery,
    });
  } catch (error) {
    console.error('Error fetching delivery details:', error);
    res.status(500).json({ success: false, message: 'Error fetching delivery details' });
  }
};
