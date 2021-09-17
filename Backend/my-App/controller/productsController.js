const Products = require('../Model/productsModel');


exports.insertProduct = (req,res,next)=>{
    let newProduct = new Products( req.body.productName, req.body.price, req.body.catagory);
    newProduct.save();
    res.json({Status:"Success"});
}