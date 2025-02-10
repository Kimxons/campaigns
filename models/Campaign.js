const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  influencerId: {
    type: String,
    required: true,
  },
  campaignName: {
    type: String,
    required: true,
  },
  contentLink: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'approved'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Campaign', campaignSchema);