import { useState, useEffect, createContext, useContext } from "react";

// Create a context to share the login state globally
const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Check for user info from localStorage (or wherever you store it)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const profile = JSON.parse(localStorage.getItem("profile") || "{}");
    if (token && profile) {
      setIsLoggedIn(true);
      setUserProfile(profile);
    }
  }, []);

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userProfile, setUserProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
