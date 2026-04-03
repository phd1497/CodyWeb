import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppProviders from '../app/providers/AppProviders';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import PageLoader from '../shared/components/PageLoader';

const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const UserLoginPage = lazy(() => import('../pages/user/UserLoginPage'));
const UserSignupPage = lazy(() => import('../pages/user/UserSignupPage'));
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'));
const UsersPage = lazy(() => import('../pages/admin/UsersPage'));
const AdminManagementPage = lazy(() => import('../pages/admin/AdminManagementPage'));
const StoreHomePage = lazy(() => import('../modules/store/pages/HomePage'));
const ProductDetailPage = lazy(() => import('../modules/store/pages/ProductDetailPage'));

const withSuspense = (node: React.ReactNode) => <Suspense fallback={<PageLoader />}>{node}</Suspense>;

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AppProviders>{children}</AppProviders>
);

const router = createBrowserRouter([
  { path: '/', element: <RootLayout><Navigate to="/user/login" replace /></RootLayout> },
  { path: '/admin/login', element: <RootLayout>{withSuspense(<AdminLoginPage />)}</RootLayout> },
  { path: '/user/login', element: <RootLayout>{withSuspense(<UserLoginPage />)}</RootLayout> },
  { path: '/user/signup', element: <RootLayout>{withSuspense(<UserSignupPage />)}</RootLayout> },
  {
    path: '/user',
    element: (
      <RootLayout>
        <ProtectedRoute redirectTo="/user/login" requireRole="user">
          <UserLayout />
        </ProtectedRoute>
      </RootLayout>
    ),
    children: [
      { index: true, element: <Navigate to="/user/home" replace /> },
      { path: 'home', element: withSuspense(<StoreHomePage />) },
      { path: 'products/:productId', element: withSuspense(<ProductDetailPage />) },
    ],
  },
  {
    path: '/admin',
    element: (
      <RootLayout>
        <ProtectedRoute redirectTo="/admin/login" requireRole="admin">
          <AdminLayout />
        </ProtectedRoute>
      </RootLayout>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: 'dashboard', element: withSuspense(<DashboardPage />) },
      { path: 'users', element: withSuspense(<UsersPage />) },
      { path: 'management', element: withSuspense(<AdminManagementPage />) },
    ],
  },
  { path: '*', element: <RootLayout><Navigate to="/user/login" replace /></RootLayout> },
]);

export default router;
