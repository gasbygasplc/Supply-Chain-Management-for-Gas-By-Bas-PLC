import { sendEmail } from '../utils/emailService.js';
import { sendSms } from '../utils/smsService.js';

const testEmail = async () => {
    console.log('Testing Email Service...');
    const response = await sendEmail(
        'renurenuga572@gmail.com', 
        'Test Email Subject', 
        'This is a test email.', 
        '<p>This is a <strong>test email</strong>.</p>'
    );
    console.log('Email Response:', response);
};

const testSms = async () => {
    console.log('Testing SMS Service...');
    const response = await sendSms(
        '784141735', 
        'This is a test SMS.', 
        '94'
    );
    console.log('SMS Response:', response);
};

testEmail();
testSms();
