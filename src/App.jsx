import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import WhyAji from './components/WhyAji/WhyAji';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Download from './components/Download/Download';
import Footer from './components/Footer/Footer';
import ServicesSlider from './components/Services/ServicesSlider';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import AccountDeletionInfo from './pages/AccountDeletionInfo/AccountDeletionInfo';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TermsAndConditions from './pages/TermsAndConditions/TermsAndConditions';


function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Routes>
          {}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <WhyAji />
                <HowItWorks />
                <ServicesSlider />
                <Download />
              </>
            }
          />

          {/* Page de politique de confidentialité */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/AccountDeletionInfo" element={<AccountDeletionInfo />} />
          <Route path="/terms" element={<TermsAndConditions />} />

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
