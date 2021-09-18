const getDb = require('../utils/database');
const {ObjectId}  = require('../utils/database').ObjectId
const Customer = require('../Model/customersModel')


exports.getAllCustomers =(req,res)=>{
    Customer.getAllCustomers().then(customer=>{
        res.json({customer})
    }).catch(error =>console.log(error))
}

exports.getOneCustomer = (req,res)=>{
    Customer.getCustomerById(req.params.id).then(customer=>{
        res.json({customer})
    }).catch(error=>console.log(error))

    }

exports.deleteCustomerbyId=(req,res)=>{
    Customer.deleteCustomerById(id)
    .then(result=>{
        if (result.deletedCount = 0) {
            res.json({ status: "Success", message: "" })
        } else if (result.deletedCount = 1) {
            res.json({ status: "Success", message: "customer deleted." })
        }
    })
    .catch((err)=>console.log(err))};