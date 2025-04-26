import { createBrowserRouter, redirect } from 'react-router-dom';

import RootLayout from './Components/layout/RootLayout';
import NotFoundPage from './pages/not-found';
import HomePage from './pages/home';
import ApplicationsPage from './pages/applications';
import ProfilePage from './pages/profile';
import TestPage from './pages/test';
import AuthLayout from './Components/layout/AuthLayout';
import { Signin } from './pages/auth/signin';
import { SigninCallback } from './pages/auth/singin-callback';

// Create router with Framework mode API
export const router = createBrowserRouter([
	{
		Component: RootLayout,
		errorElement: <NotFoundPage />,
		children: [
			{
				Component: AuthLayout,
				children: [
					{ index: true, Component: HomePage },
					{ path: 'applications', Component: ApplicationsPage },
					{ path: 'profile', Component: ProfilePage },
					{ path: 'test', Component: TestPage }
				]
			}
		]
	},
	{ path: '/auth/signin', Component: Signin },
	{ path: '/auth/signin-callback', Component: SigninCallback },
	{ path: '*', Component: NotFoundPage },
	{ path: '/app', loader: () => redirect('/applications') }
]);
