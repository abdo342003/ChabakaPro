const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
// const { sendContactEmail } = require('../utils/emailService'); // Temporarily disabled

// Validation middleware
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('phone').matches(/^(\+212|0)[5-7]\d{8}$/).withMessage('Numéro de téléphone marocain invalide'),
  body('subject').isIn(['depannage', 'devis', 'support', 'autre']).withMessage('Sujet invalide'),
  body('message').trim().notEmpty().isLength({ max: 2000 }).withMessage('Message requis (max 2000 caractères)')
];

// POST /api/contact - Créer un message de contact
router.post('/', contactValidation, async (req, res) => {
  try {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Créer le contact
    const contact = new Contact({
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    await contact.save();

    // Envoyer email de notification (temporarily disabled)
    // try {
    //   await sendContactEmail(contact);
    // } catch (emailError) {
    //   console.error('Erreur envoi email:', emailError);
    //   // Ne pas bloquer la requête si l'email échoue
    // }

    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès. Nous vous répondrons sous 24h.',
      data: {
        id: contact._id,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Erreur création contact:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    });
  }
});

// GET /api/contact - Liste des contacts (admin)
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Erreur récupération contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des contacts'
    });
  }
});

// GET /api/contact/:id - Détail d'un contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Erreur récupération contact:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du contact'
    });
  }
});

// PATCH /api/contact/:id - Mettre à jour le statut
router.patch('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Contact mis à jour avec succès',
      data: contact
    });

  } catch (error) {
    console.error('Erreur mise à jour contact:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du contact'
    });
  }
});

module.exports = router;
