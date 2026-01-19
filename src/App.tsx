/**
 * App.tsx
 * Componente principale dell'applicazione.
 * Configura i provider globali (QueryClient, Auth, Router) e definisce le rotte.
 */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './features/auth/AuthContext';
import { Login } from './features/auth/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { lazy, Suspense } from 'react';

// Inizializza il client per React Query (gestione stato server)
const queryClient = new QueryClient();

/**
 * Lazy loading dei componenti per ottimizzare il bundle iniziale.
 * I componenti vengono caricati solo quando l'utente naviga verso la rotta.
 */
const OrderListLazy = lazy(() => import('./features/orders/OrderList'));
const OrderDetailLazy = lazy(() => import('./features/orders/OrderDetail'));

function App() {
  return (
    // QueryClientProvider: fornisce il client React Query a tutta l'app
    <QueryClientProvider client={queryClient}>
      {/* AuthProvider: gestisce lo stato di autenticazione globale */}
      <AuthProvider>
        <BrowserRouter>
          {/* Suspense: mostra fallback durante il caricamento lazy dei componenti */}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Rotta pubblica: pagina di login */}
              <Route path="/login" element={<Login />} />
              
              {/* Rotte protette: richiedono autenticazione */}
              <Route path="/orders" element={
                <PrivateRoute>
                  <OrderListLazy />
                </PrivateRoute>
              } />
              <Route path="/orders/:id" element={
                <PrivateRoute>
                  <OrderDetailLazy />
                </PrivateRoute>
              } />
              
              {/* Redirect: la home reindirizza alla lista ordini */}
              <Route path="/" element={<Navigate to="/orders" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;