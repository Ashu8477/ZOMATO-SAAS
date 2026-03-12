import { useCartStore } from '../store/cart.store';
import toast from 'react-hot-toast';
import { useState } from 'react';

function FoodCard({ food }) {
  const { addItem } = useCartStore();
  const [hover, setHover] = useState(false);

  const handleAdd = () => {
    addItem({ foodId: food._id, quantity: 1 });
    toast.success('Item added to cart');
  };

  return (
    <div
      style={{
        ...styles.card,
        transform: hover ? 'translateY(-8px) scale(1.02)' : 'none',
        boxShadow: hover ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={styles.imageWrapper}>
        <img
          src={food.image}
          style={{
            ...styles.image,
            transform: hover ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      </div>

      <h3>{food.name}</h3>
      <p>₹ {food.price}</p>

      <button style={styles.btn} onClick={handleAdd}>
        Add to cart
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: 240,
    background: '#111',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    transition: '0.3s',
    cursor: 'pointer',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
    transition: '0.4s',
  },
  btn: {
    marginTop: 10,
    width: '100%',
    padding: 10,
    background: '#ff2e2e',
    border: 'none',
    color: '#fff',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default FoodCard;
