import Navigation from "./components/navigation/navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile.tsx";
import { AuthProvider } from "./authentication/authProvider";
import VenuesPage from "./pages/Venues";


function App(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <>
          <Navigation />
          <Routes>
            {/* <Route path="/" element={<IndexPage />} /> */}
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="venues" element={<VenuesPage />} />
            <Route path="profiles/:username" element={<ProfilePage />} />
          </Routes>
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
