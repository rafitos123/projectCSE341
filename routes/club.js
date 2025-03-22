const express = require('express');
const router = express.Router();

const clubController = require('../controllers/club');
const { validateClub, validateClubId } = require('../validators/validator')

router.get('/', clubController.getAll);
router.get('/:id',  validateClubId, clubController.getSingle);

router.post('/', validateClub, clubController.createClub);
router.put('/:id',validateClubId, validateClub, clubController.updateClub);
router.delete('/:id', validateClubId, clubController.deleteClub);

module.exports = router;