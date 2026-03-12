import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

function ProtectedRoute({ children }) {
  const { token } = useAuthStore();

  if (!token) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
