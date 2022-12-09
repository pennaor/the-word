const { Op } = require('sequelize');
const categoryService = require('./category.service');
const validate = require('./validations/validateSchema');
const { BlogPost, PostCategory, Category, User } = require('../models');
const sequelizeManager = require('../middlewares/sequelizeManager');

async function create(newPost, userId) {
  validate.newPost(newPost);
  
  const post = await sequelizeManager(async (transaction) => {
    const { title, content, categoryNames } = newPost;
    const result = await BlogPost.create({ title, content, userId }, { transaction });
    const { id: postId } = result.dataValues;

    const categories = await categoryService.getAllByNames(categoryNames);
    await Promise.all(
      categories.map(async (category) => {
        const { dataValues: { id: categoryId } } = category;
        return PostCategory.create({ postId, categoryId }, { transaction });
      }),
    );
    return result;
  },
  true);

  return post.dataValues;
}

async function getAllByUserId(userId) {
  return BlogPost.findAll({
    include: [
      { model: Category, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: ['id', 'password'] } },
    ],
    where: { userId },
  });
}

async function getById(id) {
  validate.identifier(id);

  const post = await BlogPost.findOne({
    include: [
      { model: Category, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
    where: { id },
  });
  if (!post) {
    const error = new Error('Post does not exist');
    error.name = 'NOT_FOUND';
    throw error;
  }

  return post;
}

async function replaceAllPostCategories(postId, categoryNames, transaction) {
  const categories = await categoryService.getAllByNames(categoryNames);
  await PostCategory.destroy({ where: { postId } }, { transaction });
  await Promise.all(
    categories.map(async (category) => {
      const { dataValues: { id: categoryId } } = category;
      return PostCategory.create({ postId, categoryId }, { transaction });
    }),
  );
}

async function updateById(postId, payload, userId) {
  validate.postUpdate(payload);

  const post = await getById(postId);
  if (post.user.id !== userId) {
    const error = new Error('Unauthorized user');
    error.name = 'UNAUTHORIZED';
    throw error;
  }
  
  await sequelizeManager(async (transaction) => {
    const { title, content, categoryNames } = payload;
    await post.update({ title, content }, transaction);
    await replaceAllPostCategories(postId, categoryNames, transaction);
  }, true);

  return post.dataValues;
}

async function deleteById(postId, userId) {
  const post = await getById(postId);
  if (post.user.id !== userId) {
    const error = new Error('Unauthorized user');
    error.name = 'UNAUTHORIZED';
    throw error;
  }

  return BlogPost.destroy({ where: { id: postId } });
}

async function getAllByTerm(term = '') {
  const posts = await BlogPost.findAll({
    include: [
      { model: Category, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
    ],
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${term}%` } },
        { content: { [Op.like]: `%${term}%` } },
      ],
    },
  });
  return posts;
}

module.exports = {
  create,
  getAllByUserId,
  getById,
  updateById,
  deleteById,
  getAllByTerm,
};
