const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
}

module.exports = connectDB;
