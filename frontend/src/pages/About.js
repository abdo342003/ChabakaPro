import React from 'react';
import SEO from '../components/common/SEO';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEO title={t('about.title')} />
      <div className="pt-24 pb-12 dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-heading font-bold text-center mb-12 dark:text-white">
            {t('about.title')}
          </h1>
          
          <div className="card mb-8 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('about.missionTitle')}</h2>
            <p className="text-gray-medium mb-4 dark:text-gray-400">
              {t('about.missionText')}
            </p>
          </div>

          <div className="card mb-8 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('about.whyUsTitle')}</h2>
            <ul className="space-y-3">
              <li className="flex items-start dark:text-gray-300">
                <span className="text-secondary mr-3">✓</span>
                <span>{t('about.reason1')}</span>
              </li>
              <li className="flex items-start dark:text-gray-300">
                <span className="text-secondary mr-3">✓</span>
                <span>{t('about.reason2')}</span>
              </li>
              <li className="flex items-start dark:text-gray-300">
                <span className="text-secondary mr-3">✓</span>
                <span>{t('about.reason3')}</span>
              </li>
              <li className="flex items-start dark:text-gray-300">
                <span className="text-secondary mr-3">✓</span>
                <span>{t('about.reason4')}</span>
              </li>
              <li className="flex items-start dark:text-gray-300">
                <span className="text-secondary mr-3">✓</span>
                <span>{t('about.reason5')}</span>
              </li>
            </ul>
          </div>

          <div className="card dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">{t('about.certificationsTitle')}</h2>
            <ul className="space-y-2 dark:text-gray-300">
              <li>📜 {t('about.cert1')}</li>
              <li>📜 {t('about.cert2')}</li>
              <li>📜 {t('about.cert3')}</li>
              <li>📜 {t('about.cert4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
