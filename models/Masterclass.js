const mongoose = require('mongoose');

const masterclassSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    bannerImage: {
      type: String,
    },
    speaker: {
      type: String,
    },
    speakerBio: {
      type: String,
    },
    speakerImage: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    duration: {
      type: String,
    },
    timezone: {
      type: String,
    },
    level: {
      type: String,
    },
    maxParticipants: {
      type: Number,
    },
    currentEnrollments: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
    },
    currency: {
      type: String,
    },
    topics: [String],
    requirements: {
      type: String,
    },
    materials: {
      type: String,
    },
    certification: {
      type: Boolean,
      default: false,
    },
    certificateType: {
      type: String,
    },
    recordingAvailable: {
      type: Boolean,
      default: false,
    },
    registrationUrl: {
      type: String,
    },
    tags: [String],
    enrollments: {
      type: Number,
      default: 0,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Masterclass', masterclassSchema);
