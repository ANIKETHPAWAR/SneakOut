import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a loader
  return user ? <Navigate to="/dashboard" /> : children;
};
