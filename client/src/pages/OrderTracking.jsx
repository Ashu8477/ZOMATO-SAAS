import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrderStore } from '../store/order.store';

const steps = [
  'pending',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
];

const etaMap = {
  pending: 30,
  confirmed: 25,
  preparing: 20,
  out_for_delivery: 10,
  delivered: 0,
};
const riderMessage = {
  pending: 'Restaurant received your order',
  confirmed: 'Chef started preparing your food',
  preparing: 'Food is getting packed',
  out_for_delivery: 'Delivery partner is on the way 🚴',
  delivered: 'Enjoy your meal ❤️',
};

function OrderTracking() {
  const { id } = useParams();
  const { currentOrder, trackOrder } = useOrderStore();

  useEffect(() => {
    trackOrder(id);

    const interval = setInterval(() => {
      trackOrder(id);
    }, 5000); // every 5 sec

    return () => clearInterval(interval);
  }, []);

  if (!currentOrder) return <h1>Loading...</h1>;

  const currentIndex = steps.indexOf(currentOrder.orderStatus);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div
      style={{
        mapCard: {
          background: '#111',
          padding: 20,
          marginTop: 20,
          borderRadius: 10,
        },
        fakeMap: {
          height: 200,
          background:
            'linear-gradient(45deg, #222 25%, transparent 25%), linear-gradient(-45deg, #222 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #222 75%), linear-gradient(-45deg, transparent 75%, #222 75%)',
          backgroundSize: '40px 40px',
          position: 'relative',
          overflow: 'hidden',
        },
        rider: {
          width: 20,
          height: 20,
          background: '#00ff88',
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: '0%',
          animation: 'move 6s linear infinite',
        },
        padding: 40,
      }}
    >
      <h1>Order Tracking</h1>
      <div style={styles.mapCard}>
        <div style={styles.fakeMap}>
          <div style={styles.rider}></div>
        </div>
      </div>
      <h2>ETA: {etaMap[currentOrder.orderStatus]} mins</h2>
      <p style={{ color: '#00ff88' }}>
        {riderMessage[currentOrder.orderStatus]}
      </p>

      {/* Progress */}
      <div style={styles.barContainer}>
        <div style={{ ...styles.progress, width: `${progress}%` }} />
      </div>

      {/* Steps */}
      <div style={styles.timeline}>
        {steps.map((step, index) => {
          const isActive = index <= currentIndex;

          return (
            <div key={step} style={styles.stepContainer}>
              <div
                style={{
                  ...styles.circle,
                  background: isActive ? '#00ff88' : '#333',
                  boxShadow: isActive ? '0 0 10px #00ff88' : 'none',
                }}
              />
              <p style={{ color: isActive ? '#00ff88' : '#777' }}>{step}</p>
            </div>
          );
        })}
      </div>

      {/* ORDER DETAILS */}
      <div style={styles.card}>
        <h2>Order Items</h2>

        {currentOrder.items.map((item) => (
          <div key={item.food} style={styles.itemRow}>
            <span>{item.name}</span>
            <span>
              ₹ {item.price} × {item.quantity}
            </span>
            <span>₹ {item.total}</span>
          </div>
        ))}

        <hr />

        <h3>Total: ₹ {currentOrder.totalAmount}</h3>
      </div>

      {/* Address */}
      <div style={styles.card}>
        <h3>Delivery Address</h3>
        <p>{currentOrder.deliveryAddress}</p>
      </div>

      <h3>Payment: {currentOrder.paymentStatus}</h3>
    </div>
  );
}

const styles = {
  barContainer: {
    width: '100%',
    height: 6,
    background: '#222',
    borderRadius: 10,
    marginTop: 30,
  },
  progress: {
    height: 6,
    background: '#00ff88',
    borderRadius: 10,
    transition: '0.6s',
  },
  timeline: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  stepContainer: {
    textAlign: 'center',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
  card: {
    background: '#111',
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    color: '#fff',
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 10,
  },
};

export default OrderTracking;
