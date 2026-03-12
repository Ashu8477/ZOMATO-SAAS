import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout() {
  return (
    <div>
      <Navbar />

      <div style={styles.container}>
        <Outlet />
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '20px',
    width: '100%',
  },
};

export default MainLayout;
