var express = require("express");
var router = express.Router();
let customersController = require("../controller/customersController")




router.get("/",customersController.getAllCustomers);

router.get("/:id", customersController.getOneCustomer);
router.post("/", customersController.insertCustomer);
// router.put("/:id", customersController.);
router.delete("/:id", customersController.deleteCustomerbyId);

module.exports = router;