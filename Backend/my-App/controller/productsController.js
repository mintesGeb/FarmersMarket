const Products = require('../Model/productsModel');
const ObjectId = require("../utils/database").ObjectId


exports.insertProduct = (req, res, next) => {
    let newProduct = new Products(req.body.productName, req.body.price, req.body.catagory);
    newProduct.save();
    res.json({ Status: "Success" });
}


exports.deleteproduct = (req, res) => {
    Products.deleteProduct(req.params.id)
        .then(result => {
            if (result.deleteCount = 0) {
                res.json({
                    status: "Success", message: "User is not available."
                })
            } else if (result.deleteCount = 1) {
                res.json({ status: "Success", message: "User is deleted." })
            }
        })
        .catch(err => console.log(err));
}

exports.getAllProducts = (req, res) => {
    Products.getAll()
        .then(products => {
            res.json({ products });
        })
        .catch(err => console.log(err));
}

exports.getOneProduct = (req, res) => {
    Products.getProductById(req.params.id)
        .then(product => {
            res.json({ product });

        })
        .catch(err => console.log(err))
}

exports.updateUser = (req,res)=>{
    Products.deleteProduct(req.params.id);
    const product = new Products(req.body.productName, req.body.price, req.body.catagory);
    const copy = {...product};
    copy._id = new ObjectId(req.params.id);
    copy.save()
    res.json({ status: "Success", message: "Product updated Successfully" })
}