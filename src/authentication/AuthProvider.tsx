import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<{ isLoggedIn: boolean }>({
  isLoggedIn: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
   const token = localStorage.getItem("accessToken");
   if (token) {
     setIsLoggedIn(true); // User is logged in
   } else {
     setIsLoggedIn(false); // User is not logged in
   }
   console.log("Token:", token , isLoggedIn); // Debugging token
 }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
