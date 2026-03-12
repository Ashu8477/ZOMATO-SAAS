import { useEffect } from 'react';
import { useCartStore } from '../store/cart.store';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { items, totalAmount, fetchCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div style={styles.wrapper}>
      <h1>Your Cart</h1>

      <div style={styles.list}>
        {items.map((item) => (
          <CartItem key={item.food._id} item={item} />
        ))}
      </div>

      <div style={styles.footer}>
        <h2>Total: ₹ {totalAmount}</h2>

        <button style={styles.btn} onClick={() => navigate('/checkout')}>
          Checkout
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 700,
    margin: '0 auto',
    color: '#fff',
  },
  list: {
    marginTop: 20,
  },
  footer: {
    marginTop: 20,
    background: '#111',
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    padding: '12px 20px',
    background: 'red',
    border: 'none',
    color: '#fff',
    borderRadius: 8,
  },
};

export default Cart;
