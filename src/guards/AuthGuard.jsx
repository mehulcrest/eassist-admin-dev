import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../constants/auth";

const AuthGuard = ({ requireAuth = true, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      navigate("/login", { replace: true, state: { from: location } });
      return;
    }

    if (!requireAuth && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, location, navigate, requireAuth]);

  if ((requireAuth && !isAuthenticated) || (!requireAuth && isAuthenticated)) {
    return null;
  }

  return children;
};

export default AuthGuard;
