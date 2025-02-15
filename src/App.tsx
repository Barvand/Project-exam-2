import Navigation from "./components/navigation/navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/login.tsx";
import ProfilePage from "./pages/Profile.tsx";
import { AuthProvider } from "./authentication/AuthProvider.tsx";
import VenuesPage from "./pages/Venues";
import VenuePage from "./pages/OneVenue.tsx";
import IndexPage from "./pages/index.tsx";
import SearchResultsPage from "./pages/search.tsx";
import BookingsPage from "./pages/bookings.tsx";
import VenueManagerPage from "./pages/venueManager.tsx";
import Footer from "./components/footer/Footer.tsx";
import ProtectedRoute from "./authentication/ProtectedRoute.tsx";
import UnAuthorized from "./pages/Unauthorized.tsx";
import { useEffect, useState } from "react";

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if a token or user data exists in localStorage
    const token = localStorage.getItem("authToken"); // Adjust according to your app's storage method
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />

            {/* Protected routes only available to logged-in users */}
            <Route element={<ProtectedRoute loggedInOnly={isLoggedIn} />}>
              <Route path="profiles/:username" element={<ProfilePage />} />
              <Route
                path="profiles/:username/bookings"
                element={<BookingsPage />}
              />
              <Route
                path="profiles/:username/venueManager"
                element={<VenueManagerPage />}
              />
            </Route>

            {/* Public routes */}
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="venues/:id" element={<VenuePage />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
