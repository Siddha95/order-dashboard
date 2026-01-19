/**
 * types/index.ts
 * Definizioni TypeScript per i tipi globali dell'applicazione.
 */

/**
 * User - Rappresenta un utente autenticato.
 */
export interface User {
  id: string       // ID univoco dell'utente
  name: string     // Nome visualizzato
  email: string    // Email dell'utente
}

/**
 * AuthContextType - Tipo per il context di autenticazione.
 * Definisce lo stato e le azioni disponibili per l'auth.
 */
export interface AuthContextType {
  user: User | null                                    // Utente corrente (null se non loggato)
  login: (email: string, password: string) => Promise<void>  // Funzione di login
  logout: () => void                                   // Funzione di logout
  isAuthenticated: boolean                             // Flag: true se utente loggato
}