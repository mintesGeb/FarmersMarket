let express = require("express");
let jwt = require("jsonwebtoken");
let getDB = require("../utils/database").getDB;

let secret = "farmersMarketSecret";

exports.login = async (req, res, next) => {
  try {
    let user = req.body;
    console.log(user);
    let token;
    let collection;

    if (user.role === "superuser") {
      if (user.email === "super@user" && user.password === "superuser") {
        token = jwt.sign({ email: "super@user", role: "superuser" }, secret);
        res.json({ token });
      }
    } else {
      if (user.role === "farmer") {
        collection = getDB().collection("farmersCollection");
      } else {
        collection = getDB().collection("customersCollection");
      }

      collection
        .findOne({ email: user.email, password: user.password })
        .then((data) => {
          if (data) {
            if (data.status === "inactive") {
              res.json({
                message:
                  "Your account is inactive, please contact us at please@help.me",
              });
            } else if (data.status === "active") {
              const token = jwt.sign(
                { email: data.email, role: data.role },
                secret
              );
              res.json({ token });
            }
          } else {
            res.json({ error: "wrong username or password" });
          }
        });
    }
  } catch (err) {
    next(err);
  }
};

exports.authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "unauthorized" });
  }
};

exports.authorizeFarmers = (req, res, next) => {
  if (req.user.role === "farmer" && req.user.role === "superuser") {
    next();
  } else {
    return res.status(403).json({ error: "forbidden" });
  }
};
exports.authorizeSuperUser = (req, res, next) => {
  if (req.user.role === "superuser") {
    next();
  } else {
    return res.status(403).json({ error: "forbidden" });
  }
};
