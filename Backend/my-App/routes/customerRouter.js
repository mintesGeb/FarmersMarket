var express = require("express");
var router = express.Router();
let customersController = require("../controller/customersController")




router.get("/",customersController.getAllCustomers);

router.get("/:id", customersController.getOneCustomer);
router.post("/", customersController.insertCustomer);
router.post("/addtocart/:id",customersController.addProducttoCart)
router.delete("/removeProduct/:id/:pid",customersController.removeProductfromCart);
router.put("/deactivate/:id",customersController.deactivate);
router.put("/activate/:id",customersController.activate);
router.put("/editprofile/:id",customersController.editCustomerProfile);
router.put("/make-ready/:id/:orderId", customersController.makeReady);
router.get("/email/:email", customersController.getCustomerrByEmail);
router.put("/make-complete/:id/:orderId", customersController.makeComplete);
router.put("/add-order/:id", customersController.addOrder);

// router.put("/:id", customersController.);
router.delete("/:id", customersController.deleteCustomerbyId);

module.exports = router;