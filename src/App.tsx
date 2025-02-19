import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/login.tsx";
import ProfilePage from "./pages/Profile.tsx";
import { AuthProvider } from "./utils/AuthProvider.tsx";
import VenuesPage from "./pages/Venues";
import VenuePage from "./pages/OneVenue.tsx";
import IndexPage from "./pages/index.tsx";
import SearchResultsPage from "./pages/search.tsx";
import BookingsPage from "./pages/bookings.tsx";
import VenueManagerPage from "./pages/venueManager.tsx";
import Footer from "./components/footer/Footer.tsx";
import Navigation from "./components/navigation/navigation";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import UnAuthorized from "./pages/Unauthorized.tsx";
import NotFoundPage from "./pages/404.tsx";
import ProtectedLoginRoute from "./utils/ProtectedLoginRoute.tsx";
import ScrollToTop from "./features/scrollToTop.tsx";

function App(): JSX.Element {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Navigation />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<IndexPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute loggedInOnly={true} />}>
              <Route path="profiles/:username" element={<ProfilePage />} />
              <Route
                path="profiles/:username/bookings"
                element={<BookingsPage />}
              />
            </Route>

            <Route element={<ProtectedLoginRoute />}>
              <Route
                path="profiles/:username/venueManager"
                element={<VenueManagerPage />}
              />
            </Route>
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="venues/:id" element={<VenuePage />} />

            {/* Unauthorized Access */}
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
