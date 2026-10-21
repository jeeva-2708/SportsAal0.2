// Service Visual Assets
import corporateEventsImg from '../assets/images/our-work/corporate-events.webp';
import venueImg from '../assets/images/our-services/venue-management.png';
import groundBookingImg from '../assets/images/our-work/ground-booking.webp';
import tournamentsImg from '../assets/images/our-services/tournaments.png';
import cricketTournamentsWebp from '../assets/images/our-work/cricket-tournaments.webp';
import coachingImg from '../assets/images/our-services/coaching-programs.png';
import professionalCoachingWebp from '../assets/images/our-work/professional-coaching.webp';
import eventsImg from '../assets/images/our-services/event-management.png';
import technologyImg from '../assets/images/our-services/sports-technology.png';
import sportsTechnologyWebp from '../assets/images/our-work/sports-technology.webp';
import sportswearProductsImg from '../assets/images/our-work/sportswear-products.webp';

export const servicesData = {
  'corporate-events': {
    slug: 'corporate-events',
    title: 'CORPORATE EVENTS',
    tagline: 'TEAMS. COMPETITION. STRONGER TOGETHER.',
    category: 'ENTERPRISE & TEAM EXPERIENCES',
    heroImage: corporateEventsImg,
    secondaryImage: cricketTournamentsWebp,
    shortDescription:
      'High-impact corporate cricket tournaments, leadership sports retreats, and inter-company leagues designed to forge indestructible team bonds and champion competitive spirit.',
    fullDescription: [
      'Sportsaal reimagines corporate sports engagement from the ground up. We transform standard company sports outings into stadium-grade sporting spectacles featuring live commentary, electronic scoreboards, professional umpires, and broadcast-quality coverage.',
      'Whether you are uniting 50 leaders for an executive cricket derby or orchestrating an annual pan-India corporate sports tournament with 2,000+ employees, our turnkey event production handles logistics, ground booking, branded kits, hospitality, and real-time tournament analytics.',
      'Elevate your company culture with events that ignite genuine camaraderie, break down workplace silos, and deliver memories that inspire teams long after the final ball is bowled.'
    ],
    stats: [
      { value: '180+', label: 'Corporate Tournaments' },
      { value: '45,000+', label: 'Participants Engaged' },
      { value: '99.4%', label: 'Executive Satisfaction' },
      { value: '100%', label: 'Turnkey Execution' }
    ],
    features: [
      {
        title: 'Custom League Formats',
        description: 'T20, T10, Super-Sixes, and box-cricket structures tailored to your company schedule, skill mix, and team sizes.',
        icon: 'trophy'
      },
      {
        title: 'Broadcast & Live Streaming',
        description: 'Multi-camera HD streaming with graphics overlays, ball-by-ball score telemetry, and digital highlights for remote colleagues.',
        icon: 'video'
      },
      {
        title: 'Complete Ground & Hospitality',
        description: 'Premium curated pitches, umpire panels, physiotherapists on-site, team dugouts, and athlete-grade nutritional catering.',
        icon: 'shield'
      },
      {
        title: 'Branded Kits & Trophies',
        description: 'Custom corporate jerseys, commemorative medals, branded trophies, and digital certificates honoring tournament stars.',
        icon: 'award'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'Strategy & Goal Alignment',
        description: 'We meet with your HR and leadership teams to understand your company culture, headcount, budget, and desired engagement outcomes.'
      },
      {
        step: '02',
        title: 'Venue & Format Design',
        description: 'Securing top-tier sporting venues, designing match fixtures, team brackets, and custom branded apparel for all squads.'
      },
      {
        step: '03',
        title: 'Stadium-Grade Gameday',
        description: 'Seamless execution featuring pro umpires, medical response teams, live scoring, DJ, commentary, and gourmet hospitality.'
      },
      {
        step: '04',
        title: 'Post-Event Content & Highlights',
        description: 'Delivery of high-resolution photo archives, video highlight reels, stat summaries, and company-wide recap assets.'
      }
    ],
    highlights: [
      'Tailored for enterprise workforces from 30 to 3,000+ people',
      'Exclusive access to premium floodlit stadiums and private sporting grounds',
      'Zero internal overhead — your HR team simply arrives and enjoys the day',
      'Real-time live scoring mobile app integration for tournament tracking'
    ]
  },

  'venue-management': {
    slug: 'venue-management',
    title: 'VENUE MANAGEMENT',
    tagline: 'WORLD-CLASS INFRASTRUCTURE. PEAK PLAYABILITY.',
    category: 'SPORTS INFRASTRUCTURE & FACILITY OPERATIONS',
    heroImage: venueImg,
    secondaryImage: groundBookingImg,
    shortDescription:
      'End-to-end sports facility operations, pitch curation, floodlighting, automated booking systems, and preventive maintenance ensuring championship playing conditions 365 days a year.',
    fullDescription: [
      'Sports infrastructure is only as good as the passion and precision behind its maintenance. At Sportsaal, we bring professional groundskeeping science and modern operational management to turf facilities, sports academies, and independent cricket stadiums.',
      'From custom turf grass hybrid cultivation and clay wicket preparation to advanced drainage engineering that enables play within 30 minutes of torrential rain, our agronomists and facility directors preserve asset value while maximizing court and pitch uptime.',
      'We combine physical curation with smart digital facility operations: real-time slot scheduling, automated access control, LED sports floodlight power management, and revenue optimization for venue owners.'
    ],
    stats: [
      { value: '35+', label: 'Venues Under Management' },
      { value: '98.8%', label: 'Field Playability Uptime' },
      { value: '25 Min', label: 'Rain Drainage Recovery' },
      { value: '1.2M+', label: 'Hours of Play Delivered' }
    ],
    features: [
      {
        title: 'Agronomy & Turf Engineering',
        description: 'Soil composition analysis, automated sprinkler systems, top-dressing, and precision wicket preparation for pace, bounce, or spin.',
        icon: 'field'
      },
      {
        title: 'Automated Booking & Access',
        description: 'Cloud booking software, member portals, digital check-in kiosks, and contactless entry automation.',
        icon: 'calendar'
      },
      {
        title: 'High-Lux Sports Lighting',
        description: 'Anti-glare LED sports floodlights calibrated for broadcast-grade lux levels with energy-efficient smart scheduling.',
        icon: 'zap'
      },
      {
        title: 'Safety & Facility Hygiene',
        description: 'Player changing rooms, medical stations, spectator stands, net cages, and continuous maintenance routines.',
        icon: 'check-circle'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'Site Audit & Turf Diagnostics',
        description: 'Comprehensive evaluation of existing soil, drainage, lighting, boundary netting, and operational bottlenecks.'
      },
      {
        step: '02',
        title: 'Infrastructure Upgrade Plan',
        description: 'Laser levelling, sub-surface drainage installation, turf re-laying, and deployment of smart venue access control.'
      },
      {
        step: '03',
        title: 'Daily Operational Takeover',
        description: 'Dedicated on-site groundskeepers, pitch curators, security, and facility managers executing daily maintenance.'
      },
      {
        step: '04',
        title: 'Commercial Monetization',
        description: 'Optimizing booking yield, corporate leagues, academy leasing, and sponsorship visibility to drive venue profitability.'
      }
    ],
    highlights: [
      'BCCI and ICC standards-compliant wicket preparation expertise',
      'Proprietary sub-surface drainage minimizing rain washouts',
      'Automated online ground reservation system for teams and clubs',
      'Comprehensive preventive maintenance preserving multi-crore investments'
    ]
  },

  'cricket-tournaments': {
    slug: 'cricket-tournaments',
    title: 'CRICKET TOURNAMENTS',
    tagline: 'ORGANIZED TO PERFECTION. PLAYED WITH PASSION.',
    category: 'LEAGUE & COMPETITION MANAGEMENT',
    heroImage: tournamentsImg,
    secondaryImage: cricketTournamentsWebp,
    shortDescription:
      'Flagship multi-tier cricket tournaments, school leagues, open championships, and franchise-model cups managed with uncompromising rigor and athletic excellence.',
    fullDescription: [
      'Every athlete dreams of playing on the grand stage. Sportsaal engineers competitive cricket tournaments that give players of every level the prestige, intensity, and professional environment of international cricket.',
      'We handle complete league administration: player auction drafts, computerized team scheduling, neutral BCCI-certified match officials, third-umpire DRS reviews, digital scoreboards, live video broadcast, and official awards ceremonies.',
      'Whether creating a grassroots school championship to scout rising talent or hosting a marquee franchise T20 cup with commercial sponsors, Sportsaal is your trusted architect for unforgettable sports spectacles.'
    ],
    stats: [
      { value: '320+', label: 'Tournaments Hosted' },
      { value: '4,800+', label: 'Matches Officiated' },
      { value: '25,000+', label: 'Registered Players' },
      { value: '100%', label: 'Certified Umpiring' }
    ],
    features: [
      {
        title: 'Player Auctions & Rosters',
        description: 'Custom digital auction software, salary cap rules, player stats grading, and roster management.',
        icon: 'users'
      },
      {
        title: 'Certified Match Officials',
        description: 'Official association umpires, trained match referees, third umpire video review, and unbiased scorekeepers.',
        icon: 'award'
      },
      {
        title: 'Ball-by-Ball Live Scoring',
        description: 'Instantaneous digital ball tracking, Wagon Wheels, Manhattan graphs, and mobile leaderboard stats.',
        icon: 'activity'
      },
      {
        title: 'Championship Ceremonies',
        description: 'Grand presentation stages, customized player-of-the-match awards, championship rings, and winner cheques.',
        icon: 'trophy'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'Tournament Conceptualization',
        description: 'Designing tournament rulebooks, playing conditions (T20/T10/Red-ball), age categories, and prize purse structures.'
      },
      {
        step: '02',
        title: 'Registration & Team Scrutiny',
        description: 'Online player registrations, identity verification, team kit distribution, and auction draft coordination.'
      },
      {
        step: '03',
        title: 'Tournament Execution',
        description: 'Flawless day/night match operations with certified match balls, live score streaming, medical staff, and security.'
      },
      {
        step: '04',
        title: 'Awards & Media Distribution',
        description: 'Broadcast-quality post-match ceremonies, trophies, press releases, player statistics leaderboards, and MVP awards.'
      }
    ],
    highlights: [
      'Comprehensive league management software and player portals',
      'Live HD video streaming with professional commentary teams',
      'Standardized playing conditions ensuring fair and fierce competition',
      'Sponsorship integration opportunities with multi-channel reach'
    ]
  },

  'professional-coaching': {
    slug: 'professional-coaching',
    title: 'PROFESSIONAL COACHING',
    tagline: 'BUILD SKILLS. MASTER TECHNIQUE. RAISE CHAMPIONS.',
    category: 'ATHLETIC DEVELOPMENT & ACADEMIES',
    heroImage: coachingImg,
    secondaryImage: professionalCoachingWebp,
    shortDescription:
      'Elite cricket coaching programs led by certified coaches, featuring biomechanical video analysis, cognitive decision training, and personalized athletic development plans.',
    fullDescription: [
      'True talent requires scientific refinement. Sportsaal Professional Coaching combines traditional cricketing discipline with modern sports science, biomechanics, and video analytics to accelerate player evolution.',
      'Our programs cater to every developmental phase: junior foundation academies for budding youth, specialized high-performance clinics for club cricketers, and custom 1-on-1 masterclasses for professional players seeking technical breakthroughs in batting, spin, pace bowling, or wicketkeeping.',
      'Under the guidance of NIS and BCCI-certified coaches, players master not just shot selection and bowling actions, but match awareness, mental resilience under pressure, athletic conditioning, and injury prevention.'
    ],
    stats: [
      { value: '1,400+', label: 'Athletes Trained' },
      { value: '1:8', label: 'Coach to Student Ratio' },
      { value: '45+', label: 'District/State Reps' },
      { value: '100%', label: 'Certified Coaches' }
    ],
    features: [
      {
        title: 'Biomechanical Video Analysis',
        description: 'High-speed 240fps multi-angle cameras dissecting bat swing, release angles, run-up stride, and head alignment.',
        icon: 'target'
      },
      {
        title: 'Specialist Skill Clinics',
        description: 'Dedicated masterclasses: Power-hitting, spin bowling variations, reverse swing, and modern athletic wicketkeeping.',
        icon: 'shield'
      },
      {
        title: 'Strength & Conditioning',
        description: 'Cricket-specific agility drills, rotational power development, speed endurance, and injury risk mitigation.',
        icon: 'activity'
      },
      {
        title: 'Mental Toughness & Tactics',
        description: 'Cognitive focus conditioning, situational match simulation, and constructive sports psychology guidance.',
        icon: 'compass'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'Comprehensive Skills Assessment',
        description: 'Baseline testing of technique, hand-eye coordination, aerobic endurance, and video diagnostic recording.'
      },
      {
        step: '02',
        title: 'Tailored Development Pathway',
        description: 'Formulating customized training roadmaps tailored to the player’s age, position, goals, and technical areas of growth.'
      },
      {
        step: '03',
        title: 'Intensive Practical Sessions',
        description: 'Drills on turf, bowling machine training, scenario-based match practice, and tactical pressure nets.'
      },
      {
        step: '04',
        title: 'Quarterly Progress Reviews',
        description: 'Detailed analytics report card, side-by-side video evolution comparison, and parent/player review sessions.'
      }
    ],
    highlights: [
      'Small batch sizes guaranteeing individualized coach attention',
      'Bowling machines with programmable speed, swing, and spin variations',
      'Regular competitive practice matches on championship turf pitches',
      'Direct scouting pathways to regional leagues and representative squads'
    ]
  },

  'event-management': {
    slug: 'event-management',
    title: 'EVENT MANAGEMENT',
    tagline: 'SEAMLESS PLANNING. UNFORGETTABLE EXPERIENCES.',
    category: 'FULL-SCALE SPORTS PRODUCTIONS',
    heroImage: eventsImg,
    secondaryImage: corporateEventsImg,
    shortDescription:
      'Complete end-to-end sports event conceptualization, celebrity exhibition matches, stadium festivals, brand activations, and broadcast-ready productions delivered with flawless precision.',
    fullDescription: [
      'Sportsaal transforms ambitious sports visions into world-class real-time spectacles. We are the premier production partner for organizations seeking unforgettable sports ceremonies, tournament inaugurations, and commercial stadium gatherings.',
      'From stadium branding, stage design, LED screen arrays, and sound engineering to ticketing, crowd management, VIP guest hospitality, and government licensing, our seasoned producers handle every detail with military precision.',
      'We bring brand stories to life through sports: engaging experiential zones, influencer cricket challenges, charity matches, and product launches that capture national attention and ignite audience passion.'
    ],
    stats: [
      { value: '250+', label: 'Events Executed' },
      { value: '250,000+', label: 'Spectators Hosted' },
      { value: '100%', label: 'On-Time Delivery' },
      { value: '35+', label: 'Brand Partnerships' }
    ],
    features: [
      {
        title: 'Turnkey Stadium Production',
        description: 'State-of-the-art concert sound systems, giant LED boundary screens, pyrotechnics, and lighting rigs.',
        icon: 'zap'
      },
      {
        title: 'VIP & Player Hospitality',
        description: 'Exclusive lounge buildouts, gourmet athlete nutrition, celebrity protocol, and private security details.',
        icon: 'award'
      },
      {
        title: 'Licensing & City Approvals',
        description: 'Seamless handling of civic permits, fire safety, police coordination, emergency medical standby, and crowd management.',
        icon: 'shield'
      },
      {
        title: 'Brand Activation Zones',
        description: 'Interactive cricket simulators, fan engagement booths, photo installations, and sponsor sampling pavilions.',
        icon: 'target'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'Creative Concept & Feasibility',
        description: 'Defining event identity, scale, budget parameters, venue options, run-of-show schedule, and sponsor integration points.'
      },
      {
        step: '02',
        title: 'Logistics & Permitting Masterplan',
        description: 'Securing civic clearances, artist/player contracts, stage construction, audio-visual testing, and safety protocols.'
      },
      {
        step: '03',
        title: 'Flawless Live Execution',
        description: 'On-ground show calling, minute-by-minute protocol management, crowd flow monitoring, and live broadcasting.'
      },
      {
        step: '04',
        title: 'Post-Event Wrap & Metrics',
        description: 'Venue de-rigging, financial reconciliation, media impression reports, and delivery of high-res recap media.'
      }
    ],
    highlights: [
      'Deep relationships with premier municipal and private sports venues',
      'In-house technical production, stage design, and lighting team',
      'Zero-incident crowd management and emergency response track record',
      'Comprehensive digital and social media amplification packages'
    ]
  },

  'sports-technology': {
    slug: 'sports-technology',
    title: 'SPORTS TECHNOLOGY',
    tagline: 'SMARTER INSIGHTS. DATA-DRIVEN PERFORMANCE.',
    category: 'DIGITAL INNOVATION & ANALYTICS',
    heroImage: technologyImg,
    secondaryImage: sportsTechnologyWebp,
    shortDescription:
      'Cutting-edge cricket tech solutions: smart radar ball tracking, biometric load monitoring, computerized pitch analysis, and broadcast-grade streaming overlays for modern sporting organizations.',
    fullDescription: [
      'In modern cricket, data is the difference between good and championship-caliber. Sportsaal Sports Technology integrates state-of-the-art hardware and analytics software to turn raw athletic movement into actionable competitive advantage.',
      'We equip academies, leagues, and venues with intelligent technology stacks: high-speed ball-tracking radar measuring speed, release point, and seam rotation; wearable GPS vests monitoring player work rate and heart rate zones; and automated camera systems that broadcast matches without requiring a human crew.',
      'Our platforms empower coaches to make data-backed technical corrections and allow tournament organizers to provide fans with television-quality live telemetry and interactive statistics.'
    ],
    stats: [
      { value: '500,000+', label: 'Deliveries Tracked' },
      { value: '99.8%', label: 'Telemetry Accuracy' },
      { value: '60+', label: 'Clubs Using Our Tech' },
      { value: '1080p60', label: 'Ultra-Low Latency' }
    ],
    features: [
      {
        title: 'Speed & Spin Radar Telemetry',
        description: 'Precision Doppler radar sensors capturing delivery speed (km/h), release height, trajectory arc, and RPM spin rates.',
        icon: 'activity'
      },
      {
        title: 'AI Smart Streaming Cameras',
        description: 'Automated ball-following cameras that track the action seamlessly with automated score graphics overlays.',
        icon: 'video'
      },
      {
        title: 'Biometrics & Workload Analytics',
        description: 'Wearable sports sensors monitoring bowling workloads, sprint intensity, recovery times, and fatigue markers.',
        icon: 'target'
      },
      {
        title: 'Player Performance Dashboards',
        description: 'Cloud portal delivering visual wagon wheels, pitch heatmaps, scoring zone analysis, and dismissal trends.',
        icon: 'compass'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'Infrastructure & Tech Audit',
        description: 'Assessing your facility, nets, or tournament grounds to identify sensor placements, power, and bandwidth requirements.'
      },
      {
        step: '02',
        title: 'Hardware & Sensor Deployment',
        description: 'Mounting radar units, high-speed camera rigs, network hubs, and calibrating pitch distance metrics.'
      },
      {
        step: '03',
        title: 'Staff & Coach Onboarding',
        description: 'Training coaching staff and analysts on dashboard interpretation, report generation, and player feedback workflows.'
      },
      {
        step: '04',
        title: 'Ongoing Data Intelligence',
        description: 'Continuous cloud sync, automatic software upgrades, technical support, and monthly performance synthesis.'
      }
    ],
    highlights: [
      'Military-grade radar sensor accuracy within ±0.5 km/h',
      'Instant video clip generation tagged by player and delivery type',
      'Compatible with leading broadcast software (OBS, vMix) and mobile apps',
      'Reduces subjective coaching guesswork into objective scientific data'
    ]
  },

  'sportswear-products': {
    slug: 'sportswear-products',
    title: 'SPORTSWEAR & PRODUCTS',
    tagline: 'ENGINEERED FOR CRICKET. CRAFTED FOR CHAMPIONS.',
    category: 'ATHLETIC APPAREL & CRICKET EQUIPMENT',
    heroImage: sportswearProductsImg,
    secondaryImage: coachingImg,
    shortDescription:
      'High-performance technical cricket apparel, custom sublimated team jerseys, professional English Willow bats, protective gear, and athletic merchandise crafted for maximum durability and comfort.',
    fullDescription: [
      'Performance starts with what you wear. Sportsaal Sportswear & Products blends modern moisture-wicking technical fabrics with ergonomic athletic tailoring designed specifically for the rigorous demands of cricket.',
      'From custom-designed sublimated team kits for corporate and club tournaments to professional-grade English Willow cricket bats, lightweight batting pads, and impact-absorbing gloves, we supply athletes and teams with equipment that looks magnificent and withstands championship pressure.',
      'We empower corporate teams, academies, and clubs with bespoke customized merchandise: personalized names, team crests, sponsor logos, and breathable materials engineered to keep players cool in peak summer heat.'
    ],
    stats: [
      { value: '35,000+', label: 'Jerseys Supplied' },
      { value: '180+', label: 'Teams Outfitted' },
      { value: '100%', label: 'Anti-Microbial Fabric' },
      { value: 'Grade 1', label: 'English Willow Options' }
    ],
    features: [
      {
        title: 'Technical Breathable Fabrics',
        description: 'Ultra-lightweight 160-180 GSM polyester mesh with sweat-wicking dry-fit tech and 4-way stretch flexibility.',
        icon: 'shield'
      },
      {
        title: 'Full Sublimation Customization',
        description: 'Vibrant, fade-proof colors, sharp custom crests, sponsor branding, and individual player names and squad numbers.',
        icon: 'award'
      },
      {
        title: 'Handcrafted Cricket Equipment',
        description: 'Curated Grade 1 & 2 English Willow bats, high-density lightweight batting pads, and premium leather gloves.',
        icon: 'trophy'
      },
      {
        title: 'Corporate & Club Merchandise',
        description: 'Tracksuits, travel polo shirts, kit bags, custom caps, water bottles, and training equipment sets.',
        icon: 'users'
      }
    ],
    workflow: [
      {
        step: '01',
        title: 'Design Consultation & Mockups',
        description: 'Our sports apparel designers create 3D kit visualizations incorporating your team colors, logos, and sponsor guidelines.'
      },
      {
        step: '02',
        title: 'Fabric Selection & Sizing',
        description: 'Choosing fabric weights, collar styles (Chinese, polo, round neck), and collecting team roster sizing profiles.'
      },
      {
        step: '03',
        title: 'Precision Manufacturing',
        description: 'High-definition digital sublimation printing, precision laser cutting, and double-stitched reinforced seam construction.'
      },
      {
        step: '04',
        title: 'Individual Packaging & Dispatch',
        description: 'Every jersey is individually tagged, size-checked, packaged by player name, and dispatched directly to your location.'
      }
    ],
    highlights: [
      'Quick turnaround times for corporate leagues and tournament deadlines',
      'Durable colors that remain vibrant even after 100+ wash cycles',
      'Ergonomic athletic cut allowing unrestricted bowling and batting motion',
      'Bulk enterprise discounts and dedicated apparel account managers'
    ]
  }
};

export const allServicesList = [
  { slug: 'corporate-events', title: 'Corporate Events', path: '/services/corporate-events' },
  { slug: 'venue-management', title: 'Venue Management', path: '/services/venue-management' },
  { slug: 'cricket-tournaments', title: 'Cricket Tournaments', path: '/services/cricket-tournaments' },
  { slug: 'professional-coaching', title: 'Professional Coaching', path: '/services/professional-coaching' },
  { slug: 'event-management', title: 'Event Management', path: '/services/event-management' },
  { slug: 'sports-technology', title: 'Sports Technology', path: '/services/sports-technology' },
  { slug: 'sportswear-products', title: 'Sportswear & Products', path: '/services/sportswear-products' },
];
