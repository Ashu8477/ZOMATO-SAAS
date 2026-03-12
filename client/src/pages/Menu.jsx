import { useEffect, useState } from 'react';
import { getMenuApi } from '../api/food.api';
import FoodCard from '../components/FoodCard';
import { theme } from '../utils/constants';

function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const res = await getMenuApi();
      setMenu(res.data.data);
    };
    fetchMenu();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Explore Menu</h1>

      {menu.map((cat) => (
        <div key={cat.category._id} style={styles.section}>
          <h2 style={styles.category}>{cat.category.name}</h2>

          <div style={styles.grid}>
            {cat.foods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    background: theme.colors.bg,
    minHeight: '100vh',
    color: theme.colors.text,
    
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  section: {
    marginTop: 40,
  },
  category: {
    fontSize: 28,
    marginBottom: 15,
    color: '#ff2e2e',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
  },
};

export default Menu;
