import { useState } from 'react';
import axios from '../api/axios';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await axios.post('/auth/login', { email, password });
    login(res.data.data);
    navigate('/');
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
