const fs = require('fs');
const httpStatus = require('http-status');
const upload = require('../config/fileUpload');

const uploadMiddleware = (req, res, next) => {
  upload.array('files', 5)(req, res, (err) => {
    if (err) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: err.message });
    }
    const { files } = req;
    const errors = [];
    files.forEach((file) => {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    if (errors.length > 0) {
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });

      return res.status(httpStatus.BAD_REQUEST).json({ errors });
    }

    req.files = files;
    next();
  });
};

module.exports = uploadMiddleware;
