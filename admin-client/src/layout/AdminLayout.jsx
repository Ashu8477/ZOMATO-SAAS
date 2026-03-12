import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { Link } from 'react-router-dom';

function AdminLayout() {
  const { logout } = useAuthStore();

  return (
    <div style={{ display: 'flex' }}>
      <div style={styles.sidebar}>
        <h2>Admin</h2>
        <p>Dashboard</p>
        <Link to="/foods">Foods</Link>
        <p>Orders</p>
        <p>Categories</p>
        <button onClick={logout}>Logout</button>
      </div>

      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: 200,
    height: '100vh',
    background: '#111',
    color: '#fff',
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 30,
  },
};

export default AdminLayout;
