/**
 * useOrders.ts
 * Custom hooks per il fetching degli ordini con React Query.
 * Gestisce caching, refetching automatico e stati di loading/errore.
 */
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../services/api';

/**
 * Hook per ottenere la lista di tutti gli ordini.
 * @returns Query result con data (Order[]), isLoading, error
 */
export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],           // Chiave univoca per la cache
    queryFn: api.getOrders,          // Funzione che esegue il fetch
    staleTime: 5 * 60 * 1000,        // I dati sono "freschi" per 5 minuti
  });
};

/**
 * Hook per ottenere un singolo ordine per ID.
 * @param id - ID dell'ordine da recuperare
 * @returns Query result con data (Order), isLoading, error
 */
export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['orders', id],        // Chiave include l'ID per cache specifica
    queryFn: () => api.getOrderById(id),
    enabled: !!id,                   // Esegue la query solo se id è valido
  });
};