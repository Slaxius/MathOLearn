import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { errorAlert } from "./Toastify.jsx";

const ProtectedRoute = ({ username, redirectPath = "/signin", children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("currentUserId");

    if (!storedUsername || !storedUserId) {
      errorAlert("You need to sign in to access this page!");
      navigate(redirectPath, { replace: true });
    }
  }, [username, navigate, redirectPath]);

  return username ? (children ? children : <Outlet />) : null;
};

export default ProtectedRoute;