import React from 'react';
import ImageSlider from '../common/ImageSlider';
import { 
  FaServer, 
  FaCloud, 
  FaLock, 
  FaNetworkWired, 
  FaShieldAlt, 
  FaTools, 
  FaWifi, 
  FaVideo,
  FaCheckCircle,
  FaClock,
  FaAward
} from 'react-icons/fa';

/**
 * TechShowcase Component
 * Enhanced professional showcase with statistics, capabilities, and trust indicators
 */
const TechShowcase = () => {
  const capabilities = [
    {
      icon: <FaServer className="text-4xl text-cyan-500" />,
      title: "Infrastructure Serveurs",
      description: "Configuration et maintenance de serveurs physiques et virtuels",
      features: ["VMware", "Hyper-V", "Linux/Windows Server"]
    },
    {
      icon: <FaCloud className="text-4xl text-blue-500" />,
      title: "Solutions Cloud",
      description: "Migration et gestion cloud hybride sécurisée",
      features: ["AWS", "Azure", "Google Cloud"]
    },
    {
      icon: <FaLock className="text-4xl text-green-500" />,
      title: "Cybersécurité",
      description: "Protection multicouche contre les menaces avancées",
      features: ["Firewall", "Antivirus Pro", "Audit sécurité"]
    },
    {
      icon: <FaNetworkWired className="text-4xl text-orange-500" />,
      title: "Réseaux Entreprise",
      description: "Architecture réseau optimisée pour la performance",
      features: ["VLAN", "VPN", "SD-WAN"]
    },
    {
      icon: <FaWifi className="text-4xl text-purple-500" />,
      title: "Wi-Fi Pro",
      description: "Réseaux sans-fil haute densité et sécurisés",
      features: ["Mesh WiFi", "Roaming", "Gestion centralisée"]
    },
    {
      icon: <FaVideo className="text-4xl text-red-500" />,
      title: "Vidéosurveillance IP",
      description: "Systèmes de surveillance intelligents et connectés",
      features: ["4K Ultra HD", "Cloud Storage", "IA détection"]
    },
    {
      icon: <FaTools className="text-4xl text-yellow-500" />,
      title: "Maintenance Préventive",
      description: "Contrats de maintenance pour zéro interruption",
      features: ["Monitoring 24/7", "Alertes proactives", "Rapports mensuels"]
    },
    {
      icon: <FaShieldAlt className="text-4xl text-indigo-500" />,
      title: "Backup & Disaster Recovery",
      description: "Sauvegarde automatique et plan de reprise d'activité",
      features: ["Sauvegarde 3-2-1", "RTO < 4h", "Tests trimestriels"]
    }
  ];

  const stats = [
    {
      icon: <FaCheckCircle className="text-3xl text-green-500" />,
      value: "500+",
      label: "Clients Satisfaits",
      suffix: ""
    },
    {
      icon: <FaClock className="text-3xl text-blue-500" />,
      value: "< 24h",
      label: "Temps d'Intervention",
      suffix: ""
    },
    {
      icon: <FaAward className="text-3xl text-yellow-500" />,
      value: "10+",
      label: "Années d'Expérience",
      suffix: "ans"
    },
    {
      icon: <FaShieldAlt className="text-3xl text-cyan-500" />,
      value: "99.9%",
      label: "Uptime Garanti",
      suffix: "%"
    }
  ];

  return (
    <section className="section bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 dark:text-white">
            Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Expertise Technique</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Des solutions IT professionnelles propulsées par l'innovation et l'excellence
          </p>
        </div>

        {/* Statistics Bar */}
        <div className="mb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Image Slider Showcase */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <ImageSlider standalone={true} autoPlay={true} interval={6000} />
        </div>

        {/* Enhanced Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400"
            >
              {/* Icon with gradient background */}
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 group-hover:from-cyan-100 group-hover:to-blue-100 dark:group-hover:from-cyan-900 dark:group-hover:to-blue-900 transition-all duration-300">
                  {capability.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                {capability.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {capability.description}
              </p>

              {/* Features Pills */}
              <div className="flex flex-wrap gap-2">
                {capability.features.map((feature, fIndex) => (
                  <span 
                    key={fIndex}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Hover accent bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Pourquoi Choisir ChabakaPro?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <FaCheckCircle className="text-4xl mx-auto mb-3" />
              <h4 className="font-bold text-lg mb-2">Certifications Pro</h4>
              <p className="text-blue-100">Techniciens certifiés Cisco, Microsoft, CompTIA</p>
            </div>
            <div>
              <FaClock className="text-4xl mx-auto mb-3" />
              <h4 className="font-bold text-lg mb-2">Support Réactif</h4>
              <p className="text-blue-100">Intervention sous 24h, hotline 7j/7</p>
            </div>
            <div>
              <FaAward className="text-4xl mx-auto mb-3" />
              <h4 className="font-bold text-lg mb-2">Garantie Qualité</h4>
              <p className="text-blue-100">Satisfaction client garantie ou remboursé</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
