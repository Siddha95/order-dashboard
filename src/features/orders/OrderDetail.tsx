// features/orders/OrderDetail.tsx
import { useParams, Link } from 'react-router-dom';
import { useOrder } from './hooks/useOrders';
import { useAuth } from '../auth/AuthContext';

export const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: order, isLoading, error } = useOrder(id!);
  const { logout } = useAuth();

  if (isLoading) return <div>Loading order...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!order) return <div>Order not found</div>;

  const statusColor = {
    pending: '#f59e0b',
    completed: '#10b981',
    cancelled: '#ef4444',
  };

  return (
    <div>
      <header>
        <h1>Order Details</h1>
        <div>
          <Link to="/orders">← Back to Orders</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="order-detail">
        <div className="order-info">
          <h2>Order #{order.id}</h2>
          
          <div className="detail-row">
            <span className="label">Customer:</span>
            <span className="value">{order.customer}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Amount:</span>
            <span className="value">${order.amount}</span>
          </div>
          
          <div className="detail-row">
            <span className="label">Status:</span>
            <span 
              className="value status-badge"
              style={{ color: statusColor[order.status] }}
            >
              {order.status}
            </span>
          </div>
          
          <div className="detail-row">
            <span className="label">Date:</span>
            <span className="value">{order.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
