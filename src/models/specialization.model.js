const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Specialization Schema
const specializationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
});


const Specialization = mongoose.model('Specialization', specializationSchema);

module.exports = Specialization;
