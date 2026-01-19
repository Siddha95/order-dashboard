// services/api.ts
export interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

const mockOrders: Order[] = [
  { id: '1', customer: 'Acme Corp', amount: 1200, status: 'completed', date: '2025-01-15' },
  { id: '2', customer: 'Tech Inc', amount: 850, status: 'pending', date: '2025-01-16' },
  // ... altri
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getOrders: async (): Promise<Order[]> => {
    await delay(800);
    if (Math.random() > 0.9) throw new Error('Network error');
    return mockOrders;
  },
  
  getOrderById: async (id: string): Promise<Order> => {
    await delay(500);
    const order = mockOrders.find(o => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },
};