import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../../sections/Hero/Hero.jsx';
import About from '../../sections/About/About.jsx';
import Services from '../../sections/Services/Services.jsx';
import TrustedBy from '../../sections/TrustedBy/TrustedBy.jsx';
import Testimonials from '../../sections/Testimonials/Testimonials.jsx';
import Contact from '../../sections/Contact/Contact.jsx';
import { scrollToSection } from '../../utils/navigation.js';

export default function HomePage({ introComplete }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Delay slightly so layout and DOM elements are mounted
      const timer = setTimeout(() => {
        scrollToSection(location.hash);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <main>
      <Hero introComplete={introComplete} />
      <About />
      <Services />
      <TrustedBy />
      <Testimonials />
      <Contact />
    </main>
  );
}
