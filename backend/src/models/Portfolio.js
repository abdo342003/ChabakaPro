const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères']
  },
  client: {
    type: String,
    required: [true, 'Le nom du client est requis'],
    trim: true
  },
  sector: {
    type: String,
    trim: true
  },
  teamSize: Number,
  challenge: {
    type: String,
    required: [true, 'Le défi est requis'],
    maxlength: [1000, 'Le défi ne peut pas dépasser 1000 caractères']
  },
  solution: [{
    type: String,
    trim: true
  }],
  results: [{
    type: String,
    trim: true
  }],
  investment: {
    type: Number,
    required: [true, 'L\'investissement est requis'],
    min: [0, 'L\'investissement ne peut pas être négatif']
  },
  duration: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['particulier', 'entreprise', 'pme', 'grand_compte'],
    default: 'particulier'
  },
  image: {
    type: String,
    default: '/images/portfolio/default.jpg'
  },
  gallery: [{
    type: String
  }],
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  testimonial: {
    name: String,
    role: String,
    text: String,
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  technologies: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index
portfolioSchema.index({ category: 1, published: 1 });
portfolioSchema.index({ featured: 1 });
portfolioSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);
