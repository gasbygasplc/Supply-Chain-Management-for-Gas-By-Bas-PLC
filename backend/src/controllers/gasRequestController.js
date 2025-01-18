import GasRequest from '../models/GasRequest.js';
import User from '../models/User.js';
import { generateToken } from '../utils/tokenService.js';
import { sendSms } from '../utils/smsService.js';
import { generateQrCode } from '../utils/qrCodeService.js';
import { sendEmail } from '../utils/emailService.js';

export const submitGasRequest = async (req, res) => {

  const { userId, gasType, quantity } = req.body;


  if (!userId || !gasType || !quantity) 
  {

    return res.status(400).json({ success: false, message: 'Missing required fields' });

  }

  try 
  {

    const user = await User.findById(userId);

    if (!user) 
    {

      return res.status(404).json({ success: false, message: 'User not found' });

    }

    const { email, phone } = user;

    const normalizedPhone = phone.startsWith('') ? phone : `94${phone.replace(/^0/, '')}`;

    const tokenNumber = generateToken();

    const qrCodeUrl = await generateQrCode({ tokenNumber, gasType, quantity, userId });

    const gasRequest = new GasRequest({

      userId,

      requestId: `REQ-${Date.now()}`,

      tokenNumber,

      qrCodeUrl,

      gasType,

      quantity,

    });

    await gasRequest.save();

    const smsMessage = `Gas Request Confirmation:\nToken: ${tokenNumber}\nQR Code: ${qrCodeUrl}`;

    const smsResponse = await sendSms(normalizedPhone, smsMessage, '94');

    if (!smsResponse.success) 
    {

      console.error(`Failed to send SMS to ${normalizedPhone}: ${smsResponse.message}`);

    }


    const emailSubject = 'Gas Request Confirmation';

    const emailText = `Your gas request has been submitted successfully.\nToken: ${tokenNumber}\nPlease show this token or scan the QR code to pick up your gas.`;

    const emailHtml = `
      <h1>Gas Request Confirmation</h1>
      <p>Your gas request has been submitted successfully.</p>
      <p><strong>Token:</strong> ${tokenNumber}</p>
      <p>QR Code:</p>
      <img src="${qrCodeUrl}" alt="QR Code" />
      <p>Thank you for using our service!</p>
    `;

    const emailResponse = await sendEmail(email, emailSubject, emailText, emailHtml);

    if (!emailResponse.success) 
    {

      console.error(`Failed to send email to ${email}: ${emailResponse.message}`);

    }

    return res.status(201).json({

      success: true,

      message: 'Gas request submitted successfully',

      tokenNumber,

      qrCodeUrl,

    });

  } catch (error) 
  {

    console.error('Error submitting gas request:', error);

    return res.status(500).json({ success: false, message: 'Error submitting gas request' });

  }
  
};

