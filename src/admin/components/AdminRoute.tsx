import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      {user?.role === 'admin' ? (
        <>{children}</>
      ) : (
        <Navigate to="/martin-admin-secure" replace />
      )}
    </ProtectedRoute>
  );
}
