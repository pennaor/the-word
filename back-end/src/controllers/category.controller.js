const { categoryService } = require('../services');

async function create(req, res, next) {
  try {
    const category = await categoryService.create(req.body);
    return res.status(201).json(category);
  } catch (error) {
    next(error);
  }  
}

async function getAll(req, res, next) {
  const { names } = req.body;
  try {
    const categories = await categoryService.getAll(names);
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getAll,
};
