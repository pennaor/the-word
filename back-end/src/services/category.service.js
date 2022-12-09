const { Op } = require('sequelize');
const validate = require('./validations/validateSchema');
const { Category } = require('../models');

async function create(newCategory) {
  validate.newCategory(newCategory);

  const category = await Category.create(newCategory);

  return category;
}

async function getAll() {
  return Category.findAll();
}

async function getAllByNames(names) {
  if (!names.length) {
    return [];
  }
  return Category.findAll({ where: { name: { [Op.or]: names } } });
}

module.exports = {
  create,
  getAll,
  getAllByNames,
};
