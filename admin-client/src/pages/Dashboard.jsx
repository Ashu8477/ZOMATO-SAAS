import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>

      <div style={styles.grid}>
        <button style={styles.card} onClick={() => navigate('/foods')}>
          🍕 Manage Foods
        </button>

        <button style={styles.card} onClick={() => navigate('/categories')}>
          📂 Manage Categories
        </button>

        <button style={styles.card} onClick={() => navigate('/orders')}>
          📦 Manage Orders
        </button>

        <button style={styles.card} onClick={() => navigate('/analytics')}>
          📊 Analytics
        </button>

        <button style={styles.card} onClick={() => navigate('/settings')}>
          ⚙️ Restaurant Settings
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
  },
  grid: {
    display: 'flex',
    gap: 20,
    marginTop: 30,
    flexWrap: 'wrap',
  },
  card: {
    padding: 30,
    fontSize: 18,
    cursor: 'pointer',
  },
};

export default Dashboard;
