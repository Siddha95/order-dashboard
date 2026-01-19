// features/auth/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Login } from './Login';
import { AuthProvider } from './AuthContext';
import { describe, it, expect } from 'vitest';



const MockedLogin = () => (
  <BrowserRouter>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </BrowserRouter>
);

describe('Login', () => {
  it('shows error on invalid credentials', async () => {
    render(<MockedLogin />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@test.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '123' }
    });
    fireEvent.click(screen.getByText('Login'));
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
});