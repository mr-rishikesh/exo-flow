const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
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
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    summary: {
      type: String,
    },
    description: {
      type: String,
    },
    url: {
      type: String,
    },
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    tags: [String],
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

module.exports = mongoose.model('Article', articleSchema);
