// Script d'initialisation MongoDB
db = db.getSiblingDB('chabakapro');

// Créer des collections
db.createCollection('contacts');
db.createCollection('devis');
db.createCollection('blog');
db.createCollection('portfolio');
db.createCollection('testimonials');

// Insérer des témoignages par défaut
db.testimonials.insertMany([
  {
    name: 'Ahmed K.',
    role: 'Particulier',
    location: 'Casablanca',
    rating: 5,
    text: 'Super professionnel ! Ma maison est maintenant bien connectée. Le technicien a pris le temps de tout expliquer.',
    date: new Date('2024-11-15'),
    verified: true
  },
  {
    name: 'Fatima B.',
    role: 'Directrice PME',
    location: 'Casablanca',
    rating: 5,
    text: 'Support excellent pour notre PME. Très réactif et compétent. Notre réseau fonctionne parfaitement maintenant.',
    date: new Date('2024-10-22'),
    verified: true
  },
  {
    name: 'Hassan M.',
    role: 'Entrepreneur',
    location: 'Casablanca',
    rating: 5,
    text: 'Merci d\'avoir sécurisé notre réseau. Travail de qualité et tarifs transparents. Je recommande vivement.',
    date: new Date('2024-12-01'),
    verified: true
  }
]);

// Insérer des cas portfolio par défaut
db.portfolio.insertMany([
  {
    title: 'Installation Réseau pour PME de Commerce',
    client: 'Commercial Maroc',
    sector: 'Commerce de détail',
    teamSize: 12,
    challenge: 'Le réseau était instable, sans solution de sauvegarde, et présentait des risques de sécurité.',
    solution: [
      'Installation switch Cisco',
      'Routeur professionnel (Unifi)',
      'Configuration Active Directory',
      'Backup automatique (Cloud)',
      'Caméras surveillance (4 points)'
    ],
    results: [
      'Stabilité 99.9%',
      'Zéro temps d\'arrêt',
      'Données sécurisées',
      'Support mensuel'
    ],
    investment: 3500,
    duration: '2 semaines',
    category: 'entreprise',
    image: '/images/portfolio/case-1.jpg',
    featured: true,
    date: new Date('2024-11-01')
  },
  {
    title: 'Sécurisation Réseau Domestique',
    client: 'Famille Benjelloun',
    sector: 'Résidentiel',
    teamSize: 1,
    challenge: 'Wi-Fi non sécurisé, appareils IoT vulnérables, besoin de contrôle parental.',
    solution: [
      'Configuration firewall avancé',
      'Sécurisation Wi-Fi WPA3',
      'Installation antivirus famille',
      'Backup cloud automatique',
      'Contrôle parental'
    ],
    results: [
      'Réseau 100% sécurisé',
      'Protection tous appareils',
      'Contrôle parental actif',
      'Données sauvegardées'
    ],
    investment: 1500,
    duration: '1 semaine',
    category: 'particulier',
    image: '/images/portfolio/case-2.jpg',
    featured: true,
    date: new Date('2024-10-15')
  },
  {
    title: 'Amélioration Wi-Fi Entreprise',
    client: 'Cabinet d\'Avocats Al-Maghrib',
    sector: 'Services juridiques',
    teamSize: 8,
    challenge: 'Couverture Wi-Fi insuffisante, vitesse lente, déconnexions fréquentes.',
    solution: [
      'Installation Access Points professionnels',
      'Optimisation canaux Wi-Fi',
      'Câblage réseau CAT6',
      'Configuration VLAN sécurisés'
    ],
    results: [
      'Couverture 100% bureaux',
      'Vitesse x3',
      'Zéro déconnexion',
      'Sécurité renforcée'
    ],
    investment: 2500,
    duration: '10 jours',
    category: 'entreprise',
    image: '/images/portfolio/case-3.jpg',
    featured: false,
    date: new Date('2024-09-20')
  }
]);

