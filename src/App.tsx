// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './features/auth/AuthContext';
import { Login } from './features/auth/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { lazy, Suspense } from 'react';

const queryClient = new QueryClient();

// Lazy loading per performance
const OrderListLazy = lazy(() => import('./features/orders/OrderList'));
const OrderDetailLazy = lazy(() => import('./features/orders/OrderDetail'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
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
              <Route path="/" element={<Navigate to="/orders" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;