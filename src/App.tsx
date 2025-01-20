import { API_BASE_URL } from "./api/api";
import Navigation from "./components/navigation/navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";

console.log(API_BASE_URL);

function App(): JSX.Element {
  return (
    <Router>
      <>
        <Navigation />
        <Routes>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
