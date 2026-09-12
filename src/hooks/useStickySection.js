import { useRef, useEffect } from 'react';

/**
 * useStickySection Hook
 * Measures the rendered height of a stacked section and sets `--section-height`
 * as an inline CSS custom property on the element.
 *
 * This enables the CSS rule:
 * `top: min(0px, calc(100dvh - var(--section-height, 100dvh)));`
 *
 * - When section height <= viewport height (e.g. desktop):
 *   top evaluates to 0px, sticking immediately at the top.
 * - When section height > viewport height (e.g. mobile with multiple cards):
 *   top evaluates to `-(height - viewport)`, meaning the entire section
 *   content scrolls through naturally first. The moment its bottom edge hits
 *   the bottom of the viewport (content is full over), it sticks and the next
 *   section overlays on top with its drop shadow.
 */
export function useStickySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const updateHeight = () => {
      const height = Math.round(el.offsetHeight || el.getBoundingClientRect().height);
      if (height > 0) {
        el.style.setProperty('--section-height', `${height}px`);
      }
    };

    updateHeight();
    const rafId = requestAnimationFrame(updateHeight);

    // Watch for size changes (content wrap, image loads, theme switch, breakpoint resize)
    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateHeight();
      });
      ro.observe(el);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateHeight);
    }

    window.addEventListener('resize', updateHeight);

    return () => {
      cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return sectionRef;
}
