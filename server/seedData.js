/**
 * Default seed specification for Sportsaal PostgreSQL database.
 * Maps existing local assets into /uploads/defaults/... so Gallery, Hero, About,
 * Services, Service Items, Partners, and Testimonials are immediately editable via Admin.
 */

export const DEFAULT_MEDIA_ASSETS = [
  // Hero Ribbon (8)
  { key: 'hero-1', title: 'Cricket Batsman Action', alt: 'Cricket Batting Action', tag: 'hero', srcRel: 'images/hero-ribbon/cricket-batsman.jpg', destName: 'hero-cricket-batsman.jpg' },
  { key: 'hero-2', title: 'Football Turf Match', alt: 'Football Turf Match', tag: 'hero', srcRel: 'images/hero-ribbon/football-action.jpg', destName: 'hero-football-action.jpg' },
  { key: 'hero-3', title: 'Badminton Smash', alt: 'Badminton Smash', tag: 'hero', srcRel: 'images/hero-ribbon/badminton-action.jpg', destName: 'hero-badminton-action.jpg' },
  { key: 'hero-4', title: 'Sports Arena Infrastructure', alt: 'Sports Arena Infrastructure', tag: 'hero', srcRel: 'images/hero-ribbon/cricket-stadium.jpg', destName: 'hero-cricket-stadium.jpg' },
  { key: 'hero-5', title: 'Tennis Court Rally', alt: 'Tennis Court Rally', tag: 'hero', srcRel: 'images/hero-ribbon/tennis-action.jpg', destName: 'hero-tennis-action.jpg' },
  { key: 'hero-6', title: 'Goal Celebration Action', alt: 'Goal Celebration Action', tag: 'hero', srcRel: 'images/hero-ribbon/football-celebrate.jpg', destName: 'hero-football-celebrate.jpg' },
  { key: 'hero-7', title: 'Basketball Slam Dunk', alt: 'Basketball Slam Dunk', tag: 'hero', srcRel: 'images/hero-ribbon/basketball-dunk.jpg', destName: 'hero-basketball-dunk.jpg' },
  { key: 'hero-8', title: 'Athletic Conditioning', alt: 'Athletic Conditioning', tag: 'hero', srcRel: 'images/hero-ribbon/athlete-sprint.jpg', destName: 'hero-athlete-sprint.jpg' },

  // Services covers (6+1)
  { key: 'svc-venue', title: 'Venue Management Cover', alt: 'Venue Management Stadium', tag: 'services', srcRel: 'images/our-services/venue-management.png', destName: 'svc-venue-management.png' },
  { key: 'svc-tournaments', title: 'Cricket Tournaments Cover', alt: 'Cricket Tournaments', tag: 'services', srcRel: 'images/our-services/tournaments.png', destName: 'svc-tournaments.png' },
  { key: 'svc-coaching', title: 'Professional Coaching Cover', alt: 'Professional Coaching', tag: 'services', srcRel: 'images/our-services/coaching-programs.png', destName: 'svc-coaching.png' },
  { key: 'svc-events', title: 'Event Management Cover', alt: 'Event Management', tag: 'services', srcRel: 'images/our-services/event-management.png', destName: 'svc-events.png' },
  { key: 'svc-tech', title: 'Sports Technology Cover', alt: 'Sports Technology & Live Streaming', tag: 'services', srcRel: 'images/our-services/sports-technology.png', destName: 'svc-technology.png' },
  { key: 'svc-sportswear', title: 'Sportswear & Products Cover', alt: 'Sportswear & Products', tag: 'services', srcRel: 'images/our-work/sportswear-products.webp', destName: 'svc-sportswear.webp' },
  { key: 'svc-corporate', title: 'Corporate Events Cover', alt: 'Corporate Cricket Events', tag: 'services', srcRel: 'images/our-work/corporate-events.webp', destName: 'svc-corporate.webp' },

  // Service Sub-Items visuals
  { key: 'item-greenfield', title: 'Greenfield Cricket Ground', alt: 'Greenfield Championship Ground', tag: 'service-items', srcRel: 'images/venues/venue-greenfield.png', destName: 'venue-greenfield.png' },
  { key: 'item-champion', title: 'Champion Floodlit Arena', alt: 'Champion Sports Arena', tag: 'service-items', srcRel: 'images/venues/venue-champion-arena.png', destName: 'venue-champion-arena.png' },
  { key: 'item-tourney-t20', title: 'Corporate T20 League Action', alt: 'Premier Corporate T20 Cup', tag: 'service-items', srcRel: 'images/our-work/cricket-tournaments.webp', destName: 'item-cricket-tournaments.webp' },
  { key: 'item-coach-action', title: 'Academy Coaching Session', alt: 'Junior Elite Coaching', tag: 'service-items', srcRel: 'images/our-work/professional-coaching.webp', destName: 'item-professional-coaching.webp' },
  { key: 'item-stream', title: 'Multi-Cam Live Streaming Rig', alt: 'Multi-Cam 1080p Broadcast', tag: 'service-items', srcRel: 'images/our-work/live-streaming.webp', destName: 'item-live-streaming.webp' },
  { key: 'item-tech', title: 'Analytics & Telemetry', alt: 'Smart Radar & Digital Scoring', tag: 'service-items', srcRel: 'images/our-work/sports-technology.webp', destName: 'item-sports-technology.webp' },
  { key: 'item-ground-book', title: 'Floodlit Stadium Night View', alt: 'Annual Corporate Sports Day', tag: 'service-items', srcRel: 'images/our-work/ground-booking.webp', destName: 'item-ground-booking.webp' },

  // Brand & Section Graphics
  { key: 'brand-logo-dark', title: 'Sportsaal Brand Logo', alt: 'SPORTSAAL', tag: 'general', srcRel: 'logos/sportsaal-logo.png', destName: 'sportsaal-logo.png' },
  { key: 'trusted-bg', title: 'Trusted By Stadium Pitch BG', alt: 'Cricket Field Background', tag: 'partners', srcRel: 'images/trusted-by/cricket-field-bg.png', destName: 'trusted-cricket-field-bg.png' },
  { key: 'contact-batsman', title: 'Contact Batsman Cutout', alt: 'Cricket Batsman Cutout', tag: 'general', srcRel: 'images/contact/batsman-cutout.png', destName: 'contact-batsman-cutout.png' },

  // Partner Logos (5)
  { key: 'partner-allcargo', title: 'Allcargo Logo', alt: 'Allcargo', tag: 'partners', srcRel: 'logos/trusted-by/Allcargo_Logo.svg', destName: 'partner-allcargo.svg' },
  { key: 'partner-infosys', title: 'Infosys Logo', alt: 'Infosys', tag: 'partners', srcRel: 'logos/trusted-by/infosys-logo-svg.svg', destName: 'partner-infosys.svg' },
  { key: 'partner-walmart', title: 'Walmart Logo', alt: 'Walmart', tag: 'partners', srcRel: 'logos/trusted-by/WMT-Wordmark-Standard-TrueBlue-RGB.svg', destName: 'partner-walmart.svg' },
  { key: 'partner-aionion', title: 'Aionion Logo', alt: 'Aionion', tag: 'partners', srcRel: 'logos/trusted-by/Aionion_Logo.svg', destName: 'partner-aionion.svg' },
  { key: 'partner-ikn', title: 'IKN Engineering Logo', alt: 'IKN Engineering', tag: 'partners', srcRel: 'logos/trusted-by/IKN_Engineering_Logo.svg', destName: 'partner-ikn.svg' },

  // Testimonials Avatars (4)
  { key: 'avatar-arun', title: 'Arun Prakash Avatar', alt: 'Arun Prakash', tag: 'testimonials', srcRel: 'images/testimonials/arun-prakash.png', destName: 'avatar-arun.png' },
  { key: 'avatar-karthik', title: 'Karthik S Avatar', alt: 'Karthik S', tag: 'testimonials', srcRel: 'images/testimonials/karthik-s.png', destName: 'avatar-karthik.png' },
  { key: 'avatar-vignesh', title: 'Vignesh Kumar Avatar', alt: 'Vignesh Kumar', tag: 'testimonials', srcRel: 'images/testimonials/vignesh-kumar.png', destName: 'avatar-vignesh.png' },
  { key: 'avatar-deepak', title: 'Deepak Sundaram Avatar', alt: 'Deepak Sundaram', tag: 'testimonials', srcRel: 'images/testimonials/deepak-sundaram.png', destName: 'avatar-deepak.png' },
];

