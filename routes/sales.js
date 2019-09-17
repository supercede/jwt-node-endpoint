const express = require('express');

const auth = require('../middleware/auth');
const salesController = require('../controllers/sales');

const router = express.Router();

router.get('/', auth.verifyToken, salesController.get_Sales);

router.get('/:id', auth.verifyToken, salesController.get_Single_Sale);

router.post('/', salesController.post_Sales);

module.exports = router;