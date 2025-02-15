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
import NotFoundPage from "./pages/404.tsx";

function App(): JSX.Element {
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
            <Route element={<ProtectedRoute loggedInOnly={true} />}>
              <Route path="profiles/:username" element={<ProfilePage />} />
              <Route
                path="profiles/:username/bookings"
                element={<BookingsPage />}
              />
            </Route>

            {/* Public routes */}
            <Route
              path="profiles/:username/venueManager"
              element={<VenueManagerPage />}
            />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="venues/:id" element={<VenuePage />} />
            <Route path="/unauthorized" element={<UnAuthorized />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
