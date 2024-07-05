const { Appointment, Issue } = require('../models');
const NotificationService = require('./notification.service');

/**
 * Creates a new appointment.
 * @param {object} appointmentBody - Appointment data.
 * @returns {Promise<Appointment>} The created appointment.
 */
const createAppointment = (appointmentBody) => {
  const appointment = new Appointment(appointmentBody);
  appointment.save();
  return appointment;
};

/**
 * Updates the status of an appointment.
 * @param {string} appointmentId - The ID of the appointment to update.
 * @param {string} status - The new status of the appointment.
 * @returns {Promise<Appointment>} The updated appointment.
 * @throws {Error} If the appointment is not found.
 */
async function updateAppointmentStatus(appointmentId, status) {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new Error('Appointment not found');
  }
  appointment.status = status;
  await appointment.save();
  return appointment;
}

/**
 * Notifies a user with a push notification.
 * @param {string} userId - The ID of the user to notify.
 * @param {string} message - The notification message.
 * @returns {Promise<void>}
 */
const notifyUser = (userId, message) => NotificationService.sendPushNotification(userId, 'Notification', message);

/**
 * Notifies a lawyer with a push notification.
 * @param {string} lawyerId - The ID of the lawyer to notify.
 * @param {string} message - The notification message.
 * @returns {Promise<void>}
 */
const notifyLawyer = async (lawyerId, message) => {
  await NotificationService.sendPushNotification(lawyerId, 'Notification', message);
};

/**
 * Fetches all appointments.
 * @returns {Promise<Array<Appointment>>} The list of appointments.
 */
const getAllAppointments = (page, limit) => {
  return Appointment.paginate({}, { page, limit });
};

/**
 * Fetches all appointments for a specific lawyer.
 * @param {string} lawyerId - The ID of the lawyer.
 * @returns {Promise<Array<Appointment>>} The list of appointments.
 */
const getAppointmentsByLawyer = (lawyerId) => Appointment.find({ lawyerId });

/**
 * Fetches all appointments for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array<Appointment>>} The list of appointments.
 */
const getAppointmentsByUser = async (userId, options) => {
  const filter = { userId, status: { $ne: 'pending' } };
  const appointments = await Appointment.paginate(filter, options);
  return appointments.populate({
    path: 'userId',
    select: 'avatar fullNames'
  }).populate({
    path: 'lawyerId',
    select: 'avatar fullNames'
  })
  .populate({
    path: 'package',
    select: '-_id duration price'
  })
  .select('-iv -tag');
};

/**
 * Fetches an appointment by its ID.
 * @param {string} appointmentId - The ID of the appointment.
 * @returns {Promise<Appointment>} The appointment.
 */
const getAppointmentById = (appointmentId) => Appointment.findById(appointmentId).populate({
  path: 'userId',
  select: 'avatar fullNames'
}).populate({
  path: 'lawyerId',
  select: 'avatar fullNames'
})
.populate({
  path: 'package',
  select: '-_id duration price'
})
.select('-iv -tag')
.exec();

/**
 * Fetches an appointment by its booking reference.
 * @param {string} bookingReference - The booking reference.
 * @returns {Promise<Appointment>} The appointment.
 */
const getAppointmentByBookingReference = (bookingReference) => Appointment.findOne({ bookingReference });

/**
 * Cancels an appointment.
 * @param {string} appointmentId - The ID of the appointment to cancel.
 * @param {string} userId - The ID of the user requesting the cancellation.
 * @returns {Promise<Appointment>} The updated appointment.
 * @throws {Error} If the appointment is not found or the user is not authorized.
 */
async function cancelAppointment(appointmentId, userId) {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new Error('Appointment not found');
  }
  if (appointment.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  appointment.status = 'cancelled';
  await appointment.save();
  return appointment;
}

/**
 * Confirms that a meeting happened.
 * @param {string} appointmentId - The ID of the appointment to confirm.
 * @returns {Promise<Appointment>} The updated appointment.
 * @throws {Error} If the appointment is not found.
 */
async function confirmMeeting(appointmentId) {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new Error('Appointment not found');
  }
  appointment.status = 'completed';
  await appointment.save();
  return appointment;
}

/**
 * Reports an issue with an appointment.
 * @param {string} appointmentId - The ID of the appointment.
 * @param {string} userId - The ID of the user reporting the issue.
 * @param {string} description - The issue description.
 * @param {string} proofUrl - The URL to the proof image.
 * @returns {Promise<Issue>} The created issue.
 */
async function reportIssue(appointmentId, userId, description, proofUrl) {
  const issue = new Issue({ appointmentId, userId, description, proofUrl });
  await issue.save();
  return issue;
}
/**
 * Fetches all issues.
 * @returns {Promise<Array<Issue>>} The list of issues.
 */
const getAllIssues = (page, limit) => {
  return Issue.paginate({}, { page, limit });
};

/**
 * Deletes an issue.
 * @param {string} issueId - The ID of the issue to delete.
 * @param {string} userId - The ID of the user requesting the deletion.
 * @returns {Promise<Issue>} The deleted issue.
 * @throws {Error} If the issue is not found or the user is not authorized.
 */
const deleteIssue = async (issueId, userId) => {
  const issue = await Issue.findById(issueId);
  if (!issue) {
    throw new Error('Issue not found');
  }
  if (issue.userId.toString() !== userId) {
    throw new Error('Unauthorized');
  }
  await issue.remove();
  return issue;
};
module.exports = {
  createAppointment,
  updateAppointmentStatus,
  notifyUser,
  notifyLawyer,
  getAllAppointments,
  getAppointmentsByLawyer,
  getAppointmentsByUser,
  getAppointmentById,
  getAppointmentByBookingReference,
  cancelAppointment,
  confirmMeeting,
  reportIssue,
  getAllIssues,
  deleteIssue,
};
