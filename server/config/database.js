const mongoose = require("mongoose");
require("dotenc".config);

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
}

module.exports = connectDB;
