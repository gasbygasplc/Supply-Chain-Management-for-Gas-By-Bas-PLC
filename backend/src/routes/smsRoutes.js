import express from 'express';
import { sendSms } from '../utils/smsService.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  const { to, tokenNumber, qrCodeUrl, gasType, quantity, countryCode } = req.body;

  if (!to || !tokenNumber || !qrCodeUrl || !gasType || !quantity || !countryCode) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const smsMessage = `
    Gas Request Confirmation:
    Gas Type: ${gasType}
    Quantity: ${quantity}
    Token: ${tokenNumber}
    QR Code Link: ${qrCodeUrl}
    Use this token or QR code to collect your gas from the outlet.
  `;

  const result = await sendSms(to, smsMessage, countryCode);
  res.status(result.success ? 200 : 500).json(result);
});

export default router;
