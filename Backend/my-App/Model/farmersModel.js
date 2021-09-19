const getDB = require('../utils/database').getDB
const ObjectId = require('../utils/database').ObjectId


class Farmers {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.products = [];
        this.orders = [];
        this.reputation = 20;
        this.review = [];
        this.role = "farmer"
        this.status="active";
    }

    save() {
        const db = getDB();
        return db.collection('farmersCollection')
            .insertOne(this)
    }


    static getAll() {
        const db = getDB()
       return db.collection('farmersCollection')
            .find()
            .toArray()
    }


    static getFarmerById(id){
        const db = getDB()
       return db.collection('farmersCollection')
        .find({"_id":new ObjectId(id)})
        .toArray()
    }

    static deleteFarmer(id){
        const db = getDB()
      return db.collection('farmersCollection')
        .deleteOne({"_id":new ObjectId(id)})
    }

}

module.exports = Farmers;