require('dotenv').config();
const jose = require('jose');

const secret = Buffer.from(process.env.JWT_SECRET, 'hex');

const tokenAgeDefault = '30m';

async function createToken(data, expiresIn = tokenAgeDefault) {
  const token = await new jose.EncryptJWT(data)
  .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
  .setExpirationTime(expiresIn)
  .encrypt(secret);

  return token;
}

async function validateToken(token) {
  try {
    const { payload: { exp, ...user } } = await jose.jwtDecrypt(token, secret);
    return user;
  } catch (joseError) {
    const error = new Error('Expired or invalid token');
    error.name = 'UNAUTHORIZED';
    if (joseError.message === 'Compact JWS must be a string or Uint8Array') {
      error.message = 'Token not found';
    }
    error.joseError = joseError;
    throw error;
  }
}

module.exports = {
  createToken,
  validateToken,
};
