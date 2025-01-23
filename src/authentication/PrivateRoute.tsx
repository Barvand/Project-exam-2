import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

interface PrivateRouteProps {
  redirectTo: string; // Where to redirect if not logged in
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo }) => {
  const { isLoggedIn } = useContext(AuthContext);

  // If not logged in, redirect to login page; otherwise, show the route's content
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
