import { useState } from 'react';
import { useCartStore } from '../store/cart.store';
import { useOrderStore } from '../store/order.store';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { totalAmount } = useCartStore();
  const { checkout } = useOrderStore();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');

  const handleCheckout = async () => {
    const order = await checkout({ deliveryAddress: address });
    navigate(`/track/${order._id}`);
  };

  return (
    <div style={styles.wrapper}>
      <h1>Checkout</h1>

      <div style={styles.card}>
        <h2>Total: ₹ {totalAmount}</h2>

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.textarea}
        />

        <button style={styles.btn} onClick={handleCheckout}>
          Place Order
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    background: '#111',
    padding: 30,
    borderRadius: 10,
    width: 400,
    color: '#fff',
  },
  textarea: {
    width: '100%',
    height: 100,
    marginTop: 10,
  },
  btn: {
    marginTop: 15,
    width: '100%',
    padding: 12,
    background: 'red',
    border: 'none',
    color: '#fff',
  },
};

export default Checkout;
