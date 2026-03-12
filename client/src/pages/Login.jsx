import { useState } from 'react';
import { loginApi } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginApi({ email, password });
      login(res.data.data);
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Zomato SaaS Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          {loading ? 'Loading...' : 'Login'}
        </button>

        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 350,
    padding: 30,
    background: '#111',
    color: '#fff',
    borderRadius: 10,
  },
  input: { width: '100%', padding: 10, marginTop: 10 },
  button: {
    width: '100%',
    padding: 12,
    marginTop: 15,
    background: 'red',
    color: '#fff',
    border: 'none',
  },
};

export default Login;
