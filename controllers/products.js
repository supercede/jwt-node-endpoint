const jwt = require('jsonwebtoken');
const functions = require('../middleware/functions');


const products = functions.loadProducts();

exports.get_products = (req, res) => {
    res.send(products);
};

exports.get_single_product = (req, res) => {
    const id = req.params.id;
    const idProduct = products.find(product => product.id == id)
    if (typeof idProduct == 'undefined') {
        return res.send('product not found');
    }
    res.send(idProduct);
};

exports.post_products = (req, res) => {
    jwt.verify(req.token, 'secret_key', (err, authData) => {
        if (err) {
            return res.sendStatus(403);
        } else {
            const newProduct = {
                id: products.length + 1,
                name: req.body.name || '',
                category: req.body.category || '',
                price: req.body.price || 0,
                quantity: req.body.quantity || 1,
                description: req.body.description || '',
                image_url: req.body.image_url || ''
            }

            if (newProduct.name == '' || newProduct.price == 0 || newProduct.category == '') {
                return res.send('name, price and category is required');
            }

            products.push(newProduct);
            functions.saveProducts(products);
            res.send(newProduct);
        }
    })

};