// components/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};