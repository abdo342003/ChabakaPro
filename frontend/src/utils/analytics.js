import ReactGA from 'react-ga4';

// GTM DataLayer helper
const pushToDataLayer = (data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};

// Initialize Google Analytics 4
export const initGA = () => {
  const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
  if (trackingId) {
    ReactGA.initialize(trackingId);
  }
};

// Log page views to both GA4 and GTM
export const logPageView = (path = null) => {
  const pagePath = path || window.location.pathname + window.location.search;
  
  // GA4
  ReactGA.send({ hitType: 'pageview', page: pagePath });
  
  // GTM DataLayer
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: document.title
  });
};

// Generic event logging for GA4 and GTM
export const logEvent = (category, action, label = '', value = undefined) => {
  // GA4
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
  
  // GTM DataLayer
  pushToDataLayer({
    event: 'custom_event',
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value
  });
};

// Track button clicks
export const logButtonClick = (buttonName, location = '') => {
  logEvent('Button', 'Click', buttonName);
  pushToDataLayer({
    event: 'button_click',
    button_name: buttonName,
    click_location: location
  });
};

// Track form submissions
export const logFormSubmission = (formName, formData = {}) => {
  logEvent('Form', 'Submit', formName);
  pushToDataLayer({
    event: 'form_submission',
    form_name: formName,
    form_type: formData.type || 'general'
  });
};

// Track phone clicks
export const logPhoneClick = (phoneNumber = '') => {
  logEvent('Contact', 'Phone Click', 'Call Button');
  pushToDataLayer({
    event: 'phone_click',
    phone_number: phoneNumber
  });
};

// Track WhatsApp clicks
export const logWhatsAppClick = (context = 'floating_button') => {
  logEvent('Contact', 'WhatsApp Click', context);
  pushToDataLayer({
    event: 'whatsapp_click',
    click_context: context
  });
};

// Track service view
export const logServiceView = (serviceName, serviceType = 'particulier') => {
  logEvent('Service', 'View', serviceName);
  pushToDataLayer({
    event: 'service_view',
    service_name: serviceName,
    service_type: serviceType
  });
};

// Track portfolio case view
export const logPortfolioView = (caseId, caseName = '') => {
  logEvent('Portfolio', 'View', caseName);
  pushToDataLayer({
    event: 'portfolio_view',
    case_id: caseId,
    case_name: caseName
  });
};

// Track blog article view
export const logBlogView = (articleSlug, articleTitle = '') => {
  logEvent('Blog', 'View', articleTitle);
  pushToDataLayer({
    event: 'blog_view',
    article_slug: articleSlug,
    article_title: articleTitle
  });
};

// Track quote request
export const logDevisRequest = (serviceType, clientType = '') => {
  logEvent('Conversion', 'Devis Request', serviceType);
  pushToDataLayer({
    event: 'devis_request',
    service_type: serviceType,
    client_type: clientType
  });
};

// Track scroll depth
export const logScrollDepth = (percentage) => {
  pushToDataLayer({
    event: 'scroll_depth',
    scroll_percentage: percentage
  });
};

// Track errors
export const logError = (errorMessage, errorLocation = '') => {
  logEvent('Error', 'JavaScript Error', errorMessage);
  pushToDataLayer({
    event: 'error',
    error_message: errorMessage,
    error_location: errorLocation
  });
};
