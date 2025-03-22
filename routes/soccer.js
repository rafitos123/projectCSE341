const express = require('express');
const router = express.Router();

const playersController = require('../controllers/soccer');
const { validatePlayer, validatePlayerId } = require('../validators/validator')

router.get('/', playersController.getAll);
router.get('/:id',  validatePlayerId, playersController.getSingle);

router.post('/', validatePlayer, playersController.createPlayer);
router.put('/:id',validatePlayerId, validatePlayer, playersController.updatePlayer);
router.delete('/:id', validatePlayerId, playersController.deletePlayer);

module.exports = router;