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

module.exports = {
    loadProducts,
    saveProducts
};