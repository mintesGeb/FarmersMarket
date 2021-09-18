const MongoClient = require("mongodb").MongoClient;
   
let _db;

let mongoConnect = (callback) => {
  MongoClient.connect("mongodb://localhost:27017")
    .then((client) => {
      _db = client.db("farmersMarket-db");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw new Error("Cannot get DB");
  }
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
exports.ObjectId = ObjectId;
