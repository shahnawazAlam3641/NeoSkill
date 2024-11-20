const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  dateOfBirth: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
  },
  contactNumber: {
    type: Number,
    trim: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
