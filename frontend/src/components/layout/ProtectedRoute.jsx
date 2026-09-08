// src/components/layout/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();

  console.log('🔒 ProtectedRoute:', {
    isAuthenticated,
    loading,
    user,
    userRoles: user?.roles,
    allowedRoles
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  const userRoles = user?.roles || [];
  const hasAccess = allowedRoles.length === 0 ||
    allowedRoles.some(role => userRoles.includes(role));

  if (!hasAccess) {
    console.log('❌ No access, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('✅ Access granted');
  return children;
};

export default ProtectedRoute;