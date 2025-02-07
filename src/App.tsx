import Navigation from "./components/navigation/navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile.tsx";
import { AuthProvider } from "./authentication/AuthProvider.tsx";
import VenuesPage from "./pages/Venues";
import VenuePage from "./pages/OneVenue.tsx";
import IndexPage from "./pages/index.tsx";
import SearchResultsPage from "./pages/search.tsx";
import BookingsPage from "./pages/bookings.tsx";
import CreateVenuePage from "./pages/createVenue.tsx";

function App(): JSX.Element {
  return (
    <Router>
      <AuthProvider>
        {/* Sidebar */}
        <Navigation />
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="venues/:id" element={<VenuePage />} />
            <Route path="profiles/:username" element={<ProfilePage />} />
            <Route
              path="profiles/:username/bookings"
              element={<BookingsPage />}
            />
            <Route
              path="profiles/:username/create-venue"
              element={<CreateVenuePage />}
            />
            <Route path="/search" element={<SearchResultsPage />} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
