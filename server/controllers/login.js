const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Provide Email and Password to Login",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User with this Email does not exist, Please Sign Up first",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      user.token = token;
      user.password = undefined;

      res.cookie("token", token, {
        expires: new Date(Daate.now() + 3 * 24 * 60 * 60 * 1000),
        // httpOnly: true,
      });

      return res.status(200).json({
        success: true,
        message: "Login Successfull",
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured while logging in",
    });
  }
};

module.exports = login;
