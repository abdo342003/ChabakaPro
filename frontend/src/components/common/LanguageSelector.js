import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <FaGlobe className="text-cyan-600 dark:text-cyan-400" />
        <span className="text-sm font-medium hidden md:inline">
          {languages.find(l => l.code === language)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 py-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              language === lang.code ? 'bg-cyan-50 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
