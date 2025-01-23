import QRCode from 'qrcode';

export const generateQrCode = async (data) => {
  try {
    return await QRCode.toBuffer(JSON.stringify(data), { type: 'png' });
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    throw new Error('Error generating QR code');
  }
};
