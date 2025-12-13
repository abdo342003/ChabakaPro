require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import routes
const contactRoutes = require('./routes/contact');
const devisRoutes = require('./routes/devis');
const blogRoutes = require('./routes/blog');
const portfolioRoutes = require('./routes/portfolio');
const testimonialsRoutes = require('./routes/testimonials');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de sécurité
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// CORS
app.use(cors({
  origin: [
    'https://www.chabakapro.com',
    'https://chabakapro.com',
    'http://localhost:3000',
    'http://localhost:4000'
  ],
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
});
app.use('/api/', limiter);

// Rate limiting pour formulaires (plus strict)
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20, // 20 soumissions max par heure
  message: 'Trop de soumissions. Veuillez réessayer dans une heure.'
});

// Routes
app.use('/api/contact', formLimiter, contactRoutes);
app.use('/api/devis', formLimiter, devisRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/testimonials', testimonialsRoutes);

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    name: 'ChabakaPro API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      devis: '/api/devis',
      blog: '/api/blog',
      portfolio: '/api/portfolio',
      testimonials: '/api/testimonials'
    },
    documentation: 'Accédez aux endpoints via /api/*'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route non trouvée',
    requestedUrl: req.originalUrl,
    availableEndpoints: [
      '/api/health',
      '/api/contact',
      '/api/devis',
      '/api/blog',
      '/api/portfolio',
      '/api/testimonials'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    
    // Démarrer le serveur
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`🌐 API URL: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion MongoDB:', err);
    process.exit(1);
  });

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Fermeture gracieuse...');
  mongoose.connection.close(() => {
    console.log('Connexion MongoDB fermée');
    process.exit(0);
  });
});

module.exports = app;
