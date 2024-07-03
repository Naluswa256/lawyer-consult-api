const express = require('express');

const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const uploadMiddleware = require('../../middlewares/upload');
const validateAppointment = require('../../validations/appointment.validation');
const AppointmentController = require('../../controllers/appointment.controller');

router.post(
  '/',
  auth(),
  validate(validateAppointment.appointmentSchema),
  AppointmentController.bookAppointment
);
router.post(
  '/:appointmentId/update-status',
  auth(),
  validate(validateAppointment.updateAppointmentStatus),
  AppointmentController.updateAppointmentStatus
);
router.get('/', auth(), AppointmentController.getAllAppointments);
router.get('/lawyer/:lawyerId', auth(), AppointmentController.getAppointmentsByLawyer);
router.get('/user/:userId', auth(), AppointmentController.getAppointmentsByUser);
router.get('/:appointmentId', auth(), AppointmentController.getAppointmentById);
router.get(
  '/booking-reference/:bookingReference',
  auth(),
  AppointmentController.getAppointmentByBookingReference
);
router.post('/:appointmentId/cancel', auth(), AppointmentController.cancelAppointment);
router.post('/:appointmentId/confirm', auth(), AppointmentController.confirmMeeting);
router.post(
  '/:appointmentId/report-issue',
  auth(),
  uploadMiddleware.single('proof'),
  AppointmentController.reportIssue
);
router.get('/issues', auth('admin'), AppointmentController.getAllIssues);
router.delete('/issues/:issueId', auth(), validate(validateAppointment.deleteIssue), AppointmentController.deleteIssue);

module.exports = router;
