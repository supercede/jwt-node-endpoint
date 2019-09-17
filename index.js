const express = require('express');
const bodyParser = require('body-parser');

const productsRoute = require('./routes/products');
const salesRoute = require('./routes/sales');
const loginRoute = require('./routes/login');
const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use('/login', loginRoute);


app.get('/', (req, res) => {
    res.send('welcome');
})

app.listen(port, () => {
    console.log('I am live on port ' + port);
})