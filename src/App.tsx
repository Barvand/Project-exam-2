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


function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="venues" element={<VenuesPage />} />
          <Route path="venues/:id" element={<VenuePage />} />
          <Route path="profiles/:username" element={<ProfilePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
