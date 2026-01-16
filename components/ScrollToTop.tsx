
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global ScrollToTop component.
 * Automatically scrolls the window to the top on route transitions (pathname changes).
 * Respects anchor links: if a hash is present, it skips the scroll-to-top to allow the browser
 * or smooth-scroll behavior to target the specific section.
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable browser's default scroll restoration to ensure we always start at top
    // when navigating to a new page, regardless of history stack.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // Check for hash in useLocation() which represents the anchor part (e.g. #section).
    // We avoid window.location.hash because in HashRouter it contains the route path (e.g. #/page).
    // If no specific anchor is present, force scroll to top.
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
};
