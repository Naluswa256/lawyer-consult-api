const multer = require('multer');
const path = require('path');

const upload = multer({
  limits: 800000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileType = ['jpg', 'jpeg', 'png'];
    if (allowedFileType.includes(file.mimetype.split('/')[1])) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
module.exports = upload;
