import { createBrowserRouter, redirect } from 'react-router-dom';

import { NotFoundPage } from './pages/not-found';
import { HomePage } from './pages/home';
import { LandingPage } from './pages/landing';
import { ApplicationsPage } from './pages/applications';
import { ProfilePage } from './pages/profile';
import { TestPage } from './pages/test';
import { AuthGuard } from './components/layout/AuthGuard';
import { Signin } from './pages/auth/signin';
import { SigninCallback } from './pages/auth/signin-callback';
import { RootLayout } from './components/layout/RootLayout';

export const router = createBrowserRouter([
	// Public routes
	{
		path: '/',
		element: <LandingPage />,
		errorElement: <NotFoundPage />
	},

	// Auth routes
	{ path: '/auth/signin', element: <Signin /> },
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
					{ path: '/profile', element: <ProfilePage /> },
					{ path: '/test', element: <TestPage /> }
				]
			}
		]
	},

	// Fallback and redirects
	{ path: '*', element: <NotFoundPage /> },
	{ path: '/app', loader: () => redirect('/applications') }
]);
