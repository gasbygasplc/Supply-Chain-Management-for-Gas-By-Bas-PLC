import crypto from 'crypto';

export const generateToken = () => {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let token = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    token += charset[randomIndex];
  }
  return token;
};
