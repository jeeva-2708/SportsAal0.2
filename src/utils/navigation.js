/**
 * Navigation utility for sticky stacked-section architecture + Contact Inquiry routing.
 */

const SECTION_ID_ALIASES = {
  home: 'hero',
  hero: 'hero',
  about: 'about',
  'about-us': 'about',
  services: 'services',
  'our-services': 'services',
  venues: 'services',
  tournaments: 'services',
  coaching: 'services',
  work: 'work',
  'our-work': 'work',
  'trusted-by': 'partners',
  partners: 'partners',
  testimonials: 'testimonials',
  contact: 'contact',
  'contact-us': 'contact',
  book: 'contact',
  footer: 'footer',
};

const CONTACT_PREFILL_KEY = 'sportsaal_contact_prefill';

export function setContactPrefill(payload) {
  if (!payload) return;
  try {
    sessionStorage.setItem(CONTACT_PREFILL_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent('sportsaal:contact-prefill', { detail: payload }));
}

export function consumeContactPrefill() {
  try {
    const raw = sessionStorage.getItem(CONTACT_PREFILL_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(CONTACT_PREFILL_KEY);
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function scrollToSection(targetId) {
  if (!targetId) return;

  const cleanId = (targetId.startsWith('#') ? targetId.slice(1) : targetId).toLowerCase();
  const resolvedId = SECTION_ID_ALIASES[cleanId] || cleanId;

  if (resolvedId === 'hero' || resolvedId === 'home' || !resolvedId) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    try {
      history.pushState(null, '', '#hero');
    } catch (_) {}
    return;
  }

  const targetEl =
    document.getElementById(resolvedId) ||
    document.querySelector(`[id="${resolvedId}"]`) ||
    document.querySelector(targetId);

  if (!targetEl) {
    console.warn(`[navigation] Target element "${targetId}" (resolved: "${resolvedId}") not found.`);
    return;
  }

  let cumulativeTop = 0;
  let curr = targetEl.previousElementSibling;
  while (curr) {
    cumulativeTop += curr.offsetHeight || 0;
    curr = curr.previousElementSibling;
  }

  if (targetEl.parentElement && targetEl.parentElement.offsetTop) {
    cumulativeTop += targetEl.parentElement.offsetTop;
  }

  if (cumulativeTop === 0 && targetEl.offsetTop) {
    cumulativeTop = targetEl.offsetTop;
  }

  window.scrollTo({
    top: Math.max(0, cumulativeTop),
    behavior: 'smooth',
  });

  try {
    history.pushState(null, '', '#' + resolvedId);
  } catch (_) {}
}

/**
 * Redirects from any Service card, Item CTA, Header, or Venue page straight to #contact
 * while pre-filling the inquiry Subject & Message with context.
 */
export function navigateToContact(navigate, location, prefill = null) {
  if (prefill) {
    setContactPrefill(prefill);
  }

  if (location?.pathname === '/') {
    scrollToSection('#contact');
  } else {
    navigate('/#contact');
  }
}
