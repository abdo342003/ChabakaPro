import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaWhatsapp
} from 'react-icons/fa';
import Logo from '../common/Logo';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t('nav.home') || 'Accueil', path: '/' },
    { name: t('nav.servicesParticuliers') || 'Services Particuliers', path: '/services/particuliers' },
    { name: t('nav.servicesEntreprises') || 'Services Entreprises', path: '/services/entreprises' },
    { name: t('nav.portfolio') || 'Portfolio', path: '/portfolio' },
    { name: t('nav.blog') || 'Blog', path: '/blog' },
    { name: t('nav.contact') || 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: 'https://facebook.com/chabakapro', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://instagram.com/chabakapro', label: 'Instagram' },
    { icon: FaLinkedin, href: 'https://linkedin.com/company/chabakapro', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <Logo className="h-10" />
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('footer.aboutText') || 'Solutions informatiques professionnelles pour particuliers et entreprises à Casablanca.'}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-gray-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <social.icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.contact') || 'Contact'}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+212722618635"
                  className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <FaPhone className="text-cyan-500" />
                  +212 722-618635
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@chabakapro.ma"
                  className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors"
                >
                  <FaEnvelope className="text-cyan-500" />
                  contact@chabakapro.ma
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <FaMapMarkerAlt className="text-cyan-500" />
                  {t('footer.casablanca') || 'Casablanca, Maroc'}
                </div>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('footer.support') || 'Support Rapide'}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.supportText') || 'Besoin d\'aide? Contactez-nous sur WhatsApp pour une réponse rapide.'}
            </p>
            <a
              href="https://wa.me/212722618635"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
            <p>
              © {currentYear} <span className="text-cyan-400">ChabakaPro</span>. {t('footer.rights') || 'Tous droits réservés'}.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/mentions-legales" className="hover:text-white transition-colors">
                {t('footer.legal') || 'Mentions Légales'}
              </Link>
              <Link to="/confidentialite" className="hover:text-white transition-colors">
                {t('footer.privacy') || 'Confidentialité'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
