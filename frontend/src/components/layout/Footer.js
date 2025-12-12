import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock
} from 'react-icons/fa';
import Logo from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.servicesParticuliers'), path: '/services/particuliers' },
    { name: t('nav.servicesEntreprises'), path: '/services/entreprises' },
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white">
      {/* Main Footer - Compact */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section - Compact */}
          <div className="space-y-4">
            <Logo className="h-10" />
            <p className="text-sm font-semibold text-cyan-400">
              {t('footer.tagline')}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.aboutText')}
            </p>
            
            {/* Social Media - Compact */}
            <div className="flex gap-2">
              {[
                { icon: FaFacebook, href: '#', label: 'Facebook' },
                { icon: FaInstagram, href: '#', label: 'Instagram' },
                { icon: FaLinkedin, href: '#', label: 'LinkedIn' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-white/5 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Compact */}
          <div>
            <h4 className="text-base font-bold mb-4 text-cyan-400">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white text-sm transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Compact */}
          <div>
            <h4 className="text-base font-bold mb-4 text-cyan-400">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${process.env.REACT_APP_PHONE_NUMBER || '+212600000000'}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <FaPhone className="text-cyan-400 flex-shrink-0" />
                  <span>{process.env.REACT_APP_PHONE_NUMBER || '+212 6 00 00 00 00'}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${process.env.REACT_APP_EMAIL || 'contact@chabakapro.ma'}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <FaEnvelope className="text-cyan-400 flex-shrink-0" />
                  <span className="break-all">{process.env.REACT_APP_EMAIL || 'contact@chabakapro.ma'}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-gray-400 text-sm">
                  <FaMapMarkerAlt className="text-cyan-400 flex-shrink-0 mt-1" />
                  <span>{t('footer.casablanca')}</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <FaClock className="text-cyan-400 flex-shrink-0" />
                  <span>{t('footer.schedule')}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal & WhatsApp - Compact */}
          <div>
            <h4 className="text-base font-bold mb-4 text-cyan-400">
              {t('footer.assistance')}
            </h4>
            <div className="space-y-3 mb-4">
              <a
                href={`https://wa.me/${process.env.REACT_APP_WHATSAPP || '212600000000'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
              >
                <FaWhatsapp className="text-lg" />
                {t('footer.whatsapp')}
              </a>
            </div>
            
            <div className="space-y-2">
              <Link to="/mentions-legales" className="block text-gray-400 hover:text-white text-xs transition-colors">
                {t('footer.legal')}
              </Link>
              <Link to="/confidentialite" className="block text-gray-400 hover:text-white text-xs transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/cgu" className="block text-gray-400 hover:text-white text-xs transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Minimal */}
      <div className="border-t border-gray-700/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
            <p>
              © {currentYear} <span className="text-cyan-400 font-semibold">Chabaka Pro</span>. {t('footer.rights')}.
            </p>
            <p className="flex items-center gap-1">
              {t('footer.madeWith')} <span className="text-red-500">❤</span> {t('footer.inCasablanca')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
