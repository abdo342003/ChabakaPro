import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = 'website'
}) => {
  const siteTitle = title 
    ? `${title} | ChabakaPro - Services IT Casablanca` 
    : 'ChabakaPro - Services IT & Dépannage Informatique Casablanca';
  
  const siteDescription = description || 
    'Services IT professionnels à Casablanca. Dépannage PC, Wi-Fi, réseaux et sécurité pour particuliers & PME. Intervention 24h. Devis gratuit.';
  
  const siteImage = image || '/og-image.jpg';
  const siteUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  );
};

export default SEO;
