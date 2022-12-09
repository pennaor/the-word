const express = require('express');
const { categoryController } = require('../controllers');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

router.use(authenticateUser);
router.get('/', categoryController.getAll);
router.post('/', categoryController.create);

module.exports = router;
