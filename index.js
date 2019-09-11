const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const numbers = require('./stuff');

const users = require('./users');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.post('/numbers', (req, res) => {
//     const newParam = {
//         id: 1,
//         num: req.body.num
//     }
//     numbers.push(newParam);
//     res.send(numbers);
// })

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

    if (validUser.length < 1) {
        return res.send('user not found');
    } else {
        // if (!validUser.admin) {
        //     return res.send('user is not an admin');
        // }
        // return res.send('user is an admin');
        const token = jwt.sign({ user: validUser }, 'secret_key', { expiresIn: '30s' });
        res.send({ token });
    }



})


app.get('/', (req, res) => {
    res.send('welcome');
})

app.get('/products', (req, res) => {
    res.send('okay');
})

app.get('/products/:id', (req, res) => {
    res.send('okay too');
})

app.get('/sales', (req, res) => {
    res.send('okay here');
})

app.get('/sales/:id', (req, res) => {
    res.send('okay here');
})

app.post('/products', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secret_key', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.send({
                message: 'we Good!',
                authData
            });
        }
    })

})

app.post('/sales', (req, res) => {
    res.send('holla!');
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
