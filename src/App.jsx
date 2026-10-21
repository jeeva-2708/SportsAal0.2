import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './sections/Header/Header.jsx';
import Footer from './sections/Footer/Footer.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail.jsx';
import VenueBooking from './pages/VenueBooking/VenueBooking.jsx';
import AtmosphericMist from './components/common/AtmosphericMist/AtmosphericMist.jsx';
import CustomCricketLoader from './components/common/CustomCricketLoader/CustomCricketLoader.jsx';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop.jsx';

export default function App() {
  return (
    <div className="app-root">
      <CustomCricketLoader />
      <AtmosphericMist />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
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

