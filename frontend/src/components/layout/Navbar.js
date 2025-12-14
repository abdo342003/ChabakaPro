import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.servicesIndividuals') || 'Particuliers', path: '/services/particuliers' },
    { name: t('nav.servicesBusiness') || 'Entreprises', path: '/services/entreprises' },
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.about'), path: '/a-propos' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-gray-900 shadow-md' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-18">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo className="h-10" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <a
              href={`tel:${process.env.REACT_APP_PHONE_NUMBER || '+212722618635'}`}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
            >
              <FaPhone className="text-sm" />
              <span className="text-sm font-medium">{process.env.REACT_APP_PHONE_NUMBER || '+212 722-618635'}</span>
            </a>
            <Link
              to="/contact"
              className="px-5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {t('hero.freeQuote') || 'Devis Gratuit'}
            </Link>
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-md"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] pb-4' : 'max-h-0'
        }`}>
          <div className="pt-2 space-y-1 border-t border-gray-100 dark:border-gray-800">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-3 mt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <a
                href={`tel:${process.env.REACT_APP_PHONE_NUMBER || '+212722618635'}`}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium"
              >
                <FaPhone />
                <span>{process.env.REACT_APP_PHONE_NUMBER || '+212 722-618635'}</span>
              </a>
              <Link
                to="/contact"
                className="block text-center px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {t('hero.freeQuote') || 'Devis Gratuit'}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
