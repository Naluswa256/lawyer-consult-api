const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const walletService = require('../services/payment.service');
const userService = require('../services/user.service');

const checkBalance = catchAsync(async (req, res) => {
  const balance = await walletService.checkBalance();
  res.status(httpStatus.OK).json(balance);
});

const verifyMsisdn = catchAsync(async (req, res) => {
  const { msisdn } = req.body;
  const { _id: userId } = req.user;
  const verification = await walletService.verifyMsisdn(msisdn);
  if (verification.response === 'OK') {
    await userService.verifyPhoneNumber(userId, msisdn);
  }
  res.status(httpStatus.OK).json(verification);
});

const withdrawFunds = catchAsync(async (req, res) => {
  const { msisdn, amount, reason, name } = req.body;
  const withdrawal = await walletService.withdrawFunds(msisdn, amount, reason, name);
  res.status(httpStatus.OK).json(withdrawal);
});

const depositFunds = catchAsync(async (req, res) => {
  const { msisdn, amount, reason, name } = req.body;
  const { io } = req;
  const deposit = await walletService.depositFunds(msisdn, amount, reason, name, io);
  res.status(httpStatus.OK).json(deposit);
});

module.exports = {
  checkBalance,
  verifyMsisdn,
  withdrawFunds,
  depositFunds,
};
