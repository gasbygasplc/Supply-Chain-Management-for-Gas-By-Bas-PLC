const otpStore = {};

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

export const saveOTP = async (userId, otp) => {
    otpStore[userId] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };
};

export const validateOTP = async (userId, otp) => {
    const record = otpStore[userId];
    if (record && record.otp === otp && record.expiresAt > Date.now()) {
        delete otpStore[userId];
        return true;
    }
    return false;
};
