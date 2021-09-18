var express = require("express");
var router = express.Router();
let farmersController = require("../controller/farmersController")




router.get("/",farmersController.getAllFarmers);

router.get("/:id", farmersController.getOneFarmer);
router.post("/", farmersController.insertFarmer);
// router.put("/:id", farmersController.);
router.delete("/:id", farmersController.deleteFarmer);

module.exports = router;