const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { appointmentService } = require('../services');
const config = require('../config/config');
const socketLogic = require('../utils/socket');
const bookAppointment = catchAsync(async (req, res) => {
  const { lawyerId, date, startTime, endTime, topic, notes, appointmentType, isAnonymous} = req.body;
  const { _id: userId } = req.user;
 // const attachedDocumentsUrls = req.files.map((file) => `${config.server_host}:${config.port}/uploads/${file.filename}`);
  const appointmentData = {
    userId,
    lawyerId,
    date,
    startTime,
    endTime,
    topic,
    notes,
    appointmentType,
    isAnonymous
  };
  const appointment = await appointmentService.createAppointment(appointmentData);
  //await appointmentService.notifyLawyer(appointment.lawyerId, 'New appointment request');
  res.status(httpStatus.CREATED).json(appointment);
});

const updateAppointmentStatus = catchAsync(async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;
  const appointment = await appointmentService.updateAppointmentStatus(appointmentId, status);

  if (status === 'confirmed') {
    await appointmentService.notifyUser(appointment.userId, 'Your appointment has been accepted');
    socketLogic.emitEvent(req.io, 'new appointment', { appointmentId: appointment._id, userId: appointment.userId });
  } else if (status === 'rejected') {
    await appointmentService.notifyUser(appointment.userId, 'Your appointment has been rejected');
  }

  res.status(httpStatus.OK).json(appointment);
});

const getAllAppointments = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const appointments = await appointmentService.getAllAppointments(page, limit);
  res.status(httpStatus.OK).json(appointments);
});

const getAppointmentsByLawyer = catchAsync(async (req, res) => {
  const { lawyerId } = req.params;
  const appointments = await appointmentService.getAppointmentsByLawyer(lawyerId);
  res.status(httpStatus.OK).json(appointments);
});

const getAppointmentsByUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const options = { page, limit };
  const appointments = await appointmentService.getAppointmentsByUser(userId, options);
  res.status(httpStatus.OK).json(appointments);
});
const getTodayAppointmentsByUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const options = { page, limit };
  const appointments = await appointmentService.getTodaysAppointmentsByUser(userId, options);
  res.status(httpStatus.OK).json(appointments);
});
const getAppointmentById = catchAsync(async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await appointmentService.getAppointmentById(appointmentId);
  res.status(httpStatus.OK).json(appointment);
});

const getAppointmentByBookingReference = catchAsync(async (req, res) => {
  const { bookingReference } = req.params;
  const appointment = await appointmentService.getAppointmentByBookingReference(bookingReference);
  res.status(httpStatus.OK).json(appointment);
});

const cancelAppointment = catchAsync(async (req, res) => {
  const { appointmentId } = req.params;
  const { _id: userId } = req.user;
  const appointment = await appointmentService.cancelAppointment(appointmentId, userId);
  res.status(httpStatus.OK).json(appointment);
});

const confirmMeeting = catchAsync(async (req, res) => {
  const { appointmentId } = req.params;
  const appointment = await appointmentService.confirmMeeting(appointmentId);
  res.status(httpStatus.OK).json(appointment);
});

const reportIssue = catchAsync(async (req, res) => {
  const { appointmentId } = req.params;
  const { description } = req.body;
  const { _id: userId } = req.user;
  const proofUrl = `${config.server_host}:${config.port}/uploads/${req.file.filename}`;
  const issue = await appointmentService.reportIssue(appointmentId, userId, description, proofUrl);
  res.status(httpStatus.CREATED).json(issue);
});

/**
 * Fetches all issues.
 * @returns {Promise<Array<Issue>>} The list of issues.
 */
const getAllIssues = catchAsync(async (req, res) => {
  const { page, limit } = req.query;
  const issues = await appointmentService.getAllIssues(page, limit);
  res.status(httpStatus.OK).json(issues);
});

/**
 * Deletes an issue.
 * @param {Request} req - The HTTP request object.
 * @param {Response} res - The HTTP response object.
 * @param {NextFunction} next - The next function to call.
 * @returns {Promise<void>}
 */
const deleteIssue = catchAsync(async (req, res) => {
  const { issueId } = req.params;
  const { _id: userId } = req.user;
  const issue = await appointmentService.deleteIssue(issueId, userId);
  res.status(httpStatus.OK).json(issue);
});

module.exports = {
  bookAppointment,
  updateAppointmentStatus,
  getAllAppointments,
  getAppointmentsByLawyer,
  getAppointmentsByUser,
  getTodayAppointmentsByUser,
  getAppointmentById,
  getAppointmentByBookingReference,
  cancelAppointment,
  confirmMeeting,
  reportIssue,
  getAllIssues,
  deleteIssue,
};
