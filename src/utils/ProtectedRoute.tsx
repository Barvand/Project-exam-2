import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

interface ProtectedRouteProps {
  loggedInOnly: boolean;
}

export default function ProtectedRoute({ loggedInOnly }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();

  // If the user is not logged in and the route requires it, redirect to unauthorized page
  if (loggedInOnly && !isLoggedIn) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Allow rendering the child routes if the conditions pass
}
