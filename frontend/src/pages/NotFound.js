import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const NotFound = () => {
  return (
    <>
      <SEO title="Page non trouvée - 404" />
      
      <div className="min-h-screen flex items-center justify-center bg-gray-light dark:bg-gray-900">
        <div className="text-center px-4">
          <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-heading font-bold text-gray-dark dark:text-white mb-4">
            Page Non Trouvée
          </h2>
          <p className="text-lg text-gray-medium mb-8 max-w-md mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link 
            to="/" 
            className="btn btn-primary inline-flex items-center space-x-2"
          >
            <FaHome />
            <span>Retour à l'Accueil</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
