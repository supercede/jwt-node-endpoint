const express = require('express');

const auth = require('../middleware/auth');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.get_products);

router.get('/:id', productsController.get_single_product);

router.post('/', auth.verifyToken, productsController.post_products);

module.exports = router;