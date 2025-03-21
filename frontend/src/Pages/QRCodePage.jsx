import React from 'react';
import QRCodeImage from '../Components/QRCodeImage';
import { useParams } from 'react-router-dom';

const QRCodePage = () => {
  const { token } = useParams();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Your QR Code</h1>
      <QRCodeImage token={token} />
    </div>
  );
};

export default QRCodePage;
