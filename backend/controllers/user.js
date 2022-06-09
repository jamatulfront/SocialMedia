const {
  validateEmail,
  validateLength,
  validateUsername,
  generateValidUsername,
} = require("../helper/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../helper/tokens");
const { sendVerificationEmail } = require("../helper/mailer");

exports.register = async (req, res) => {
  try {
    let {
      first_name,
      last_name,
      username,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ status: "error", msg: "please provide an valid email !" });
    }
    if (!validateLength(first_name, 4, 20)) {
      return res.status(400).json({
        status: "error",
        msg: "firstname should be in between 4 and 20 characters",
      });
    }
    if (!validateLength(last_name, 4, 20)) {
      return res.status(400).json({
        status: "error",
        msg: "lastname should be in between 4 and 20 characters",
      });
    }
    if (!validateLength(username, 4, 40)) {
      return res.status(400).json({
        status: "error",
        msg: "username should be in between 4 and 40 characters",
      });
    }
    if (!validateLength(password, 8, 40)) {
      return res.status(400).json({
        status: "error",
        msg: "password should be in between 8 and 40 characters",
      });
    }
    let check = await User.findOne({ email });
    if (check) {
      return res
        .status(400)
        .json({ status: "error", msg: "Please try with another email !" });
    }
    username = await generateValidUsername(first_name, last_name);
    password = await bcrypt.hash(password, 12);
    const user = await new User({
      first_name,
      last_name,
      username,
      email,
      password,
      bDay,
      bMonth,
      bYear,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      {
        id: user._id.toString(),
      },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });
  } catch (error) {
    return res.status(400).json({ status: "error", msg: error.message });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    let decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
    let check = await User.findById(decodedJwt.id);
    if (check.verified) {
      res.status(400).json({ msg: "This account is already activated" });
    } else {
      await User.findByIdAndUpdate(decodedJwt.id, {
        verified: true,
      });
      res
        .status(200)
        .json({ msg: "Your account has been activated successfully." });
    }
  } catch (error) {
    return res.status(400).json({ status: "error", msg: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Sorry there is no account with this email" });
    }
    let verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword)
      return res.status(400).json({ msg: "Invalid crediantials" });
    const token = generateToken({ id: user._id.toString() }, "7d");
    return res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token,
      verified: user.verified,
      message: "Account is login successfully",
    });
  } catch (error) {
    return res.status(400).json({ status: "error", msg: error.message });
  }
};