// Insérer des articles de blog par défaut
db.blog.insertMany([
  {
    title: '5 Astuces pour Améliorer votre Wi-Fi à la Maison',
    slug: '5-astuces-ameliorer-wifi-maison',
    excerpt: 'Découvrez nos conseils d\'experts pour optimiser votre connexion Wi-Fi domestique et éliminer les zones mortes.',
    content: `
# 5 Astuces pour Améliorer votre Wi-Fi à la Maison

Votre Wi-Fi est lent ou présente des zones sans couverture ? Voici nos 5 astuces professionnelles pour améliorer votre réseau domestique.

## 1. Positionnement Optimal du Routeur

Placez votre routeur au centre de votre maison, en hauteur, loin des murs épais et des appareils électroniques qui peuvent causer des interférences.

## 2. Choisir le Bon Canal Wi-Fi

Utilisez une application comme WiFi Analyzer pour identifier les canaux moins encombrés. Préférez les canaux 1, 6 ou 11 pour le 2.4GHz.

## 3. Mise à Jour du Firmware

Vérifiez régulièrement les mises à jour de votre routeur. Elles améliorent la sécurité et les performances.

## 4. Utiliser la Bande 5GHz

Si votre routeur est dual-band, utilisez le 5GHz pour les appareils proches du routeur pour une meilleure vitesse.

## 5. Ajouter un Répéteur ou Mesh

Pour les grandes maisons, investissez dans un système mesh ou des répéteurs Wi-Fi pour éliminer les zones mortes.

**Besoin d'aide ?** Contactez ChabakaPro pour un diagnostic gratuit de votre réseau !
    `,
    category: 'wifi',
    tags: ['Wi-Fi', 'Réseau', 'Astuces', 'Domestique'],
    author: 'ChabakaPro Team',
    readTime: 4,
    published: true,
    featured: true,
    image: '/images/blog/wifi-tips.jpg',
    metaDescription: 'Découvrez 5 astuces professionnelles pour améliorer votre Wi-Fi domestique à Casablanca. Optimisation réseau par ChabakaPro.',
    publishedAt: new Date('2024-11-20'),
    createdAt: new Date('2024-11-18')
  },
  {
    title: 'Comment Sécuriser votre Réseau Domestique en 2025',
    slug: 'securiser-reseau-domestique-2025',
    excerpt: 'Guide complet pour protéger votre réseau domestique contre les cybermenaces. Conseils d\'experts en sécurité informatique.',
    content: `
# Comment Sécuriser votre Réseau Domestique en 2025

La sécurité de votre réseau domestique est essentielle. Voici nos recommandations professionnelles.

## 1. Mot de Passe Routeur Fort

Changez immédiatement le mot de passe par défaut de votre routeur. Utilisez au minimum 12 caractères avec majuscules, minuscules, chiffres et symboles.

## 2. Activer WPA3

Si votre routeur le supporte, activez le chiffrement WPA3. Sinon, utilisez au minimum WPA2-AES.

## 3. Réseau Invité Séparé

Créez un réseau Wi-Fi séparé pour vos invités afin de protéger votre réseau principal.

## 4. Désactiver WPS

Le WPS (Wi-Fi Protected Setup) présente des vulnérabilités. Désactivez-le dans les paramètres de votre routeur.

## 5. Firewall et Antivirus

Activez le firewall intégré de votre routeur et installez un antivirus sur tous vos appareils.

## 6. Mises à Jour Automatiques

Activez les mises à jour automatiques de votre routeur et de tous vos appareils connectés.

**ChabakaPro propose un audit de sécurité complet pour 300 MAD. Contactez-nous !**
    `,
    category: 'securite',
    tags: ['Sécurité', 'Réseau', 'Cybersécurité', 'Protection'],
    author: 'ChabakaPro Team',
    readTime: 6,
    published: true,
    featured: true,
    image: '/images/blog/network-security.jpg',
    metaDescription: 'Guide complet 2025 pour sécuriser votre réseau domestique. Conseils experts en cybersécurité par ChabakaPro Casablanca.',
    publishedAt: new Date('2024-12-01'),
    createdAt: new Date('2024-11-28')
  },
  {
    title: 'Windows 11 vs Linux : Quel OS pour vous ?',
    slug: 'windows-11-vs-linux-quel-os',
    excerpt: 'Comparaison détaillée entre Windows 11 et Linux. Découvrez quel système d\'exploitation correspond le mieux à vos besoins.',
    content: `
# Windows 11 vs Linux : Quel OS pour vous ?

Le choix d'un système d'exploitation est crucial. Voici notre comparaison professionnelle.

## Windows 11

### Avantages
- Interface intuitive et moderne
- Compatibilité maximale avec les logiciels
- Support gaming excellent
- Microsoft Office natif

### Inconvénients
- Licence payante (1200-1500 MAD)
- Ressources système élevées
- Mises à jour parfois intrusives

## Linux (Ubuntu/Fedora)

### Avantages
- Gratuit et open source
- Très léger et rapide
- Sécurité renforcée
- Personnalisation maximale

### Inconvénients
- Courbe d'apprentissage
- Compatibilité logiciels limitée
- Support gaming en progression

## Notre Recommandation

**Pour Particuliers :** Windows 11 si vous utilisez Office, Adobe, ou gaming.

**Pour Professionnels :** Linux pour serveurs, développement web.

**Pour Budget Serré :** Linux (Ubuntu) avec LibreOffice.

**ChabakaPro installe les deux OS pour 250 MAD. Installation propre, drivers, et configuration complète !**
    `,
    category: 'os',
    tags: ['Windows', 'Linux', 'OS', 'Comparaison'],
    author: 'ChabakaPro Team',
    readTime: 5,
    published: true,
    featured: false,
    image: '/images/blog/windows-vs-linux.jpg',
    metaDescription: 'Windows 11 vs Linux : comparaison complète pour choisir le meilleur OS. Conseils experts par ChabakaPro Casablanca.',
    publishedAt: new Date('2024-11-10'),
    createdAt: new Date('2024-11-08')
  }
]);

print('Database initialized successfully with sample data!');
