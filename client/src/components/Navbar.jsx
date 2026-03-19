import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useState } from 'react';

function Navbar() {
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <Link to="/" style={styles.logo}>
        🍽️ Foodies
      </Link>

      {/* DESKTOP LINKS */}
      <div style={styles.linksDesktop}>
        <Link to="/menu" style={styles.link}>
          Menu
        </Link>
        <Link to="/cart" style={styles.link}>
          Cart
        </Link>
        <Link to="/orders" style={styles.link}>
          Orders
        </Link>

        {user ? (
          <>
            <span style={styles.user}>Hi, {user.name}</span>
            <button style={styles.logout} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>

      {/* MOBILE HAMBURGER */}
      <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/menu" style={styles.mobileLink}>
            Menu
          </Link>
          <Link to="/cart" style={styles.mobileLink}>
            Cart
          </Link>
          <Link to="/orders" style={styles.mobileLink}>
            Orders
          </Link>

          {user ? (
            <>
              <span style={styles.mobileUser}>Hi, {user.name}</span>
              <button style={styles.mobileLogout} onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.mobileLogin}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    background: '#0d0d0d',
    padding: '16px 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
  },

  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff4d4d',
    textDecoration: 'none',
  },

  linksDesktop: {
    display: 'flex',
    gap: 22,
    alignItems: 'center',
  },

  link: {
    color: '#ddd',
    textDecoration: 'none',
    fontSize: 15,
    transition: '0.2s',
  },

  loginBtn: {
    background: '#ff4d4d',
    padding: '8px 16px',
    borderRadius: 8,
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
  },

  logout: {
    background: '#ff4d4d',
    border: 'none',
    padding: '6px 14px',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },

  user: {
    color: '#aaa',
    fontSize: 14,
  },

  hamburger: {
    display: 'none',
    fontSize: 22,
    color: '#fff',
    cursor: 'pointer',
  },

  mobileMenu: {
    position: 'absolute',
    top: 70,
    right: 20,
    background: '#111',
    padding: 20,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
  },

  mobileLink: {
    color: '#fff',
    textDecoration: 'none',
  },

  mobileLogin: {
    background: '#ff4d4d',
    padding: '8px 12px',
    borderRadius: 8,
    color: '#fff',
    textDecoration: 'none',
  },

  mobileLogout: {
    background: '#ff4d4d',
    border: 'none',
    padding: '8px 12px',
    color: '#fff',
    borderRadius: 8,
    cursor: 'pointer',
  },

  mobileUser: {
    color: '#aaa',
  },
};

export default Navbar;
