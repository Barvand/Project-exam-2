import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  loggedInOnly: boolean;
}

export default function ProtectedRoute({ loggedInOnly }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();

  if (loggedInOnly && !isLoggedIn) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Allow rendering the child routes if the user is logged in
}
