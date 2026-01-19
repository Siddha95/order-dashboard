/**
 * api.ts
 * Servizio API per la gestione degli ordini.
 * Attualmente usa dati mock, in produzione sostituire con chiamate HTTP reali.
 */

/**
 * Interfaccia Order - Definisce la struttura di un ordine.
 */
export interface Order {
  id: string;
  customer: string;                              // Nome del cliente
  amount: number;                                // Importo in dollari
  status: 'pending' | 'completed' | 'cancelled'; // Stato dell'ordine
  date: string;                                  // Data in formato YYYY-MM-DD
}

/**
 * Dati mock per simulare un database.
 * In produzione: sostituire con chiamate API reali (fetch/axios).
 */
const mockOrders: Order[] = [
  { id: '1', customer: 'Acme Corp', amount: 1200, status: 'completed', date: '2025-01-15' },
  { id: '2', customer: 'Tech Inc', amount: 850, status: 'pending', date: '2025-01-16' },
  // Aggiungere altri ordini qui
];

/**
 * Utility per simulare latenza di rete.
 * @param ms - Millisecondi di delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Oggetto API con i metodi per interagire con gli ordini.
 */
export const api = {
  /**
   * Recupera tutti gli ordini.
   * @returns Promise<Order[]> - Lista di tutti gli ordini
   * @throws Error - Simula errore di rete (10% probabilità)
   */
  getOrders: async (): Promise<Order[]> => {
    await delay(800); // Simula latenza di rete
    if (Math.random() > 0.9) throw new Error('Network error');
    return mockOrders;
  },
  
  /**
   * Recupera un singolo ordine per ID.
   * @param id - ID dell'ordine da recuperare
   * @returns Promise<Order> - L'ordine richiesto
   * @throws Error - Se l'ordine non esiste
   */
  getOrderById: async (id: string): Promise<Order> => {
    await delay(500); // Simula latenza di rete
    const order = mockOrders.find(o => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },
};