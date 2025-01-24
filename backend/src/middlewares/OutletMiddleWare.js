import jwt from 'jsonwebtoken';

const authOutlet = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const Otoken = authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.split(' ')[1] // Extract token from "Bearer <token>"
            : req.headers.otoken; // Fallback to custom "Otoken" header

        if (!Otoken) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }

        const tokenDecode = jwt.verify(Otoken, process.env.JWT_SECRET);

        req.body.outletId = tokenDecode.id;

        next();
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export default authOutlet;
