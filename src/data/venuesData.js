// Venue Visual Assets
import heroStadiumImg from '../assets/images/venues/venue-hero-stadium.png';
import greenfieldImg from '../assets/images/venues/venue-greenfield.png';
import championArenaImg from '../assets/images/venues/venue-champion-arena.png';
import eliteParkImg from '../assets/images/venues/venue-elite-park.png';

import categoryFullGroundsImg from '../assets/images/venues/category-full-grounds.png';
import categoryPracticeNetsImg from '../assets/images/venues/category-practice-nets.png';
import categoryIndoorFacilitiesImg from '../assets/images/venues/category-indoor-facilities.png';
import categoryCorporateVenuesImg from '../assets/images/venues/category-corporate-venues.png';
import faqBallPromoImg from '../assets/images/venues/faq-ball-promo.png';

// Testimonial Avatars
import arunAvatar from '../assets/images/testimonials/arun-prakash.png';
import deepakAvatar from '../assets/images/testimonials/deepak-sundaram.png';
import karthikAvatar from '../assets/images/testimonials/karthik-s.png';
import vigneshAvatar from '../assets/images/testimonials/vignesh-kumar.png';

export const venueMetrics = [
  { value: '50+', label: 'Verified Venues' },
  { value: '10K+', label: 'Matches Booked' },
  { value: '100+', label: 'Corporate Clients' },
  { value: '4.8/5', label: 'Average Player Rating' }
];

export const searchLocations = [
  'All Chennai Locations',
  'ECR, Chennai',
  'OMR, Chennai',
  'Tambaram, Chennai',
  'Porur, Chennai',
  'Anna Nagar, Chennai'
];

export const searchVenueTypes = [
  'All Venue Types',
  'Full Cricket Grounds',
  'Floodlit Practice Nets',
  'Indoor Box Turf Arenas',
  'Corporate Championship Grounds'
];

