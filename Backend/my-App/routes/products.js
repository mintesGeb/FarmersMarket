var express = require("express");
var router = express.Router();

let getDB = require("../utils/database").getDB;
let ObjectId = require("../utils/database").ObjectId;

/* GET users listing. */
router.get("/", function (req, res, next) {
  getDB()
    .collection("product")
    .find()
    .toArray()
    .then((data) => {
      res.json({ data });
    });
});

router.get("/:id", (req, res) => {
  getDB()
    .collection("product")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((data) => {
      if (!data) {
        res.json("no data");
      } else {
        res.json({ data });
      }
    });
});

module.exports = router;