const getDB = require("../utils/database").getDB;
const ObjectId = require("../utils/database").ObjectId;
const Farmer = require("../Model/farmersModel");

class Customer {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.role = "customer";
    this.cart = [];
    this.order = [];
    this.status = "active";
  }
  save() {
    const db = getDB();
    return db.collection("customersCollection").insertOne(this);
  }
  static deactivateAcount(id) {
    const db = getDB();
    db.collection("customersCollection").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "inactive" } }
    );
    const result = this.getCustomerById(id);
    return result;
  }
  static activateAcount(id) {
    const db = getDB();
    db.collection("customersCollection").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "active" } }
    );
    return this.getCustomerById(id);
  }

  static editProfile(id, object) {
    const db = getDB();
    db.collection("customersCollection").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          firstName: object.firstName,
          lastName: object.lastName,
          password: object.password,
        },
      }
    );
    return this.getCustomerById(id);
  }

  static addToCart(id, object) {
    const db = getDB();
    //if(object.quantity)
    let copy = { ...object };
    let numProd = copy.numberOfProducts;
    copy.f_id = new ObjectId(object.f_id);
    copy.p_id = new ObjectId(object.p_id);
    copy.numberOfProducts = 1;

    db.collection("farmersCollection").updateOne(
      { _id: copy.f_id, "products.p_id": copy.p_id },
      { $set: { "products.$.numberOfProducts": numProd - 1 } }
    );

    db.collection("customersCollection").updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: { cart: copy } }
    );

    return Farmer.getFarmerById(copy.f_id);
  }

  static addOrder(id, obj) {
    const copy = { ...obj };
    copy.p_id = new ObjectId(copy.p_id);
    copy.f_id = new ObjectId(copy.f_id);
    const db = getDB();
    copy.items = [...obj.items];
    return db
      .collection("customersCollection")
      .updateOne({ _id: new ObjectId(id) }, { $addToSet: { order: copy } });
  }

  static removeFromCart(id, productId) {
    const db = getDB();
    console;
    db.collection("customersCollection").updateOne(
      { _id: new ObjectId(id) },
      { $pull: { cart: { p_id: new ObjectId(productId) } } }
    );
    return this.getCustomerById(id);
  }

  static getAllCustomers() {
    const db = getDB();
    return db.collection("customersCollection").find().toArray();
  }

  static getCustomerById(id) {
    const db = getDB();
    return db
      .collection("customersCollection")
      .find({ _id: new ObjectId(id) })
      .toArray();
  }

  static deleteCustomerById(id) {
    const db = getDB();
    return db
      .collection("customersCollection")
      .deleteOne({ _id: new ObjectId(id) });
  }

  static makeReady(id, orderId) {
    const db = getDB();
    db.collection("customersCollection").updateOne(
      { _id: new ObjectId(id), "orders.o_id": new ObjectId(orderId) },
      { $set: { "orders.$.status": "ready" } }
    );
    return this.getFarmerById(id);
  }

  static makeComplete(id, orderId) {
    const db = getDB();
    db.collection("customersCollection").updateOne(
      { _id: new ObjectId(id), "orders.o_id": new ObjectId(orderId) },
      { $set: { "orders.$.status": "complete" } }
    );
    return this.getFarmerById(id);
  }

  static getCustomerByEmail(email) {
    const db = getDB();
    return db
      .collection("customersCollection")
      .find({ email: email })
      .toArray();
  }

  static addOrder(id, order) {
    const copy = { ...order };
    const db = getDB();
    return db
      .collection("customersCollection")
      .updateOne({ _id: new ObjectId(id) }, { $addToSet: { orders: copy } });
  }

  static updateCustomer(id, nameUpdate) {
    getDB()
      .collection("customersCollection")
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            firstName: nameUpdate.firstName,
            lastName: nameUpdate.lastName,
          },
        }
      );
    return this.getCustomerById(id);
  }
}
module.exports = Customer;
