import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import LanguageSelector from '../common/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    {
      name: t('nav.services'),
      submenu: [
        { name: t('nav.servicesIndividuals'), path: '/services/particuliers' },
        { name: t('nav.servicesBusiness'), path: '/services/entreprises' }
      ]
    },
    { name: t('nav.portfolio'), path: '/portfolio' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.about'), path: '/a-propos' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white dark:bg-gray-900 shadow-lg' : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo className="h-12" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.submenu ? (
                  <>
                    <button className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">
                      {link.name}
                    </button>
                    <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-200 dark:border-gray-700">
                      {link.submenu.map((sublink, subindex) => (
                        <Link
                          key={subindex}
                          to={sublink.path}
                          className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {sublink.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium transition-colors ${
                      location.pathname === link.path ? 'text-gray-900 dark:text-white font-bold' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            <a
              href={`tel:${process.env.REACT_APP_PHONE_NUMBER}`}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaPhone />
              <span className="font-medium">{t('cta.callUs')}</span>
            </a>
            <Link
              to="/contact"
              className="btn btn-primary"
            >
              {t('hero.freeQuote')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          {navLinks.map((link, index) => (
            <div key={index}>
              {link.submenu ? (
                <>
                  <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">{link.name}</p>
                  <div className="pl-4 space-y-2">
                    {link.submenu.map((sublink, subindex) => (
                      <Link
                        key={subindex}
                        to={sublink.path}
                        className="block text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {sublink.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={link.path}
                  className={`block text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium transition-colors ${
                    location.pathname === link.path ? 'text-gray-900 dark:text-white font-bold' : ''
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <div className="pt-4 space-y-2">
            <div className="flex justify-center gap-4 mb-3">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <a
              href={`tel:${process.env.REACT_APP_PHONE_NUMBER}`}
              className="flex items-center justify-center space-x-2 btn btn-outline w-full"
            >
              <FaPhone />
              <span>{t('cta.callUs')}</span>
            </a>
            <Link to="/contact" className="btn btn-primary w-full text-center">
              {t('hero.freeQuote')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