export const featuredVenues = [
  {
    id: 'greenfield-cricket-ground',
    name: 'Greenfield Cricket Ground',
    location: 'ECR, Chennai',
    category: 'Full Cricket Grounds',
    badge: 'POPULAR',
    rating: 4.9,
    reviewsCount: 128,
    image: greenfieldImg,
    pricePerHour: 2500,
    priceDisplay: '₹2,500 / hr',
    boundary: '70m Boundary',
    pitchType: 'Natural Turf Pitch',
    lighting: '1000 Lux LED Floodlights',
    features: [
      'Full 70m International Boundary',
      '4 Natural Clay Turf Pitches',
      'Broadcast-Grade 1000 Lux LED Floodlights',
      'Air-conditioned Pavilion & Dugouts',
      'Digital LED Scoreboard with Remote App',
      'Live Streaming Camera Setup & High-Speed Wi-Fi'
    ],
    amenities: ['Pavilion', 'Floodlights', 'Live Stream', 'Dressing Room', 'Parking', 'Cafeteria'],
    description:
      'Championship-standard cricket ground surrounded by coastal breezes along ECR. Features perfectly rolled turf wickets, expansive outfields, and professional floodlights for tournament-grade day/night cricket.',
    slots: [
      { id: 'm1', label: 'Morning Match (06:00 AM - 10:00 AM)', time: '06:00 - 10:00', price: 10000, available: true },
      { id: 'a1', label: 'Afternoon Derby (10:30 AM - 02:30 PM)', time: '10:30 - 14:30', price: 9000, available: true },
      { id: 'e1', label: 'Evening Floodlit (03:30 PM - 07:30 PM)', time: '15:30 - 19:30', price: 12000, available: false },
      { id: 'n1', label: 'Night Cup Clash (08:00 PM - 12:00 AM)', time: '20:00 - 00:00', price: 14000, available: true }
    ]
  },
  {
    id: 'champion-sports-arena',
    name: 'Champion Sports Arena',
    location: 'OMR, Chennai',
    category: 'Floodlit Practice Nets',
    badge: 'FEATURED',
    rating: 4.8,
    reviewsCount: 94,
    image: championArenaImg,
    pricePerHour: 1800,
    priceDisplay: '₹1,800 / hr',
    boundary: 'Box Arena / Nets',
    pitchType: 'Astro-Turf Pitch',
    lighting: '800 Lux Night Illumination',
    features: [
      '6 Dedicated High-Speed Bowling Lanes',
      'Leverage & Merlyn Bowling Machines Available',
      'Shock-Absorbing FIFA/ICC Certified Turf',
      'Side Netting with Ball Tracking Heights',
      'Video Analytics Camera Stands at Batsman End',
      'Spacious Player Lounge & Energy Bar'
    ],
    amenities: ['Bowling Machine', 'Floodlights', 'Video Analysis', 'Locker Room', 'Parking', 'Equipment Rental'],
    description:
      'Premier indoor & outdoor training facility on OMR designed for serious batsmen and bowlers. Features calibrated bowling machines, automated video mounts, and durable astro surfaces.',
    slots: [
      { id: 'm2', label: 'Early Birds (06:00 AM - 09:00 AM)', time: '06:00 - 09:00', price: 5400, available: true },
      { id: 'a2', label: 'Midday Drills (11:00 AM - 02:00 PM)', time: '11:00 - 14:00', price: 4800, available: true },
      { id: 'e2', label: 'Prime Practice (04:00 PM - 07:00 PM)', time: '16:00 - 19:00', price: 6000, available: true },
      { id: 'n2', label: 'Night Session (07:30 PM - 10:30 PM)', time: '19:30 - 22:30', price: 6600, available: true }
    ]
  },
  {
    id: 'elite-cricket-park',
    name: 'Elite Cricket Park',
    location: 'Tambaram, Chennai',
    category: 'Full Cricket Grounds',
    badge: 'PREMIUM',
    rating: 4.9,
    reviewsCount: 156,
    image: eliteParkImg,
    pricePerHour: 3200,
    priceDisplay: '₹3,200 / hr',
    boundary: '75m Boundary',
    pitchType: 'Curated Red Soil Pitch',
    lighting: '1200 Lux Stadium Mast Lights',
    features: [
      'Full 75m Boundary with Lush Green Outfield',
      'Red Soil Curated Pitch with True Bounce',
      'High-Tower Stadium Mast Floodlights',
      'VIP Corporate Lounge & Elevated Spectator Deck',
      'Professional Umpires & Scorer Booth On-Demand',
      'Dedicated Medical Station & Ice Bath Room'
    ],
    amenities: ['VIP Lounge', 'Stadium Lights', 'Curated Pitch', 'Umpires & Scorers', 'Dressing Suite', 'Ample Parking'],
    description:
      'The crown jewel of amateur and corporate cricket in South Chennai. Built to simulate international stadium conditions with towering masts, red-soil wickets, and spectator seating.',
    slots: [
      { id: 'm3', label: 'Morning Championship (06:30 AM - 10:30 AM)', time: '06:30 - 10:30', price: 12800, available: true },
      { id: 'a3', label: 'Afternoon Challenge (11:00 AM - 03:00 PM)', time: '11:00 - 15:00', price: 11500, available: false },
      { id: 'e3', label: 'Golden Hour (03:30 PM - 07:30 PM)', time: '15:30 - 19:30', price: 14000, available: true },
      { id: 'n3', label: 'Prime Stadium Night (08:00 PM - 12:00 AM)', time: '20:00 - 00:00', price: 16000, available: true }
    ]
  }
];

export const whyChooseUs = [
  {
    number: '01',
    title: 'Verified Standard Pitches',
    description:
      'Every ground listed on Sportsaal undergoes strict curation checks for pitch bounce, outfield leveling, and boundary dimensions before going live.'
  },
  {
    number: '02',
    title: 'Instant Slot Confirmation',
    description:
      'Zero double bookings. Instant real-time calendar locks, digital entry barcodes, and automated WhatsApp directions to your team.'
  },
  {
    number: '03',
    title: 'Floodlit Match Excellence',
    description:
      'All evening venues are equipped with minimum 800+ Lux flicker-free LED lights for sharp visibility and high-framerate video recordings.'
  },
  {
    number: '04',
    title: 'End-to-End Match Support',
    description:
      'Need certified match balls, umpires, digital scorers, or refreshments? Add tournament support packages with a single tap.'
  }
];

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Search & Filter',
    description: 'Enter your preferred location, date, and ground category to browse real-time availability.'
  },
  {
    step: '02',
    title: 'Compare & Inspect',
    description: 'Review high-resolution ground photos, pitch specifications, amenities, and player reviews.'
  },
  {
    step: '03',
    title: 'Select Slot & Book',
    description: 'Pick your preferred 3 to 4-hour match slot and securely reserve your slot with instant verification.'
  },
  {
    step: '04',
    title: 'Play Like Pros',
    description: 'Arrive at the prepped ground with pitch rolled, balls ready, and floodlights powered on.'
  }
];

