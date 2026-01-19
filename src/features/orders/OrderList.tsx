/**
 * OrderList.tsx
 * Componente per visualizzare la lista di tutti gli ordini.
 * Mostra una tabella con cliente, importo, stato, data e azioni.
 */
import { Link } from 'react-router-dom';
import { useOrders } from './hooks/useOrders';
import { useAuth } from '../auth/AuthContext';

export const OrderList = () => {
  // Fetch degli ordini con React Query (gestisce cache, loading, errori)
  const { data: orders, isLoading, error } = useOrders();
  const { logout } = useAuth();

  // Stati di loading ed errore
  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Header con titolo e logout */}
      <header>
        <h1>Orders Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>
      
      {/* Tabella ordini */}
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Mappa ogni ordine in una riga della tabella */}
          {orders?.map(order => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>${order.amount}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td>
                {/* Link alla pagina di dettaglio ordine */}
                <Link to={`/orders/${order.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Export default per lazy loading
export default OrderList;