// AuthProvider.tsx
import { useState, useEffect, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

// Define the UserProfile type
interface UserProfile {
  name: string;
  email: string;
}

// Create a context for authentication
const AuthContext = createContext<any>(null);
export default AuthContext; // Export only the context

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides authentication state and methods to its children.
 *
 * @component
 * @param {AuthProviderProps} props - Component properties.
 * @param {ReactNode} props.children - The child components that need access to authentication state.
 *
 * @returns {JSX.Element} A context provider that wraps the application.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem("profile");
    return token && profile ? true : false;
  });

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const profile = localStorage.getItem("profile");

    if (token && profile) {
      try {
        const parsedProfile = JSON.parse(profile);
        if (
          typeof parsedProfile.name !== "string" ||
          typeof parsedProfile.email !== "string"
        ) {
          throw new Error("Invalid profile structure");
        }
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error("Invalid profile in localStorage:", error);
        localStorage.removeItem("profile");
      }
    }

    setIsAuthLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");

    // Navigate first before triggering re-renders
    navigate("/");

    // Delay state reset slightly to allow navigation to complete
    setTimeout(() => {
      setIsLoggedIn(false);
      setUserProfile(null);
    }, 100);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
        setUserProfile,
        logout,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
