import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Delicious food, delivered fast</h1>
        <p style={styles.subtitle}>
          Order from your favourite restaurant in seconds
        </p>

        <button style={styles.btn} onClick={() => navigate('/menu')}>
          Explore Menu
        </button>
        <div style={styles.features}>
          <div style={styles.featureCard}>⚡ Fast delivery</div>
          <div style={styles.featureCard}>🍕 Fresh food</div>
          <div style={styles.featureCard}>💳 Easy ordering</div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    backgroundImage:
      "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    height: '100%',
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 50,
    maxWidth: 600,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
    padding: '15px 30px',
    background: 'red',
    border: 'none',
    color: '#fff',
    fontSize: 16,
    borderRadius: 8,
    cursor: 'pointer',
  },
  features: {
    display: 'flex',
    gap: 20,
    marginTop: 40,
  },

  featureCard: {
    background: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 10,
    backdropFilter: 'blur(10px)',
  },
};

export default Home;
