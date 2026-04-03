import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

type RequiredRole = 'admin' | 'user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireRole?: RequiredRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/user/login',
  requireRole,
}) => {
  const { firebaseUser, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg-primary)' }}>
        <Spinner animation="border" style={{ color: 'var(--color-primary)' }} />
      </div>
    );
  }

  if (!firebaseUser) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requireRole === 'admin' && profile?.role === 'user') {
    return <Navigate to="/user/home" replace />;
  }

  if (requireRole === 'user' && profile?.role !== 'user') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
