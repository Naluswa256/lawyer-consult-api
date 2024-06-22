const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const logger = require('../config/logger');
const emailTemplate = require('../utils/emailtemplates');

const transport = nodemailer.createTransport(config.email.smtp);
const { UserOTP } = require('../models');

if (config.env === 'development') {
  transport.debug = true;
}
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html) => {
  if (!to) {
    logger.error('No recipient defined for the email');
    throw new Error('No recipient defined');
  }
  const mailOptions = {
    from: config.email.from,
    to,
    subject,
    html,
  };
  await transport.sendMail(mailOptions);
};
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `Lawyer-consult://reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * Sends an OTP verification email to the user and saves the OTP to the database.
 *
 * @async
 * @function sendVerificationEmail
 * @param {Object} user - The user object containing the user's ID and email.
 * @param {string} user._id - The user's ID.
 * @param {string} user.email - The user's email address.
 * @param {Object} res - The response object to send any error messages.
 * @returns {Promise<void>} - Returns nothing.
 */
const sendVerificationEmail = async (user) => {
  try {
    const otp = `${1000 + Math.floor(Math.random() * 1000)}`;
    const subject = 'Verify your email';
    const html = emailTemplate.otpEmail(otp); // html body

    const saltRounds = 10;
    const hashedOTP = await bcrypt.hash(otp, saltRounds);
    const newOTPVerification = new UserOTP({
      userId: user._id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expireAt: Date.now() + 3600000, // 1 hour
    });
    await newOTPVerification.save();
    await sendEmail(user.email, subject, html);
  } catch (error) {
    logger.debug(error.message);
  }
};

module.exports = {
  transport,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmail,
};
