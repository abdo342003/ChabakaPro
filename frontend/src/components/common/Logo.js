import React from 'react';

const Logo = ({ className = "h-10", variant = "full" }) => {
  if (variant === "icon") {
    // Version icône seule (cerveau)
    return (
      <svg 
        className={className}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cerveau - partie gauche (bleu foncé) */}
        <g className="brain-left">
          <circle cx="35" cy="30" r="3" fill="#1e3a5f"/>
          <circle cx="25" cy="40" r="3" fill="#1e3a5f"/>
          <circle cx="35" cy="50" r="3" fill="#1e3a5f"/>
          <circle cx="25" cy="60" r="3" fill="#1e3a5f"/>
          <circle cx="35" cy="70" r="3" fill="#1e3a5f"/>
          <circle cx="45" cy="35" r="3" fill="#1e3a5f"/>
          <circle cx="45" cy="55" r="3" fill="#1e3a5f"/>
          
          {/* Connexions */}
          <line x1="35" y1="30" x2="25" y2="40" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="35" y1="30" x2="45" y2="35" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="25" y1="40" x2="35" y2="50" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="35" y1="50" x2="45" y2="55" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="25" y1="60" x2="35" y2="70" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="45" y1="35" x2="45" y2="55" stroke="#1e3a5f" strokeWidth="1.5"/>
        </g>

        {/* Cerveau - partie droite (orange) */}
        <g className="brain-right">
          <circle cx="55" cy="30" r="3" fill="#ff8c00"/>
          <circle cx="65" cy="40" r="3" fill="#ff8c00"/>
          <circle cx="55" cy="50" r="3" fill="#ff8c00"/>
          <circle cx="65" cy="60" r="3" fill="#ff8c00"/>
          <circle cx="55" cy="70" r="3" fill="#ff8c00"/>
          <circle cx="75" cy="35" r="3" fill="#ff8c00"/>
          <circle cx="75" cy="55" r="3" fill="#ff8c00"/>
          
          {/* Connexions */}
          <line x1="55" y1="30" x2="65" y2="40" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="55" y1="30" x2="75" y2="35" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="65" y1="40" x2="55" y2="50" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="55" y1="50" x2="75" y2="55" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="65" y1="60" x2="55" y2="70" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="75" y1="35" x2="75" y2="55" stroke="#ff8c00" strokeWidth="1.5"/>
          
          {/* Ondes WiFi */}
          <path d="M 80 20 Q 85 15 90 20" stroke="#ff8c00" strokeWidth="2.5" fill="none"/>
          <path d="M 82 25 Q 85 22 88 25" stroke="#ff8c00" strokeWidth="2.5" fill="none"/>
          <path d="M 84 30 Q 85 28 86 30" stroke="#ff8c00" strokeWidth="2.5" fill="none"/>
        </g>

        {/* Connexion centrale */}
        <line x1="45" y1="35" x2="55" y2="30" stroke="#6b4423" strokeWidth="1.5"/>
        <line x1="45" y1="55" x2="55" y2="50" stroke="#6b4423" strokeWidth="1.5"/>
      </svg>
    );
  }

  // Version complète avec texte
  return (
    <div className={`flex items-center gap-3 ${className}`} dir="ltr">
      {/* Icône cerveau */}
      <svg 
        className="h-10 w-10"
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cerveau - partie gauche (bleu foncé) */}
        <g className="brain-left">
          <circle cx="35" cy="30" r="3" fill="#1e3a5f"/>
          <circle cx="25" cy="40" r="3" fill="#1e3a5f"/>
          <circle cx="35" cy="50" r="3" fill="#1e3a5f"/>
          <circle cx="25" cy="60" r="3" fill="#1e3a5f"/>
          <circle cx="35" cy="70" r="3" fill="#1e3a5f"/>
          <circle cx="45" cy="35" r="3" fill="#1e3a5f"/>
          <circle cx="45" cy="55" r="3" fill="#1e3a5f"/>
          
          {/* Connexions */}
          <line x1="35" y1="30" x2="25" y2="40" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="35" y1="30" x2="45" y2="35" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="25" y1="40" x2="35" y2="50" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="35" y1="50" x2="45" y2="55" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="25" y1="60" x2="35" y2="70" stroke="#1e3a5f" strokeWidth="1.5"/>
          <line x1="45" y1="35" x2="45" y2="55" stroke="#1e3a5f" strokeWidth="1.5"/>
        </g>

        {/* Cerveau - partie droite (orange) */}
        <g className="brain-right">
          <circle cx="55" cy="30" r="3" fill="#ff8c00"/>
          <circle cx="65" cy="40" r="3" fill="#ff8c00"/>
          <circle cx="55" cy="50" r="3" fill="#ff8c00"/>
          <circle cx="65" cy="60" r="3" fill="#ff8c00"/>
          <circle cx="55" cy="70" r="3" fill="#ff8c00"/>
          <circle cx="75" cy="35" r="3" fill="#ff8c00"/>
          <circle cx="75" cy="55" r="3" fill="#ff8c00"/>
          
          {/* Connexions */}
          <line x1="55" y1="30" x2="65" y2="40" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="55" y1="30" x2="75" y2="35" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="65" y1="40" x2="55" y2="50" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="55" y1="50" x2="75" y2="55" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="65" y1="60" x2="55" y2="70" stroke="#ff8c00" strokeWidth="1.5"/>
          <line x1="75" y1="35" x2="75" y2="55" stroke="#ff8c00" strokeWidth="1.5"/>
          
          {/* Ondes WiFi */}
          <path d="M 80 20 Q 85 15 90 20" stroke="#ff8c00" strokeWidth="2.5" fill="none"/>
          <path d="M 82 25 Q 85 22 88 25" stroke="#ff8c00" strokeWidth="2.5" fill="none"/>
          <path d="M 84 30 Q 85 28 86 30" stroke="#ff8c00" strokeWidth="2.5" fill="none"/>
        </g>

        {/* Connexion centrale */}
        <line x1="45" y1="35" x2="55" y2="30" stroke="#6b4423" strokeWidth="1.5"/>
        <line x1="45" y1="55" x2="55" y2="50" stroke="#6b4423" strokeWidth="1.5"/>
      </svg>

      {/* Texte Logo */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-800">CHABAKA</span>
          <span className="text-2xl font-bold text-orange-500 ml-1">PRO</span>
        </div>
        <span className="text-xs text-gray-600 tracking-wide">Réseaux - Sécurité - Maintenance</span>
      </div>
    </div>
  );
};

export default Logo;
