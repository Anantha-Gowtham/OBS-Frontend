import { useEffect } from 'react';

/**
 * Adds fade-up animation class to elements when scrolled into view.
 * Usage: add data-reveal or data-reveal="delay-2" attribute to any element.
 */
export default function useScrollReveal(options = {}) {
  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // skip attaching animations
    }
    const selector = '[data-reveal]';
    const nodes = Array.from(document.querySelectorAll(selector));
    if (!nodes.length) return;

    const {
      root = null,
      rootMargin = '0px 0px -10% 0px',
      threshold = 0.1,
      once = true
    } = options;

    const onIntersect = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-reveal');
          const delayClass = delay && delay !== '' ? delay : '';
          el.classList.add('fade-up');
          if (delayClass) el.classList.add(delayClass);
          if (once) observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold });
    nodes.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [options]);
}
