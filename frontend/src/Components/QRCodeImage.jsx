import React from 'react';

const QRCodeImage = ({ token }) => {
  const qrCodeUrl = `/api/qrcode/${token}`;

  return (
    <div>
      <img src={qrCodeUrl} alt={`QR Code for token: ${token}`} />
    </div>
  );
};

export default QRCodeImage;
