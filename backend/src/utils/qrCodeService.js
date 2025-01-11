import QRCode from 'qrcode';

export const generateQrCode = async (data) => {
  try {
    return await QRCode.toDataURL(JSON.stringify(data));
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    throw new Error('Error generating QR code');
  }
};
