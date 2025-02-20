import { useContext } from "react";
import AuthContext from "./AuthProvider";

/**
 * Custom hook to access authentication state and actions.
 *
 * @function
 * @returns {Object} Authentication context values including login state, user profile, and logout function.
 *
 * @example
 * ```tsx
 * const { isLoggedIn, userProfile, logout } = useAuth();
 * ```
 */
export function useAuth() {
  return useContext(AuthContext);
}
