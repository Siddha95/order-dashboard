// features/orders/OrderList.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { OrderList } from './OrderList';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

const MockedOrderList = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <OrderList />
    </BrowserRouter>
  </QueryClientProvider>
);

describe('OrderList', () => {
  it('renders loading state', () => {
    render(<MockedOrderList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});