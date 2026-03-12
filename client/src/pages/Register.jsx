import { useState } from 'react';
import { registerApi } from '../api/auth.api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await registerApi({ name, email, password });
      alert('Registered Successfully');
      navigate('/login');
    } catch (err) {
      alert('Register Failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleRegister} style={styles.button}>
          Register
        </button>

        <p>
          Already have account? <Link to="/login">Login</Link>
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

export default Register;
