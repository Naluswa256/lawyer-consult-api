const httpStatus = require('http-status');
const { getUserNotifications, markNotificationAsRead, deleteNotification } = require('../services/notification.service');
const catchAsync = require('../utils/catchAsync');

const getUserNotificationsController = catchAsync(async (req, res) => {
  const notifications = await getUserNotifications(req.user._id);
  res.status(httpStatus.OK).send(notifications);
});

const markNotificationAsReadController = catchAsync(async (req, res) => {
  const notification = await markNotificationAsRead(req.params.notificationId);
  res.status(httpStatus.OK).send(notification);
});

const deleteNotificationController = catchAsync(async (req, res) => {
  await deleteNotification(req.params.notificationId);
  res.status(httpStatus.OK).send({ message: 'Notification deleted' });
});

module.exports = {
  getUserNotificationsController,
  markNotificationAsReadController,
  deleteNotificationController,
};
