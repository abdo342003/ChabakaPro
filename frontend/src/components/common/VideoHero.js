import React from 'react';

const VideoHero = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.6)' }}
      >
        <source src="/videos/Vidéo_publicitaire_pour_page_de_destination.mp4" type="video/mp4" />
        {/* Fallback: si la vidéo ne charge pas, on affiche rien (le gradient de fond sera visible) */}
      </video>
      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
    </div>
  );
};

export default VideoHero;
