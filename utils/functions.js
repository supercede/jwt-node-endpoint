const fs = require('fs');

const loadProducts = () => {
    try{
        const data = fs.readFileSync('./utils/products.json').toString();
        const products = JSON.parse(data);
        return products;
    }catch(e){
        return([]);
    }
}

const saveProducts = products => {
    let productsJSON = JSON.stringify(products);
    fs.writeFileSync("./utils/products.json", productsJSON);
}

const loadSales = () => {
    try{
        const data = fs.readFileSync('./utils/sales.json').toString();
        const sales = JSON.parse(data);
        return sales;
    }catch(e){
        return([]);
    }
}

const saveSales = products => {
    let salesJSON = JSON.stringify(products);
    fs.writeFileSync("./utils/sales.json", salesJSON);
}

module.exports = {
    loadProducts,
    saveProducts,
    loadSales,
    saveSales
};