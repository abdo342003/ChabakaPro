const mongoose = require('mongoose');

const devisSchema = new mongoose.Schema({
  clientType: {
    type: String,
    required: [true, 'Le type de client est requis'],
    enum: ['particulier', 'entreprise'],
    default: 'particulier'
  },
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
    trim: true
  },
  service: {
    type: String,
    required: [true, 'Le service est requis'],
    enum: [
      'depannage_pc',
      'installation_wifi',
      'installation_os',
      'securite_reseau',
      'cameras_ip',
      'maintenance_annuelle',
      'conception_reseau',
      'windows_server',
      'sauvegarde_cloud',
      'surveillance_pro',
      'microsoft_365',
      'audit_securite',
      'support_mensuel',
      'autre'
    ]
  },
  budgetEstime: {
    type: Number,
    min: [0, 'Le budget ne peut pas être négatif']
  },
  description: {
    type: String,
    required: [true, 'La description est requise'],
    trim: true,
    maxlength: [3000, 'La description ne peut pas dépasser 3000 caractères']
  },
  urgence: {
    type: String,
    enum: ['normale', 'urgente', 'tres_urgente'],
    default: 'normale'
  },
  status: {
    type: String,
    enum: ['en_attente', 'en_cours', 'envoye', 'accepte', 'refuse', 'archive'],
    default: 'en_attente'
  },
  montantDevis: {
    type: Number,
    min: [0, 'Le montant ne peut pas être négatif']
  },
  notes: String,
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Index pour recherche
devisSchema.index({ email: 1, createdAt: -1 });
devisSchema.index({ status: 1, urgence: 1 });
devisSchema.index({ service: 1 });

module.exports = mongoose.model('Devis', devisSchema);
