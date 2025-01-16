import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const sendSms = async (recipient, message, senderId = 'GasByGas', scheduleTime = null) => {
  try {
    const url = 'https://app.text.lk/api/v3/sms/send';
    const payload = {
      recipient,
      sender_id: process.env.SMS_SENDER_ID,
      type: 'plain',
      message,
      ...(scheduleTime && { schedule_time: scheduleTime }),
    };

    const headers = {
      Authorization: `Bearer ${process.env.SMS_API_TOKEN}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const response = await axios.post(url, payload, { headers });

    if (response.data.status === 'success') {
      console.log('SMS sent successfully:', response.data);
      return { success: true, data: response.data };
    } else {
      console.error('Failed to send SMS:', response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Error sending SMS:', error.message);
    return { success: false, message: `Error sending SMS: ${error.message}` };
  }
};
