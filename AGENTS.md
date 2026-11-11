# Sportsaal 3.0 Project Guidelines & Blueprint

## 1. Vision & Overview
Sportsaal 3.0 is a complete reimagining of the platform inspired by high-impact, modern conference & athletic experiences (referencing the Connect Sphere design system). It features a pure deep-dark aesthetic, bold condensed typography, interactive physics/bubble effects, dynamic video/thumbnail stage switchers, and multi-sport imagery (Cricket, Football, Badminton/Shuttle, Tennis, and Athletic Training).

---

## 2. Core Theme & Design Tokens
Sportsaal 3.0 is **strictly Dark Mode only**. No light theme styling or light/dark toggle needed.

### Color Palette
- **Deep Black Background**: `--bg-primary: #050505`
- **Dark Surface / Card**: `--bg-secondary: #0E0E0E`
- **Elevated Card / Modal**: `--bg-tertiary: #161616`
- **Brand Primary Red**: `--color-primary: #FF2B2B` (Sportsaal Electric Red)
- **Primary Hover**: `--color-primary-hover: #D41F1F`
- **Primary Glow**: `--color-primary-glow: rgba(255, 43, 43, 0.35)`
- **Accent Blue (Bubble & Stage)**: `--color-accent-blue: #0077FF`
- **Text Primary**: `--text-primary: #FFFFFF`
- **Text Secondary**: `--text-secondary: #9CA3AF`
- **Text Muted**: `--text-muted: #6B7280`
- **Subtle Border**: `--border-subtle: rgba(255, 255, 255, 0.08)`
- **Hover Border**: `--border-hover: rgba(255, 43, 43, 0.4)`

### Typography
- **Headings & Display**: `'Anton', sans-serif` (uppercase, condensed, high-impact)
- **Body, UI & Subtitles**: `'Barlow', 'Archivo', sans-serif`

---

## 3. Sportsaal 3.0 Section Roadmap & Specifications

### A. Minimal Dark Header (`Header`)
- Floating frosted dark navbar with brand logo.
- Anchor navigation links: `What We Offer`, `Upcoming Events`, `Coaches`, `Partners`.
- Action Button: High-contrast red/orange pill button `BOOK A VENUE`.

### B. Multi-Sport Panorama Hero (`Hero`)
1. **Multi-Sport Panorama Ribbon**: A staggered, horizontal ribbon of dynamic action portraits and sporting moments:
   - Cricket action (batsman / stadium)
   - Football / Soccer (floodlit match action)
   - Badminton / Shuttle (jump smash in indoor court)
   - Tennis / Athletic Training
2. **Infinite Marquee Ticker**: Continuous running text marquee in large Anton font:
   - `CRICKET • FOOTBALL • BADMINTON • TOURNAMENTS • PRO VENUES • LIVE STREAMING • COACHING •`
3. **Primary CTA Button**: Center-aligned high-contrast action button `EXPLORE SPORTSAAL`.

### C. "What We Offer" Section (Expandable Bubble Cards)
- 4 interactive dark cards representing Sportsaal's core services:
  1. **Venue Management**: Ground maintenance, floodlights, turf care, pitch booking.
  2. **Tournaments & Leagues**: End-to-end league hosting, corporate cups, live scoring.
  3. **Professional Coaching**: Academy training, multi-sport coaching, video analysis.
  4. **Sports Tech & Broadcast**: Multi-cam live streaming, player tracking, digital scoring.
- **Interactive Focus Mechanism**: Hovering or clicking a card triggers an animated circular focus bubble displaying key bullet offerings and supporting descriptive copy underneath.

### D. "Upcoming Events & Tournaments" Cinematic Stage (`UpcomingEvents`)
- **Main Stage Screen**: Large featured visual showcasing the active highlighted event:
  - Event tag, date/time badge, tournament title, venue location, match format, and `"REGISTER SQUAD"`.
- **Interactive Thumbnail Ribbon Strip**: Horizontal list of upcoming events (Cricket Premier League, Corporate Football Cup, Shuttle Open, etc.).
- Clicking any thumbnail smoothly transitions the main stage to that event.

### E. "Coaches & Sports Specialists" Carousel (`Coaches`)
- Vertical portrait cards with smooth horizontal scroll/drag with a `"SCROLL →"` visual cue.
- Showcases head coaches and specialists (Cricket Head Coach, Football Technical Director, Badminton Master Trainer, S&C Specialist).
- Displays trainer names, disciplines, credentials, and mini social pill badges (`X`, `LinkedIn`, `Instagram`).

### F. "Trusted By Leaders" Floating Logo Orbit (`TrustedBy`)
- Interactive floating physics-inspired bubble cloud of client/partner brand logos orbiting around a prominent center callout:
  - Center: `"HOST YOUR LEAGUE ON THE GLOBAL STAGE"` with a `"COLLABORATE"` button.
  - Orbiting bubbles: Corporate partners, tournament sponsors, sports academies.

### G. "Take Action" Animated CTA & 3D Element (`CTA`)
- Typewriter/morphing animated headline:
  `"PLAY LIKE CHAMPIONS TODAY"` / `"HOST TOURNAMENTS TODAY"` / `"BOOK GROUNDS TODAY"`
- Accompanied by a 3D athletic graphic element and action button `"GET STARTED"`.

### H. Modern Glassmorphic Dark Footer (`Footer`)
- Translucent dark surface with giant social brand links (`YOUTUBE`, `INSTAGRAM`, `LINKEDIN`, `TWITTER`).
- Quick navigation columns, support links, legal info, and a newsletter subscription input.

---

## 4. Development & Implementation Rules
1. **Zero Light Theme Baggage**: Clean, streamlined CSS without dual-theme overrides or clutter.
2. **High-Performance Animations**: Smooth CSS keyframes, transforms, and transitions (`transform`, `opacity`).
3. **Mandatory Mobile Responsiveness (CRITICAL)**: Every new design, component, and section we build MUST be fully mobile-responsive across small devices (≤480px) and tablets (≤768px / ≤1150px). Elements must never leave huge dead gaps, unreadable text, or awkward empty space; layouts must scale cohesively and look polished on mobile viewports.
4. **Mobile Navigation Architecture**: The mobile navbar must always display the brand logo and the hamburger menu toggle. Secondary header action buttons (e.g. "BOOK A VENUE") must be moved cleanly inside the mobile full-screen menu drawer rather than cluttering the mobile header bar.
5. **Curated High-Res Media**: Multi-sport action visuals optimized in WebP/JPG format.
