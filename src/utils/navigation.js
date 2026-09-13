/**
 * Navigation utility for sticky stacked-section architecture.
 *
 * In a sticky-stacked layout (where sections have `position: sticky; top: 0`),
 * native `element.scrollIntoView()` fails when scrolling backwards from bottom
 * sections because preceding sticky sections already have `boundingClientRect.top === 0`
 * or negative values (tucked behind higher z-index layers).
 *
 * This helper calculates the true cumulative document scroll offset
 * of the target section by summing preceding siblings' layout heights.
 */

const SECTION_ID_ALIASES = {
  'home': 'hero',
  'hero': 'hero',
  'about': 'about',
  'about-us': 'about',
  'services': 'services',
  'our-services': 'services',
  'venues': 'services',
  'tournaments': 'services',
  'coaching': 'services',
  'work': 'work',
  'our-work': 'work',
  'trusted-by': 'partners',
  'partners': 'partners',
  'testimonials': 'testimonials',
  'contact': 'contact',
  'contact-us': 'contact',
  'book': 'contact',
  'footer': 'footer',
};

export function scrollToSection(targetId) {
  if (!targetId) return;

  const cleanId = (targetId.startsWith('#') ? targetId.slice(1) : targetId).toLowerCase();
  const resolvedId = SECTION_ID_ALIASES[cleanId] || cleanId;

  // Handle Home / Top of page
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

  // Locate the target section in the DOM
  const targetEl =
    document.getElementById(resolvedId) ||
    document.querySelector(`[id="${resolvedId}"]`) ||
    document.querySelector(targetId);

  if (!targetEl) {
    console.warn(`[navigation] Target element "${targetId}" (resolved: "${resolvedId}") not found.`);
    return;
  }

  // Calculate accumulated offset of all preceding siblings in layout flow
  let cumulativeTop = 0;
  let curr = targetEl.previousElementSibling;
  while (curr) {
    cumulativeTop += (curr.offsetHeight || 0);
    curr = curr.previousElementSibling;
  }

  // Account for parent offset if container has offset from document top
  if (targetEl.parentElement && targetEl.parentElement.offsetTop) {
    cumulativeTop += targetEl.parentElement.offsetTop;
  }

  // Fallback if offsetTop exists
  if (cumulativeTop === 0 && targetEl.offsetTop) {
    cumulativeTop = targetEl.offsetTop;
  }

  // Smooth scroll to the target position
  window.scrollTo({
    top: Math.max(0, cumulativeTop),
    behavior: 'smooth',
  });

  try {
    history.pushState(null, '', '#' + resolvedId);
  } catch (_) {}
}
