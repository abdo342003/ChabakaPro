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
  noindex = false
}) => {
  const siteName = 'ChabakaPro';
  const baseUrl = 'https://www.chabakapro.com';
  
  const siteTitle = title 
    ? `${title} | ${siteName} - Services IT Casablanca` 
    : `${siteName} - Services IT & Dépannage Informatique Casablanca`;
  
  const siteDescription = description || 
    'Services IT professionnels à Casablanca. Dépannage PC, Wi-Fi, réseaux et sécurité pour particuliers & PME. Intervention 24h. Devis gratuit.';
  
  const siteImage = image?.startsWith('http') ? image : `${baseUrl}${image || '/og-image.jpg'}`;
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : baseUrl);
  const canonicalUrl = siteUrl.split('?')[0]; // Remove query params for canonical

  // Log page view when SEO component mounts
  useEffect(() => {
    logPageView(canonicalUrl.replace(baseUrl, ''));
  }, [canonicalUrl]);

  // Structured data for organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteName,
    description: siteDescription,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: siteImage,
    telephone: '+212722618635',
    email: 'abdellaherraoui3@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Casablanca',
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
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00'
      }
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'City',
      name: 'Casablanca'
    },
    sameAs: [
      'https://wa.me/212722618635'
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
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={siteName} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Alternate languages (for future i18n) */}
      <link rel="alternate" hrefLang="fr" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* Structured Data - Article (for blog posts) */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
