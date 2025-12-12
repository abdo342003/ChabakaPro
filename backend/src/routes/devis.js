const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Devis = require('../models/Devis');
// const { sendDevisEmail } = require('../utils/emailService'); // Temporarily disabled

// Validation middleware
const devisValidation = [
  body('clientType').isIn(['particulier', 'entreprise']).withMessage('Type de client invalide'),
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('phone').matches(/^(\+212|0)[5-7]\d{8}$/).withMessage('Numéro de téléphone marocain invalide'),
  body('service').notEmpty().withMessage('Le service est requis'),
  body('description').trim().notEmpty().isLength({ max: 3000 }).withMessage('Description requise (max 3000 caractères)')
];

// POST /api/devis - Créer une demande de devis
router.post('/', devisValidation, async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Créer le devis
    const devis = new Devis({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    await devis.save();

    // Envoyer email de notification (temporarily disabled)
    // try {
    //   await sendDevisEmail(devis);
    // } catch (emailError) {
    //   console.error('Erreur envoi email:', emailError);
    // }

    res.status(201).json({
      success: true,
      message: 'Demande de devis envoyée avec succès. Nous vous contacterons sous 24h.',
      data: {
        id: devis._id,
        createdAt: devis.createdAt
      }
    });

  } catch (error) {
    console.error('Erreur création devis:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi de la demande. Veuillez réessayer.'
    });
  }
});

// GET /api/devis - Liste des devis (admin)
router.get('/', async (req, res) => {
  try {
    const { status, urgence, service, limit = 50, page = 1 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (urgence) query.urgence = urgence;
    if (service) query.service = service;

    const devis = await Devis.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Devis.countDocuments(query);

    res.json({
      success: true,
      data: devis,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Erreur récupération devis:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des devis'
    });
  }
});

// GET /api/devis/:id - Détail d'un devis
router.get('/:id', async (req, res) => {
  try {
    const devis = await Devis.findById(req.params.id);
    
    if (!devis) {
      return res.status(404).json({
        success: false,
        message: 'Devis non trouvé'
      });
    }

    res.json({
      success: true,
      data: devis
    });

  } catch (error) {
    console.error('Erreur récupération devis:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du devis'
    });
  }
});

// PATCH /api/devis/:id - Mettre à jour un devis
router.patch('/:id', async (req, res) => {
  try {
    const { status, montantDevis, notes } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (montantDevis !== undefined) updateData.montantDevis = montantDevis;
    if (notes !== undefined) updateData.notes = notes;

    const devis = await Devis.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!devis) {
      return res.status(404).json({
        success: false,
        message: 'Devis non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Devis mis à jour avec succès',
      data: devis
    });

  } catch (error) {
    console.error('Erreur mise à jour devis:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du devis'
    });
  }
});

// GET /api/devis/stats - Statistiques devis
router.get('/admin/stats', async (req, res) => {
  try {
    const stats = await Devis.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalMontant: { $sum: '$montantDevis' }
        }
      }
    ]);

    const serviceStats = await Devis.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        byStatus: stats,
        byService: serviceStats
      }
    });

  } catch (error) {
    console.error('Erreur stats devis:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
});

module.exports = router;
