import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ username, redirectPath = "/signin", children }) => {
  if (!username) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
