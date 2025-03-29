const express = require('express');
const router = express.Router();

const clubController = require('../controllers/club');
const { validateClub, validateClubId } = require('../validators/validator')
const {isAuthenticated} = require('../validators/authenticate');

router.get('/', clubController.getAll);
router.get('/:id',  validateClubId, clubController.getSingle);

router.post('/', validateClub, isAuthenticated, clubController.createClub);
router.put('/:id',validateClubId, validateClub, isAuthenticated, clubController.updateClub);
router.delete('/:id', validateClubId, isAuthenticated, clubController.deleteClub);

module.exports = router;