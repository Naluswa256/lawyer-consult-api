const admin = require('../firebase/firebaseAdmin');
const { User, Notification } = require('../models');
const { sendNotification } = require('../utils/socket');
/**
 * Send push notification to a single user
 * @param {string} userId - The ID of the user to send the notification to
 * @param {string} title - The title of the notification
 * @param {string} body - The body of the notification
 * @returns {Promise}
 */
const sendPushNotification = async (userId, title, body) => {
  // Retrieve the user's FCM token from the database
  const user = await User.findById(userId);
  const { fcmToken } = user;

  if (!fcmToken) {
    throw new Error('FCM token not found for user');
  }

  const message = {
    notification: {
      title,
      body,
    },
    token: fcmToken,
  };
  const notification = new Notification({
    user: userId,
    title,
    message,
  });

  await notification.save();
  await sendNotification(userId, notification);
  return admin.messaging().send(message);
};

/**
 * Send push notification to multiple tokens
 * @param {Array<string>} tokens - The FCM tokens to send the notification to
 * @param {string} title - The title of the notification
 * @param {string} body - The body of the notification
 * @param {object} io - The Socket.io instance
 * @returns {Promise}
 */
const sendPushNotificationToMultipleTokens = async (tokens, title, body) => {
  if (!tokens || tokens.length === 0) {
    throw new Error('No FCM tokens provided');
  }

  const users = await User.find({ fcmToken: { $in: tokens } });
  const notifications = users.map((user) => ({
    user: user._id,
    title,
    message: body,
  }));

  const savedNotifications = await Notification.insertMany(notifications);

  savedNotifications.forEach(async (notification) => {
    await sendNotification(notification.user, notification);
  });

  const message = {
    notification: {
      title,
      body,
    },
    tokens,
  };

  return admin.messaging().sendEachForMulticast(message);
};
const getUserNotifications = async (userId) => {
  return Notification.find({ user: userId }).sort({ createdAt: -1 });
};

const markNotificationAsRead = async (notificationId) => {
  return Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
};

const deleteNotification = async (notificationId) => {
  return Notification.findByIdAndDelete(notificationId);
};
module.exports = {
  sendPushNotification,
  sendPushNotificationToMultipleTokens,
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
};
