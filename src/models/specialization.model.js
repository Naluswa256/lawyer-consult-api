const mongoose = require('mongoose');

const { Schema } = mongoose;

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
// Static method to check if the specialization name is taken
specializationSchema.statics.isNameTaken = async function (name, excludeSpecializationId) {
  const specialization = await this.findOne({ name, _id: { $ne: excludeSpecializationId } });
  return !!specialization;
};

const Specialization = mongoose.model('Specialization', specializationSchema);

module.exports = Specialization;
