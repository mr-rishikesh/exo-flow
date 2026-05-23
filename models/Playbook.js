const mongoose = require('mongoose');

const playbookSchema = new mongoose.Schema(
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
    subcategory: {
      type: String,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    pages: {
      type: Number,
    },
    downloadUrl: {
      type: String,
    },
    tags: [String],
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

module.exports = mongoose.model('Playbook', playbookSchema);
