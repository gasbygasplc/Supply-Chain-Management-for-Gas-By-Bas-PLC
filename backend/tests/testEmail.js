import { sendEmail } from '../utils/emailService.js';

const testEmail = async () => {
  console.log('Testing Email Service...');
  try {
    const response = await sendEmail(
      'renurenuga572@gmail.com', // Replace with a valid recipient email
      'Test Email Subject',
      'This is a test email sent from the GasByGas app.',
      '<p>This is a <strong>test email</strong> sent from the GasByGas app.</p>'
    );
    console.log('Email Test Response:', response);
  } catch (error) {
    console.error('Error in Email Test:', error.message);
  }
};

testEmail();

