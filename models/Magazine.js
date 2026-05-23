const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema(
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
    category: {
      type: String,
    },
    content: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    downloads: {
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

module.exports = mongoose.model('Magazine', magazineSchema);
