const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const { validateProduct, validateProductId } = require('../validators/validator')
const {isAuthenticated} = require('../validators/authenticate.js');

router.get('/', productsController.getAll);
router.get('/:id',  validateProductId, productsController.getSingle);

router.post('/', validateProduct, isAuthenticated, productsController.createProduct);
router.put('/:id',validateProductId, validateProduct, isAuthenticated, productsController.updateProduct);
router.delete('/:id', validateProductId, isAuthenticated, productsController.deleteProduct);

module.exports = router;