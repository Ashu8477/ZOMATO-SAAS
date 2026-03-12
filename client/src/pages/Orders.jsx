import { useEffect } from 'react';
import { useOrderStore } from '../store/order.store';
import { useNavigate } from 'react-router-dom';
import { theme } from '../utils/constants';

function Orders() {
  const { orders, fetchOrders } = useOrderStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Orders</h1>

      {orders.map((order) => (
        <div key={order._id} style={styles.card}>
          <div>
            <h3>Order #{order._id.slice(-6)}</h3>
            <p>Status: {order.orderStatus}</p>
            <p>Total: ₹ {order.totalAmount}</p>
          </div>

          <button
            style={styles.btn}
            onClick={() => navigate(`/track/${order._id}`)}
          >
            Track
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: theme.spacing.page,
    background: theme.colors.bg,
    minHeight: '100vh',
    color: theme.colors.text,
  },
  title: {
    fontSize: theme.font.title,
  },
  card: {
    background: theme.colors.card,
    padding: 20,
    marginTop: 20,
    borderRadius: theme.radius.card,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    background: theme.colors.primary,
    border: 'none',
    padding: '10px 20px',
    color: '#fff',
    borderRadius: theme.radius.btn,
    cursor: 'pointer',
  },
};

export default Orders;
