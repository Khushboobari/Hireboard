import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, isAdmin, isRecruiter } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin && !isRecruiter) {
    return <Navigate to="/jobs" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
