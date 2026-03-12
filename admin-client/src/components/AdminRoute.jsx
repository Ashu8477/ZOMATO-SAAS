import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

function AdminRoute({ children }) {
  const { user } = useAuthStore();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;
