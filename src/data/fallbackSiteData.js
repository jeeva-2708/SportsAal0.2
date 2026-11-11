// Fallback static assets (used before/without live backend DB response)
import cricketBatsmanImg from '../assets/images/hero-ribbon/cricket-batsman.jpg';
import footballActionImg from '../assets/images/hero-ribbon/football-action.jpg';
import badmintonActionImg from '../assets/images/hero-ribbon/badminton-action.jpg';
import cricketStadiumImg from '../assets/images/hero-ribbon/cricket-stadium.jpg';
import tennisActionImg from '../assets/images/hero-ribbon/tennis-action.jpg';
import footballCelebrateImg from '../assets/images/hero-ribbon/football-celebrate.jpg';
import basketballDunkImg from '../assets/images/hero-ribbon/basketball-dunk.jpg';
import athleteSprintImg from '../assets/images/hero-ribbon/athlete-sprint.jpg';

import venueImg from '../assets/images/our-services/venue-management.png';
import tournamentsImg from '../assets/images/our-services/tournaments.png';
import coachingImg from '../assets/images/our-services/coaching-programs.png';
import eventsImg from '../assets/images/our-services/event-management.png';
import technologyImg from '../assets/images/our-services/sports-technology.png';
import sportswearImg from '../assets/images/our-work/sportswear-products.webp';
import corporateImg from '../assets/images/our-work/corporate-events.webp';

import greenfieldImg from '../assets/images/venues/venue-greenfield.png';
import championArenaImg from '../assets/images/venues/venue-champion-arena.png';
import tourneyWorkImg from '../assets/images/our-work/cricket-tournaments.webp';
import coachingWorkImg from '../assets/images/our-work/professional-coaching.webp';
import streamWorkImg from '../assets/images/our-work/live-streaming.webp';
import techWorkImg from '../assets/images/our-work/sports-technology.webp';
import groundBookImg from '../assets/images/our-work/ground-booking.webp';

import logoDarkImg from '../assets/logos/sportsaal-logo.png';
import cricketFieldBg from '../assets/images/trusted-by/cricket-field-bg.png';
import batsmanCutout from '../assets/images/contact/batsman-cutout.png';

import aionionLogo from '../assets/logos/trusted-by/Aionion_Logo.svg';
import allcargoLogo from '../assets/logos/trusted-by/Allcargo_Logo.svg';
import iknEngineeringLogo from '../assets/logos/trusted-by/IKN_Engineering_Logo.svg';
import walmartLogo from '../assets/logos/trusted-by/WMT-Wordmark-Standard-TrueBlue-RGB.svg';
import infosysLogo from '../assets/logos/trusted-by/infosys-logo-svg.svg';

import arunAvatar from '../assets/images/testimonials/arun-prakash.png';
import karthikAvatar from '../assets/images/testimonials/karthik-s.png';
import vigneshAvatar from '../assets/images/testimonials/vignesh-kumar.png';
import deepakAvatar from '../assets/images/testimonials/deepak-sundaram.png';

export const DEFAULT_DISPLAY_CONFIG = {
  showImage: true,
  showTag: true,
  showPriceOrLabel: true,
  showDescription: true,
  showHighlights: true,
  showContactCta: true,
  showGalleryStrip: true,
  emptyMessage: 'GETTING THE ARENA READY. COMING SOON.',
  emptySubtext:
    'We are curating championship-grade offerings and specs for this service. Reach out to our operations team for custom inquiries right now.',
};

