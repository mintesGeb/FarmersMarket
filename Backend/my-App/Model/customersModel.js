const getDb = require('../utils/database');
const {ObjectId}  = require('../utils/database').ObjectId

class Customer {
    constructor(fname,lname,email,password,cart,order,role){
        this.fname=fname;
        this.lname=lname;
        this.email= email;
        this.cart =[];
        this.order=[];
        this.role=role

    }
    save(){
        const db = getDb()
      return  db.collection('customersCollection').insertOne(this)
    }
    static getAllCustomers(){
        const db = getDb()
        return db.collection('customersCollection').find().toArray()
    }
    static getCustomerById(id){
        const db = getDb()
        return db.collection('customersCollection').find({"_id":new ObjectId(id)}).toArray()
    }

    static deleteCustomerById(id){
        const db = getDb()
        return db.collection('customersCollection').deleteOne({"_id":new ObjectId(id)}).toArray()
    }

}
    module.exports = Customer;