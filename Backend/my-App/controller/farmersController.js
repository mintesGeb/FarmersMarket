const Farmers = require("../Model/farmersModel");
const ObjectId = require("../utils/database").ObjectId;

exports.getAllFarmers = (req, res) => {
  Farmers.getAll()
    .then((farmers) => {
      res.json({ farmers });
    })
    .catch((err) => console.log(err));
};

exports.getOneFarmer = (req, res) => {
  Farmers.getFarmerById(req.params.id)
    .then((farmer) => {
      res.json({ farmer });
    })
    .catch((err) => console.log(err));
};

exports.insertFarmer = (req, res) => {
  Farmers.getFarmerByEmail(req.body.email).then((result) => {
    if (result[0]) {
      res.json({ status: "exists" });
    } else {
      const newFarmer = new Farmers(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password
      );
      newFarmer.save();
      res.json({
        status: "created",
      });
    }
  });
};

exports.deleteFarmer = (req, res) => {
  Farmers.deleteFarmer(req.params.id)
    .then((result) => {
      if (result.deletedCount == 0) {
        res.json({ status: "Success", message: "Farmer is not available." });
      } else if (result.deletedCount == 1) {
        res.json({ status: "Success", message: "Farmer is deleted." });
      }
    })
    .catch((err) => console.log(err));
};

exports.addReview = (req, res) => {
  Farmers.addReview(req.params.id, req.body).then((result) => {
    res.json(result);
  });
};

exports.deleteReview = (req, res) => {
  Farmers.deleteReview(req.params.id, req.params.revId).then((result) => {
    res.json(result);
  });
};

exports.addProduct = (req, res) => {
  Farmers.addProduct(req.params.id, req.body).then((result) => {
    res.json(result);
  });
};

exports.deleteProduct = (req, res) => {
  Farmers.deleteProduct(req.params.id, req.params.prodId).then((result) => {
    res.json(result);
  });
};

exports.updateProduct=(req,res)=>{
    Farmers.updateProduct(req.params.id, req.body)
    .then((result)=>{
        res.json(result);
    })
}


exports.addOrder = (req, res) => {
  Farmers.addOrder(req.params.id, req.body).then((result) => {
    res.json(result);
  });
};

exports.makeReady = (req, res) => {
  Farmers.makeReady(req.params.id, req.params.orderId).then((result) => {
    res.json(result[0]["orders"]);
  });
};

exports.makeComplete = (req, res) => {
  Farmers.makeComplete(req.params.id, req.params.orderId).then((result) => {
    res.json(result[0]["orders"]);
  });
};

exports.activateStatus = (req, res) => {
  Farmers.activateStatus(req.params.id).then((result) => {
    res.json(result);
  });
};

exports.deactivateStatus = (req, res) => {
  Farmers.deactivateStatus(req.params.id).then((result) => {
    res.json(result);
  });
};

exports.getFarmerByEmail = (req, res) => {
  Farmers.getFarmerByEmail(req.params.email).then((result) => {
    res.json({ result });
  });
};

exports.addReputation = (req, res) => {
  Farmers.addReputation(req.params.id).then((result) => {
    res.json(result);
  });
};

exports.deductReputation = (req, res) => {
  Farmers.deductReputation(req.params.id).then((result) => {
    res.json(result);
  });
};

exports.editProfile = (req, res) => {
  Farmers.editProfile(req.params.id, req.body).then((result) => {
    res.json(result);
  });
};
