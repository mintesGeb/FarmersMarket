const getDb = require("../utils/database");
const { ObjectId } = require("../utils/database").ObjectId;
const Customer = require("../Model/customersModel");

exports.insertCustomer = (req, res) => {
  let newCustomer = new Customer(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password
  );
  newCustomer.save();
  console.log(newCustomer);
  res.json({
    status: "Customer access created.",
  });
};

exports.getAllCustomers = (req, res) => {
  Customer.getAllCustomers()
    .then((customer) => {
      res.json({ customer });
    })
    .catch((error) => console.log(error));
};
exports.addProducttoCart = (req, res) => {
  console.log(req.params.id, req.body);
  Customer.addToCart(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
};
exports.removeProductfromCart = (req, res) => {
  Customer.removeFromCart(req.params.id, req.params.pid)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
};

exports.addCustomer = (req, res) => {
  const newCustomer = new Customer(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password
  );
  newCustomer.save();
  res.json({ status: "success" });
};

exports.getOneCustomer = (req, res) => {
  Customer.getCustomerById(req.params.id)
    .then((customer) => {
      res.json({ customer });
    })
    .catch((error) => console.log(error));
};

exports.deleteCustomerbyId = (req, res) => {
  Customer.deleteCustomerById(req.params.id)
    .then((result) => {
      if (result.deletedCount == 0) {
        res.json({ status: "Success", message: "Customer not found ." });
      } else if (result.deletedCount == 1) {
        res.json({ status: "Success", message: "Customer deleted." });
      }
    })
    .catch((err) => console.log(err));
};
exports.deactivate = (req, res) => {
  Customer.deactivateAcount(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => console.log(error));
};
exports.orderCustomer = (req, res) => {
  Customer.addOrder(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.activate = (req, res) => {
  Customer.activateAcount(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.editCustomerProfile = (req, res) => {
  Customer.editProfile(req.params.id, req.body)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getCustomerByEmail = (req, res) => {
  Customer.getCustomerByEmail(req.params.email).then((result) => {
    res.json({ result });
  });
};

exports.makeReady = (req, res) => {
  Customer.makeReady(req.params.id, req.params.orderId).then((result) => {
    res.json(result[0]["orders"]);
  });
};

exports.makeComplete = (req, res) => {
  Customer.makeComplete(req.params.id, req.params.orderId).then((result) => {
    res.json(result[0]["orders"]);
  });
};

exports.addOrder = (req, res) => {
  Customer.addOrder(req.params.id, req.body).then((result) => {
    res.json(result);
  });
};

exports.updateCustomer = (req, res) => {
  Customer.updateCustomer(req.params.id, req.body).then((result) => {
    res.json(result);
  });
};
