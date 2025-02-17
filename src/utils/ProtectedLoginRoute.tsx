import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../features/loading";

function ProtectedLoginRoute() {
  const { userProfile, isAuthLoading } = useAuth();

  const { username } = useParams();

  if (isAuthLoading) {
    return <Loading />;
  }

  if (!userProfile || !username) {
    return <Navigate to="/notFoundPage" replace />;
  }

  const normalizedUserName = username.toLowerCase();
  const normalizedProfileName = userProfile.name.toLowerCase();

  if (normalizedUserName !== normalizedProfileName) {
    return <Navigate to="/notFoundPage" replace />;
  }

  return <Outlet />;
}

export default ProtectedLoginRoute;
