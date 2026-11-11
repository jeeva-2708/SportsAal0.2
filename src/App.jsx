import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './sections/Header/Header.jsx';
import Footer from './sections/Footer/Footer.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail.jsx';
import VenueBooking from './pages/VenueBooking/VenueBooking.jsx';
import AtmosphericMist from './components/common/AtmosphericMist/AtmosphericMist.jsx';
// CustomCricketLoader preserved intact as requested; disabled temporarily
// import CustomCricketLoader from './components/common/CustomCricketLoader/CustomCricketLoader.jsx';
import CinematicIntro from './components/common/CinematicIntro/CinematicIntro.jsx';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop.jsx';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="app-root">
      {/* <CustomCricketLoader /> - Preserved for future use */}
      <CinematicIntro onComplete={() => setIntroComplete(true)} />
      <AtmosphericMist />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage introComplete={introComplete} />} />
        <Route path="/services/venue-management" element={<VenueBooking />} />
        <Route path="/venues" element={<VenueBooking />} />
        <Route path="/venue-booking" element={<VenueBooking />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

