const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const auth = require('../middleware/auth');

const loginController = require('../controllers/login');
const users = require('../models/users');

router.post('/', loginController.login);

module.exports = router;
