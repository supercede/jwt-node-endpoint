const fs = require('fs');

const loadProducts = () => {
    try {
        const data = fs.readFileSync('./models/products.json').toString();
        const products = JSON.parse(data);
        return products;
    } catch (e) {
        console.log(e);
        return ([]);
    }
}

const saveProducts = products => {
    let productsJSON = JSON.stringify(products);
    fs.writeFileSync("./models/products.json", productsJSON);
}

const loadSales = () => {
    try {
        const data = fs.readFileSync('./models/sales.json').toString();
        const sales = JSON.parse(data);
        return sales;
    } catch (e) {
        console.log(e);
        return ([]);
    }
}

const saveSales = products => {
    let salesJSON = JSON.stringify(products);
    fs.writeFileSync("./db/sales.json", salesJSON);
}

module.exports = {
    loadProducts,
    saveProducts,
    loadSales,
    saveSales
};