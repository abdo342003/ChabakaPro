export const servicesParticuliers = [
  {
    id: 'depannage_pc',
    icon: '🔧',
    title: 'Dépannage & Maintenance PC',
    description: 'Votre ordinateur est lent ? Infecté par un virus ? Nous le réparerons. Nettoyage système, suppression malwares, optimisation, et plus.',
    included: [
      'Diagnostic complet',
      'Suppression malwares/virus',
      'Nettoyage registre Windows',
      'Optimisation performance',
      'Mise à jour antivirus',
      'Support 30 jours gratuit'
    ],
    price: '200 MAD',
    duration: '1–2h'
  },
  {
    id: 'installation_wifi',
    icon: '📡',
    title: 'Installation/Réparation Wi-Fi',
    description: 'Mauvais signal Wi-Fi ? Vitesse lente ? Nous optimisons votre réseau ou installons un nouveau routeur professionnel.',
    included: [
      'Diagnostic couverture signal',
      'Repositionnement routeur optimal',
      'Configuration sécurisée (WPA3)',
      'Augmentation portée (extender si besoin)',
      'Test vitesse avant/après',
      'Support 30 jours gratuit'
    ],
    price: '150 MAD',
    duration: '1h'
  },
  {
    id: 'installation_os',
    icon: '💾',
    title: 'Installation Windows ou Linux',
    description: 'Besoin d\'une réinstallation complète ? Nous installons Windows 10/11 ou Linux (Ubuntu, Fedora) avec tous les drivers et logiciels.',
    included: [
      'Sauvegarde données (si possible)',
      'Installation OS propre',
      'Installation drivers',
      'Installation antivirus + firewall',
      'Transfert données (optionnel)',
      'Support 30 jours gratuit'
    ],
    price: '250 MAD',
    duration: '2–3h'
  },
  {
    id: 'securite_reseau',
    icon: '🔐',
    title: 'Sécurisation du Réseau Domestique',
    description: 'Sécurisez votre réseau Wi-Fi, protégez tous les appareils contre les cybermenaces et les accès non autorisés.',
    included: [
      'Configuration firewall',
      'Sécurisation Wi-Fi avancée',
      'Installation antivirus/anti-malware',
      'Chiffrement données sensibles',
      'Backup automatique cloud',
      'Support 30 jours gratuit'
    ],
    price: '300 MAD',
    duration: '2h'
  },
  {
    id: 'cameras_ip',
    icon: '🎥',
    title: 'Installation Caméras IP Domestiques',
    description: 'Installez des caméras IP modernes pour surveiller votre domicile en temps réel via smartphone, avec stockage cloud sécurisé.',
    included: [
      'Conseil sur placement optimal',
      'Installation 2–4 caméras (POE ou Wi-Fi)',
      'Configuration NVR ou cloud',
      'Application mobile setup',
      'Support 30 jours gratuit',
      'Stockage cloud 1 mois gratuit'
    ],
    price: '500–1000 MAD',
    duration: '2–4h'
  }
];

export const servicesEntreprises = [
  {
    id: 'conception_reseau',
    icon: '🌐',
    title: 'Conception Réseau Complète',
    description: 'Infrastructure réseau professionnelle de A à Z. Switches, routeurs, câblage, configuration VLAN et déploiement complet.',
    included: [
      'Switches & Routeurs professionnels',
      'Configuration VLAN',
      'Câblage professionnel CAT6/CAT7',
      'Déploiement & tests',
      'Documentation complète',
      'Formation équipe'
    ],
    price: '2000–4000 MAD',
    duration: '1–2 semaines'
  },
  {
    id: 'windows_server',
    icon: '🖥️',
    title: 'Windows Server & Active Directory',
    description: 'Déploiement et configuration Windows Server avec Active Directory pour la gestion centralisée de vos utilisateurs et ressources.',
    included: [
      'Installation Windows Server',
      'Configuration Active Directory',
      'Gestion utilisateurs et groupes',
      'Politiques de sécurité (GPO)',
      'Backup automatique',
      'Support 3 mois'
    ],
    price: '3000–5000 MAD',
    duration: '1–2 semaines'
  },
  {
    id: 'sauvegarde_cloud',
    icon: '☁️',
    title: 'Sauvegarde Cloud Automatique',
    description: 'Protégez vos données critiques avec des sauvegardes automatiques chiffrées dans le cloud (AWS, Azure, Google Cloud).',
    included: [
      'Configuration backup automatique',
      'Chiffrement bout-en-bout',
      'Rétention configurable',
      'Restauration rapide',
      'Monitoring 24/7',
      'Tests de restauration mensuels'
    ],
    price: '1500–3000 MAD',
    duration: '3–5 jours'
  },
  {
    id: 'surveillance_pro',
    icon: '📹',
    title: 'Surveillance Professionnelle',
    description: 'Système de vidéosurveillance professionnel avec caméras IP haute résolution, NVR, et accès distant sécurisé.',
    included: [
      'Caméras IP professionnelles',
      'NVR ou serveur dédié',
      'Stockage local + cloud',
      'Application mobile',
      'Alertes temps réel',
      'Maintenance 6 mois'
    ],
    price: '5000–10000 MAD',
    duration: '2–3 semaines'
  },
  {
    id: 'microsoft_365',
    icon: '📧',
    title: 'Microsoft 365 / Google Workspace',
    description: 'Migration et déploiement de suites collaboratives professionnelles (Microsoft 365, Google Workspace) pour votre entreprise.',
    included: [
      'Migration emails',
      'Configuration utilisateurs',
      'SharePoint/Drive setup',
      'Teams/Meet configuration',
      'Formation équipe',
      'Support 3 mois'
    ],
    price: '2000–4000 MAD',
    duration: '1 semaine'
  },
  {
    id: 'audit_securite',
    icon: '🛡️',
    title: 'Audit de Sécurité Complet',
    description: 'Analyse complète de la sécurité de votre infrastructure IT avec rapport détaillé et recommandations d\'amélioration.',
    included: [
      'Scan vulnérabilités',
      'Test pénétration (si demandé)',
      'Audit politique sécurité',
      'Rapport détaillé',
      'Plan d\'action prioritaire',
      'Suivi 3 mois'
    ],
    price: '3000–6000 MAD',
    duration: '1–2 semaines'
  },
  {
    id: 'support_mensuel',
    icon: '🤝',
    title: 'Support IT Mensuel',
    description: 'Support IT externalisé avec intervention sur site ou à distance, maintenance préventive et hotline prioritaire.',
    included: [
      'Hotline prioritaire',
      'Interventions illimitées',
      'Maintenance préventive',
      'Mises à jour sécurité',
      'Monitoring infrastructure',
      'Rapport mensuel'
    ],
    price: '1500–5000 MAD/mois',
    duration: 'Mensuel'
  }
];
