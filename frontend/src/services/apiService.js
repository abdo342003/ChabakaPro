import api from './api';

// Envoyer un message de contact
export const sendContact = async (data) => {
  return await api.post('/contact', data);
};

// Envoyer une demande de devis
export const sendDevis = async (data) => {
  return await api.post('/devis', data);
};

// ============ BLOG API ============

// Récupérer les articles de blog
export const getBlogPosts = async (params = {}) => {
  return await api.get('/blog', { params });
};

// Récupérer un article de blog par slug
export const getBlogPost = async (slug) => {
  return await api.get(`/blog/${slug}`);
};

// Récupérer les articles en vedette
export const getFeaturedPosts = async () => {
  return await api.get('/blog/featured');
};

// Récupérer les catégories de blog
export const getBlogCategories = async () => {
  return await api.get('/blog/categories');
};

// Créer un article de blog
export const createBlogPost = async (data) => {
  return await api.post('/blog', data);
};

// Modifier un article de blog
export const updateBlogPost = async (id, data) => {
  return await api.put(`/blog/${id}`, data);
};

// Supprimer un article de blog
export const deleteBlogPost = async (id) => {
  return await api.delete(`/blog/${id}`);
};

// ============ PORTFOLIO API ============

// Récupérer les cas clients
export const getPortfolioCases = async (params = {}) => {
  return await api.get('/portfolio', { params });
};

// Récupérer un cas client par ID
export const getPortfolioCase = async (id) => {
  return await api.get(`/portfolio/${id}`);
};

// Récupérer les cas en vedette
export const getFeaturedCases = async () => {
  return await api.get('/portfolio/featured');
};

// Récupérer les statistiques portfolio
export const getPortfolioStats = async () => {
  return await api.get('/portfolio/stats');
};

// Créer un cas client
export const createPortfolioCase = async (data) => {
  return await api.post('/portfolio', data);
};

// Modifier un cas client
export const updatePortfolioCase = async (id, data) => {
  return await api.put(`/portfolio/${id}`, data);
};

// Supprimer un cas client
export const deletePortfolioCase = async (id) => {
  return await api.delete(`/portfolio/${id}`);
};

// ============ TESTIMONIALS API ============

// Récupérer les témoignages
export const getTestimonials = async (params = {}) => {
  return await api.get('/testimonials', { params });
};

// Récupérer les témoignages en vedette
export const getFeaturedTestimonials = async () => {
  return await api.get('/testimonials/featured');
};

// Créer un témoignage
export const createTestimonial = async (data) => {
  return await api.post('/testimonials', data);
};
