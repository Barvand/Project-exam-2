import VenuesPage from "./Venues";
import { useAuth } from "../utils/AuthProvider";
import WelcomeSection from "../components/index/WelcomeSection";

function IndexPage() {
  const { isLoggedIn } = useAuth(); // Fix: Added parentheses to useAuth()

  return (
    <>
    <WelcomeSection isLoggedIn={isLoggedIn}/>
      <VenuesPage />
    </>
  );
}

export default IndexPage;
