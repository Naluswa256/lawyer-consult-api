const express = require('express');
const httpStatus = require('http-status');

const router = express.Router();
const upload = require('../../config/fileUpload');
const { User } = require('../../models');
const config = require('../../config/config');
const auth = require('../../middlewares/auth');

router.post('/avatar', auth(), upload.single('avatar'), async (req, res) => {
  const { _id: userId } = req.user;
  if (!req.file) {
    return res.status(httpStatus.BAD_REQUEST).send('No file uploaded.');
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).send('User not found.');
    }

    user.avatar = `${config.server_host}/uploads/${req.file.filename}`;
    await user.save();

    res.status(httpStatus.OK).send('Avatar updated successfully.');
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Server error.');
  }
});

module.exports = router;
