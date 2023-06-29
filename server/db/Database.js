const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.DB_URL);

  console.log(`mongodb connected with server :${conn.connection.host}`);
};

module.exports = connectDB;
