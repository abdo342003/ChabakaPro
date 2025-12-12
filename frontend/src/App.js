import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import WhatsAppButton from './components/common/WhatsAppButton';

// Pages
import Home from './pages/Home';
import ServicesParticuliers from './pages/ServicesParticuliers';
import ServicesEntreprises from './pages/ServicesEntreprises';
import Portfolio from './pages/Portfolio';
import PortfolioDetail from './pages/PortfolioDetail';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';

// Analytics
import { initGA, logPageView } from './utils/analytics';

function App() {
  useEffect(() => {
    // Initialiser Google Analytics
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      initGA();
      logPageView();
    }
  }, []);

  return (
    <div className="App bg-white dark:bg-gray-900 transition-colors duration-300">
      <ScrollToTop />
      <Navbar />
      
      <main className="min-h-screen dark:bg-gray-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/particuliers" element={<ServicesParticuliers />} />
          <Route path="/services/entreprises" element={<ServicesEntreprises />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-dashboard-chabakapro" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
      <WhatsAppButton />
      
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
