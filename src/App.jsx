import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './sections/Header/Header.jsx';
import Footer from './sections/Footer/Footer.jsx';
import HomePage from './pages/Home/HomePage.jsx';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail.jsx';
import AtmosphericMist from './components/common/AtmosphericMist/AtmosphericMist.jsx';
import CinematicIntro from './components/common/CinematicIntro/CinematicIntro.jsx';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop.jsx';
import { SiteDataProvider } from './context/SiteDataContext.jsx';

const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin.jsx'));
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout.jsx'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard.jsx'));
const AdminServices = lazy(() => import('./pages/Admin/AdminServices.jsx'));
const AdminServiceItems = lazy(() => import('./pages/Admin/AdminServiceItems.jsx'));
const AdminGallery = lazy(() => import('./pages/Admin/AdminGallery.jsx'));
const AdminSections = lazy(() => import('./pages/Admin/AdminSections.jsx'));
const AdminInquiries = lazy(() => import('./pages/Admin/AdminInquiries.jsx'));
const AdminSecurity = lazy(() => import('./pages/Admin/AdminSecurity.jsx'));

function AppRoutes() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-login');
  const skipIntroForDeepLink =
    isAdminRoute ||
    location.pathname.startsWith('/services/') ||
    location.pathname.startsWith('/venues') ||
    location.pathname.startsWith('/venue-booking') ||
    (location.hash && location.hash !== '#hero');

  const [introComplete, setIntroComplete] = useState(skipIntroForDeepLink);

  useEffect(() => {
    if (skipIntroForDeepLink && !introComplete) {
      setIntroComplete(true);
      document.body.classList.remove('intro-scroll-lock');
    }
  }, [skipIntroForDeepLink, introComplete]);

  if (isAdminRoute) {
    return (
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050505', color: '#fff', display: 'grid', placeItems: 'center' }}>loading....</div>}>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-login" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="service-items" element={<AdminServiceItems />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="sections/:sectionKey" element={<AdminSections />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="security" element={<AdminSecurity />} />
            <Route path="*" element={<Navigate to="/admin-login/dashboard" replace />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }

  return (
    <div className="app-root">
      {!introComplete && (
        <CinematicIntro onComplete={() => setIntroComplete(true)} />
      )}
      <AtmosphericMist />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage introComplete={introComplete} />} />
        <Route
          path="/services/venue-management"
          element={<ServiceDetail forcedSlug="venue-management" />}
        />
        <Route
          path="/venues"
          element={<ServiceDetail forcedSlug="venue-management" />}
        />
        <Route
          path="/venue-booking"
          element={<ServiceDetail forcedSlug="venue-management" />}
        />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <AppRoutes />
    </SiteDataProvider>
  );
}
