const app = require("./app");
const connectDB = require("./db/Database");
// handling uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Eror : ${err.message}`);
  console.log(`shutting down the server for handling uncaught exception `);
});

//config
if (process.env.NODE_ENV != "PRODUCTION") {
  require("dotenv").config({
    path: "server/config/.env",
  });
}

//connect db
connectDB();

//send req to ser
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
//create server

const server = app.listen(process.env.PORT, () => {
  console.log(`server running on port : http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for &{err.message}`);
  console.log(`Shutting down the server unHandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
