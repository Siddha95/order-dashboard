/**
 * Login.tsx
 * Componente per la pagina di login.
 * Gestisce il form di autenticazione con validazione e feedback errori.
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const Login = () => {
  // Stati locali per i campi del form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Hook per autenticazione e navigazione
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Gestisce il submit del form di login.
   * Tenta il login e reindirizza agli ordini se ha successo.
   * @param e - Evento form submit
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene il refresh della pagina
    try {
      await login(email, password);
      navigate('/orders'); // Redirect dopo login riuscito
    } catch (err) {
      setError('Invalid credentials'); // Mostra errore all'utente
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        {/* Messaggio di errore condizionale */}
        {error && <p className="error">{error}</p>}
        
        {/* Campo email */}
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        
        {/* Campo password */}
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 chars)"
        />
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};