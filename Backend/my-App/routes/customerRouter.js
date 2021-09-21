var express = require("express");
var router = express.Router();
let customersController = require("../controller/customersController")




router.get("/",customersController.getAllCustomers);

router.get("/:id", customersController.getOneCustomer);
router.post("/", customersController.insertCustomer);
router.post("/addtocart/:id",customersController.addProducttoCart)
router.delete("/removeProduct/:id",customersController.removeProductfromCart)
router.put("/deactivate/:id",customersController.deactivate)
router.put("/activate/:id",customersController.activate)
router.put("/editprofile/:id",customersController.editCustomerProfile)
router.put("/order/:id",customersController.orderCustomer)

// router.put("/:id", customersController.);
router.delete("/:id", customersController.deleteCustomerbyId);

module.exports = router;