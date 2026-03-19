import { useCartStore } from '../store/cart.store';
import toast from 'react-hot-toast';
import { useState } from 'react';

function FoodCard({ food }) {
  const { addItem } = useCartStore();
  const [hover, setHover] = useState(false);

  const handleAdd = () => {
    addItem({ foodId: food._id, quantity: 1 });
    toast.success('Added to cart');
  };

  return (
    <div
      style={{
        ...styles.card,
        transform: hover ? 'translateY(-6px)' : 'none',
        boxShadow: hover
          ? '0 18px 40px rgba(0,0,0,0.6)'
          : '0 6px 16px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* IMAGE */}
      <div style={styles.imageWrapper}>
        <img
          src={food.image}
          alt={food.name}
          style={{
            ...styles.image,
            transform: hover ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* VEG BADGE READY */}
        {food.isVeg && <div style={styles.veg}>VEG</div>}
      </div>

      {/* INFO */}
      <div style={styles.info}>
        <h3 style={styles.name}>{food.name}</h3>

        {food.description && <p style={styles.desc}>{food.description}</p>}

        <div style={styles.bottom}>
          <span style={styles.price}>₹ {food.price}</span>

          <button style={styles.btn} onClick={handleAdd}>
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#161616',
    borderRadius: 16,
    overflow: 'hidden',
    transition: '0.25s',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },

  imageWrapper: {
    height: 170,
    overflow: 'hidden',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: '0.4s',
  },

  veg: {
    position: 'absolute',
    top: 10,
    left: 10,
    background: '#2ecc71',
    padding: '4px 8px',
    fontSize: 12,
    borderRadius: 6,
    fontWeight: 'bold',
  },

  info: {
    padding: 14,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },

  name: {
    fontSize: 18,
    fontWeight: 600,
  },

  desc: {
    fontSize: 13,
    color: '#aaa',
    lineHeight: 1.4,
    height: 36,
    overflow: 'hidden',
  },

  bottom: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  btn: {
    padding: '6px 14px',
    background: '#ff4d4d',
    border: 'none',
    borderRadius: 8,
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

export default FoodCard;
