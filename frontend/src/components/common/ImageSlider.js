import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = ({ standalone = false, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Images liées aux services IT - 7 slides haute résolution
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920',
      alt: 'Espace de travail IT moderne',
      title: 'Expertise IT Professionnelle',
      description: 'Des solutions technologiques avancées pour votre entreprise à Casablanca.'
    },
    {
      url: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1920',
      alt: 'Technicien réparant un ordinateur',
      title: 'Maintenance Hardware Précise',
      description: 'Diagnostic et réparation experts de vos équipements informatiques.'
    },
    {
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1920',
      alt: 'Installation infrastructure réseau',
      title: 'Infrastructure Réseau Fiable',
      description: 'Installation de réseaux câblés et Wi-Fi haute performance.'
    },
    {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920',
      alt: 'Salle des serveurs data center',
      title: 'Hébergement & Sécurité des Données',
      description: 'Vos données critiques sécurisées dans des infrastructures modernes.'
    },
    {
      url: 'https://images.unsplash.com/photo-1563206767-5b1d97299337?q=80&w=1920',
      alt: 'Monitoring cybersécurité',
      title: 'Surveillance & Cybersécurité Proactive',
      description: 'Protection continue de vos systèmes contre les menaces numériques.'
    },
    {
      url: 'https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1920',
      alt: 'Caméra de surveillance IP',
      title: 'Solutions de Vidéosurveillance IP',
      description: 'Installation de systèmes de caméras connectées pour votre sécurité.'
    },
    {
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1920',
      alt: 'Support client IT informatique',
      title: 'Support Technique Réactif',
      description: 'Une équipe d\'experts à votre écoute pour une assistance rapide.'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    
    const autoPlayInterval = setInterval(nextSlide, interval);
    return () => clearInterval(autoPlayInterval);
  }, [autoPlay, interval, isHovered, currentIndex]);

  const containerClass = standalone 
    ? "relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl"
    : "absolute inset-0 overflow-hidden";

  return (
    <div 
      className={containerClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image slides */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentIndex 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Content overlay for standalone mode */}
          {standalone && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div className="p-8 md:p-12 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">
                  {image.title}
                </h3>
                <p className="text-lg md:text-xl opacity-90">
                  {image.description}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {/* Gradient overlay for non-standalone */}
      {!standalone && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/40 to-gray-900/50 pointer-events-none"></div>
      )}
      
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Image précédente"
      >
        <FaChevronLeft className="text-xl" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Image suivante"
      >
        <FaChevronRight className="text-xl" />
      </button>
      
      {/* Dots indicators */}
      <div className={`absolute ${standalone ? 'bottom-8' : 'bottom-4'} left-0 right-0 flex justify-center gap-3 z-20`}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex 
                ? 'bg-white w-10 h-3' 
                : 'bg-white/50 hover:bg-white/75 w-3 h-3'
            }`}
            aria-label={`Aller à l'image ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Image counter */}
      {standalone && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold z-20">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
