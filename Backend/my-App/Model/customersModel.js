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
    static deactivateAcount(id){
        const db = getDB()
        return db.collection('customersCollection').updateOne({"_id":new ObjectId(id)},{$set:{status:'inactive'}})

    }
    static activateAcount(id){
        const db = getDB()
        return db.collection('customersCollection').updateOne({"_id":new ObjectId(id)},{$set:{status:'active'}})
    }



    static editProfile(id,object) {
        const db = getDB()
        return db.collection('customersCollection').updateOne({"_id":new ObjectId(id)},{$set:{firstName:object.firstName,lastName:object.lastName,password:object.password}})
    }

    static addToCart(id,object){
        
        const db = getDB()
        //if(object.quantity)
      return   db.collection('customersCollection').updateOne({"_id": new ObjectId(id)},{$addToSet:{"cart":object}})
       // this.cart.push()

    }
    static removeFromCart(id,productId){
        const db = getDB()
        return db.collection('customersCollection').updateOne({"_id": new ObjectId(id)},{$pull:{"cart":productId}})
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

    static makeReady(id, orderId) {
        const db = getDB();
        db.collection('customersCollection')
            .updateOne({ "_id": new ObjectId(id), "orders.o_id": new ObjectId(orderId) },
                { $set: { "orders.$.status": "ready" } });
        return this.getFarmerById(id)
    }


    static makeComplete(id, orderId) {
        const db = getDB();
        db.collection('customersCollection')
            .updateOne({ "_id": new ObjectId(id), "orders.o_id": new ObjectId(orderId) },
                { $set: { "orders.$.status": "complete" } });
        return this.getFarmerById(id)
    }

    static getFarmerByEmail(email) {
        const db = getDB()
        return db.collection('customersCollection')
            .find({ "email": email })
            .toArray()
    }

    static addOrder(id, order) {
        const copy = { ...order };
        const db = getDB();
        return db.collection('customersCollection')
            .updateOne({ "_id": new ObjectId(id) }, { $addToSet: { "orders": copy } })
    }


}
    module.exports = Customer;