// features/orders/OrderList.tsx
import { Link } from 'react-router-dom';
import { useOrders } from './hooks/useOrders';
import { useAuth } from '../auth/AuthContext';

export const OrderList = () => {
  const { data: orders, isLoading, error } = useOrders();
  const { logout } = useAuth();

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <header>
        <h1>Orders Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>
      
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
          {orders?.map(order => (
            <tr key={order.id}>
              <td>{order.customer}</td>
              <td>${order.amount}</td>
              <td>{order.status}</td>
              <td>{order.date}</td>
              <td>
                <Link to={`/orders/${order.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;