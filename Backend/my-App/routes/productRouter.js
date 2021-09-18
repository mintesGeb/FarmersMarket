var express = require("express");
var router = express.Router();
let productsController = require("../controller/productsController");

router.get("/", productsController.getAllProducts);

router.get("/:id", productsController.getOneProduct);
router.post("/", productsController.insertProduct);
router.put("/:id", productsController.updateProduct);
router.delete("/:id", productsController.deleteproduct);

module.exports = router;
