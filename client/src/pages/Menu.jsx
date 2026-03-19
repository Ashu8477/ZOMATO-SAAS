import { useEffect, useState } from 'react';
import { getMenuApi } from '../api/food.api';
import FoodCard from '../components/FoodCard';
import { theme } from '../utils/constants';

function Menu() {
  const [menu, setMenu] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getMenuApi();
        setMenu(res.data.data);
        if (res.data.data.length) {
          setActiveCat(res.data.data[0].category._id);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div style={styles.loaderWrapper}>
        <div style={styles.loader}></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ Our Menu</h1>

      {/* CATEGORY TABS */}
      <div style={styles.tabs}>
        {menu.map((cat) => (
          <button
            key={cat.category._id}
            onClick={() => setActiveCat(cat.category._id)}
            style={
              activeCat === cat.category._id ? styles.activeTab : styles.tab
            }
          >
            {cat.category.name}
          </button>
        ))}
      </div>

      {/* FOOD GRID */}
      {menu
        .filter((cat) => cat.category._id === activeCat)
        .map((cat) => (
          <div key={cat.category._id} style={styles.grid}>
            {cat.foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        ))}
    </div>
  );
}

const styles = {
  container: {
    padding: '30px 5%',
    background: '#0f0f0f',
    minHeight: '100vh',
    color: '#fff',
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    textAlign: 'center',
  },
  tabs: {
    display: 'flex',
    gap: 12,
    overflowX: 'auto',
    marginBottom: 30,
    paddingBottom: 10,
  },
  tab: {
    padding: '10px 18px',
    background: '#1c1c1c',
    border: 'none',
    borderRadius: 30,
    color: '#aaa',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  activeTab: {
    padding: '10px 18px',
    background: '#ff4d4d',
    border: 'none',
    borderRadius: 30,
    color: '#fff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))',
    gap: 25,
  },
  loaderWrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0f0f0f',
  },
  loader: {
    width: 40,
    height: 40,
    border: '4px solid #333',
    borderTop: '4px solid #ff4d4d',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default Menu;
