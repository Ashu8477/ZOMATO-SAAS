import { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    await axios.post('/auth/register', {
      name,
      email,
      password,
    });

    alert('Admin created');
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Register</h1>

      <input placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
