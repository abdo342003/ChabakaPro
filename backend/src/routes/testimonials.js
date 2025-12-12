const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// GET /api/testimonials - Liste des témoignages
router.get('/', async (req, res) => {
  try {
    const { 
      verified, 
      featured, 
      published = 'true',
      limit = 12, 
      page = 1 
    } = req.query;
    
    const query = {};
    
    if (verified) query.verified = verified === 'true';
    if (featured) query.featured = featured === 'true';
    if (published) query.published = published === 'true';

    const testimonials = await Testimonial.find(query)
      .sort({ rating: -1, date: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Testimonial.countDocuments(query);

    res.json({
      success: true,
      data: testimonials,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Erreur récupération témoignages:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des témoignages'
    });
  }
});

// GET /api/testimonials/featured - Témoignages en vedette
router.get('/featured', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ 
      published: true, 
      featured: true 
    })
      .sort({ rating: -1 })
      .limit(3);

    res.json({
      success: true,
      data: testimonials
    });

  } catch (error) {
    console.error('Erreur témoignages vedette:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des témoignages en vedette'
    });
  }
});

// GET /api/testimonials/stats - Statistiques
router.get('/stats', async (req, res) => {
  try {
    const avgRating = await Testimonial.aggregate([
      { $match: { published: true } },
      { $group: { _id: null, avg: { $avg: '$rating' } } }
    ]);

    const total = await Testimonial.countDocuments({ published: true });

    res.json({
      success: true,
      data: {
        averageRating: avgRating[0]?.avg || 5,
        totalTestimonials: total
      }
    });

  } catch (error) {
    console.error('Erreur stats témoignages:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
});

// POST /api/testimonials - Créer un témoignage
router.post('/', async (req, res) => {
  try {
    const testimonial = new Testimonial({
      ...req.body,
      published: false, // Par défaut non publié (modération)
      verified: false
    });
    
    await testimonial.save();

    res.status(201).json({
      success: true,
      message: 'Témoignage soumis avec succès. Il sera publié après validation.',
      data: testimonial
    });

  } catch (error) {
    console.error('Erreur création témoignage:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la soumission du témoignage',
      error: error.message
    });
  }
});

// PATCH /api/testimonials/:id - Mettre à jour un témoignage (admin)
router.patch('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Témoignage non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Témoignage mis à jour avec succès',
      data: testimonial
    });

  } catch (error) {
    console.error('Erreur mise à jour témoignage:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du témoignage'
    });
  }
});

// DELETE /api/testimonials/:id - Supprimer un témoignage (admin)
router.delete('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Témoignage non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Témoignage supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur suppression témoignage:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du témoignage'
    });
  }
});

module.exports = router;
