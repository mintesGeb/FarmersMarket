var express = require("express");
var router = express.Router();
let authController = require("../controller/authController");

/* GET users listing. */
router.post("/login", authController.login);

router.use("/", authController.authorize);

module.exports = router;
