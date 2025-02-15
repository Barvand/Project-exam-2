import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface ProtectedRouteProps {
  loggedInOnly: boolean;
}

const ProtectedRoute = ({ loggedInOnly }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();

  // If loggedInOnly is true and the user is not logged in, redirect to login page
  if (loggedInOnly && !isLoggedIn) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />; // Allow rendering the child routes if the user is logged in
};

export default ProtectedRoute;
