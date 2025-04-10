const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviews');
const { validateReview, validateReviewId } = require('../validators/validator')
const {isAuthenticated} = require('../validators/authenticate.js');

router.get('/', reviewsController.getAll);
router.get('/:id',  validateReviewId, reviewsController.getSingle);

router.post('/', validateReview, isAuthenticated, reviewsController.createReview);
router.put('/:id',validateReviewId, validateReview, isAuthenticated, reviewsController.updateReview);
router.delete('/:id', validateReviewId, isAuthenticated, reviewsController.deleteReview);

module.exports = router;