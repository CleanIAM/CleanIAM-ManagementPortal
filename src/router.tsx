import { createBrowserRouter, redirect } from 'react-router-dom';

import { NotFoundPage } from './pages/not-found';
import { HomePage } from './pages/home';
import { LandingPage } from './pages/landing';
import { ApplicationsPage } from './pages/applications';
import { ProfilePage } from './pages/profile';
import { UsersPage } from './pages/users';
import { TenantsPage } from './pages/tenants';
import { ScopesPage } from './pages/scopes';
import { SigninCallback } from './pages/auth/signin-callback';
import { AuthGuard } from './components/layout/AuthGuard';
import { RootLayout } from './components/layout/RootLayout';
import {
  RoleGuardLayout,
  ADMIN_ROLES,
  MASTER_ADMIN_ONLY
} from './components/layout/RoleGuardLayout';
import { AccessDeniedPreviewPage } from './pages/access-denied-preview';
import { Signin } from './pages/auth/signin';

export const router = createBrowserRouter([
  // Public routes
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <NotFoundPage />
  },

  // Development preview routes
  { path: '/dev/access-denied', element: <AccessDeniedPreviewPage /> },

  // Auth routes
  { path: '/auth/signin-callback', element: <SigninCallback /> },
  { path: '/signin', element: <Signin /> },

  // Protected dashboard routes
  {
    element: <AuthGuard />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: '/home', element: <HomePage /> },
          { path: '/profile', element: <ProfilePage /> },

          // Admin and MasterAdmin routes
          {
            element: (
              <RoleGuardLayout
                allowedRoles={ADMIN_ROLES}
                noAccessTitle="Admin Access Only"
                noAccessMessage="Only Administrators and Master Administrators can access this area."
              />
            ),
            children: [
              { path: '/applications', element: <ApplicationsPage /> },
              { path: '/users', element: <UsersPage /> },
              { path: '/scopes', element: <ScopesPage /> }
            ]
          },

          // MasterAdmin only routes
          {
            element: (
              <RoleGuardLayout
                allowedRoles={MASTER_ADMIN_ONLY}
                noAccessTitle="Master Admin Access Only"
                noAccessMessage="Only Master Administrators can access this area."
              />
            ),
            children: [{ path: '/tenants', element: <TenantsPage /> }]
          }
        ]
      }
    ]
  },

  // Fallback and redirects
  { path: '*', element: <NotFoundPage /> },
  { path: '/app', loader: () => redirect('/applications') }
]);
