import { useAuth } from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Verify = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default Verify;
