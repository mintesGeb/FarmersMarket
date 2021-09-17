var express = require('express');
var router = express.Router();
const productsController = require('../controller/productsController');


router.post('/', productsController.insertProduct);

module.exports = router;
