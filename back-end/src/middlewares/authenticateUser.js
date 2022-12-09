const jwtUtils = require('../utils/jwtUtils');

async function authenticateUser(req, _res, next) {
  const token = req.header('authorization');
  req.user = await jwtUtils.validateToken(token);
  return next();
}

module.exports = authenticateUser;
