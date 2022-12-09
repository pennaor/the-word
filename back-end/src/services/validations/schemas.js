const Joi = require('joi');

const identifier = Joi.number().integer().label('ID');

const userCredentials = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(2).required(),
});

const newUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().min(0),
});

const newCategory = Joi.object({
  name: Joi.string().min(2).required(),
});

const newPost = Joi.object({
  title: Joi.string().min(5).max(19).required(),
  content: Joi.string().min(20).max(255).required(),
  categoryNames: Joi.array().items(Joi.string().min(2)).required(),
});

const postUpdate = Joi.object({
  title: Joi.string().min(5).max(19).required(),
  content: Joi.string().min(20).max(255).required(),
  categoryNames: Joi.array().items(Joi.string().min(2)).required(),
});

module.exports = {
  identifier,
  userCredentials,
  newUser,
  newCategory,
  newPost,
  postUpdate,
};
