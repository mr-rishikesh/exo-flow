const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    file: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: [
        'event_collaboration',
        'partnership',
        'media_inquiry',
        'general_inquiry',
        'newsletter',
        'playbook_subscription',
        'get_featured',
        'other'
      ],
      default: 'general_inquiry',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'replied', 'closed'],
      default: 'new',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
