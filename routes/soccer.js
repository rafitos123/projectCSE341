const express = require('express');
const router = express.Router();

const playersController = require('../controllers/soccer');
const { validatePlayer, validatePlayerId } = require('../validators/validator')
const {isAuthenticated} = require('../validators/authenticate.js');

router.get('/', playersController.getAll);
router.get('/:id',  validatePlayerId, playersController.getSingle);

router.post('/', validatePlayer, isAuthenticated, playersController.createPlayer);
router.put('/:id',validatePlayerId, validatePlayer, isAuthenticated, playersController.updatePlayer);
router.delete('/:id', validatePlayerId, isAuthenticated, playersController.deletePlayer);

module.exports = router;