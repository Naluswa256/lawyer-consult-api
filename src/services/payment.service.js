const { v4: uuidv4 } = require('uuid');
const axiosClient = require('../utils/axiousClient');
const { Appointment } = require('../models');
const logger = require('../config/logger');

const generateUniqueReference = () => {
  return uuidv4();
};

const handleError = (error) => {
  const errorMessage =
    error.response && error.response.data && error.response.data.error && error.response.data.error.message
      ? error.response.data.error.message
      : 'An unknown error occurred';
  throw new Error(errorMessage);
};

const checkBalance = async () => {
  try {
    const response = await axiosClient.post('/acc_balance', { currency: 'UGX' });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Verify MSISDN
const verifyMsisdn = async (msisdn) => {
  try {
    const response = await axiosClient.post('/msisdn-verification', { msisdn });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Withdraw funds
const withdrawFunds = async (msisdn, amount, reason, name) => {
  const externalReference = generateUniqueReference();
  try {
    const response = await axiosClient.post('/withdraw', {
      externalReference,
      msisdn,
      amount,
      currency: 'UGX',
      reason,
      name,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to handle the transaction status update
const handleTransactionStatusUpdate = async (data, socket) => {
  const { transactionStatus, externalReference } = data;

  // Find the appointment and update its status
  const appointment = await Appointment.findOneAndUpdate(
    { transactionReference: externalReference },
    {
      paymentStatus: transactionStatus === 'SUCCEEDED' ? 'paid' : 'unpaid',
      status: transactionStatus === 'SUCCEEDED' ? 'confirmed' : 'rejected',
    },
    { new: true }
  );

  // Notify the Flutter app using WebSocket
  socket.emit('paymentStatus', { status: transactionStatus, appointmentId: appointment._id });
};
// Function to check the transaction status
const checkTransactionStatus = async (externalReference, socket) => {
  const interval = setInterval(async () => {
    try {
      const response = await axiosClient.post(`/get_status/${externalReference}`);
      const { transactionStatus } = response.data.data;

      if (transactionStatus === 'SUCCEEDED' || transactionStatus === 'FAILED') {
        clearInterval(interval);
        await handleTransactionStatusUpdate(response.data.data, socket);
      }
    } catch (error) {
      logger.info('Error checking transcation status');
    }
  }, 5000); // Check every 5 seconds
};

const depositFunds = async (msisdn, amount, reason, name, appointmentId, socket) => {
  const externalReference = generateUniqueReference();
  try {
    const response = await axiosClient.post('/deposit', {
      externalReference,
      msisdn,
      amount,
      currency: 'UGX',
      reason,
      name,
    });

    // Save the transaction reference to the appointment
    await Appointment.findByIdAndUpdate(appointmentId, { transactionReference: externalReference });

    // Start polling for the transaction status
    checkTransactionStatus(externalReference, socket);

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

module.exports = {
  checkBalance,
  verifyMsisdn,
  withdrawFunds,
  depositFunds,
};
