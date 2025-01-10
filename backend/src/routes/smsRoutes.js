import express from 'express';
import { sendSms } from '../utils/smsService.js';

const router = express.Router();

router.post('/send-sms', async (req, res) => {
  const { to, strCode, countryCode } = req.body;

  if (!to || !strCode || !countryCode) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const result = await sendSms(to, strCode, countryCode);
  res.status(result.success ? 200 : 500).json(result);
});

export default router;
