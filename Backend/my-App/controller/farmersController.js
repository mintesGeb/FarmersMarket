const Farmers = require('../Model/farmersModel');
const ObjectId = require('../utils/database').ObjectId;


exports.getAllFarmers=(req,res)=>{
    Farmers.getAll()
    .then(farmers => {
        res.json({ farmers });
    })
    .catch(err => console.log(err));
}

exports.getOneFarmer=(req,res)=>{
    Farmers.getFarmerById(req.params.id)
    .then(farmer=>{
        res.json({farmer})
    })
    .catch(err => console.log(err))
}

exports.insertFarmer=(req,res)=>{
    const newFarmer = new Farmers(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
    newFarmer.save();
    res.json({
        status:"Farmer access created."
    })
}

exports.deleteFarmer=(req,res)=>{
    Farmers.deleteFarmer(id)
    .then(result=>{
        if (result.deletedCount = 0) {
            res.json({ status: "Success", message: "Farmer is not available." })
        } else if (result.deletedCount = 1) {
            res.json({ status: "Success", message: "Farmer is deleted." })
        }
    })
    .catch((err)=>console.log(err));
}

