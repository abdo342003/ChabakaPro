const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [200, 'Le titre ne peut pas dépasser 200 caractères']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: [true, 'L\'extrait est requis'],
    trim: true,
    maxlength: [500, 'L\'extrait ne peut pas dépasser 500 caractères']
  },
  content: {
    type: String,
    required: [true, 'Le contenu est requis']
  },
  category: {
    type: String,
    required: [true, 'La catégorie est requise'],
    enum: ['wifi', 'securite', 'os', 'reseau', 'hardware', 'cloud', 'actualites'],
    default: 'actualites'
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: String,
    default: 'ChabakaPro Team'
  },
  readTime: {
    type: Number,
    default: 5
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    default: '/images/blog/default.jpg'
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'La méta description ne peut pas dépasser 160 caractères']
  },
  views: {
    type: Number,
    default: 0
  },
  publishedAt: Date
}, {
  timestamps: true
});

// Index pour recherche et performance
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1, published: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ publishedAt: -1 });
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

// Générer le slug automatiquement avant sauvegarde
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
