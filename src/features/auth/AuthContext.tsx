/**
 * AuthContext.tsx
 * Gestisce l'autenticazione dell'applicazione usando React Context.
 * Fornisce stato utente, funzioni di login/logout e persistenza in localStorage.
 */
import { createContext, useContext, useState } from 'react';
import type { User, AuthContextType } from '../../types';

// Crea il context per l'autenticazione (inizialmente null)
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * AuthProvider - Componente provider che wrappa l'app.
 * Gestisce lo stato dell'utente e le operazioni di autenticazione.
 * @param children - Componenti figli che avranno accesso al context
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Inizializza lo stato utente dal localStorage (persistenza sessione)
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  /**
   * Funzione di login - Valida le credenziali e salva l'utente.
   * @param email - Email dell'utente
   * @param password - Password (minimo 6 caratteri)
   * @throws Error se le credenziali non sono valide
   */
  const login = async (email: string, password: string) => {
    // Validazione mock (in produzione: chiamata API)
    if (email && password.length >= 6) {
      const user = { id: '1', email, name: email.split('@')[0] };
      setUser(user);
      // Persiste l'utente in localStorage per mantenere la sessione
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  /**
   * Funzione di logout - Rimuove l'utente dallo stato e dal localStorage.
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Fornisce il context a tutti i componenti figli
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user  // true se user esiste
    }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizzato per accedere al context di autenticazione.
 * @returns AuthContextType con user, login, logout, isAuthenticated
 * @throws Error se usato fuori da AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};