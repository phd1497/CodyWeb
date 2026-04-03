import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

/* ── Layouts ── */
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';

/* ── Auth Pages ── */
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import UserLoginPage from '../pages/user/UserLoginPage';
import UserSignupPage from '../pages/user/UserSignupPage';

/* ── Admin Pages ── */
import DashboardPage from '../pages/admin/DashboardPage';
import UsersPage from '../pages/admin/UsersPage';
import AdminManagementPage from '../pages/admin/AdminManagementPage';

/* ── User Pages ── */
import HomePage from '../pages/user/HomePage';

/* ── Guards ── */
import ProtectedRoute from '../components/ProtectedRoute';

/* ── Root Layout that provides AuthContext ── */
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout><Navigate to="/user/login" replace /></RootLayout>,
  },

  /* ── Auth (public) ── */
  {
    path: '/admin/login',
    element: <RootLayout><AdminLoginPage /></RootLayout>,
  },
  {
    path: '/user/login',
    element: <RootLayout><UserLoginPage /></RootLayout>,
  },
  {
    path: '/user/signup',
    element: <RootLayout><UserSignupPage /></RootLayout>,
  },

  /* ── User Pages (protected) ── */
  {
    path: '/user',
    element: (
      <RootLayout>
        <ProtectedRoute redirectTo="/user/login">
          <UserLayout />
        </ProtectedRoute>
      </RootLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/user/home" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
    ],
  },

  /* ── Admin Dashboard (protected) ── */
  {
    path: '/admin',
    element: (
      <RootLayout>
        <ProtectedRoute redirectTo="/admin/login">
          <AdminLayout />
        </ProtectedRoute>
      </RootLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'management',
        element: <AdminManagementPage />,
      },
      {
        path: 'settings',
        element: (
          <div style={{ animation: 'fadeInUp 0.4s ease-out' }}>
            <h1 style={{
              fontSize: 'var(--fs-2xl)',
              fontWeight: 'var(--fw-bold)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-2)',
            }}>
              Settings
            </h1>
            <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--fs-sm)' }}>
              Settings page coming soon...
            </p>
          </div>
        ),
      },
    ],
  },

  /* ── Catch-all ── */
  {
    path: '*',
    element: <RootLayout><Navigate to="/user/login" replace /></RootLayout>,
  },
]);

export default router;
