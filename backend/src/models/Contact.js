const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email invalide']
  },
  phone: {
    type: String,
    required: [true, 'Le téléphone est requis'],
    trim: true,
    match: [/^(\+212|0)[5-7]\d{8}$/, 'Numéro de téléphone marocain invalide']
  },
  company: {
    type: String,
    trim: true,
    maxlength: [200, 'Le nom de l\'entreprise ne peut pas dépasser 200 caractères']
  },
  subject: {
    type: String,
    required: [true, 'Le sujet est requis'],
    enum: ['depannage', 'devis', 'support', 'autre'],
    default: 'autre'
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
    trim: true,
    maxlength: [2000, 'Le message ne peut pas dépasser 2000 caractères']
  },
  status: {
    type: String,
    enum: ['nouveau', 'en_cours', 'traite', 'archive'],
    default: 'nouveau'
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Index pour recherche
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });

module.exports = mongoose.model('Contact', contactSchema);
