const mongoose = require('mongoose');
const { encryptSymmetric, decryptSymmetric } = require('../utils/encryption');

const { Schema } = mongoose;
const { toJSON, paginate } = require('./plugins');

function generateBookingReference() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let bookingCode = '';
  for (let i = 0; i < 12; i += 1) {
    bookingCode += characters.charAt(Math.floor(Math.random() * characters.length));
    if (i === 3 || i === 7) {
      bookingCode += '-'; // Insert dashes at positions 4 and 8
    }
  }
  return bookingCode;
}

const packageSchema = new Schema({
  duration: {
    type: Number, // Duration in minutes (e.g., 30, 60, 90)
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const appointmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    appointmentType: {
      type: String,
      required: true,
      enum: ['videoCall', 'voiceCall', 'physicalMeeting'],
    },
    lawyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    attachedDocument: {
      type: [String],
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
    package: {
      type: packageSchema,
      required: true,
    },
    bookingReference: {
      type: String,
      default: generateBookingReference(),
    },
    isAnonymous: {
      type: Boolean,
      default: false,
    },
    transactionReference: {
      type: String,
      required: false,
    },
    iv: String,
    tag: String,
  },
  { timestamps: true }
);

appointmentSchema.pre('save', function (next) {
  const appointment = this;
  if (appointment.startTime >= appointment.endTime) {
    return next(new Error('Start time must be before end time'));
  }
  if (this.isModified('topic')) {
    const { ciphertext, iv, tag } = encryptSymmetric(this.encryptedTopic, this.lawyerId);
    this.topic = ciphertext;
    this.iv = iv;
    this.tag = tag;
  }
  if (this.isModified('notes')) {
    const { ciphertext, iv, tag } = encryptSymmetric(this.encryptedNotes, this.lawyerId);
    this.notes = ciphertext;
    this.iv = iv;
    this.tag = tag;
  }
  next();
});

appointmentSchema.post('find', function (docs, next) {
  docs.forEach((doc) => {
    const updatedDoc = { ...doc };
    if (updatedDoc.encryptedTopic) {
      updatedDoc.topic = decryptSymmetric(updatedDoc.encryptedTopic, updatedDoc.iv, updatedDoc.tag, updatedDoc.lawyerId);
    }
    if (updatedDoc.encryptedNotes) {
      updatedDoc.notes = decryptSymmetric(updatedDoc.encryptedNotes, updatedDoc.iv, updatedDoc.tag, updatedDoc.lawyerId);
    }
    // Replace original doc with updatedDoc
    Object.assign(doc, updatedDoc);
  });
  next();
});

appointmentSchema.plugin(paginate);
appointmentSchema.plugin(toJSON);
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
