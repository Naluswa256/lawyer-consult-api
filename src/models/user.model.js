const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    fcmToken: {},
    about: {
      type: String,
      default: '',
    },
    fullNames: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'customer',
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneNumberVerified: {
      type: Boolean,
      default: false,
    },
    isProfilePublic: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    availableForWork: {
      type: Boolean,
      default: false,
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
    specializations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization',
      },
    ],
    availableSlots: [
      {
        day: {
          type: String,
          required: true,
        },
        timeSlots: [
          {
            startTime: {
              type: String,
              required: true,
            },
            endTime: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],

    employmentHistory: [
      {
        companyName: {
          type: String,
          required: true,
        },
        jobTitle: {
          type: String,
          required: true,
        },
        description: String,
        startMonth: {
          type: String,
          required: true,
        },
        startYear: {
          type: Number,
          required: true,
        },
        endMonth: String,
        endYear: Number,
        isCurrent: {
          type: Boolean,
          default: false,
        },
      },
    ],

    education: [
      {
        institutionName: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        fieldOfStudy: String,
        startYear: {
          type: Number,
          required: true,
        },
        endYear: {
          type: Number,
        },
        currentlyAttending: {
          type: Boolean,
          default: false,
        },
      },
    ],
    reviewsReceived:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      }],
    reviewsGiven:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      }],

    completedConsultations: {
      type: Number,
      default: 0,
    },

    socialMediaLinkedAccounts: [
      {
        platform: String,
        url: String,
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
