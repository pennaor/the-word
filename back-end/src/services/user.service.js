const validate = require('./validations/validateSchema');
const { User, Category, BlogPost } = require('../models');
const jwtUtils = require('../utils/jwtUtils');
const sequelizeManager = require('../middlewares/sequelizeManager');

async function login(credentials) {
  validate.userCredentials(credentials);

  const { email, password } = credentials;
  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    const error = new Error('Invalid fields');
    error.name = 'BAD_REQUEST';
    throw error;
  }

  const { id, displayName, image } = user;
  const token = await jwtUtils.createToken({ id, email, displayName, image });
  return {
    token,
    user: { id, email, displayName, image },
  };
}

async function create(newUser) {
  validate.newUser(newUser);

  const user = await sequelizeManager(async () => User.create(newUser), false);

  const { id, email, displayName, image } = user.dataValues;
  return jwtUtils.createToken({ id, email, displayName, image });
}

async function getAll() {
  return User.findAll({ attributes: { exclude: ['password'] } });
}

async function getById(id) {
  validate.identifier(id);

  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) {
    const error = new Error('User does not exist');
    error.name = 'NOT_FOUND';
    throw error;
  }

  return { ...user.dataValues };
}

async function deleteSelfById(id) {
  validate.identifier(id);
  return User.destroy({ where: { id } });
}

async function getUserPosts(userId) {
  validate.identifier(userId);

  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    include: [{
      model: BlogPost,
      as: 'posts',
      include: [{ model: Category, as: 'categories' }],
      attributes: { exclude: ['userId', 'user_id'] },
    }],
    where: { id: userId },
  });

  if (!user) {
    const error = new Error('User does not exist');
    error.name = 'NOT_FOUND';
    throw error;
  }

  return user;
}

module.exports = {
  login,
  create,
  getAll,
  getById,
  deleteSelfById,
  getUserPosts,
};
