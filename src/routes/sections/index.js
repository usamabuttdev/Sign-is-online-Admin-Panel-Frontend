import { Navigate, useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// layouts
import MainLayout from 'src/layouts/main';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
//
import { mainRoutes, HomePage } from './main';
import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { superadmindashboardRoutes } from './superadmin-dashboard';
import { admindashboardRoutes } from './admin-dashboard';

import { componentsRoutes } from './components';
import AuthClassicLayout from 'src/layouts/auth/classic';
import { GuestGuard } from 'src/auth/guard';
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // SET INDEX PAGE WITH SKIP HOME PAGE
    // {
    //   path: '/',
    //   element: <Navigate to={PATH_AFTER_LOGIN} replace />,
    // },

    // ----------------------------------------------------------------------

    // SET INDEX PAGE WITH HOME PAGE
    {
      path: '/',
      element: (
        <MainLayout>
        <HomePage />
        </MainLayout>
      ),
    }, {
      path: '/login',
      element: (
        <GuestGuard>
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },

    // Auth routes
    ...authRoutes,
    ...authDemoRoutes,
    //  Dashboard routes
    ...dashboardRoutes,

    //super-admin dashboard
    ...superadmindashboardRoutes,

    //user-dashboard
    ...admindashboardRoutes,

    // Main routes
    ...mainRoutes,

    // Components routes
    ...componentsRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
