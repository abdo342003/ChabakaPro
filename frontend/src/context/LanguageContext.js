import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Traductions complètes
const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      servicesIndividuals: 'Particuliers',
      servicesBusiness: 'Entreprises',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
      servicesParticuliers: 'Services Particuliers',
      servicesEntreprises: 'Services Entreprises'
    },
    // Hero
    hero: {
      title: 'Services IT',
      location: 'Casablanca',
      tagline: '💻 Votre PC en panne? WiFi lent?',
      infra: 'Infrastructure IT',
      security: 'Cybersécurité',
      support: 'Support 24/7',
      urgentIntervention: 'Intervention urgente',
      satisfiedClients: 'Clients satisfaits',
      years: 'ans',
      experience: 'Expérience terrain',
      from: 'dès',
      freeQuote: 'Devis Gratuit',
      emergency: 'Urgence 24/7',
      particularDescription: 'Des solutions simples et efficaces pour votre maison ou petit commerce'
    },
    // Services
    services: {
      individuals: 'Particuliers',
      business: 'Entreprises',
      pcRepair: 'Dépannage PC & Mac',
      pcTagline: 'Votre ordinateur rame ou ne démarre plus?',
      pcSimple: 'On répare votre ordinateur rapidement: virus, écran noir, lenteur...',
      pcTech: 'Diagnostic hardware/software, réparation OS, suppression malware',
      wifi: 'Wi-Fi & Internet',
      wifiTagline: 'Internet lent ou coupures fréquentes?',
      wifiSimple: 'Votre WiFi sera rapide partout chez vous, sans zones mortes',
      wifiTech: 'Configuration routeur, optimisation bande passante, mesh network',
      security: 'Sécurité & Protection',
      securityTagline: 'Protégez vos données personnelles',
      securitySimple: 'On sécurise votre réseau contre piratage et virus',
      securityTech: 'Firewall, VPN, antivirus entreprise, audit vulnérabilités',
      cameras: 'Caméras de Surveillance',
      camerasTagline: 'Surveillez votre maison ou commerce',
      camerasSimple: 'Voyez en direct depuis votre téléphone, enregistrement 24/7',
      camerasTech: 'Caméras IP PoE, NVR, stockage cloud, accès mobile',
      techDetails: 'Détails techniques',
      see: 'Voir',
      allServices: 'Tous les Services',
      solutions: 'Solutions',
      from: 'dès',
      allServicesParticuliers: 'Tous les Services Particuliers',
      businessSolutions: 'Solutions Entreprises',
      businessSubtitle: 'Infrastructure IT professionnelle pour PME et grandes entreprises'
    },
    // Business Services
    business: {
      servers: 'Serveurs & Infrastructure',
      serversDesc: 'Votre système informatique sécurisé, sauvegardes automatiques, accès à distance',
      serversBenefit1: 'Vos fichiers toujours accessible',
      serversBenefit2: 'Sauvegarde automatique quotidienne',
      serversBenefit3: 'Accès sécurisé depuis partout',
      networks: 'Réseaux Professionnels',
      networksDesc: 'Internet ultra-rapide dans tous les bureaux, WiFi sécurisé, aucune coupure',
      networksBenefit1: 'Internet stable et rapide partout',
      networksBenefit2: 'Connexion sécurisée pour tous',
      networksBenefit3: 'Support technique 24/7',
      cloud: 'Cloud & Sauvegarde',
      cloudDesc: 'Vos données en sécurité dans le cloud, accessible de partout',
      cloudBenefit1: 'Accès depuis mobile/PC',
      cloudBenefit2: 'Aucune perte de données',
      cloudBenefit3: 'Économie sur serveurs physiques',
      videoconf: 'Visioconférence Pro',
      videoconfDesc: 'Réunions en ligne claires, partage d’écran, audio/vidéo HD',
      videoconfBenefit1: 'Qualité image & son HD',
      videoconfBenefit2: 'Partage d’écran facile',
      videoconfBenefit3: 'Compatible Zoom/Teams'
    },
    // Workflow
    workflow: {
      title: 'Comment Ça Marche?',
      subtitle: 'Un processus simple en 4 étapes — de l\'appel jusqu\'à la garantie',
      step1: 'Contact Gratuit',
      step1Simple: 'Appelez-nous ou WhatsApp',
      step1Tech: 'Diagnostic initial par téléphone ou formulaire en ligne',
      step2: 'Intervention Rapide',
      step2Simple: 'On vient chez vous sous 24h',
      step2Tech: 'Déplacement sous 24h (2h urgences) avec équipement certifié',
      step3: 'Réparation Expert',
      step3Simple: 'On règle le problème sur place',
      step3Tech: 'Résolution technique avec tests qualité et validation client',
      step4: 'Garantie & Suivi',
      step4Simple: 'Garanti 30 jours + aide après',
      step4Tech: 'Support post-intervention, documentation, garantie satisfait/remboursé'
    },
    // Stats
    stats: {
      satisfiedClients: 'Clients Satisfaits',
      completedProjects: 'Projets Réussis',
      averageRating: 'Note Moyenne'
    },
    // CTA
    cta: {
      needHelp: 'Besoin d\'aide informatique ?',
      contactUs: 'Contactez-nous aujourd\'hui pour une consultation gratuite. Nous répondons en moins de 24h.',
      requestQuote: 'Demander Devis',
      callUs: 'Nous Appeler',
      readyToModernize: 'Prêt à moderniser votre infrastructure IT?',
      contactForQuote: 'Contactez-nous pour une consultation gratuite et un devis personnalisé pour votre entreprise.',
      onQuote: 'Sur devis'
    },
    // Enterprise Advantages
    advantages: {
      security: 'Sécurité Maximale',
      securityDesc: 'Protection avancée de vos données et infrastructure',
      support: 'Support 24/7',
      supportDesc: 'Assistance technique disponible jour et nuit',
      expertise: 'Expertise Certifiée',
      expertiseDesc: 'Ingénieurs qualifiés avec 10+ ans d\'expérience',
      activeDirectory: 'Configuration Active Directory',
      userManagement: 'Gestion des utilisateurs',
      monitoring: 'Monitoring 24/7',
      structuredCabling: 'Câblage structuré Cat6/Cat7',
      vlanSegmentation: 'VLAN et segmentation',
      managedSwitches: 'Switches managés',
      cloudMigration: 'Migration cloud (AWS/Azure)',
      virtualization: 'Virtualisation VMware/Hyper-V',
      autoBackup: 'Backup automatique',
      interactiveScreens: 'Écrans interactifs',
      proAudio: 'Audio professionnel',
      teamTraining: 'Formation équipe'
    },
    // About Page
    about: {
      title: 'À Propos de ChabakaPro',
      missionTitle: 'Notre Mission',
      missionText: 'Chez ChabakaPro, nous offrons des services IT professionnels et accessibles aux particuliers et PME de Casablanca. Notre expertise technique combinée à notre connaissance du marché local nous permet de fournir des solutions adaptées à vos besoins.',
      whyUsTitle: 'Pourquoi Nous Choisir ?',
      reason1: '5+ années d\'expérience dans les services IT à Casablanca',
      reason2: 'Expertise locale - Connaissance approfondie du marché marocain',
      reason3: 'Support réactif - Intervention en 24h maximum',
      reason4: 'Transparence totale sur les tarifs et prestations',
      reason5: '98% de satisfaction client',
      certificationsTitle: 'Certifications & Qualifications',
      cert1: 'Certification Windows Server',
      cert2: 'Expérience AWS/Azure Cloud',
      cert3: 'Audit de sécurité certifié',
      cert4: 'Formation réseau professionnel'
    },
    // Footer
    footer: {
      about: 'À Propos',
      aboutText: 'Services IT professionnels à Casablanca. Dépannage, installation, sécurité réseau pour particuliers et PME.',
      tagline: 'Réseaux - Sécurité - Maintenance',
      navigation: 'Navigation',
      contact: 'Contact',
      assistance: 'Assistance',
      phone: 'Téléphone',
      email: 'Email',
      address: 'Adresse',
      casablanca: 'Casablanca, Maroc',
      schedule: 'Lun-Sam: 9h-19h',
      whatsapp: 'Chat WhatsApp',
      legal: 'Mentions Légales',
      privacy: 'Confidentialité',
      terms: 'CGU',
      rights: 'Tous droits réservés',
      madeWith: 'Conçu avec',
      inCasablanca: 'à Casablanca'
    }
  },
  ar: {
    // Navigation - Arabic
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      servicesIndividuals: 'الأفراد',
      servicesBusiness: 'الشركات',
      portfolio: 'أعمالنا',
      blog: 'المدونة',
      contact: 'اتصل بنا',
      servicesParticuliers: 'خدمات الأفراد',
      servicesEntreprises: 'خدمات الشركات'
    },
    // Hero
    hero: {
      title: 'خدمات تقنية المعلومات',
      location: 'الدار البيضاء',
      tagline: '💻 جهازك معطل؟ الإنترنت بطيء؟',
      infra: 'البنية التحتية لتقنية المعلومات',
      security: 'الأمن السيبراني',
      support: 'دعم 24/7',
      urgentIntervention: 'تدخل عاجل',
      satisfiedClients: 'عميل راضٍ',
      years: 'سنوات',
      experience: 'خبرة ميدانية',
      from: 'ابتداءً من',
      freeQuote: 'عرض سعر مجاني',
      emergency: 'طوارئ 24/7',
      particularDescription: 'حلول بسيطة وفعالة لمنزلك أو متجرك الصغير'
    },
    // Services
    services: {
      individuals: 'الأفراد',
      business: 'الشركات',
      pcRepair: 'إصلاح الكمبيوتر والماك',
      pcTagline: 'جهازك بطيء أو لا يعمل؟',
      pcSimple: 'نصلح جهازك بسرعة: فيروسات، شاشة سوداء، بطء...',
      pcTech: 'تشخيص العتاد والبرمجيات، إصلاح النظام، إزالة البرامج الضارة',
      wifi: 'واي فاي والإنترنت',
      wifiTagline: 'إنترنت بطيء أو انقطاعات متكررة؟',
      wifiSimple: 'سيكون الواي فاي سريعًا في كل مكان في منزلك',
      wifiTech: 'تكوين الراوتر، تحسين النطاق الترددي، شبكة ميش',
      security: 'الأمن والحماية',
      securityTagline: 'احمِ بياناتك الشخصية',
      securitySimple: 'نؤمن شبكتك ضد القرصنة والفيروسات',
      securityTech: 'جدار حماية، VPN، مضاد فيروسات احترافي، تدقيق أمني',
      cameras: 'كاميرات المراقبة',
      camerasTagline: 'راقب منزلك أو متجرك',
      camerasSimple: 'شاهد مباشرة من هاتفك، تسجيل 24/7',
      camerasTech: 'كاميرات IP PoE، NVR، تخزين سحابي، وصول عبر الموبايل',
      techDetails: 'تفاصيل تقنية',
      see: 'عرض',
      allServices: 'جميع الخدمات',
      solutions: 'حلول',
      from: 'ابتداءً من',
      allServicesParticuliers: 'جميع خدمات الأفراد',
      businessSolutions: 'حلول الشركات',
      businessSubtitle: 'بنية تحتية احترافية لتقنية المعلومات للشركات الصغيرة والمتوسطة والكبيرة'
    },
    // Business Services
    business: {
      servers: 'الخوادم والبنية التحتية',
      serversDesc: 'نظام معلوماتي آمن، نسخ احتياطي تلقائي، وصول عن بُعد',
      serversBenefit1: 'ملفاتك متاحة دائمًا',
      serversBenefit2: 'نسخ احتياطي يومي تلقائي',
      serversBenefit3: 'وصول آمن من أي مكان',
      networks: 'الشبكات الاحترافية',
      networksDesc: 'إنترنت فائق السرعة في جميع المكاتب، واي فاي آمن، بدون انقطاع',
      networksBenefit1: 'إنترنت مستقر وسريع في كل مكان',
      networksBenefit2: 'اتصال آمن للجميع',
      networksBenefit3: 'دعم تقني 24/7',
      cloud: 'السحابة والنسخ الاحتياطي',
      cloudDesc: 'بياناتك آمنة في السحابة، يمكن الوصول إليها من أي مكان',
      cloudBenefit1: 'وصول من الموبايل/الكمبيوتر',
      cloudBenefit2: 'لا تفقد للبيانات أبدًا',
      cloudBenefit3: 'توفير في الخوادم الفعلية',
      videoconf: 'مؤتمرات الفيديو الاحترافية',
      videoconfDesc: 'اجتماعات عبر الإنترنت واضحة، مشاركة الشاشة، صوت/فيديو عالي الدقة',
      videoconfBenefit1: 'جودة صوت وصورة عالية',
      videoconfBenefit2: 'مشاركة الشاشة بسهولة',
      videoconfBenefit3: 'متوافق مع Zoom/Teams'
    },
    // Workflow
    workflow: {
      title: 'كيف نعمل؟',
      subtitle: 'عملية بسيطة في 4 خطوات — من المكالمة إلى الضمان',
      step1: 'اتصال مجاني',
      step1Simple: 'اتصل بنا أو واتساب',
      step1Tech: 'تشخيص أولي عبر الهاتف أو النموذج الإلكتروني',
      step2: 'تدخل سريع',
      step2Simple: 'نأتي إليك خلال 24 ساعة',
      step2Tech: 'تنقل خلال 24 ساعة (ساعتان للطوارئ) بمعدات معتمدة',
      step3: 'إصلاح خبير',
      step3Simple: 'نحل المشكلة في الموقع',
      step3Tech: 'حل تقني مع اختبارات الجودة والتحقق من العميل',
      step4: 'ضمان ومتابعة',
      step4Simple: 'ضمان 30 يومًا + مساعدة بعد الخدمة',
      step4Tech: 'دعم ما بعد التدخل، توثيق، ضمان رضا أو استرداد'
    },
    // About Page
    about: {
      title: 'حول ChabakaPro',
      missionTitle: 'مهمتنا',
      missionText: 'في ChabakaPro، نقدم خدمات تقنية المعلومات الاحترافية والميسورة للأفراد والشركات الصغيرة والمتوسطة في الدار البيضاء. خبرتنا التقنية مع معرفتنا العميقة بالسوق المحلي تمكننا من تقديم حلول مناسبة لاحتياجاتك.',
      whyUsTitle: 'لماذا تختارنا؟',
      reason1: '5+ سنوات من الخبرة في خدمات تقنية المعلومات بالدار البيضاء',
      reason2: 'خبرة محلية - معرفة عميقة بالسوق المغربي',
      reason3: 'دعم سريع الاستجابة - تدخل في 24 ساعة كحد أقصى',
      reason4: 'شفافية كاملة في الأسعار والخدمات',
      reason5: '98% رضا العملاء',
      certificationsTitle: 'الشهادات والمؤهلات',
      cert1: 'شهادة Windows Server',
      cert2: 'خبرة AWS/Azure السحابية',
      cert3: 'تدقيق أمني معتمد',
      cert4: 'تدريب احترافي على الشبكات'
    },
    // Stats
    stats: {
      satisfiedClients: 'عميل راضٍ',
      completedProjects: 'مشروع ناجح',
      averageRating: 'التقييم المتوسط'
    },
    // CTA
    cta: {
      needHelp: 'تحتاج مساعدة تقنية؟',
      contactUs: 'اتصل بنا اليوم للحصول على استشارة مجانية. نرد خلال 24 ساعة.',
      requestQuote: 'طلب عرض سعر',
      callUs: 'اتصل بنا',
      readyToModernize: 'هل أنت مستعد لتحديث بنيتك التحتية لتقنية المعلومات؟',
      contactForQuote: 'اتصل بنا للحصول على استشارة مجانية وعرض سعر مخصص لشركتك.',
      onQuote: 'حسب الطلب'
    },
    // Enterprise Advantages
    advantages: {
      security: 'أمان أقصى',
      securityDesc: 'حماية متقدمة لبياناتك وبنيتك التحتية',
      support: 'دعم 24/7',
      supportDesc: 'مساعدة تقنية متاحة ليلاً ونهاراً',
      expertise: 'خبرة معتمدة',
      expertiseDesc: 'مهندسون مؤهلون مع أكثر من 10 سنوات من الخبرة',
      activeDirectory: 'تكوين Active Directory',
      userManagement: 'إدارة المستخدمين',
      monitoring: 'مراقبة 24/7',
      structuredCabling: 'كابلات منظمة Cat6/Cat7',
      vlanSegmentation: 'VLAN وتقسيم الشبكة',
      managedSwitches: 'Switches مُدارة',
      cloudMigration: 'ترحيل سحابي (AWS/Azure)',
      virtualization: 'افتراضية VMware/Hyper-V',
      autoBackup: 'نسخ احتياطي تلقائي',
      interactiveScreens: 'شاشات تفاعلية',
      proAudio: 'صوت احترافي',
      teamTraining: 'تدريب الفريق'
    },
    // Footer
    footer: {
      about: 'من نحن',
      aboutText: 'خدمات تقنية المعلومات الاحترافية بالدار البيضاء. الإصلاح، التثبيت، أمن الشبكات للأفراد والشركات الصغيرة والمتوسطة.',
      tagline: 'الشبكات - الأمن - الصيانة',
      navigation: 'التنقل',
      contact: 'اتصل',
      assistance: 'المساعدة',
      phone: 'هاتف',
      email: 'بريد إلكتروني',
      address: 'العنوان',
      casablanca: 'الدار البيضاء، المغرب',
      schedule: 'الإثنين-السبت: 9ص-7م',
      whatsapp: 'دردشة واتساب',
      legal: 'الإشعارات القانونية',
      privacy: 'الخصوصية',
      terms: 'شروط الاستخدام',
      rights: 'جميع الحقوق محفوظة',
      madeWith: 'صُنع بـ',
      inCasablanca: 'في الدار البيضاء'
    }
  },
  en: {
    // Navigation - English
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      servicesIndividuals: 'Individuals',
      servicesBusiness: 'Business',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
      servicesParticuliers: 'Individual Services',
      servicesEntreprises: 'Business Services'
    },
    // Hero
    hero: {
      title: 'IT Services',
      location: 'Casablanca',
      tagline: '💻 PC broken? Slow WiFi?',
      infra: 'IT Infrastructure',
      security: 'Cybersecurity',
      support: 'Support 24/7',
      urgentIntervention: 'Emergency intervention',
      satisfiedClients: 'Satisfied clients',
      years: 'years',
      experience: 'Field experience',
      from: 'from',
      freeQuote: 'Free Quote',
      emergency: 'Emergency 24/7',
      particularDescription: 'Simple and effective solutions for your home or small business'
    },
    // Services
    services: {
      individuals: 'Individuals',
      business: 'Business',
      pcRepair: 'PC & Mac Repair',
      pcTagline: 'Your computer slow or won\'t start?',
      pcSimple: 'We fix your computer quickly: viruses, black screen, slowness...',
      pcTech: 'Hardware/software diagnosis, OS repair, malware removal',
      wifi: 'Wi-Fi & Internet',
      wifiTagline: 'Slow internet or frequent disconnections?',
      wifiSimple: 'Your WiFi will be fast everywhere at home, no dead zones',
      wifiTech: 'Router configuration, bandwidth optimization, mesh network',
      security: 'Security & Protection',
      securityTagline: 'Protect your personal data',
      securitySimple: 'We secure your network against hacking and viruses',
      securityTech: 'Firewall, VPN, enterprise antivirus, vulnerability audit',
      cameras: 'Surveillance Cameras',
      camerasTagline: 'Monitor your home or business',
      camerasSimple: 'Watch live from your phone, 24/7 recording',
      camerasTech: 'IP PoE cameras, NVR, cloud storage, mobile access',
      techDetails: 'Technical details',
      see: 'View',
      allServices: 'All Services',
      solutions: 'Solutions',
      from: 'from',
      allServicesParticuliers: 'All Individual Services',
      businessSolutions: 'Business Solutions',
      businessSubtitle: 'Professional IT infrastructure for SMEs and large enterprises'
    },
    // Business Services
    business: {
      servers: 'Servers & Infrastructure',
      serversDesc: 'Your secure IT system, automatic backups, remote access',
      serversBenefit1: 'Files always accessible',
      serversBenefit2: 'Daily automatic backup',
      serversBenefit3: 'Secure access from anywhere',
      networks: 'Professional Networks',
      networksDesc: 'Ultra-fast internet in all offices, secure WiFi, no interruptions',
      networksBenefit1: 'Stable and fast internet everywhere',
      networksBenefit2: 'Secure connection for all',
      networksBenefit3: '24/7 technical support',
      cloud: 'Cloud & Backup',
      cloudDesc: 'Your data safe in the cloud, accessible from anywhere',
      cloudBenefit1: 'Access from mobile/PC',
      cloudBenefit2: 'No data loss ever',
      cloudBenefit3: 'Save on physical servers',
      videoconf: 'Professional Videoconferencing',
      videoconfDesc: 'Clear online meetings, screen sharing, HD audio/video',
      videoconfBenefit1: 'HD image & sound quality',
      videoconfBenefit2: 'Easy screen sharing',
      videoconfBenefit3: 'Compatible Zoom/Teams'
    },
    // Workflow
    workflow: {
      title: 'How It Works?',
      subtitle: 'A simple 4-step process — from call to warranty',
      step1: 'Free Contact',
      step1Simple: 'Call us or WhatsApp',
      step1Tech: 'Initial diagnosis by phone or online form',
      step2: 'Fast Intervention',
      step2Simple: 'We come to you within 24h',
      step2Tech: 'Dispatch within 24h (2h emergencies) with certified equipment',
      step3: 'Expert Repair',
      step3Simple: 'We fix the problem on-site',
      step3Tech: 'Technical resolution with quality tests and client validation',
      step4: 'Warranty & Follow-up',
      step4Simple: 'Guaranteed 30 days + help after',
      step4Tech: 'Post-intervention support, documentation, satisfaction guarantee'
    },
    // About Page
    about: {
      title: 'About ChabakaPro',
      missionTitle: 'Our Mission',
      missionText: 'At ChabakaPro, we offer professional and accessible IT services to individuals and SMEs in Casablanca. Our technical expertise combined with our knowledge of the local market allows us to provide solutions tailored to your needs.',
      whyUsTitle: 'Why Choose Us?',
      reason1: '5+ years of experience in IT services in Casablanca',
      reason2: 'Local expertise - In-depth knowledge of the Moroccan market',
      reason3: 'Responsive support - Intervention within 24h maximum',
      reason4: 'Total transparency on prices and services',
      reason5: '98% customer satisfaction',
      certificationsTitle: 'Certifications & Qualifications',
      cert1: 'Windows Server Certification',
      cert2: 'AWS/Azure Cloud Experience',
      cert3: 'Certified Security Audit',
      cert4: 'Professional Network Training'
    },
    // Stats
    stats: {
      satisfiedClients: 'Satisfied Clients',
      completedProjects: 'Successful Projects',
      averageRating: 'Average Rating'
    },
    // CTA
    cta: {
      needHelp: 'Need IT help?',
      contactUs: 'Contact us today for a free consultation. We respond within 24h.',
      requestQuote: 'Request Quote',
      callUs: 'Call Us',
      readyToModernize: 'Ready to modernize your IT infrastructure?',
      contactForQuote: 'Contact us for a free consultation and a personalized quote for your business.',
      onQuote: 'On quote'
    },
    // Enterprise Advantages
    advantages: {
      security: 'Maximum Security',
      securityDesc: 'Advanced protection of your data and infrastructure',
      support: '24/7 Support',
      supportDesc: 'Technical assistance available day and night',
      expertise: 'Certified Expertise',
      expertiseDesc: 'Qualified engineers with 10+ years of experience',
      activeDirectory: 'Active Directory Configuration',
      userManagement: 'User Management',
      monitoring: '24/7 Monitoring',
      structuredCabling: 'Structured Cabling Cat6/Cat7',
      vlanSegmentation: 'VLAN and Segmentation',
      managedSwitches: 'Managed Switches',
      cloudMigration: 'Cloud Migration (AWS/Azure)',
      virtualization: 'VMware/Hyper-V Virtualization',
      autoBackup: 'Automatic Backup',
      interactiveScreens: 'Interactive Screens',
      proAudio: 'Professional Audio',
      teamTraining: 'Team Training'
    },
    // Footer
    footer: {
      about: 'About',
      aboutText: 'Professional IT services in Casablanca. Troubleshooting, installation, network security for individuals and SMEs.',
      tagline: 'Networks - Security - Maintenance',
      navigation: 'Navigation',
      contact: 'Contact',
      assistance: 'Assistance',
      phone: 'Phone',
      email: 'Email',
      address: 'Address',
      casablanca: 'Casablanca, Morocco',
      schedule: 'Mon-Sat: 9am-7pm',
      whatsapp: 'WhatsApp Chat',
      legal: 'Legal Notice',
      privacy: 'Privacy',
      terms: 'Terms of Use',
      rights: 'All rights reserved',
      madeWith: 'Made with',
      inCasablanca: 'in Casablanca'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'fr'; // Par défaut français
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Change direction for Arabic
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
    if (['fr', 'ar', 'en'].includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
