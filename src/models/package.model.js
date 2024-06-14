const mongoose = require('mongoose');

const { Schema } = mongoose;

const packageSchema = new Schema(
  {
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
