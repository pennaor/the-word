const express = require('express');
const loginRouter = require('./login.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const blogPostRouter = require('./blogPost.router');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/user', userRouter);
routers.use('/categories', categoryRouter);
routers.use('/post', blogPostRouter);

module.exports = routers;
