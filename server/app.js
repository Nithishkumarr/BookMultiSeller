const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./controller/user");
const path = require("path");

const app = express();

if (process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({
    path: "server/config/.env",
  });
}

app.use("/", express.static(path.join(__dirname, "./uploads")));
app.use(express.json());
app.use(cookieParser);
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//imp routes
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use("/api/v2/user", user);
// for ErrorHandling
app.use(ErrorHandler);
module.exports = app;