export const DEFAULT_DISPLAY_CONFIG = {
  showImage: true,
  showTag: true,
  showPriceOrLabel: true,
  showDescription: true,
  showHighlights: true,
  showContactCta: true,
  showGalleryStrip: true,
  showHeroDescription: true,
  showHeroButtons: true,
  showHeroVisual: true,
  showSectionIntroHeading: true,
  cardsPerRow: 3,
  emptyMessage: 'GETTING THE ARENA READY. COMING SOON.',
  emptySubtext:
    'We are curating championship-grade offerings and specs for this service. Reach out to our operations team for custom inquiries right now.',
};

export function buildInitialSections(mediaMap) {
  const url = (k) => mediaMap[k]?.file_url || '';
  const id = (k) => mediaMap[k]?.id || null;

  return {
    header: {
      logoUrl: url('brand-logo-dark'),
      logoMediaId: id('brand-logo-dark'),
      navLinks: [
        { label: 'ABOUT', href: '#about' },
        { label: 'SERVICES', href: '#services' },
        { label: 'EVENTS', href: '/services/cricket-tournaments' },
        { label: 'VENUES', href: '/services/venue-management' },
        { label: 'CONTACT US', href: '#contact' },
      ],
      ctaText: 'INQUIRE NOW',
      ctaHref: '#contact',
    },
    hero: {
      ribbonPhotos: [
        { id: 'photo-1', src: url('hero-1'), alt: 'Cricket Batting Action', mediaId: id('hero-1') },
        { id: 'photo-2', src: url('hero-2'), alt: 'Football Turf Match', mediaId: id('hero-2') },
        { id: 'photo-3', src: url('hero-3'), alt: 'Badminton Smash', mediaId: id('hero-3') },
        { id: 'photo-4', src: url('hero-4'), alt: 'Sports Arena Infrastructure', mediaId: id('hero-4') },
        { id: 'photo-5', src: url('hero-5'), alt: 'Tennis Court Rally', mediaId: id('hero-5') },
        { id: 'photo-6', src: url('hero-6'), alt: 'Goal Celebration Action', mediaId: id('hero-6') },
        { id: 'photo-7', src: url('hero-7'), alt: 'Basketball Slam Dunk', mediaId: id('hero-7') },
        { id: 'photo-8', src: url('hero-8'), alt: 'Athletic Conditioning', mediaId: id('hero-8') },
      ],
      marqueeItems: [
        'VENUE MANAGEMENT',
        'CRICKET TOURNAMENTS',
        'PROFESSIONAL COACHING',
        'EVENT MANAGEMENT',
        'SPORTS TECHNOLOGY',
        'LIVE STREAMING',
        'GROUND BOOKINGS',
        'SPORTSWEAR',
      ],
      ctaText: 'EXPLORE SPORTSAAL',
      ctaHref: '#about',
    },
    about: {
      badge: 'SPORTSAAL ECOSYSTEM // PERFORMANCE PLATFORM',
      headlineLine1: 'WE BUILD THE STAGE.',
      headlineAccent: 'YOU BRING THE GAME.',
      narrative:
        "Sportsaal is India's premier integrated athletic ecosystem. We connect athletes, corporate clubs, and sporting venues through world-class ground operations, premier tournaments, BCCI-certified coaching, and broadcast-grade streaming technology.",
      posterSrc: url('hero-1'),
      posterMediaId: id('hero-1'),
      posterAlt: 'Cricket Batsman Action',
      primaryCtaText: 'EXPLORE SERVICES',
      primaryCtaHref: '#services',
      secondaryCtaText: 'CONTACT OUR TEAM',
      secondaryCtaHref: '#contact',
    },
    services_section: {
      tagText: 'OUR SERVICES',
      titlePrimary: 'COMPLETE SOLUTIONS.',
      titleAccent: 'BUILT FOR SPORT.',
      description:
        'From world-class venues to professional tournaments and expert coaching, we deliver end-to-end sports solutions tailored to your goals.',
      ctaText: 'ALL SERVICES',
      ctaHref: '/services/corporate-events',
    },
    trusted_by: {
      eyebrow: 'PARTNERS & ENTERPRISE TRUST',
      headlineWhite: 'TRUSTED BY',
      headlineRed: 'INDUSTRY LEADERS',
      description:
        'Top organizations partner with Sportsaal for corporate sports championships and arena partnerships.',
      bgImageSrc: url('trusted-bg'),
      bgMediaId: id('trusted-bg'),
      logos: [
        { id: 'allcargo', name: 'Allcargo', src: url('partner-allcargo'), mediaId: id('partner-allcargo') },
        { id: 'infosys', name: 'Infosys', src: url('partner-infosys'), mediaId: id('partner-infosys') },
        { id: 'walmart', name: 'Walmart', src: url('partner-walmart'), mediaId: id('partner-walmart') },
        { id: 'aionion', name: 'Aionion', src: url('partner-aionion'), mediaId: id('partner-aionion') },
        { id: 'ikn-engineering', name: 'IKN Engineering', src: url('partner-ikn'), mediaId: id('partner-ikn') },
      ],
    },
    testimonials: {
      tagText: 'TESTIMONIALS',
      headlineWhite: 'WHAT OUR',
      headlineRed: 'CLIENTS SAY',
      subtitle:
        'Hear from corporate organizers, club captains and academy partners who trust Sportsaal.',
      items: [
        {
          id: 1,
          quote:
            'Sportsaal managed our corporate cricket event seamlessly. From ground coordination to live streaming, everything was professional and hassle-free. Highly recommended!',
          name: 'Arun Prakash',
          role: 'HR Manager',
          company: 'TCS Chennai',
          avatarSrc: url('avatar-arun'),
          mediaId: id('avatar-arun'),
        },
        {
          id: 2,
          quote:
            'The live streaming quality was excellent and the team was very supportive throughout the tournament. Sportsaal truly understands cricket and delivers beyond expectations.',
          name: 'Karthik S',
          role: 'Team Captain',
          company: 'Chennai Strikers',
          avatarSrc: url('avatar-karthik'),
          mediaId: id('avatar-karthik'),
        },
        {
          id: 3,
          quote:
            'Great service, professional team and top-notch sportswear quality. Sportsaal is our go-to partner for all cricket-related events and merchandise.',
          name: 'Vignesh Kumar',
          role: 'Operations Head',
          company: 'Zoho Corporation',
          avatarSrc: url('avatar-vignesh'),
          mediaId: id('avatar-vignesh'),
        },
        {
          id: 4,
          quote:
            'Coordinating floodlit cricket grounds in Chennai used to be a challenge until Sportsaal. Their operations team saved us countless hours.',
          name: 'Deepak Sundaram',
          role: 'Club Secretary',
          company: 'Madras Cricket League',
          avatarSrc: url('avatar-deepak'),
          mediaId: id('avatar-deepak'),
        },
      ],
    },
    contact: {
      tagText: 'CONTACT US',
      headlineLine1: "LET'S",
      headlineAccent: 'TALK',
      headlineLine2: 'CRICKET',
      description:
        "Have an event in mind or a question? We'd love to hear from you. Reach out to our team and let's make it happen.",
      phone: '+91 98765 43210',
      email: 'info@sportsaal.com',
      location: 'Chennai, Tamil Nadu, India',
      hours: 'Mon - Sat | 9 AM - 7 PM',
      formEmailTarget: 'jeeva.v6499@gmail.com',
      formTitle: 'SEND US A MESSAGE',
      formSubtitle: "Fill in the details and we'll get back to you shortly.",
      batsmanImg: url('contact-batsman'),
      batsmanMediaId: id('contact-batsman'),
      socials: [
        { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
        { platform: 'youtube', url: 'https://youtube.com', label: 'YouTube' },
        { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
        { platform: 'x', url: 'https://x.com', label: 'X (Twitter)' },
      ],
      subjectOptions: [
        { value: 'venue-management', label: 'Venue Management & Floodlit Grounds' },
        { value: 'cricket-tournaments', label: 'Cricket Tournaments & Leagues' },
        { value: 'professional-coaching', label: 'Professional Coaching & Academies' },
        { value: 'event-management', label: 'Event Management & Sports Festivals' },
        { value: 'sports-technology', label: 'Sports Technology & Live Streaming' },
        { value: 'sportswear-products', label: 'Sportswear & Custom Merchandise' },
        { value: 'corporate-events', label: 'Corporate Cricket Events' },
        { value: 'general', label: 'General Inquiry' },
      ],
    },
    footer: {
      logoUrl: url('brand-logo-dark'),
      logoMediaId: id('brand-logo-dark'),
      brandDesc:
        'Delivering end-to-end cricket solutions through events, infrastructure, technology and passion for the game.',
      copyrightText: 'Sportsaal Event Management. All rights reserved.',
      quickLinks: [
        { label: 'Home', href: '#hero' },
        { label: 'About Us', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact Us', href: '#contact' },
      ],
      socials: [
        { platform: 'instagram', url: 'https://instagram.com', label: 'Instagram' },
        { platform: 'youtube', url: 'https://youtube.com', label: 'YouTube' },
        { platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
        { platform: 'x', url: 'https://x.com', label: 'X (Twitter)' },
      ],
    },
  };
}

export function buildInitialServices(mediaMap) {
  const url = (k) => mediaMap[k]?.file_url || '';
  const id = (k) => mediaMap[k]?.id || null;

  return [
    {
      slug: 'venue-management',
      title: 'VENUE MANAGEMENT',
      tagline: 'WORLD-CLASS INFRASTRUCTURE. PEAK PLAYABILITY.',
      category: 'SPORTS INFRASTRUCTURE & OPERATIONS',
      short_description:
        'End-to-end sports facility operations, pitch curation, floodlighting, scheduling, and preventive maintenance ensuring championship playing conditions 365 days a year.',
      cardKey: 'svc-venue',
      heroKey: 'svc-venue',
      is_featured_home: true,
      sort_order: 1,
      display_config: {
        showHeroDescription: false,
        showHeroButtons: false,
        showHeroVisual: false,
        showSectionIntroHeading: false,
        cardsPerRow: 3,
      },
      items: [
        {
          title: 'Greenfield Championship Ground',
          tag: 'Full Cricket Ground',
          price_label: '₹2,500 / hr',
          description:
            'Championship 70m international boundary ground along ECR featuring 4 natural clay wickets and broadcast-grade 1000 Lux LED floodlights.',
          highlights: [
            '4 Natural Clay Turf Wickets',
            'Broadcast-Grade 1000 Lux Floodlights',
            'Air-Conditioned Pavilion & Dugouts',
            'Digital LED Scoreboard Integration',
          ],
          imageKey: 'item-greenfield',
          cta_text: 'Inquire for Dates',
          sort_order: 1,
        },
        {
          title: 'Champion Floodlit Turf & Nets',
          tag: 'Practice Nets & Box Turf',
          price_label: '₹1,200 / hr',
          description:
            'High-density all-weather astroturf nets and box cricket arena on OMR equipped with pro bowling machine lanes and covered lounges.',
          highlights: [
            '4 Covered Astroturf Net Lanes',
            'Automated Bowling Machine Access',
            'Glare-Free Night Lighting',
            'All-Weather Fast Drainage',
          ],
          imageKey: 'item-champion',
          cta_text: 'Inquire Now',
          sort_order: 2,
        },
      ],
    },
    {
      slug: 'cricket-tournaments',
      title: 'CRICKET TOURNAMENTS',
      tagline: 'PRECISION LOGISTICS. CHAMPIONSHIP PRESTIGE.',
      category: 'PROFESSIONAL LEAGUES & CUP SERIES',
      short_description:
        'Full-cycle tournament governance from automated team registration and round-robin draws to certified BCCI umpiring and live scoring.',
      cardKey: 'svc-tournaments',
      heroKey: 'svc-tournaments',
      is_featured_home: true,
      sort_order: 2,
      items: [
        {
          title: 'Premier Corporate T20 Cup',
          tag: 'Corporate League',
          price_label: '8–16 Teams',
          description:
            'Floodlit weekend enterprise championship with certified umpires, official scorers, custom squad kits, and closing ceremony awards.',
          highlights: [
            'Floodlit Weekend Fixtures',
            'Live Digital Ball-by-Ball Scoring',
            'BCCI-Panel Umpires & Referees',
            'Dedicated Medical & Physio Support',
          ],
          imageKey: 'item-tourney-t20',
          cta_text: 'Register Inquiry',
          sort_order: 1,
        },
        {
          title: 'Super-Sixes One-Day Knockout',
          tag: 'Fast-Track Format',
          price_label: '1-Day Carnival',
          description:
            'High-energy 6-overs-a-side rapid knockout tournament built for corporate annual sports meets and weekend club festivals.',
          highlights: [
            'Single-Day Full Completion',
            'Live Emcee & Match Commentary',
            'Custom Winner Trophies & Medals',
            'Match Photography Coverage',
          ],
          imageKey: 'svc-tournaments',
          cta_text: 'Plan a Tournament',
          sort_order: 2,
        },
      ],
    },
    {
      slug: 'professional-coaching',
      title: 'PROFESSIONAL COACHING',
      tagline: 'DISCIPLINE. BIOMECHANICS. CHAMPIONSHIP MINDSET.',
      category: 'ATHLETIC DEVELOPMENT & ACADEMIES',
      short_description:
        'Structured skill acquisition academies, 1-on-1 biomechanics tuning, and specialized fitness conditioning led by BCCI-certified mentors.',
      cardKey: 'svc-coaching',
      heroKey: 'svc-coaching',
      is_featured_home: true,
      sort_order: 3,
      items: [
        {
          title: 'Junior Elite High-Performance Academy',
          tag: 'Ages 8–18',
          price_label: '3–5 Days / Week',
          description:
            'Progressive batting, pace/spin bowling, and fielding mastery led by BCCI-certified coaches with quarterly athletic benchmarks.',
          highlights: [
            'BCCI Level-1 & Level-2 Coaches',
            'Low 1:8 Coach-Player Ratio',
            'Agility & Conditioning Conditioning',
            'Weekend Simulation Practice Matches',
          ],
          imageKey: 'item-coach-action',
          cta_text: 'Enquire Academy Slots',
          sort_order: 1,
        },
        {
          title: '1-on-1 Video Biomechanics Camp',
          tag: 'Pro & Club Players',
          price_label: '4-Week Intensive',
          description:
            'High-frame-rate bowling action and batting stance diagnostics paired with speed radar telemetry and personalized drill plans.',
          highlights: [
            'Dual-Angle Frame-by-Frame Analysis',
            'Ball Release Speed Radar Tracking',
            'Customized Weekly Drill Blueprint',
            'Automated Bowling Machine Reps',
          ],
          imageKey: 'svc-coaching',
          cta_text: 'Book Assessment',
          sort_order: 2,
        },
      ],
    },
    {
      slug: 'event-management',
      title: 'EVENT MANAGEMENT',
      tagline: 'CREATIVE SCALE. UNFORGETTABLE EXECUTION.',
      category: 'STADIUM PRODUCTIONS & CARNIVALS',
      short_description:
        'Turnkey sports spectacles including multi-sport company sports days, floodlit stadium ceremonies, and sponsor hospitality activations.',
      cardKey: 'svc-events',
      heroKey: 'svc-events',
      is_featured_home: true,
      sort_order: 4,
      items: [
        {
          title: 'Annual Corporate Sports Day Production',
          tag: 'Turnkey Enterprise',
          price_label: '100–2,000+ Guests',
          description:
            'Complete multi-sport stadium takeover covering cricket, football, badminton, stage sound, live emceeing, catering, and photography.',
          highlights: [
            'Multi-Sport Fixture Coordination',
            'Pro Stage, PA System & Emcee',
            'Gourmet & Athletic Catering',
            'Edited Highlight Reel & Archive',
          ],
          imageKey: 'svc-events',
          cta_text: 'Request Proposal',
          sort_order: 1,
        },
        {
          title: 'Brand Activation & Exhibition Clash',
          tag: 'VIP & Media Show',
          price_label: 'Custom Production',
          description:
            'High-visibility exhibition showcases featuring LED perimeter sponsor branding, VIP pavilion hospitality, and aerial drone filming.',
          highlights: [
            '360° Perimeter Sponsor Branding',
            'VIP Hospitality Lounge Operations',
            '4K Drone & Steadicam Crew',
            'Turnkey Logistics & Security',
          ],
          imageKey: 'item-ground-book',
          cta_text: 'Contact Events Team',
          sort_order: 2,
        },
      ],
    },
    {
      slug: 'sports-technology',
      title: 'SPORTS TECHNOLOGY & LIVE STREAMING',
      tagline: 'BROADCAST QUALITY. DATA PRECISION.',
      category: 'SPORTS TECH, TELEMETRY & MEDIA',
      short_description:
        'Live multi-camera 1080p HD sports streaming with instant replays, real-time score bugs, speed guns, and smart analytics dashboards.',
      cardKey: 'svc-tech',
      heroKey: 'svc-tech',
      is_featured_home: true,
      sort_order: 5,
      items: [
        {
          title: 'Multi-Cam 1080p Broadcast Package',
          tag: 'YouTube / OTT Stream',
          price_label: '3–5 Camera Rig',
          description:
            'Television-style multi-angle live cricket streaming complete with custom sponsor graphics overlays and instant slow-mo replays.',
          highlights: [
            '1080p60 Multi-Camera Switching',
            'Live Scoreboard & Wagon-Wheel Bug',
            'Instant Slow-Motion Replay Deck',
            'Dual Wireless Commentary Mix',
          ],
          imageKey: 'item-stream',
          cta_text: 'Book Broadcast Crew',
          sort_order: 1,
        },
        {
          title: 'Smart Radar & Digital Scoring Telemetry',
          tag: 'Match Analytics',
          price_label: 'Per Match / Series',
          description:
            'Real-time ball speed tracking, live big-screen LED scoreboard synchronization, and automated post-match stat graphics.',
          highlights: [
            'Pro Stalker Speed Radar Gun',
            'Big-Screen LED Scoreboard Sync',
            'Player Performance Stat Cards',
            'Automated Key Highlight Clipping',
          ],
          imageKey: 'item-tech',
          cta_text: 'Inquire Tech Pack',
          sort_order: 2,
        },
      ],
    },
    {
      slug: 'sportswear-products',
      title: 'SPORTSWEAR & PRODUCTS',
      tagline: 'ENGINEERED FOR PERFORMANCE. CRAFTED FOR COMFORT.',
      category: 'PRO APPAREL & CRICKET EQUIPMENT',
      short_description:
        'Custom sublimated breathable athletic kits, moisture-wicking corporate team jerseys, handcrafted English Willow bats, and tournament gear.',
      cardKey: 'svc-sportswear',
      heroKey: 'svc-sportswear',
      is_featured_home: true,
      sort_order: 6,
      items: [
        {
          title: 'Pro-Dry Sublimated Team Kits',
          tag: 'Custom Apparel',
          price_label: 'Min Order: 15 Sets',
          description:
            'Featherweight 170 GSM sweat-wicking dry-fit jerseys and match trousers with fade-proof logos, squad names, and player numbers.',
          highlights: [
            '170 GSM Breathable Micro-Mesh',
            '3D Kit Mockups within 48 Hours',
            'Chinese / Polo / Crew Collar Options',
            'Individually Name-Tagged Packs',
          ],
          imageKey: 'svc-sportswear',
          cta_text: 'Request Custom Mockup',
          sort_order: 1,
        },
        {
          title: 'Match Willow & Leather Gear Bundles',
          tag: 'Pro Equipment',
          price_label: 'Club & Corporate Packs',
          description:
            'Curated Grade-1 & Grade-2 English Willow bats, high-density batting guards, four-piece leather match balls, and team kit bags.',
          highlights: [
            'Seasoned English Willow Bats',
            'Alum-Tanned Tournament Leather Balls',
            'Custom Embroidered Team Kit Bags',
            'Enterprise League Bulk Pricing',
          ],
          imageKey: 'hero-1',
          cta_text: 'Request Bulk Quote',
          sort_order: 2,
        },
      ],
    },
    {
      slug: 'corporate-events',
      title: 'CORPORATE EVENTS',
      tagline: 'TEAMS. COMPETITION. STRONGER TOGETHER.',
      category: 'ENTERPRISE & TEAM EXPERIENCES',
      short_description:
        'High-impact corporate cricket tournaments, leadership sports retreats, and inter-company leagues designed to forge indestructible team bonds.',
      cardKey: 'svc-corporate',
      heroKey: 'svc-corporate',
      is_featured_home: false,
      sort_order: 7,
      items: [
        {
          title: 'Inter-Corporate Floodlit Champions Cup',
          tag: 'Enterprise Series',
          price_label: '30 to 3,000+ Employees',
          description:
            'Full-season corporate league management uniting departments and rival tech parks on floodlit stadiums with zero HR overhead.',
          highlights: [
            'Turnkey HR-Zero-Hassle Execution',
            'Private Stadium & Turf Access',
            'Custom Company Jerseys Included',
            'Live Leaderboard & App Tracking',
          ],
          imageKey: 'svc-corporate',
          cta_text: 'Plan Corporate Cup',
          sort_order: 1,
        },
        {
          title: 'Executive Leadership Turf Offsite',
          tag: 'CXO & Team Retreat',
          price_label: 'Half / Full Day',
          description:
            'Curated high-touch cricket & multi-sport evening retreat paired with hospitality lounges, photography, and trophy dinner.',
          highlights: [
            'Dedicated Event Hosts & Scorers',
            'Gourmet Refreshments & Lounge',
            'High-Res Team Photo Delivery',
            'Personalized MVP Awards',
          ],
          imageKey: 'item-ground-book',
          cta_text: 'Discuss Offsite',
          sort_order: 2,
        },
      ],
    },
  ].map((s) => ({
    ...s,
    card_image: url(s.cardKey),
    card_media_id: id(s.cardKey),
    hero_image: url(s.heroKey),
    hero_media_id: id(s.heroKey),
    display_config: { ...DEFAULT_DISPLAY_CONFIG, ...(s.display_config || {}) },
    items: s.items.map((item) => ({
      ...item,
      image_url: url(item.imageKey),
      media_id: id(item.imageKey),
    })),
  }));
}

