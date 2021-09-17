var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/login", function (req, res, next) {
  res.send("auth: respond with a resource");
});
router.use("/", function (req, res, next) {
  console.log("auth: respond to everyone with a resource");
  next();
});

module.exports = router;
