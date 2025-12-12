const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET /api/blog - Liste des articles
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      tag, 
      featured, 
      published = 'true',
      limit = 12, 
      page = 1,
      search 
    } = req.query;
    
    const query = {};
    
    // Filtres
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (featured) query.featured = featured === 'true';
    if (published) query.published = published === 'true';
    
    // Recherche texte
    if (search) {
      query.$text = { $search: search };
    }

    const articles = await Blog.find(query)
      .select('-content') // Ne pas inclure le contenu complet dans la liste
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const total = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: articles,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });

  } catch (error) {
    console.error('Erreur récupération articles:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles'
    });
  }
});

// GET /api/blog/featured - Articles en vedette
router.get('/featured', async (req, res) => {
  try {
    const articles = await Blog.find({ published: true, featured: true })
      .select('-content')
      .sort({ publishedAt: -1 })
      .limit(3);

    res.json({
      success: true,
      data: articles
    });

  } catch (error) {
    console.error('Erreur articles vedette:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des articles en vedette'
    });
  }
});

// GET /api/blog/categories - Liste des catégories avec compte
router.get('/categories', async (req, res) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { published: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: categories
    });

  } catch (error) {
    console.error('Erreur catégories:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des catégories'
    });
  }
});

// GET /api/blog/:slug - Détail d'un article
router.get('/:slug', async (req, res) => {
  try {
    const article = await Blog.findOne({ slug: req.params.slug });
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    // Incrémenter les vues
    article.views += 1;
    await article.save();

    res.json({
      success: true,
      data: article
    });

  } catch (error) {
    console.error('Erreur récupération article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'article'
    });
  }
});

// POST /api/blog - Créer un article (admin)
router.post('/', async (req, res) => {
  try {
    const article = new Blog(req.body);
    
    if (article.published && !article.publishedAt) {
      article.publishedAt = new Date();
    }

    await article.save();

    res.status(201).json({
      success: true,
      message: 'Article créé avec succès',
      data: article
    });

  } catch (error) {
    console.error('Erreur création article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de l\'article',
      error: error.message
    });
  }
});

// PUT /api/blog/:id - Modifier un article (admin)
router.put('/:id', async (req, res) => {
  try {
    const article = await Blog.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    // Si on publie l'article pour la première fois
    if (req.body.published && !article.published && !article.publishedAt) {
      req.body.publishedAt = new Date();
    }

    Object.assign(article, req.body);
    await article.save();

    res.json({
      success: true,
      message: 'Article mis à jour avec succès',
      data: article
    });

  } catch (error) {
    console.error('Erreur mise à jour article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de l\'article'
    });
  }
});

// DELETE /api/blog/:id - Supprimer un article (admin)
router.delete('/:id', async (req, res) => {
  try {
    const article = await Blog.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article non trouvé'
      });
    }

    res.json({
      success: true,
      message: 'Article supprimé avec succès'
    });

  } catch (error) {
    console.error('Erreur suppression article:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'article'
    });
  }
});

module.exports = router;
