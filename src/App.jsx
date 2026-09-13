import React from 'react';
import Header from './sections/Header/Header.jsx';
import Hero from './sections/Hero/Hero.jsx';
import About from './sections/About/About.jsx';
import Services from './sections/Services/Services.jsx';
import OurWork from './sections/OurWork/OurWork.jsx';
import TrustedBy from './sections/TrustedBy/TrustedBy.jsx';
import Testimonials from './sections/Testimonials/Testimonials.jsx';
import Contact from './sections/Contact/Contact.jsx';
import Footer from './sections/Footer/Footer.jsx';
import AtmosphericMist from './components/common/AtmosphericMist/AtmosphericMist.jsx';

export default function App() {
  return (
    <div className="app-root">
      <AtmosphericMist />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <OurWork />
        <TrustedBy />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
