const jwt = require('jsonwebtoken');
const functions = require('../middleware/functions');
const users = require('../models/users');

const sales = functions.loadSales();

exports.get_Sales = (req, res) => {
    jwt.verify(req.token, 'secret_key', (err, authData) => {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                return res.send('Your token has expired, log in');
            }
            // console.log(err)
            res.sendStatus(403);
        } else {
            res.send(sales);
        }
    })
};

exports.get_Single_Sale = (req, res) => {
    // res.send('okay here');
    jwt.verify(req.token, 'secret_key', (err, authData) => {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                return res.send('Your token has expired, log in');
            }
            res.sendStatus(403);
        } else {
            const id = req.params.id;
            const idSale = sales.find(sale => sale.id = id);
            res.send(idSale);
        }
    })
};

exports.post_Sales = (req, res) => {
    // res.send('holla!');
    const userName = req.body.name;
    const password = req.body.password;

    if (typeof userName == 'undefined' || typeof password == "undefined") {
        return res.send('Enter name and password, admins are not allowed to make this request');
    }
    const findName = users.find(name => name.name === userName && name.password === password);
    if (!findName) {
        return res.send('user does not exist');
    }
    if (findName.role !== 'admin') {
        const newSale = {
            id: sales.length + 1,
            price: req.body.price
        }
        if (!req.body.price) {
            return res.send('Please enter a price');
        }
        sales.push(newSale);
        functions.saveSales(sales);
        res.send(sales);
    } else {
        res.status(403).send("You are not permitted to make this request");
    }
}