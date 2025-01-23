import express from 'express';
import { generateQrCode } from '../utils/qrCodeService.js';

const router = express.Router();

router.get('/qrcode/:token', async (req, res) => {
    const { token } = req.params;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is required' });
    }

    try {
        const qrCodeBuffer = await generateQrCode({ token });

        res.set('Content-Type', 'image/png');
        res.send(qrCodeBuffer);
    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ success: false, message: 'Error generating QR code' });
    }
});

export default router;
