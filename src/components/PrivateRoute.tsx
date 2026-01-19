/**
 * PrivateRoute.tsx
 * Componente wrapper per proteggere le rotte che richiedono autenticazione.
 * Reindirizza al login se l'utente non è autenticato.
 */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

/**
 * PrivateRoute - Protegge i componenti figli richiedendo autenticazione.
 * @param children - Componenti da renderizzare se autenticato
 * @returns I children se autenticato, altrimenti redirect a /login
 */
export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  // Se autenticato mostra i children, altrimenti redirect al login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};