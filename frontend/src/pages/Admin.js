import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, FaEnvelope, FaFileInvoice, FaBlog, FaBriefcase, 
  FaStar, FaEye, FaChartLine, FaSignOutAlt, FaTrash, FaCheck,
  FaTimes, FaExclamationCircle, FaCalendar, FaGlobe
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import Logo from '../components/common/Logo';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // États pour les données
  const [contacts, setContacts] = useState([]);
  const [devis, setDevis] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalDevis: 0,
    totalBlogs: 0,
    totalPortfolios: 0,
    totalTestimonials: 0,
    pendingContacts: 0,
    pendingDevis: 0
  });

  // Authentification simple (mot de passe codé en dur pour démo)
  const handleLogin = (e) => {
    e.preventDefault();
    // Mot de passe: admin2025
    if (password === 'admin2025') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      toast.success('Connexion réussie!');
      loadAllData();
    } else {
      toast.error('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  // Charger toutes les données
  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadContacts(),
        loadDevis(),
        loadBlogs(),
        loadPortfolios(),
        loadTestimonials()
      ]);
    } catch (error) {
      console.error('Erreur chargement données:', error);
    }
    setLoading(false);
  };

  const loadContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contact`);
      const data = response.data.data || [];
      setContacts(data);
      updateStats('contacts', data);
    } catch (error) {
      console.error('Erreur chargement contacts:', error);
    }
  };

  const loadDevis = async () => {
    try {
      const response = await axios.get(`${API_URL}/devis`);
      const data = response.data.data || [];
      setDevis(data);
      updateStats('devis', data);
    } catch (error) {
      console.error('Erreur chargement devis:', error);
    }
  };

  const loadBlogs = async () => {
    try {
      const response = await axios.get(`${API_URL}/blog`);
      const data = response.data.data || [];
      setBlogs(data);
      updateStats('blogs', data);
    } catch (error) {
      console.error('Erreur chargement blogs:', error);
    }
  };

  const loadPortfolios = async () => {
    try {
      const response = await axios.get(`${API_URL}/portfolio`);
      const data = response.data.data || [];
      setPortfolios(data);
      updateStats('portfolios', data);
    } catch (error) {
      console.error('Erreur chargement portfolios:', error);
    }
  };

  const loadTestimonials = async () => {
    try {
      const response = await axios.get(`${API_URL}/testimonials`);
      const data = response.data.data || [];
      setTestimonials(data);
      updateStats('testimonials', data);
    } catch (error) {
      console.error('Erreur chargement testimonials:', error);
    }
  };

  const updateStats = (type, data) => {
    setStats(prev => {
      const newStats = { ...prev };
      
      switch(type) {
        case 'contacts':
          newStats.totalContacts = data.length;
          newStats.pendingContacts = data.filter(c => c.status === 'pending').length;
          break;
        case 'devis':
          newStats.totalDevis = data.length;
          newStats.pendingDevis = data.filter(d => d.status === 'pending').length;
          break;
        case 'blogs':
          newStats.totalBlogs = data.length;
          break;
        case 'portfolios':
          newStats.totalPortfolios = data.length;
          break;
        case 'testimonials':
          newStats.totalTestimonials = data.length;
          break;
        default:
          break;
      }
      
      return newStats;
    });
  };

  // Actions
  const updateContactStatus = async (id, status) => {
    try {
      await axios.patch(`${API_URL}/contact/${id}`, { status });
      toast.success('Statut mis à jour');
      loadContacts();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce contact?')) return;
    
    try {
      await axios.delete(`${API_URL}/contact/${id}`);
      toast.success('Contact supprimé');
      loadContacts();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const deleteDevis = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce devis?')) return;
    
    try {
      await axios.delete(`${API_URL}/devis/${id}`);
      toast.success('Devis supprimé');
      loadDevis();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce témoignage?')) return;
    
    try {
      await axios.delete(`${API_URL}/testimonials/${id}`);
      toast.success('Témoignage supprimé');
      loadTestimonials();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const toggleTestimonialStatus = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/testimonials/${id}`, { 
        published: !currentStatus 
      });
      toast.success('Statut mis à jour');
      loadTestimonials();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
    }
  };

  // Interface de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <Logo className="h-16" variant="icon" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Administration</h1>
            <p className="text-gray-600 mt-2">ChabakaPro Dashboard</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Mot de passe administrateur
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Accès réservé aux administrateurs</p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Admin
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo className="h-10" variant="icon" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
              <p className="text-sm text-gray-600">Gestion de ChabakaPro</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaSignOutAlt />
            Déconnexion
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Messages Contact</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.totalContacts}</h3>
                {stats.pendingContacts > 0 && (
                  <p className="text-orange-600 text-sm mt-1">
                    {stats.pendingContacts} en attente
                  </p>
                )}
              </div>
              <FaEnvelope className="text-4xl text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Demandes Devis</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.totalDevis}</h3>
                {stats.pendingDevis > 0 && (
                  <p className="text-orange-600 text-sm mt-1">
                    {stats.pendingDevis} en attente
                  </p>
                )}
              </div>
              <FaFileInvoice className="text-4xl text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Articles Blog</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.totalBlogs}</h3>
              </div>
              <FaBlog className="text-4xl text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Témoignages</p>
                <h3 className="text-3xl font-bold text-gray-800">{stats.totalTestimonials}</h3>
              </div>
              <FaStar className="text-4xl text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex flex-wrap border-b">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FaChartLine },
              { id: 'contacts', label: 'Messages', icon: FaEnvelope },
              { id: 'devis', label: 'Devis', icon: FaFileInvoice },
              { id: 'testimonials', label: 'Témoignages', icon: FaStar },
              { id: 'blogs', label: 'Blog', icon: FaBlog },
              { id: 'portfolios', label: 'Portfolio', icon: FaBriefcase }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Chargement des données...</p>
            </div>
          ) : (
            <>
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Vue d'ensemble</h2>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Derniers contacts */}
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FaEnvelope className="text-blue-600" />
                        Derniers messages
                      </h3>
                      {contacts.slice(0, 5).map(contact => (
                        <div key={contact._id} className="border-b py-3 last:border-b-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{contact.name}</p>
                              <p className="text-sm text-gray-600">{contact.email}</p>
                              <p className="text-sm text-gray-500 mt-1">{contact.subject}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${
                              contact.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                              contact.status === 'processed' ? 'bg-green-100 text-green-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {contact.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Derniers devis */}
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <FaFileInvoice className="text-green-600" />
                        Dernières demandes de devis
                      </h3>
                      {devis.slice(0, 5).map(d => (
                        <div key={d._id} className="border-b py-3 last:border-b-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-semibold">{d.name}</p>
                              <p className="text-sm text-gray-600">{d.email}</p>
                              <p className="text-sm text-gray-500 mt-1">
                                {d.service} - {d.clientType}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs ${
                              d.urgency === 'urgent' ? 'bg-red-100 text-red-700' :
                              d.urgency === 'normal' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {d.urgency}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Contacts Tab */}
              {activeTab === 'contacts' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Messages de contact</h2>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Téléphone</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sujet</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Message</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Statut</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {contacts.map(contact => (
                          <tr key={contact._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm">{contact.name}</td>
                            <td className="px-4 py-3 text-sm">{contact.email}</td>
                            <td className="px-4 py-3 text-sm">{contact.phone}</td>
                            <td className="px-4 py-3 text-sm">{contact.subject}</td>
                            <td className="px-4 py-3 text-sm max-w-xs truncate">{contact.message}</td>
                            <td className="px-4 py-3">
                              <select
                                value={contact.status}
                                onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                                className="text-sm border rounded px-2 py-1"
                              >
                                <option value="pending">En attente</option>
                                <option value="processed">Traité</option>
                                <option value="closed">Fermé</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => deleteContact(contact._id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Devis Tab */}
              {activeTab === 'devis' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Demandes de devis</h2>
                  
                  <div className="space-y-4">
                    {devis.map(d => (
                      <div key={d._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{d.name}</h3>
                            <p className="text-gray-600">{d.email} | {d.phone}</p>
                          </div>
                          <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded text-sm ${
                              d.urgency === 'urgent' ? 'bg-red-100 text-red-700' :
                              d.urgency === 'normal' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {d.urgency}
                            </span>
                            <button
                              onClick={() => deleteDevis(d._id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Type de client:</p>
                            <p className="font-semibold">{d.clientType}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Service:</p>
                            <p className="font-semibold">{d.service}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Budget estimé:</p>
                            <p className="font-semibold">{d.budget || 'Non spécifié'}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Date:</p>
                            <p className="font-semibold">
                              {new Date(d.createdAt).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        
                        {d.message && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-gray-600 text-sm">Message:</p>
                            <p className="text-gray-800">{d.message}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials Tab */}
              {activeTab === 'testimonials' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Témoignages</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map(t => (
                      <div key={t._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-bold">{t.name}</h3>
                            <p className="text-sm text-gray-600">{t.company || t.location}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleTestimonialStatus(t._id, t.published)}
                              className={`p-2 rounded ${
                                t.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                              }`}
                              title={t.published ? 'Publié' : 'Non publié'}
                            >
                              {t.published ? <FaCheck /> : <FaTimes />}
                            </button>
                            <button
                              onClick={() => deleteTestimonial(t._id)}
                              className="text-red-600 hover:text-red-800 p-2"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < t.rating ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        
                        <p className="text-gray-700 text-sm">{t.text}</p>
                        
                        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                          <span>{new Date(t.createdAt).toLocaleDateString('fr-FR')}</span>
                          {t.verified && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                              Vérifié
                            </span>
                          )}
                          {t.featured && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                              En vedette
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blogs Tab */}
              {activeTab === 'blogs' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Articles de blog</h2>
                  
                  <div className="space-y-4">
                    {blogs.map(blog => (
                      <div key={blog._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
                            
                            <div className="flex flex-wrap gap-2 items-center text-sm">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                                {blog.category}
                              </span>
                              <span className="flex items-center gap-1 text-gray-600">
                                <FaEye /> {blog.views || 0} vues
                              </span>
                              <span className="flex items-center gap-1 text-gray-600">
                                <FaCalendar /> {new Date(blog.createdAt).toLocaleDateString('fr-FR')}
                              </span>
                              {blog.published ? (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                                  Publié
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                  Brouillon
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolios Tab */}
              {activeTab === 'portfolios' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Portfolio</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {portfolios.map(p => (
                      <div key={p._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{p.client}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div>
                              <p className="text-gray-600">Catégorie:</p>
                              <p className="font-semibold">{p.category}</p>
                            </div>
                            
                            {p.investment && (
                              <div>
                                <p className="text-gray-600">Investissement:</p>
                                <p className="font-semibold">{p.investment} MAD</p>
                              </div>
                            )}
                            
                            {p.technologies && p.technologies.length > 0 && (
                              <div>
                                <p className="text-gray-600 mb-1">Technologies:</p>
                                <div className="flex flex-wrap gap-1">
                                  {p.technologies.map((tech, i) => (
                                    <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="mt-3 pt-3 border-t">
                            <span className="text-xs text-gray-500">
                              {new Date(p.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
