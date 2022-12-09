const express = require('express');
const { userController } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

router.post('/create', userController.create);
router.post('/auth', userController.authenticate);
router.use(authenticateUser);
router.delete('/me', userController.deleteSelfById);
router.get('/posts/:userId', userController.getUserPosts);
router.get('/:id', userController.getById);
router.get('/', userController.getAll);

module.exports = router;
