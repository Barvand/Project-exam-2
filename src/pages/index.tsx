import VenuesPage from "./Venues";
import { useAuth } from "../utils/useAuth";
import WelcomeSection from "../components/index/WelcomeSection";
import ButtonToTop from "../features/buttonToTop";

/**
 * The homepage of the Holidaze application, displaying a welcome section, venues, and a scroll-to-top button.
 *
 * @component
 * @description
 * - Displays a `WelcomeSection` that changes based on authentication status.
 * - Renders the `VenuesPage` to showcase available venues.
 * - Includes a `ButtonToTop` feature to allow users to quickly scroll back to the top.
 *
 * @returns {JSX.Element} The main index page layout.
 *
 */

function IndexPage() {
  const { isLoggedIn } = useAuth(); // Fix: Added parentheses to useAuth()

  return (
    <>
      <WelcomeSection isLoggedIn={isLoggedIn} />
      <VenuesPage />
      <ButtonToTop />
    </>
  );
}

export default IndexPage;
