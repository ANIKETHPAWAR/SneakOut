import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }
      try {
        await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return null; // Or a loader/spinner

  return isAuthenticated ? children : <Navigate to="/signin" />;
};
