const express = require('express');
const walletController = require('../../controllers/payment.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
const userValidations = require('../../validations/user.validation');
const validate = require('../../middlewares/validate');

router.post('/check-balance', walletController.checkBalance);
router.post('/verify-phone', auth(), validate(userValidations.verifyPhoneNumber), walletController.verifyMsisdn);
router.post('/withdraw', walletController.withdrawFunds);
router.post('/deposit', walletController.depositFunds);

module.exports = router;
