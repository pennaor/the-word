const { blogPost } = require('../services');

async function create(req, res, next) {
  const { id } = req.user;
  try {
    const post = await blogPost.create(req.body, id);
    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }  
}

async function getAllByUserId(req, res, next) {
  const { id } = req.user;
  try {
    const posts = await blogPost.getAllByUserId(id);
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }  
}

async function getById(req, res, next) {
  try {
    const post = await blogPost.getById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }  
}

async function updateById(req, res, next) {
  const {
    params: { id: postId },
    body: payload,
    user: { id: userId },
  } = req;

  try {
    const post = await blogPost.updateById(postId, payload, userId);
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }  
}

async function deleteById(req, res, next) {
  const {
    params: { id: postId },
    user: { id: userId },
  } = req;

  try {
    await blogPost.deleteById(postId, userId);
    return res.status(204).end();
  } catch (error) {
    next(error);
  }  
}

async function getAllByTerm(req, res, next) {
  try {
    const posts = await blogPost.getAllByTerm(req.query.q);
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }  
}

module.exports = {
  create,
  getAllByUserId,
  getById,
  updateById,
  deleteById,
  getAllByTerm,
};