export const FALLBACK_SECTIONS = {
  header: {
    logoUrl: logoDarkImg,
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
      { id: 'photo-1', src: cricketBatsmanImg, alt: 'Cricket Batting Action' },
      { id: 'photo-2', src: footballActionImg, alt: 'Football Turf Match' },
      { id: 'photo-3', src: badmintonActionImg, alt: 'Badminton Smash' },
      { id: 'photo-4', src: cricketStadiumImg, alt: 'Sports Arena Infrastructure' },
      { id: 'photo-5', src: tennisActionImg, alt: 'Tennis Court Rally' },
      { id: 'photo-6', src: footballCelebrateImg, alt: 'Goal Celebration Action' },
      { id: 'photo-7', src: basketballDunkImg, alt: 'Basketball Slam Dunk' },
      { id: 'photo-8', src: athleteSprintImg, alt: 'Athletic Conditioning' },
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
    posterSrc: cricketBatsmanImg,
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
    bgImageSrc: cricketFieldBg,
    logos: [
      { id: 'allcargo', name: 'Allcargo', src: allcargoLogo },
      { id: 'infosys', name: 'Infosys', src: infosysLogo },
      { id: 'walmart', name: 'Walmart', src: walmartLogo },
      { id: 'aionion', name: 'Aionion', src: aionionLogo },
      { id: 'ikn-engineering', name: 'IKN Engineering', src: iknEngineeringLogo },
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
        avatarSrc: arunAvatar,
      },
      {
        id: 2,
        quote:
          'The live streaming quality was excellent and the team was very supportive throughout the tournament. Sportsaal truly understands cricket and delivers beyond expectations.',
        name: 'Karthik S',
        role: 'Team Captain',
        company: 'Chennai Strikers',
        avatarSrc: karthikAvatar,
      },
      {
        id: 3,
        quote:
          'Great service, professional team and top-notch sportswear quality. Sportsaal is our go-to partner for all cricket-related events and merchandise.',
        name: 'Vignesh Kumar',
        role: 'Operations Head',
        company: 'Zoho Corporation',
        avatarSrc: vigneshAvatar,
      },
      {
        id: 4,
        quote:
          'Coordinating floodlit cricket grounds in Chennai used to be a challenge until Sportsaal. Their operations team saved us countless hours.',
        name: 'Deepak Sundaram',
        role: 'Club Secretary',
        company: 'Madras Cricket League',
        avatarSrc: deepakAvatar,
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
    batsmanImg: batsmanCutout,
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
    logoUrl: logoDarkImg,
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
      { label: 'LinkedIn', platform: 'linkedin', url: 'https://linkedin.com' },
      { label: 'X (Twitter)', platform: 'x', url: 'https://x.com' },
    ],
  },
};

