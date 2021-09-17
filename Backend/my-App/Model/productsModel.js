const getDB = require('../utils/database').getDB;

class Products {
    constructor(productName, price, catagory) {
        this.productName = productName;
        this.price = price;
        this.catagory = catagory
    }


    save(){
        const db = getDB();
        db.collection('productsCollection')
        .insertOne(this)
    }




}

module.exports = Products;