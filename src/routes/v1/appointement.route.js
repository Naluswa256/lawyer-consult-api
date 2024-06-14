const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const uploadMiddleware = require('../../middlewares/upload');
const validateAppointment = require('../../validations/appointment.validation');
const AppointmentController = require('../../controllers/appointment.controller');

router.post(
  '/appointments',
  auth(),
  uploadMiddleware,
  validate(validateAppointment.appointmentSchema),
  AppointmentController.bookAppointment
);
router.post(
  '/appointments/:appointmentId/update-status',
  auth(),
  validate(validateAppointment.updateAppointmentStatus),
  AppointmentController.updateAppointmentStatus
);
router.get('/appointments', auth(), AppointmentController.getAllAppointments);
router.get('/appointments/lawyer/:lawyerId', auth(), AppointmentController.getAppointmentsByLawyer);
router.get('/appointments/user/:userId', auth(), AppointmentController.getAppointmentsByUser);
router.get('/appointments/:appointmentId', auth(), AppointmentController.getAppointmentById);
router.get(
  '/appointments/booking-reference/:bookingReference',
  auth(),
  AppointmentController.getAppointmentByBookingReference
);
router.post('/appointments/:appointmentId/cancel', auth(), AppointmentController.cancelAppointment);
router.post('/appointments/:appointmentId/confirm', auth(), AppointmentController.confirmMeeting);
router.post(
  '/appointments/:appointmentId/report-issue',
  auth(),
  uploadMiddleware.single('proof'),
  AppointmentController.reportIssue
);
router.get('/issues', auth('admin'), AppointmentController.getAllIssues);
router.delete('/issues/:issueId', auth(), validate(validateAppointment.deleteIssue), AppointmentController.deleteIssue);

module.exports = router;
