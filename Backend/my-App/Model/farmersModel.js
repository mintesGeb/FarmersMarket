const getDB = require("../utils/database").getDB;
const ObjectId = require("../utils/database").ObjectId;

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
    this.role = "farmer";
    this.status = "active";
  }

  save() {
    const db = getDB();
    return db.collection("farmersCollection").insertOne(this);
  }

  static getAll() {
    const db = getDB();
    return db.collection("farmersCollection").find().toArray();
  }

  static getFarmerById(id) {
    const db = getDB();
    return db
      .collection("farmersCollection")
      .find({ _id: new ObjectId(id) })
      .toArray();
  }

  static deleteFarmer(id) {
    const db = getDB();
    return db
      .collection("farmersCollection")
      .deleteOne({ _id: new ObjectId(id) });
  }

  static addReview(id, review) {
    const reviewId = new ObjectId();
    const copy = { ...review };
    copy.id = reviewId;
    const db = getDB();
    return db
      .collection("farmersCollection")
      .updateOne({ _id: new ObjectId(id) }, { $addToSet: { review: copy } });
  }

  static deleteReview(id, reviewId) {
    const db = getDB();
    return db
      .collection("farmersCollection")
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { review: { id: new ObjectId(reviewId) } } }
      );
  }

  static addProduct(id, product) {
    const copy = { ...product };
    copy.p_id = new ObjectId();
    const db = getDB();
    db.collection("farmersCollection").updateOne(
      { _id: new ObjectId(id) },
      { $addToSet: { products: copy } }
    );

    return this.getFarmerById(id);
  }

  static deleteProduct(id, productId) {
    const db = getDB();
    return db
      .collection("farmersCollection")
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { products: { p_id: new ObjectId(productId) } } }
      );
  }

  static updateProduct(id, prod) {
    const db = getDB();
    db.collection("farmersCollection").updateOne(
      { _id: new ObjectId(id), "products.p_id": new ObjectId(prod.p_id) },
      { $addToSet: { products: prod } }
    );
    return this.getFarmerById(id);
  }

  static addOrder(id, order) {
    const copy = { ...order };
    // copy.o_id = new ObjectId();
    const db = getDB();
    return db
      .collection("farmersCollection")
      .updateOne({ _id: new ObjectId(id) }, { $addToSet: { orders: copy } });
  }

  static makeReady(id, orderId) {
    const db = getDB();
    db.collection("farmersCollection").updateOne(
      { _id: new ObjectId(id), "orders.o_id": new ObjectId(orderId) },
      { $set: { "orders.$.status": "ready" } }
    );
    return this.getFarmerById(id);
  }

  static makeComplete(id, orderId) {
    const db = getDB();
    db.collection("farmersCollection").updateOne(
      { _id: new ObjectId(id), "orders.o_id": new ObjectId(orderId) },
      { $set: { "orders.$.status": "complete" } }
    );
    return this.getFarmerById(id);
  }

  static activateStatus(id) {
    const db = getDB();
    return db
      .collection("farmersCollection")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: "active" } });
  }

  static deactivateStatus(id) {
    const db = getDB();
    return db
      .collection("farmersCollection")
      .updateOne({ _id: new ObjectId(id) }, { $set: { status: "inactive" } });
  }

  static getFarmerByEmail(email) {
    const db = getDB();
    return db.collection("farmersCollection").find({ email: email }).toArray();
  }

  static addReputation(id) {
    const db = getDB();
    return this.getFarmerById(id).then((result) => {
      db.collection("farmersCollection").updateOne(
        { _id: new ObjectId(id) },
        { $set: { reputation: result[0].reputation + 1 } }
      );
      return this.getFarmerById(id);
    });
  }

  static deductReputation(id) {
    const db = getDB();
    return this.getFarmerById(id).then((result) => {
      if (result[0].reputation > 0) {
        db.collection("farmersCollection").updateOne(
          { _id: new ObjectId(id) },
          { $set: { reputation: result[0].reputation - 1 } }
        );
      }
      return this.getFarmerById(id);
    });
  }

  static editProfile(id, prof) {
    const db = getDB();
    return db.collection("farmersCollection").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          firstName: prof.firstName,
          lastName: prof.lastName,
          password: prof.password,
        },
      }
    );
  }
}

module.exports = Farmers;
