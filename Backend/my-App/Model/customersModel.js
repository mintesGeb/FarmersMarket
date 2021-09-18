const getDB = require('../utils/database').getDB;
const ObjectId  = require('../utils/database').ObjectId

class Customer {
    constructor(firstName,lastName,email,password){
        this.firstName= firstName;
        this.lastName= lastName;
        this.email= email;
        this.password= password;
        this.role ='customer';
        this.cart =[];
        this.order =[];
        this.status ='active'
    }
    save(){
        const db = getDB()
      return  db.collection('customersCollection').insertOne(this)
    }
    static getAllCustomers(){
        const db = getDB()
        return db.collection('customersCollection').find().toArray()
    }
    static getCustomerById(id){
        const db = getDB()
        return db.collection('customersCollection').find({"_id":new ObjectId(id)}).toArray()
    }

    static deleteCustomerById(id){
        const db = getDB()
        return db.collection('customersCollection').deleteOne({"_id":new ObjectId(id)})
    }

}
    module.exports = Customer;