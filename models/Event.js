const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
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
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    endDate: {
      type: String,
    },
    time: {
      type: String,
    },
    duration: {
      type: String,
    },
    location: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    type: {
      type: String,
    },
    category: {
      type: String,
    },
    speaker: {
      type: String,
    },
    url: {
      type: String,
    },
    tags: [String],
    registrations: {
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

module.exports = mongoose.model('Event', eventSchema);
