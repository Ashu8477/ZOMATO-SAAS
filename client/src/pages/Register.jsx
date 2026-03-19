import { useState } from 'react';
import { registerApi } from '../api/auth.api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return setError('Please fill all fields');
    }

    try {
      setLoading(true);
      setError('');
      await registerApi({ name, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.logo}>🍽️ Foodies</h1>
        <h2 style={styles.title}>Create your account</h2>
        <p style={styles.subtitle}>Order delicious food in minutes</p>

        {error && <div style={styles.error}>{error}</div>}

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <div style={{ position: 'relative' }}>
          <input
            placeholder="Password"
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <span onClick={() => setShowPass(!showPass)} style={styles.show}>
            {showPass ? 'Hide' : 'Show'}
          </span>
        </div>

        <button
          onClick={handleRegister}
          style={loading ? styles.buttonDisabled : styles.button}
        >
          {loading ? 'Creating Account...' : 'Register'}
        </button>

        <p style={styles.loginText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.loginLink}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #ff4d4d 0%, #1a1a1a 100%)',
  },
  card: {
    width: 380,
    padding: 35,
    borderRadius: 16,
    background: '#111',
    color: '#fff',
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
  },
  logo: {
    marginBottom: 5,
    fontSize: 28,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#aaa',
    fontSize: 14,
  },
  input: {
    width: '100%',
    padding: 14,
    marginTop: 12,
    borderRadius: 8,
    border: '1px solid #333',
    background: '#1c1c1c',
    color: '#fff',
    fontSize: 14,
  },
  button: {
    width: '100%',
    padding: 14,
    marginTop: 20,
    borderRadius: 8,
    border: 'none',
    background: '#ff4d4d',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttonDisabled: {
    width: '100%',
    padding: 14,
    marginTop: 20,
    borderRadius: 8,
    border: 'none',
    background: '#999',
    color: '#fff',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 14,
    color: '#aaa',
  },
  loginLink: {
    color: '#ff4d4d',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  error: {
    background: '#ff4d4d22',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    color: '#ff8080',
    fontSize: 13,
  },
  show: {
    position: 'absolute',
    right: 15,
    top: 24,
    cursor: 'pointer',
    fontSize: 12,
    color: '#ff4d4d',
  },
};

export default Register;
