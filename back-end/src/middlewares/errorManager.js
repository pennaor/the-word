const { errorMap } = require('../helpers/statusCodeMap');

const parseAPIError = ({ name, message }) => ({
  statusCode: errorMap(name),
  message,
});

function errorManager(error, _req, res, _next) {
  console.error(error);
  const result = parseAPIError(error);

  if (result.statusCode >= 500) {
    result.message = 'Something went wrong';
  }

  const { statusCode, message } = result;
  return res.status(statusCode).json({ message });
}

module.exports = errorManager;
