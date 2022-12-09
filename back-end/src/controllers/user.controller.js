const jwtUtils = require('../utils/jwtUtils');
const { userService } = require('../services');

async function login(req, res, next) {
  try {
    const userAndToken = await userService.login(req.body);
    return res.status(200).json(userAndToken);
  } catch (error) {
    next(error);
  }
}

async function authenticate(req, res, next) {
  const token = req.header('authorization');
  try {
    const user = await jwtUtils.validateToken(token);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const token = await userService.create(req.body);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }  
}

async function getAll(_req, res, next) {
  try {
    const users = await userService.getAll();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const user = await userService.getById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteSelfById(req, res, next) {
  const { id } = req.user;
  try {
    await userService.deleteSelfById(id);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }  
}

async function getUserPosts(req, res, next) {
  const { userId } = req.params;
  try {
    const userAndPosts = await userService.getUserPosts(userId);
    return res.status(200).json(userAndPosts);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
  authenticate,
  create,
  getAll,
  getById,
  deleteSelfById,
  getUserPosts,
};
