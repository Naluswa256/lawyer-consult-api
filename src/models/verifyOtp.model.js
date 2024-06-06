const mongoose = require('mongoose');

const userOTP = mongoose.Schema({
  userId: String,
  otp: String,
  createdAt: Date,
  expireAt: Date,
});
const UserOTP = mongoose.model('UserOTPVerification', userOTP);
module.exports = UserOTP;
