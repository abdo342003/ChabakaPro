import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import TechShowcase from '../components/sections/TechShowcase';
import ImageSlider from '../components/common/ImageSlider';
import { 
  FaCheckCircle, 
  FaRocket, 
  FaUsers, 
  FaAward,
  FaPhone,
  FaEnvelope 
} from 'react-icons/fa';

/**
 * Example About Page using new components
 * Showcases how to integrate TechShowcase and ImageSlider
 */
const AboutExample = () => {
  const stats = [
    { icon: <FaUsers />, value: '500+', label: 'Clients Satisfaits' },
    { icon: <FaRocket />, value: '1200+', label: 'Projets Réalisés' },
    { icon: <FaAward />, value: '15+', label: 'Années d\'Expérience' },
    { icon: <FaCheckCircle />, value: '98%', label: 'Taux de Satisfaction' }
  ];

  const values = [
    {
      title: 'Excellence Technique',
      description: 'Nos techniciens sont certifiés et formés aux dernières technologies.',
      icon: '🎓'
    },
    {
      title: 'Service Client Premium',
      description: 'Support réactif et personnalisé, disponible 24/7 pour les urgences.',
      icon: '⭐'
    },
    {
      title: 'Innovation Continue',
      description: 'Nous adoptons les meilleures pratiques et outils les plus récents.',
      icon: '💡'
    },
    {
      title: 'Engagement Local',
      description: 'Entreprise marocaine, nous comprenons vos besoins et contraintes.',
      icon: '🇲🇦'
    }
  ];

  return (
    <>
      <SEO 
        title="À Propos"
        description="Découvrez TechExpert Casablanca - Votre partenaire IT de confiance depuis 15 ans. Services professionnels pour particuliers et entreprises."
        keywords="IT Casablanca, entreprise informatique Maroc, services IT professionnels"
      />

      {/* Hero Section with Slider */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <ImageSlider standalone={false} autoPlay={true} interval={5000} />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
            À Propos de <span className="text-cyan-300">TechExpert</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-lg">
            15 ans d'excellence au service de l'informatique à Casablanca
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl text-cyan-600 dark:text-cyan-400 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8 dark:text-white">
              Notre Histoire
            </h2>
            
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Fondée en 2010 à Casablanca, <strong>TechExpert</strong> est née d'une vision simple : 
                rendre les services IT professionnels accessibles à tous, des particuliers aux grandes entreprises.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
                Aujourd'hui, nous sommes fiers d'être l'un des leaders du secteur IT au Maroc, 
                avec plus de <strong>500 clients satisfaits</strong> et une équipe de <strong>25 experts certifiés</strong>.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mt-4">
                Notre mission reste inchangée : offrir des solutions IT de qualité internationale 
                avec un service client marocain chaleureux et personnalisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TechShowcase Section */}
      <TechShowcase />

      {/* Values Section */}
      <section className="section bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">
            Nos Valeurs
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl border-2 border-gray-100 dark:border-gray-600 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Prêt à Travailler Ensemble ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Rejoignez les centaines d'entreprises qui nous font confiance pour leurs besoins IT.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="btn bg-white text-cyan-700 hover:bg-gray-100 px-8 py-4 text-lg font-bold inline-flex items-center justify-center"
            >
              <FaEnvelope className="mr-2" />
              Demander un Devis
            </Link>
            <a 
              href="tel:+212XXXXXXXXX"
              className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-cyan-700 px-8 py-4 text-lg font-bold inline-flex items-center justify-center"
            >
              <FaPhone className="mr-2" />
              Appelez-nous
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutExample;
