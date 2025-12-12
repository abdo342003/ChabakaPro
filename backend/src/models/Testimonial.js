const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  role: {
    type: String,
    trim: true,
    maxlength: [100, 'Le rôle ne peut pas dépasser 100 caractères']
  },
  company: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true,
    default: 'Casablanca'
  },
  rating: {
    type: Number,
    required: [true, 'La note est requise'],
    min: [1, 'La note minimale est 1'],
    max: [5, 'La note maximale est 5'],
    default: 5
  },
  text: {
    type: String,
    required: [true, 'Le témoignage est requis'],
    trim: true,
    maxlength: [1000, 'Le témoignage ne peut pas dépasser 1000 caractères']
  },
  image: {
    type: String,
    default: '/images/testimonials/default-avatar.jpg'
  },
  verified: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index
testimonialSchema.index({ published: 1, rating: -1 });
testimonialSchema.index({ featured: 1 });
testimonialSchema.index({ verified: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
