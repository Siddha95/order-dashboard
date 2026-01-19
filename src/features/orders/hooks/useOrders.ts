// features/orders/hooks/useOrders.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: api.getOrders,
    staleTime: 5 * 60 * 1000, // 5 minuti
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => api.getOrderById(id),
    enabled: !!id,
  });
};