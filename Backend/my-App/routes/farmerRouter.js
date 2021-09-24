var express = require("express");
var router = express.Router();
let farmersController = require("../controller/farmersController");

router.put("/delete-product/:id/:prodId", farmersController.deleteProduct);
router.put("/add-product/:id", farmersController.addProduct);
router.get("/", farmersController.getAllFarmers);
router.put("/delete-review/:id/:revId", farmersController.deleteReview);
router.get("/:id", farmersController.getOneFarmer);
// router.post("/register", farmersController.insertFarmer);
router.put("/:id", farmersController.updateFarmer);
router.delete("/:id", farmersController.deleteFarmer);
router.put("/add-review/:id", farmersController.addReview);
router.put("/add-order/:id", farmersController.addOrder);
router.put("/make-ready/:id/:orderId", farmersController.makeReady);
router.get("/email/:email", farmersController.getFarmerByEmail);
router.put("/make-complete/:id/:orderId", farmersController.makeComplete);
router.put("/activate-status/:id", farmersController.activateStatus);
router.put("/deactivate-status/:id", farmersController.deactivateStatus);
router.put("/add-reputation/:id", farmersController.addReputation);
router.put("/deduct-reputation/:id", farmersController.deductReputation);
router.put("/edit-profile/:id", farmersController.editProfile);
router.put("/update-product/:id",farmersController.updateProduct);
router.post('/send-email/:email',farmersController.sendEmail);


module.exports = router;
