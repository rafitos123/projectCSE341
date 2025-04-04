const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');
const { validateUser, validateUserId } = require('../validators/validator')
const {isAuthenticated} = require('../validators/authenticate');

router.get('/', userController.getAll);
router.get('/:id',  validateUserId, userController.getSingle);

router.post('/', validateUser, isAuthenticated, userController.createUser);
router.put('/:id',validateUserId, validateUser, isAuthenticated, userController.updateUser);
router.delete('/:id', validateUserId, isAuthenticated, userController.deleteUser);

module.exports = router;