import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logPageView } from '../../utils/analytics';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Log page view
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      logPageView();
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
