import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <div style={styles.nav}>
      <Link to="/" style={styles.logo}>
        🍔 Zomato SaaS
      </Link>

      <div style={styles.links}>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>

        {user ? (
          <>
            <span>{user.name}</span>
            <button style={styles.logout} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    background: '#000',
    padding: '15px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: '#ff2e2e',
    fontSize: 22,
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: 20,
    color: '#fff',
    alignItems: 'center',
  },
  logout: {
    background: 'red',
    border: 'none',
    padding: '6px 12px',
    color: '#fff',
    borderRadius: 6,
    cursor: 'pointer',
  },
};

export default Navbar;
