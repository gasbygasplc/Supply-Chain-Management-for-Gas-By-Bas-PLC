import axios from 'axios';
import moment from 'moment-timezone';
import dotenv from 'dotenv';

dotenv.config();

export const sendSms = async (to, strCode, countryCode, scheduledTime = null) => {
  try {
    const url = "https://richcommunication.dialog.lk/api/sms/send";
    const formattedNumber = `${countryCode}${to}`;

    // Updated payload structure
    const payload = {
      messages: [
        {
          clientRef: `${Date.now()}`, // Unique reference for the SMS
          number: formattedNumber, // E.g., 94771234567
          mask: process.env.SMS_MASK || "GASBYGAS",
          text: strCode || "Your verification code is 1234",
          campaignName: process.env.SMS_CAMPAIGN_NAME || "GASBYGAS",
          ...(scheduledTime && { scheduledTime }), // Include scheduledTime if provided
        },
      ],
    };

    const now = moment().tz("Asia/Colombo").format("YYYY-MM-DDTHH:mm:ss");
    const headers = {
      Authorization: `Bearer ${process.env.SMS_AUTH_KEY}`,
      USER: process.env.SMS_USER,
      DIGEST: process.env.SMS_DIGEST,
      CREATED: now,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, payload, { headers });

    if (response.status >= 200 && response.status < 300) {
      console.log("SMS sent successfully:", response.data);
      return { success: true, message: "SMS sent successfully" };
    } else {
      console.error("Failed to send SMS:", response.statusText);
      return { success: false, message: `Failed to send SMS: ${response.statusText}` };
    }
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    return { success: false, message: `Error sending SMS: ${error.message}` };
  }
};
