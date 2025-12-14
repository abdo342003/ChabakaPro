const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// GET /api/portfolio - Liste des cas clients
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      published = 'true',
      limit = 12, 
      page = 1 
    } = req.query;
    
    const query = {};
    
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    // Only filter by published if not 'all'
    if (published && published !== 'all') {
      query.published = published === 'true';
    }

    const cases = await Portfolio.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Portfolio.countDocuments(query);

    res.json({
      success: true,
      data: cases,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Erreur récupération portfolio:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du portfolio'
    });
  }
});

// GET /api/portfolio/featured - Cas en vedette
router.get('/featured', async (req, res) => {
  try {
    const cases = await Portfolio.find({ published: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(3);

    res.json({
      success: true,
      data: cases
    });

  } catch (error) {
    console.error('Erreur cas vedette:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des cas en vedette'
    });
  }
});

// GET /api/portfolio/stats - Statistiques
router.get('/stats', async (req, res) => {
  try {
    const totalClients = await Portfolio.countDocuments({ published: true });
    
    const totalInvestment = await Portfolio.aggregate([
      { $match: { published: true } },
      { $group: { _id: null, total: { $sum: '$investment' } } }
    ]);

    const avgRating = await Portfolio.aggregate([
      { $match: { published: true, 'testimonial.rating': { $exists: true } } },
      { $group: { _id: null, avg: { $avg: '$testimonial.rating' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalClients,
        totalProjects: totalClients,
        totalInvestment: totalInvestment[0]?.total || 0,
        averageRating: avgRating[0]?.avg || 4.8
      }
    });

  } catch (error) {
    console.error('Erreur stats portfolio:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
});

// GET /api/portfolio/:id - Détail d'un cas
router.get('/:id', async (req, res) => {
  try {
    const portfolioCase = await Portfolio.findById(req.params.id);
    
    if (!portfolioCase) {
      return res.status(404).json({
        success: false,
        message: 'Cas client non trouvé'
      });
    }

    res.json({
      success: true,
      data: portfolioCase
    });

  } catch (error) {
    console.error('Erreur récupération cas:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du cas client'
    });
  }
});

// POST /api/portfolio - Créer un cas (admin)
router.post('/', async (req, res) => {
  try {
    const portfolioCase = new Portfolio(req.body);
    await portfolioCase.save();

    res.status(201).json({
      success: true,
      message: 'Cas client créé avec succès',
      data: portfolioCase
    });

  } catch (error) {
    console.error('Erreur création cas:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du cas client',
      error: error.message
    });
  }
});

// PUT /api/portfolio/:id - Modifier un cas (admin)
router.put('/:id', async (req, res) => {
  try {
    const portfolioCase = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!portfolioCase) {
      return res.status(404).json({
        success: false,
        message: 'Cas client non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Cas client mis à jour avec succès',
      data: portfolioCase
    });

  } catch (error) {
    console.error('Erreur mise à jour cas:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du cas client'
    });
  }
});

// DELETE /api/portfolio/:id - Supprimer un cas (admin)
router.delete('/:id', async (req, res) => {
  try {
    const portfolioCase = await Portfolio.findByIdAndDelete(req.params.id);
    
    if (!portfolioCase) {
      return res.status(404).json({
        success: false,
        message: 'Cas client non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Cas client supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur suppression cas:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du cas client'
    });
  }
});

module.exports = router;