export const venueCategories = [
  {
    id: 'full-grounds',
    title: 'Full Cricket Grounds',
    subtitle: '65m - 75m Boundaries',
    description: 'Championship-standard natural turf and matting grounds for 11-a-side matches, weekend leagues, and corporate cups.',
    image: categoryFullGroundsImg,
    badge: '11 vs 11'
  },
  {
    id: 'practice-nets',
    title: 'Practice Nets & Lanes',
    subtitle: 'Batting & Bowling Lanes',
    description: 'Enclosed lanes with high-caliber bowling machines, automated video mounts, and dedicated coaching run-ups.',
    image: categoryPracticeNetsImg,
    badge: 'TRAINING'
  },
  {
    id: 'indoor-facilities',
    title: 'Indoor Box Turf Arenas',
    subtitle: 'All-Weather Covered Play',
    description: 'Climate-controlled high-rebound turf enclosures perfect for fast-paced 6-a-side box cricket in any weather.',
    image: categoryIndoorFacilitiesImg,
    badge: 'ALL-WEATHER'
  },
  {
    id: 'corporate-venues',
    title: 'Corporate Championship Venues',
    subtitle: 'Event Pavilions & Hospitality',
    description: 'Sprawling grounds equipped with hospitality marquees, elevated spectator stands, and corporate branding setups.',
    image: categoryCorporateVenuesImg,
    badge: 'PREMIUM EVENTS'
  }
];

export const venueTestimonials = [
  {
    id: 't1',
    quote:
      'Booking Greenfield Ground through Sportsaal for our Tech Trophy was effortless. The turf pitch played true with consistent bounce, and the floodlights were immaculate. Every team captain praised the venue quality!',
    name: 'Arun Prakash',
    role: 'Captained Chennai Super Strikers Corporate Trophy',
    rating: 5,
    avatar: arunAvatar
  },
  {
    id: 't2',
    quote:
      'We run a weekend 16-team league and pitch quality used to be our biggest headache. With Sportsaal, we get verified grounds that are actually rolled and ready when we arrive. Zero delays, zero excuses.',
    name: 'Deepak Sundaram',
    role: 'Tournament Director, OMR Weekend Champions League',
    rating: 5,
    avatar: deepakAvatar
  },
  {
    id: 't3',
    quote:
      'The practice nets at Champion Arena with the Leverage bowling machines allowed our academy players to face 140kph deliveries safely under great lighting. Exceptional infrastructure and seamless booking.',
    name: 'Karthik S.',
    role: 'Head Coach, Tamil Nadu Colts Cricket Academy',
    rating: 5,
    avatar: karthikAvatar
  },
  {
    id: 't4',
    quote:
      'Elite Cricket Park gave our corporate finals the feel of a mini-IPL game. Dugouts, digital scoreboard app integration, and evening mast lights were stunning. Will be booking again next season without doubt!',
    name: 'Vignesh Kumar',
    role: 'HR & Sports Committee Lead, Cognizant Titans',
    rating: 5,
    avatar: vigneshAvatar
  }
];

export const venueFaqs = [
  {
    question: 'How far in advance can I book a cricket ground on Sportsaal?',
    answer:
      'You can reserve slots up to 60 days in advance. Weekend morning slots (6 AM - 10 AM) and prime floodlit slots tend to fill quickly, so we recommend booking at least 5 to 7 days prior to your match date.'
  },
  {
    question: 'What happens if a match is interrupted or washed out due to rain?',
    answer:
      'We offer an automatic Weather Protection Guarantee. If your match is rained out before 50% of the slot duration is completed, you receive a 100% free reschedule credit to rebook the ground on any available future date within 60 days.'
  },
  {
    question: 'Are cricket balls, umpires, and match equipment included?',
    answer:
      'Basic grounds include stumps, bails, boundary ropes, and scoreboard. Premium match balls, professional certified umpires, digital scorers, and kit bags can be easily added to your booking during checkout or via our match concierge.'
  },
  {
    question: 'Can we book full grounds for multi-day corporate tournaments?',
    answer:
      'Yes! We offer customized full-day and multi-day corporate tournament packages including branding, commentary, live streaming, photography, and catering. Contact our sports events team through the booking modal or inquiry form.'
  }
];

export const venueImages = {
  heroStadium: heroStadiumImg,
  faqBallPromo: faqBallPromoImg
};
