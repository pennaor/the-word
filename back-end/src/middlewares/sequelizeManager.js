require('dotenv').config();
const Sequelize = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

function parseError(sequelizeError) {
  const { name, message, fields, errors } = sequelizeError;
  const error = new Error(message);
  error.name = name;
  error.sequelizeError = sequelizeError;

  if (name.match(/foreignKeyConstraint/i) && fields.includes('category_id')) {
    error.message = 'one or more "categoryIds" not found';
    error.name = 'BAD_REQUEST';
  }
  if (name.match(/uniqueConstraint/i)) {
    const [{ instance }] = errors;
    const entityName = instance.constructor.name;
    error.message = `${entityName} already registered`;
    error.name = 'ENTITY_CONFLICT';
  }
  return error;
}

async function sequelizeManager(callback, useTransaction) {
  try {
    let result;
    if (useTransaction) {
      result = await sequelize.transaction(callback);
    } else {
      result = await callback();
    }
    return result;
  } catch (error) {
    throw parseError(error);
  }
}

module.exports = sequelizeManager;
