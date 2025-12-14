import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HeroSlider = ({ autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  // Slides with local images from build/images - Workers first
  const slides = [
    {
      url: '/images/Workers.png',
      alt: 'Notre Équipe ChabakaPro - Experts IT Casablanca',
      title: 'Notre Équipe d\'Experts',
      subtitle: 'Des professionnels certifiés et passionnés à votre service',
      description: 'Plus de 10 ans d\'expérience dans les services IT au Maroc'
    },
    {
      url: '/images/slide-1.jpeg',
      alt: 'Services informatiques professionnels',
      title: 'Services IT Professionnels',
      subtitle: 'Solutions complètes pour particuliers et entreprises',
      description: 'Dépannage, maintenance et installation'
    },
    {
      url: '/images/slide-2.png',
      alt: 'Infrastructure réseau et serveurs',
      title: 'Infrastructure Réseau',
      subtitle: 'Conception et déploiement de réseaux performants',
      description: 'Fibre optique, Wi-Fi, câblage structuré'
    },
    {
      url: '/images/slide-3.png',
      alt: 'Sécurité informatique',
      title: 'Cybersécurité Avancée',
      subtitle: 'Protection complète de vos données et systèmes',
      description: 'Antivirus, firewall, sauvegarde cloud'
    },
    {
      url: '/images/slide-4.png',
      alt: 'Installation caméras surveillance',
      title: 'Vidéosurveillance',
      subtitle: 'Systèmes de sécurité CCTV professionnels',
      description: 'Installation et configuration HD/4K'
    },
    {
      url: '/images/slide-5.png',
      alt: 'Support technique',
      title: 'Support Technique 24/7',
      subtitle: 'Assistance rapide et efficace',
      description: 'Intervention sous 2h en urgence'
    },
    {
      url: '/images/slide-6.png',
      alt: 'Solutions cloud entreprise',
      title: 'Solutions Cloud',
      subtitle: 'Migration et gestion cloud pour entreprises',
      description: 'Azure, AWS, Google Cloud'
    },
    {
      url: '/images/slide-7.png',
      alt: 'Conseil IT personnalisé',
      title: 'Conseil & Audit',
      subtitle: 'Analyse et optimisation de votre infrastructure',
      description: 'Audit gratuit pour les entreprises'
    },
    {
      url: '/images/slide-8.png',
      alt: 'Formation informatique',
      title: 'Formation IT',
      subtitle: 'Montée en compétences de vos équipes',
      description: 'Formations sur mesure'
    },
    {
      url: '/images/slide-9.png',
      alt: 'Maintenance préventive',
      title: 'Maintenance Préventive',
      subtitle: 'Anticipez les pannes, optimisez les performances',
      description: 'Contrats de maintenance adaptés'
    }
  ];

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const autoPlayInterval = setInterval(nextSlide, interval);
    return () => clearInterval(autoPlayInterval);
  }, [autoPlay, interval, isHovered, nextSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div
      className="relative w-full h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slides[currentIndex].url}
              alt={slides[currentIndex].alt}
              className="w-full h-full object-cover"
              loading={currentIndex === 0 ? 'eager' : 'lazy'}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4 md:px-8">
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-3xl"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-medium mb-6"
                >
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  ChabakaPro - Expert IT Casablanca
                </motion.div>

                {/* Title */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {slides[currentIndex].title}
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-cyan-300 font-medium mb-4">
                  {slides[currentIndex].subtitle}
                </p>

                {/* Description */}
                <p className="text-lg text-white/80 mb-8 max-w-xl">
                  {slides[currentIndex].description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                  >
                    Devis Gratuit
                  </motion.a>
                  <motion.a
                    href="tel:+212722618635"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
                  >
                    📞 Appelez-nous
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all group"
        aria-label="Image précédente"
      >
        <FiChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 md:p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all group"
        aria-label="Image suivante"
      >
        <FiChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 h-3 bg-cyan-400'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: interval / 1000, ease: 'linear' }}
          key={currentIndex}
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-lg text-white/80 text-sm font-medium">
        {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default HeroSlider;
