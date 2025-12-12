import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaWifi, FaShieldAlt, FaCamera, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

const ServicesParticuliers = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      id: 'pc-repair',
      icon: <FaLaptop className="text-6xl" />,
      title: t('services.pcRepair'),
      tagline: t('services.pcTagline'),
      description: t('services.pcSimple'),
      price: t('services.from') + ' 200 MAD',
      duration: '1-2h',
      included: [
        'Diagnostic complet gratuit',
        'Réparation sur place',
        'Nettoyage virus & malware',
        'Optimisation performances',
        'Garantie 30 jours'
      ],
      gradient: 'from-blue-500 to-cyan-600',
      iconBg: 'from-blue-100 to-cyan-100',
      iconBgDark: 'from-blue-900/30 to-cyan-900/30'
    },
    {
      id: 'wifi',
      icon: <FaWifi className="text-6xl" />,
      title: t('services.wifi'),
      tagline: t('services.wifiTagline'),
      description: t('services.wifiSimple'),
      price: t('services.from') + ' 150 MAD',
      duration: '2-3h',
      included: [
        'Installation routeur WiFi',
        'Configuration sécurisée',
        'Couverture totale maison',
        'Optimisation signal',
        'Guide d\'utilisation'
      ],
      gradient: 'from-green-500 to-emerald-600',
      iconBg: 'from-green-100 to-emerald-100',
      iconBgDark: 'from-green-900/30 to-emerald-900/30'
    },
    {
      id: 'security',
      icon: <FaShieldAlt className="text-6xl" />,
      title: t('services.security'),
      tagline: t('services.securityTagline'),
      description: t('services.securitySimple'),
      price: t('services.from') + ' 300 MAD',
      duration: '2-4h',
      included: [
        'Antivirus professionnel',
        'Pare-feu configuré',
        'Sécurisation réseau',
        'VPN si nécessaire',
        'Formation sécurité'
      ],
      gradient: 'from-red-500 to-orange-600',
      iconBg: 'from-red-100 to-orange-100',
      iconBgDark: 'from-red-900/30 to-orange-900/30'
    },
    {
      id: 'cameras',
      icon: <FaCamera className="text-6xl" />,
      title: t('services.cameras'),
      tagline: t('services.camerasTagline'),
      description: t('services.camerasSimple'),
      price: t('services.from') + ' 500 MAD',
      duration: '3-5h',
      included: [
        'Caméras IP haute qualité',
        'Installation professionnelle',
        'Accès mobile (app)',
        'Enregistrement 24/7',
        'Support technique'
      ],
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'from-purple-100 to-pink-100',
      iconBgDark: 'from-purple-900/30 to-pink-900/30'
    }
  ];

  return (
    <>
      <SEO title={t('nav.servicesParticuliers')} />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
              {t('nav.servicesParticuliers')}
            </h1>
            <p className="text-xl md:text-2xl text-cyan-300 mb-8">
              {t('hero.particularDescription')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#pc-repair" className="btn bg-white text-gray-900 hover:bg-cyan-400 hover:text-white px-8 py-3">
                Dépannage PC
              </a>
              <a href="#wifi" className="btn bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3">
                WiFi & Internet
              </a>
              <Link to="/contact" className="btn bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3">
                {t('cta.requestQuote')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id} 
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-cyan-400 dark:border-gray-700 dark:hover:border-cyan-500 transform hover:-translate-y-2"
              >
                {/* Icon with gradient background */}
                <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                
                {/* Title & Tagline */}
                <h2 className="text-3xl font-heading font-bold mb-3 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-600 transition-all">
                  {service.title}
                </h2>
                <p className="text-lg text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
                  {service.tagline}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Included items */}
                <ul className="space-y-3 mb-6">
                  {service.included.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 dark:text-gray-300">
                      <FaCheckCircle className="text-green-500 flex-shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Price & CTA */}
                <div className="flex justify-between items-center pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                  <div>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                      {service.price}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{service.duration}</p>
                  </div>
                  <Link 
                    to="/contact" 
                    className={`group/btn btn bg-gradient-to-r ${service.gradient} hover:shadow-xl text-white px-6 py-3 inline-flex items-center gap-2`}
                  >
                    {t('cta.requestQuote')}
                    <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            {t('cta.needHelp')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {t('cta.contactUs')}
          </p>
          <Link 
            to="/contact"
            className="btn bg-white text-cyan-600 hover:bg-gray-100 text-lg px-10 py-4 shadow-2xl transform hover:scale-105 transition-all inline-flex items-center gap-3"
          >
            {t('cta.requestQuote')}
            <FaArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default ServicesParticuliers;
