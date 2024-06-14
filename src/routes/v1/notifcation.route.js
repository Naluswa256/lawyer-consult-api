const express = require('express');
const {
  getUserNotificationsController,
  markNotificationAsReadController,
  deleteNotificationController,
} = require('../../controllers/notification.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/', auth(), getUserNotificationsController);
router.patch('/:notificationId/read', auth(), markNotificationAsReadController);
router.delete('/:notificationId', auth(), deleteNotificationController);

module.exports = router;
