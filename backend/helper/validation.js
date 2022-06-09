const User = require("../models/User");

exports.validateEmail = function (email) {
  return String(email)
    .toLowerCase()
    .match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g);
};
exports.validateLength = function (text, min, max) {
  if (text.length < min || text.length > max) return false;
  return true;
};
exports.generateValidUsername = async function (first_name, last_name) {
  let username = first_name + last_name;
  let shouldContinue = false;
  do {
    user = await User.findOne({ username });
    if (!user) {
      shouldContinue = false;
    } else {
      shouldContinue = true;
      username += (+new Date() * Math.random()).toString().substring(0, 3);
    }
  } while (shouldContinue);
  return username;
};
