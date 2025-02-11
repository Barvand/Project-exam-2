import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

// Define the UserProfile type
interface UserProfile {
  name: string;
  email: string;
  // Add other fields as necessary
}

// Create a context to share the login state globally
const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  // Check for user info from localStorage (or wherever you store it)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem("profile");

    if (token && profile) {
      try {
        const parsedProfile = JSON.parse(profile);
        setIsLoggedIn(true);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error("Failed to parse user profile", error);
      }
    }
  }, []);

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setIsLoggedIn(false);
    setUserProfile(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userProfile, setUserProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
