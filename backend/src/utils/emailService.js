import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
    return { success: true, message: `Email sent to ${to}` };
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error.message);
    return { success: false, message: `Error sending email to ${to}: ${error.message}` };
  }
};
