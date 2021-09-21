var express = require("express");
var router = express.Router();
let authController = require("../controller/authController");
let farmersController = require("../controller/farmersController");

/* GET users listing. */
router.post("/login", authController.login);
router.post("/register/farmer", farmersController.insertFarmer);
// router.post("/register/customer", customersController.insertCustomer);

router.use("/", authController.authorize);

module.exports = router;
