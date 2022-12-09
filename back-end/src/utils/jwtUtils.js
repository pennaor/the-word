require('dotenv').config();
const jose = require('jose');

const secret = Buffer.from(process.env.JWT_SECRET, 'hex');

const tokenAgeDefault = 3600000;

async function createToken(data, tokenMsAge = tokenAgeDefault) {
  const expires = Date.now() + tokenMsAge;
  const token = await new jose.EncryptJWT(data)
  .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
  .setExpirationTime(expires)
  .encrypt(secret);

  return token;
}

async function validateToken(token) {
  try {
    const { payload: { exp, ...user } } = await jose.jwtDecrypt(token, secret);
    return user;
  } catch (joseError) {
    const error = new Error();
    error.name = 'UNAUTHORIZED';
    if (joseError.message === 'Compact JWS must be a string or Uint8Array') {
      error.message = 'Token not found';
    } else {
      error.message = 'Expired or invalid token';
    }
    error.joseError = joseError;
    throw error;
  }
}

module.exports = {
  createToken,
  validateToken,
};
