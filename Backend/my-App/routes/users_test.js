var express = require("express");
var router = express.Router();
let getDB = require("../utils/database").getDB;
let ObjectId = require("../utils/database").ObjectId;
let authorizeFarmers = require("../controller/authController").authorizeFarmers;

router.get("/", authorizeFarmers, function (req, res, next) {
  let users = getDB()
    .collection("farmersCollection")
    .find()
    .toArray()
    .then((data) => {
      res.json({ data });
    });
});

router.get("/:query", authorizeFarmers, (req, res, next) => {
  let user = getDB()
    .collection("farmersCollection")
    .findOne({ username: req.params.query })
    .then((data) => {
      if (!data) {
        getDB()
          .collection("users")
          .findOne({ _id: new ObjectId(req.params.query) })
          .then((data) => {
            if (!data) {
              res.json("no data");
            } else {
              res.json({ data });
            }
          });
      } else {
        res.json({ data });
      }
    });
});

module.exports = router;
