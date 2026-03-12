import { useCartStore } from '../store/cart.store';

function CartItem({ item }) {
  const { updateItem } = useCartStore();

  const inc = () => {
    updateItem({ foodId: item.food._id, quantity: item.quantity + 1 });
  };

  const dec = () => {
    if (item.quantity === 1) return;
    updateItem({ foodId: item.food._id, quantity: item.quantity - 1 });
  };

  return (
    <div style={styles.card}>
      <img src={item.image} style={styles.img} />

      <div style={{ flex: 1 }}>
        <h3>{item.name}</h3>
        <p>₹ {item.price}</p>

        <div style={styles.controls}>
          <button onClick={dec}>−</button>
          <span>{item.quantity}</span>
          <button onClick={inc}>+</button>
        </div>
      </div>

      <h3>₹ {item.total}</h3>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    background: '#111',
    color: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  img: { width: 80, height: 80, objectFit: 'cover', borderRadius: 10 },
  controls: { display: 'flex', gap: 10, marginTop: 5 },
};

export default CartItem;
