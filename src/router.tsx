import { createBrowserRouter, redirect } from 'react-router-dom';

import { NotFoundPage } from './pages/not-found';
import { HomePage } from './pages/home';
import { LandingPage } from './pages/landing';
import { ApplicationsPage } from './pages/applications';
import { ProfilePage } from './pages/profile';
import { TestPage } from './pages/test';
import { UsersPage } from './pages/users';
import { SigninCallback } from './pages/auth/signin-callback';
import { AuthGuard } from './components/layout/AuthGuard';
import { RootLayout } from './components/layout/RootLayout';

export const router = createBrowserRouter([
	// Public routes
	{
		path: '/',
		element: <LandingPage />,
		errorElement: <NotFoundPage />
	},

	// Auth routes
	{ path: '/auth/signin-callback', element: <SigninCallback /> },

	// Protected dashboard routes
	{
		element: <AuthGuard />,
		children: [
			{
				element: <RootLayout />,
				children: [
					{ path: '/home', element: <HomePage /> },
					{ path: '/applications', element: <ApplicationsPage /> },
					{ path: '/users', element: <UsersPage /> },
					{ path: '/profile', element: <ProfilePage /> }
				]
			}
		]
	},

	// Fallback and redirects
	{ path: '*', element: <NotFoundPage /> },
	{ path: '/app', loader: () => redirect('/applications') }
]);
