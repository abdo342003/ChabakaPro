import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { logPageView } from '../../utils/analytics';

const SEO = ({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = 'website',
  article = null,
  noindex = false,
  lang = 'fr'
}) => {
  const siteName = 'ChabakaPro';
  const siteNameAr = 'شبكة برو';
  const baseUrl = 'https://www.chabakapro.com';
  
  const siteTitle = title 
    ? `${title} | ${siteName} - Services IT Casablanca` 
    : `${siteName} - Services IT & Dépannage Informatique Casablanca | خدمات تكنولوجيا المعلومات الدار البيضاء`;
  
  // Enhanced description with Moroccan focus
  const siteDescription = description || 
    'Services IT professionnels à Casablanca et au Maroc. Dépannage PC, installation Wi-Fi, réseaux, sécurité informatique et vidéosurveillance pour particuliers & entreprises. Intervention rapide 24h/7j. Devis gratuit. خدمات تكنولوجيا المعلومات في الدار البيضاء';
  
  // Comprehensive Moroccan keywords
  const defaultKeywords = [
    // French keywords - Casablanca
    'dépannage informatique Casablanca',
    'réparation PC Casablanca',
    'technicien informatique Casablanca',
    'installation Wi-Fi Casablanca',
    'services IT Casablanca',
    'maintenance informatique Casablanca',
    'sécurité informatique Casablanca',
    'installation caméras surveillance Casablanca',
    'réseau informatique Casablanca',
    'support informatique entreprise Casablanca',
    // French keywords - Morocco general
    'dépannage informatique Maroc',
    'services informatiques Maroc',
    'technicien IT Maroc',
    'installation réseau Maroc',
    // Arabic keywords - Darija/Moroccan
    'تصليح الكمبيوتر الدار البيضاء',
    'صيانة الحاسوب كازا',
    'خدمات الانترنت الدار البيضاء',
    'تركيب كاميرات المراقبة',
    'شركة معلوميات الدار البيضاء',
    'إصلاح الحاسوب المغرب',
    // Specific services
    'antivirus Casablanca',
    'récupération données Casablanca',
    'formation informatique Casablanca',
    'infogérance PME Maroc',
    'cloud computing Maroc',
    // Location-based
    'informatique Maarif',
    'dépannage Ain Diab',
    'IT services Anfa',
    'technicien Hay Hassani',
    'informatique Sidi Maarouf'
  ].join(', ');
  
  const siteImage = image?.startsWith('http') ? image : `${baseUrl}${image || '/og-image.jpg'}`;
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : baseUrl);
  const canonicalUrl = siteUrl.split('?')[0]; // Remove query params for canonical

  // Log page view when SEO component mounts
  useEffect(() => {
    logPageView(canonicalUrl.replace(baseUrl, ''));
  }, [canonicalUrl]);

  // Enhanced Structured data for organization - Morocco focused
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#organization`,
    name: siteName,
    alternateName: [siteNameAr, 'Chabaka Pro', 'شبكة برو للمعلوميات'],
    description: siteDescription,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`,
      width: 512,
      height: 512
    },
    image: siteImage,
    telephone: '+212722618635',
    email: 'abdellaherraoui3@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Casablanca',
      addressLocality: 'Casablanca',
      addressRegion: 'Casablanca-Settat',
      postalCode: '20000',
      addressCountry: 'MA'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '33.5731',
      longitude: '-7.5898'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '18:00'
      }
    ],
    priceRange: 'MAD 200 - MAD 5000',
    currenciesAccepted: 'MAD',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer, Mobile Payment',
    areaServed: [
      {
        '@type': 'City',
        name: 'Casablanca',
        '@id': 'https://www.wikidata.org/wiki/Q7903'
      },
      {
        '@type': 'Country',
        name: 'Morocco',
        '@id': 'https://www.wikidata.org/wiki/Q1028'
      }
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: '33.5731',
        longitude: '-7.5898'
      },
      geoRadius: '50000'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services IT ChabakaPro',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dépannage Informatique',
            description: 'Réparation PC et Mac, diagnostic, nettoyage virus'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Installation Wi-Fi & Réseau',
            description: 'Configuration réseau, Wi-Fi, câblage, fibre optique'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sécurité Informatique',
            description: 'Antivirus, firewall, protection des données'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Vidéosurveillance',
            description: 'Installation caméras CCTV, systèmes de sécurité'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    sameAs: [
      'https://wa.me/212722618635',
      'https://facebook.com/chabakapro',
      'https://instagram.com/chabakapro',
      'https://linkedin.com/company/chabakapro'
    ],
    slogan: 'Expert IT à votre service - خبير تكنولوجيا المعلومات في خدمتكم',
    knowsLanguage: ['fr', 'ar', 'en'],
    foundingDate: '2015',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 5,
      maxValue: 15
    }
  };

  // Service schema for better local SEO
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'IT Services',
    provider: {
      '@type': 'LocalBusiness',
      name: siteName
    },
    areaServed: {
      '@type': 'City',
      name: 'Casablanca'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services Informatiques Casablanca',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Services Particuliers',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dépannage PC/Mac' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Installation Wi-Fi' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Récupération de données' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Nettoyage virus' } }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Services Entreprises',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Infrastructure réseau' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Maintenance informatique' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Vidéosurveillance' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Solutions Cloud' } }
          ]
        }
      ]
    }
  };

  // FAQ Schema for common questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Combien coûte un dépannage informatique à Casablanca ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nos tarifs de dépannage informatique à Casablanca commencent à partir de 200 MAD. Le prix final dépend de la complexité du problème. Devis gratuit avant toute intervention.'
        }
      },
      {
        '@type': 'Question',
        name: 'Intervenez-vous en urgence à Casablanca ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, nous proposons des interventions urgentes sous 2h à Casablanca et ses environs. Disponibles 7j/7 pour les urgences informatiques.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quels quartiers de Casablanca couvrez-vous ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nous intervenons dans tout Casablanca : Maarif, Anfa, Ain Diab, Hay Hassani, Sidi Maarouf, Bouskoura, Mohammedia et toute la région.'
        }
      },
      {
        '@type': 'Question',
        name: 'كم تكلفة إصلاح الكمبيوتر في الدار البيضاء؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'تبدأ أسعارنا من 200 درهم. نقدم تشخيص مجاني قبل أي تدخل. اتصل بنا للحصول على عرض سعر مجاني.'
        }
      }
    ]
  };

  // Article schema for blog posts
  const articleSchema = article ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: siteDescription,
    image: siteImage,
    author: {
      '@type': 'Organization',
      name: siteName
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={lang} />
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content={siteName} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}

      {/* Morocco/Arabic specific meta */}
      <meta name="geo.region" content="MA-CAS" />
      <meta name="geo.placename" content="Casablanca, Morocco" />
      <meta name="geo.position" content="33.5731;-7.5898" />
      <meta name="ICBM" content="33.5731, -7.5898" />
      <meta name="language" content="French, Arabic" />
      <meta name="content-language" content="fr, ar" />

      {/* Mobile & App */}
      <meta name="theme-color" content="#0891b2" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="application-name" content={siteName} />
      <meta name="format-detection" content="telephone=yes" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} - Services IT Casablanca`} />
      <meta property="og:locale" content="fr_MA" />
      <meta property="og:locale:alternate" content="ar_MA" />
      <meta property="og:locale:alternate" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:site" content="@chabakapro" />
      <meta name="twitter:creator" content="@chabakapro" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate languages */}
      <link rel="alternate" hrefLang="fr-MA" href={canonicalUrl} />
      <link rel="alternate" hrefLang="ar-MA" href={canonicalUrl} />
      <link rel="alternate" hrefLang="fr" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Structured Data - Service */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      {/* Structured Data - FAQ */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>

      {/* Structured Data - Article (for blog posts) */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}

      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Accueil',
              item: baseUrl
            }
          ]
        })}
      </script>

      {/* WebSite Schema for Sitelinks Search Box */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteName,
          alternateName: siteNameAr,
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/recherche?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          },
          inLanguage: ['fr', 'ar']
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
