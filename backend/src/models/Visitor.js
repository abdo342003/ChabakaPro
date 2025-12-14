const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  // Session ID (stored in cookie)
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  
  // IP Address
  ipAddress: {
    type: String,
    default: 'unknown'
  },
  
  // Location (from IP)
  location: {
    country: String,
    city: String,
    region: String
  },
  
  // Device Info
  device: {
    type: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'unknown'
    },
    browser: String,
    os: String,
    userAgent: String
  },
  
  // Referrer
  referrer: {
    type: String,
    default: 'direct'
  },
  
  // Pages visited
  pages: [{
    path: String,
    title: String,
    visitedAt: {
      type: Date,
      default: Date.now
    },
    duration: Number // seconds spent on page
  }],
  
  // First visit
  firstVisit: {
    type: Date,
    default: Date.now
  },
  
  // Last activity
  lastActivity: {
    type: Date,
    default: Date.now
  },
  
  // Total visits (sessions)
  visitCount: {
    type: Number,
    default: 1
  },
  
  // Total page views
  pageViews: {
    type: Number,
    default: 0
  },
  
  // UTM Parameters
  utm: {
    source: String,
    medium: String,
    campaign: String,
    term: String,
    content: String
  },
  
  // Screen info
  screen: {
    width: Number,
    height: Number
  },
  
  // Language
  language: String,
  
  // Is returning visitor
  isReturning: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for analytics queries
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ 'location.country': 1 });
visitorSchema.index({ 'device.type': 1 });
visitorSchema.index({ firstVisit: -1 });
visitorSchema.index({ lastActivity: -1 });

module.exports = mongoose.model('Visitor', visitorSchema);
