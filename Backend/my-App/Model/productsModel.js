const getDB = require('../utils/database').getDB;
let ObjectId = require("../utils/database").ObjectId;

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

    static getAll(){
        const db = getDB();
        return db.collection('productsCollection')
        .find()
        .toArray();
    }


    static getProductById(id){
        const db = getDB();
        return db.collection('productsCollection')
        .find({"_id":new ObjectId(id)})
        .toArray();
    }

    static deleteProduct(id){
        const db = getDB();
        return db.collection('productsCollection')
        .deleteOne({"_id":new ObjectId(id)})
    }


    

}

module.exports = Products;