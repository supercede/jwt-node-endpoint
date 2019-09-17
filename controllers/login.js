const jwt = require('jsonwebtoken');

const users = require('../models/users');
const auth = require('../middleware/auth');

exports.login = (req, res) => {
    if (auth.isEmpty(req.body)) {
        return res.send('Enter a valid name or password');
    }

    if (typeof req.body.name == 'undefined' || typeof req.body.password == 'undefined') {
        return res.send('Enter a valid name and password');
    }

    const newUser = {
        name: req.body.name,
        password: req.body.password,
    }

    let adminUser = users.find(user => user.name === newUser.name && user.password === newUser.password);

    if (!adminUser) {
        return res.send('user not found');
    } else {
        if (adminUser.role !== 'admin') {
            return res.send('logged in as user');
        }
        const token = jwt.sign({ user: adminUser }, 'secret_key', { expiresIn: '10m' });
        res.send({
            message: 'Authorized, copy token to header.authorization',
            token
        });

    }
};