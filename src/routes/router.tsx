import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

/* ── Layouts ── */
import AdminLayout from '../layouts/AdminLayout';

/* ── Auth Pages ── */
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import UserLoginPage from '../pages/auth/UserLoginPage';
import UserSignupPage from '../pages/auth/UserSignupPage';

/* ── Admin Pages ── */
import DashboardPage from '../pages/admin/DashboardPage';
import UsersPage from '../pages/admin/UsersPage';
import AdminManagementPage from '../pages/admin/AdminManagementPage';

const router = createBrowserRouter([

  /* ── Admin Auth ── */
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },

  /* ── User Auth ── */
  {
    path: '/user/login',
    element: <UserLoginPage />,
  },

  {
    path: '/user/signup',
    element: <UserSignupPage />,
  },

  /* ── Admin Dashboard ── */
  {
    path: '/admin',
    element: <AdminLayout />,
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

  /* ── Redirects ── */
  {
    path: '/',
    element: <Navigate to="/user/login" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/user/login" replace />,
  },
]);

export default router;
