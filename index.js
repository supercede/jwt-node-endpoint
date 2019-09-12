const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
const jwt = require('jsonwebtoken');
const productsObj = require('./utils/functions');

const users = require('./utils/users');

let products = productsObj.loadProducts();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    if (isEmpty(req.body)) {
        return res.send('Enter a valid name or password');
    }

    if (typeof req.body.name == 'undefined' || typeof req.body.password == 'undefined') {
        return res.send('Enter a valid name and password');
    }

    const newUser = {
        name: req.body.name,
        password: req.body.password,
    }

    let validUser = users.find(user => user.name === newUser.name && user.password === newUser.password);

    if ( validUser == undefined || validUser.length < 1 ) {
        return res.send('user not found');
    } else {
        if (validUser.role !== 'admin') {
            return res.send('user is not an admin');
        }else{
            const token = jwt.sign({ user: validUser }, 'secret_key', { expiresIn: '1d' });
            res.send({ token });
        }
    }
})


app.get('/', (req, res) => {
    res.send('welcome');
})

app.get('/products', (req, res) => {
    res.send(products);
})

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const idProduct = products.find(product => product.id == id)
    if(typeof idProduct == 'undefined'){
        return res.send('product not found');
    }
    res.send(idProduct);
})

app.get('/sales', verifyToken ,(req, res) => {
    jwt.verify(req.token, 'secret_key', (err, authData) => {
        if (err) {
            console.log(err)
            // res.sendStatus(403);
        } else {
            res.send({
                message: 'Here is sales',
                authData
            });
        }
    })

})

app.get('/sales/:id', verifyToken ,(req, res) => {
    // res.send('okay here');
    jwt.verify(req.token, 'secret_key', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.send({
                message: 'Here is a sale!',
                authData
            });
        }
    })

})

app.post('/products', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret_key', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const newProduct = {
                id: products.length+1,
                name: req.body.name || '',
                category: req.body.category || '',
                price: req.body.price || 0,
                quantity: req.body.quantity || 1,
                description: req.body.description || '',
                image_url: req.body.image_url || ''
            }

            if(newProduct.name == '' || newProduct.price == 0 || newProduct.category == ''){
                return res.send('name, price and category is required');
            }

            products.push(newProduct);
            productsObj.saveProducts(products);
            res.send(newProduct);
        }
    })

})

app.post('/sales', (req, res) => {
    // res.send('holla!');
    const userName = req.body.name;
    if(typeof userName == 'undefined'){
        return res.send('Enter a name please')
    }
    const findName = users.find(name => name.name === userName);
    if ( findName == undefined || findName.length < 1 ) {
        return res.send('user does not exist');
    }
    if(findName.role !== 'admin'){
        res.send('Ok!')
    }else{
        res.sendStatus(403);
    }
})


const isEmpty = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

app.listen(3000, () => {
    console.log('I am live on port 3000')
})
