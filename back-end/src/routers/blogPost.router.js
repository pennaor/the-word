const express = require('express');
const { blogPostController } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

router.use(authenticateUser);
router.get('/search', blogPostController.getAllByTerm);
router.get('/:id', blogPostController.getById);
router.put('/:id', blogPostController.updateById);
router.delete('/:id', blogPostController.deleteById);
router.post('/', blogPostController.create);
router.get('/', blogPostController.getAllByUserId);

module.exports = router;
