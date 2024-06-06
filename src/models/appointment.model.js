const mongoose = require('mongoose');

const { Schema } = mongoose;

// Appointment Schema
const appointmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lawyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    attachedDocument: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'rejected'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid',
    },
    notes: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
