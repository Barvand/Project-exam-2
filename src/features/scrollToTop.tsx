import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * A function that makes sure that the page starts from the top when navigating between routes.
 *
 * @component
 * @description
 * - Uses `useLocation` from `react-router-dom` to detect route changes.
 * - Automatically scrolls the window to the top whenever the pathname changes.
 * - Does not render any UI elements
 *
 * @example
 * ```tsx
 * <ScrollToTop />
 * ```
 *
 * @returns {null} This component does not render anything.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
