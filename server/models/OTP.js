const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailVerificationTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from NeoSkill",
      emailVerificationTemplate(otp)
    );
  } catch (error) {
    console.error("Error occurd while sending mail: ", error);
  }
}

OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
