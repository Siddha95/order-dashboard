/**
 * OrderDetail.tsx
 * Componente per visualizzare i dettagli di un singolo ordine.
 * Mostra informazioni complete: cliente, importo, stato (con colore) e data.
 */
import { useParams, Link } from 'react-router-dom';
import { useOrder } from './hooks/useOrders';
import { useAuth } from '../auth/AuthContext';

export const OrderDetail = () => {
  // Estrae l'ID ordine dall'URL (es. /orders/123 -> id = "123")
  const { id } = useParams<{ id: string }>();
  
  // Fetch del singolo ordine tramite React Query
  const { data: order, isLoading, error } = useOrder(id!);
  const { logout } = useAuth();

  // Gestione stati di loading, errore e ordine non trovato
  if (isLoading) return <div>Loading order...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!order) return <div>Order not found</div>;

  // Mappa colori per ogni stato dell'ordine
  const statusColor = {
    pending: '#f59e0b',    // Arancione - in attesa
    completed: '#10b981',  // Verde - completato
    cancelled: '#ef4444',  // Rosso - cancellato
  };

  return (
    <div>
      {/* Header con navigazione e logout */}
      <header>
        <h1>Order Details</h1>
        <div>
          <Link to="/orders">← Back to Orders</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      {/* Card dettagli ordine */}
      <div className="order-detail">
        <div className="order-info">
          <h2>Order #{order.id}</h2>
          
          {/* Riga: Cliente */}
          <div className="detail-row">
            <span className="label">Customer:</span>
            <span className="value">{order.customer}</span>
          </div>
          
          {/* Riga: Importo */}
          <div className="detail-row">
            <span className="label">Amount:</span>
            <span className="value">${order.amount}</span>
          </div>
          
          {/* Riga: Stato con colore dinamico */}
          <div className="detail-row">
            <span className="label">Status:</span>
            <span 
              className="value status-badge"
              style={{ color: statusColor[order.status] }}
            >
              {order.status}
            </span>
          </div>
          
          {/* Riga: Data */}
          <div className="detail-row">
            <span className="label">Date:</span>
            <span className="value">{order.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export default per lazy loading
export default OrderDetail;
