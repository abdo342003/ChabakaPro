import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import { sendContact, sendDevis } from '../services/apiService';
import { logFormSubmission } from '../utils/analytics';

const Contact = () => {
  const [formType, setFormType] = useState('contact'); // 'contact' or 'devis'
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (formType === 'contact') {
        await sendContact(data);
        logFormSubmission('Contact Form');
        toast.success('Message envoyé avec succès! Nous vous répondrons sous 24h.');
      } else {
        await sendDevis(data);
        logFormSubmission('Devis Form');
        toast.success('Demande de devis envoyée! Nous vous contacterons rapidement.');
      }
      reset();
    } catch (error) {
      toast.error(error.message || 'Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact"
        description="Contactez ChabakaPro pour vos besoins en services IT à Casablanca. Devis gratuit, intervention rapide."
      />

      <div className="pt-24 pb-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold text-center mb-4 dark:text-white">Nous Contacter</h1>
          <p className="text-center text-gray-medium dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Une question ? Un projet ? Contactez-nous et recevez une réponse sous 24h.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="card dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 dark:text-white">Téléphone</h3>
                    <a href={`tel:${process.env.REACT_APP_PHONE_NUMBER}`} className="text-primary dark:text-blue-400 hover:underline">
                      {process.env.REACT_APP_PHONE_NUMBER || '+212 6XX XXX XXX'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="card dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 dark:text-white">Email</h3>
                    <a href={`mailto:${process.env.REACT_APP_EMAIL}`} className="text-primary dark:text-blue-400 hover:underline break-all">
                      {process.env.REACT_APP_EMAIL || 'contact@chabakapro.ma'}
                    </a>
                  </div>
                </div>
              </div>

              <div className="card dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-secondary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 dark:text-white">WhatsApp</h3>
                    <a 
                      href={`https://wa.me/${process.env.REACT_APP_WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary dark:text-green-400 hover:underline"
                    >
                      Chat WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <div className="card dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 dark:text-white">Localisation</h3>
                    <p className="text-gray-medium dark:text-gray-400">Casablanca, Maroc</p>
                  </div>
                </div>
              </div>

              <div className="card bg-gray-light dark:bg-gray-800 dark:border-gray-700">
                <h3 className="font-bold mb-2 dark:text-white">Heures d'Ouverture</h3>
                <div className="space-y-1 text-sm dark:text-gray-300">
                  <p>Lun–Ven : 9h–18h</p>
                  <p>Sam : 10h–16h</p>
                  <p>Dim : Fermé</p>
                </div>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2">
              <div className="card dark:bg-gray-800 dark:border-gray-700">
                <div className="flex space-x-4 mb-6 border-b dark:border-gray-700">
                  <button
                    onClick={() => setFormType('contact')}
                    className={`pb-4 px-4 font-medium transition-colors ${
                      formType === 'contact'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-medium dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Message de Contact
                  </button>
                  <button
                    onClick={() => setFormType('devis')}
                    className={`pb-4 px-4 font-medium transition-colors ${
                      formType === 'devis'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-medium dark:text-gray-400 hover:text-primary'
                    }`}
                  >
                    Demande de Devis
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {formType === 'devis' && (
                    <div>
                      <label className="block font-medium mb-2 dark:text-white">Type de Client *</label>
                      <select
                        {...register('clientType', { required: 'Requis' })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="particulier">Particulier</option>
                        <option value="entreprise">Entreprise</option>
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2 dark:text-white">Nom *</label>
                      <input
                        type="text"
                        {...register('name', { required: 'Le nom est requis' })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block font-medium mb-2 dark:text-white">Email *</label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'L\'email est requis',
                          pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-2 dark:text-white">Téléphone *</label>
                      <input
                        type="tel"
                        {...register('phone', { required: 'Le téléphone est requis' })}
                        placeholder="+212 6XX XXX XXX"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>

                    {formType === 'contact' ? (
                      <div>
                        <label className="block font-medium mb-2 dark:text-white">Sujet *</label>
                        <select
                          {...register('subject', { required: 'Requis' })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="depannage">Dépannage</option>
                          <option value="devis">Devis projet</option>
                          <option value="support">Support</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <label className="block font-medium mb-2 dark:text-white">Entreprise</label>
                        <input
                          type="text"
                          {...register('company')}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  {formType === 'devis' && (
                    <div>
                      <label className="block font-medium mb-2 dark:text-white">Service *</label>
                      <select
                        {...register('service', { required: 'Requis' })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="depannage_pc">Dépannage PC</option>
                        <option value="installation_wifi">Installation Wi-Fi</option>
                        <option value="securite_reseau">Sécurité Réseau</option>
                        <option value="cameras_ip">Caméras IP</option>
                        <option value="conception_reseau">Conception Réseau</option>
                        <option value="windows_server">Windows Server</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block font-medium mb-2 dark:text-white">
                      {formType === 'contact' ? 'Message' : 'Description du Projet'} *
                    </label>
                    <textarea
                      {...register(formType === 'contact' ? 'message' : 'description', { required: 'Requis' })}
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Envoi en cours...' : formType === 'contact' ? 'Envoyer' : 'Demander Devis'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
