var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoConnect = require("./utils/database").mongoConnect;
let cors = require("cors");

var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users_test");
var productsRouter = require("./routes/products_test");
let productRouter = require("./routes/productRouter");
let customerRouter = require("./routes/customerRouter");
let farmerRouter = require("./routes/farmerRouter");

var app = express();

// view engine setup

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", authRouter);
app.use("/users-test", usersRouter);
app.use("/products-test", productsRouter);
app.use("/products", productRouter);
app.use("/farmers", farmerRouter);
app.use("/customers", customerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoConnect(() => {
  app.listen("1234", () => {
    console.log("App has started on port 1234");
  });
});
