import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
  redirectPath: string;
}

export const ProtectedRoute = ({ redirectPath }: ProtectedRouteProps) => {
  const token = Cookies.get("token");
  if (!token) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};
