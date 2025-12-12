import ReactGA from 'react-ga4';

export const initGA = () => {
  const trackingId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
  if (trackingId) {
    ReactGA.initialize(trackingId);
  }
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
};

export const logEvent = (category, action, label = '') => {
  ReactGA.event({
    category,
    action,
    label,
  });
};

export const logButtonClick = (buttonName) => {
  logEvent('Button', 'Click', buttonName);
};

export const logFormSubmission = (formName) => {
  logEvent('Form', 'Submit', formName);
};

export const logPhoneClick = () => {
  logEvent('Contact', 'Phone Click', 'Call Button');
};

export const logWhatsAppClick = () => {
  logEvent('Contact', 'WhatsApp Click', 'WhatsApp Button');
};
