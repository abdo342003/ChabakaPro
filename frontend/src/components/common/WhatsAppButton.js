import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { logWhatsAppClick } from '../../utils/analytics';

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    logWhatsAppClick();
  };

  const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '212600000000';
  const message = encodeURIComponent('Bonjour, j\'aimerais obtenir des informations sur vos services IT.');

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-secondary hover:bg-secondary-dark rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      aria-label="Contactez-nous sur WhatsApp"
    >
      <FaWhatsapp className="text-white text-2xl" />
      
      {/* Pulse animation */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping"></span>
    </a>
  );
};

export default WhatsAppButton;