export const FALLBACK_SERVICES = [
  {
    id: 1,
    slug: 'venue-management',
    title: 'VENUE MANAGEMENT',
    tagline: 'WORLD-CLASS INFRASTRUCTURE. PEAK PLAYABILITY.',
    category: 'SPORTS INFRASTRUCTURE & OPERATIONS',
    short_description:
      'End-to-end sports facility operations, pitch curation, floodlighting, scheduling, and preventive maintenance ensuring championship playing conditions 365 days a year.',
    card_image: venueImg,
    hero_image: venueImg,
    is_featured_home: true,
    sort_order: 1,
    display_config: { ...DEFAULT_DISPLAY_CONFIG },
    showcaseMedia: [],
    items: [
      {
        id: 101,
        service_id: 1,
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
        image_url: greenfieldImg,
        cta_text: 'Inquire for Dates',
      },
      {
        id: 102,
        service_id: 1,
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
        image_url: championArenaImg,
        cta_text: 'Inquire Now',
      },
    ],
  },
  {
    id: 2,
    slug: 'cricket-tournaments',
    title: 'CRICKET TOURNAMENTS',
    tagline: 'PRECISION LOGISTICS. CHAMPIONSHIP PRESTIGE.',
    category: 'PROFESSIONAL LEAGUES & CUP SERIES',
    short_description:
      'Full-cycle tournament governance from automated team registration and round-robin draws to certified BCCI umpiring and live scoring.',
    card_image: tournamentsImg,
    hero_image: tournamentsImg,
    is_featured_home: true,
    sort_order: 2,
    display_config: { ...DEFAULT_DISPLAY_CONFIG },
    showcaseMedia: [],
    items: [
      {
        id: 201,
        service_id: 2,
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
        image_url: tourneyWorkImg,
        cta_text: 'Register Inquiry',
      },
      {
        id: 202,
        service_id: 2,
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
        image_url: tournamentsImg,
        cta_text: 'Plan a Tournament',
      },
    ],
  },
  {
    id: 3,
    slug: 'professional-coaching',
    title: 'PROFESSIONAL COACHING',
    tagline: 'DISCIPLINE. BIOMECHANICS. CHAMPIONSHIP MINDSET.',
    category: 'ATHLETIC DEVELOPMENT & ACADEMIES',
    short_description:
      'Structured skill acquisition academies, 1-on-1 biomechanics tuning, and specialized fitness conditioning led by BCCI-certified mentors.',
    card_image: coachingImg,
    hero_image: coachingImg,
    is_featured_home: true,
    sort_order: 3,
    display_config: { ...DEFAULT_DISPLAY_CONFIG },
    showcaseMedia: [],
    items: [
      {
        id: 301,
        service_id: 3,
        title: 'Junior Elite High-Performance Academy',
        tag: 'Ages 8–18',
        price_label: '3–5 Days / Week',
        description:
          'Progressive batting, pace/spin bowling, and fielding mastery led by BCCI-certified coaches with quarterly athletic benchmarks.',
        highlights: [
          'BCCI Level-1 & Level-2 Coaches',
          'Low 1:8 Coach-Player Ratio',
          'Agility & Conditioning Training',
          'Weekend Simulation Practice Matches',
        ],
        image_url: coachingWorkImg,
        cta_text: 'Enquire Academy Slots',
      },
      {
        id: 302,
        service_id: 3,
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
        image_url: coachingImg,
        cta_text: 'Book Assessment',
      },
    ],
  },
  {
    id: 4,
    slug: 'event-management',
    title: 'EVENT MANAGEMENT',
    tagline: 'CREATIVE SCALE. UNFORGETTABLE EXECUTION.',
    category: 'STADIUM PRODUCTIONS & CARNIVALS',
    short_description:
      'Turnkey sports spectacles including multi-sport company sports days, floodlit stadium ceremonies, and sponsor hospitality activations.',
    card_image: eventsImg,
    hero_image: eventsImg,
    is_featured_home: true,
    sort_order: 4,
    display_config: { ...DEFAULT_DISPLAY_CONFIG },
    showcaseMedia: [],
    items: [
      {
        id: 401,
        service_id: 4,
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
        image_url: eventsImg,
        cta_text: 'Request Proposal',
      },
      {
        id: 402,
        service_id: 4,
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
        image_url: groundBookImg,
        cta_text: 'Contact Events Team',
      },
    ],
  },
  {
    id: 5,
    slug: 'sports-technology',
    title: 'SPORTS TECHNOLOGY & LIVE STREAMING',
    tagline: 'BROADCAST QUALITY. DATA PRECISION.',
    category: 'SPORTS TECH, TELEMETRY & MEDIA',
    short_description:
      'Live multi-camera 1080p HD sports streaming with instant replays, real-time score bugs, speed guns, and smart analytics dashboards.',
    card_image: technologyImg,
    hero_image: technologyImg,
    is_featured_home: true,
    sort_order: 5,
    display_config: { ...DEFAULT_DISPLAY_CONFIG },
    showcaseMedia: [],
    items: [
      {
        id: 501,
        service_id: 5,
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
        image_url: streamWorkImg,
        cta_text: 'Book Broadcast Crew',
      },
      {
        id: 502,
        service_id: 5,
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
        image_url: techWorkImg,
        cta_text: 'Inquire Tech Pack',
      },
    ],
  },
  {
    id: 6,
    slug: 'sportswear-products',
    title: 'SPORTSWEAR & PRODUCTS',
    tagline: 'ENGINEERED FOR PERFORMANCE. CRAFTED FOR COMFORT.',
    category: 'PRO APPAREL & CRICKET EQUIPMENT',
    short_description:
      'Custom sublimated breathable athletic kits, moisture-wicking corporate team jerseys, handcrafted English Willow bats, and tournament gear.',
    card_image: sportswearImg,
    hero_image: sportswearImg,
    is_featured_home: true,
    sort_order: 6,
    display_config: { ...DEFAULT_DISPLAY_CONFIG },
    showcaseMedia: [],
    items: [
      {
        id: 601,
        service_id: 6,
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
        image_url: sportswearImg,
        cta_text: 'Request Custom Mockup',
      },
      {
        id: 602,
        service_id: 6,
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
        image_url: cricketBatsmanImg,
        cta_text: 'Request Bulk Quote',
      },
    ],
  },
  {
    id: 7,
    slug: 'corporate-events',
    title: 'CORPORATE EVENTS',
    tagline: 'TEAMS. COMPETITION. STRONGER TOGETHER.',
    category: 'ENTERPRISE & TEAM EXPERIENCES',
    short_description:
      'High-impact corporate cricket tournaments, leadership sports retreats, and inter-company leagues designed to forge indestructible team bonds.',
    card_image: corporateImg,
    hero_image: corporateImg,
    is_featured_home: false,
    sort_order: 7,
    display_config: { ...DEFAULT_DISPLAY_CONFIG },
    showcaseMedia: [],
    items: [
      {
        id: 701,
        service_id: 7,
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
        image_url: corporateImg,
        cta_text: 'Plan Corporate Cup',
      },
      {
        id: 702,
        service_id: 7,
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
        image_url: groundBookImg,
        cta_text: 'Discuss Offsite',
      },
    ],
  },
];
