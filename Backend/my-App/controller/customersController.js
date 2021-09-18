const getDb = require('../utils/database');
const {ObjectId}  = require('../utils/database').ObjectId
const Customer = require('../Model/customersModel')


exports.insertCustomer=(req,res)=>{
    let newCustomer = new Customer(req.body.firstName,req.body.lastName,req.body.email,req.body.password);
    newCustomer.save()
    console.log(newCustomer)
    res.json({
        status:"Customer access created."
    })
}


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
    Customer.deleteCustomerById(req.params.id)
    .then(result=>{
        if (result.deletedCount == 0) {
            res.json({ status: "Success", message: "Customer not found ." })
        } else if (result.deletedCount == 1) {
            res.json({ status: "Success", message: "Customer deleted." })
        }
    })
    .catch((err)=>console.log(err))};