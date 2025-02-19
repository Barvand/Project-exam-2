import VenuesPage from "./Venues";
import { useAuth } from "../utils/AuthProvider";
import WelcomeSection from "../components/index/WelcomeSection";
import ButtonToTop from "../features/buttonToTop";

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
