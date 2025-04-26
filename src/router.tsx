import { createBrowserRouter, redirect } from 'react-router-dom';

import { RootLayout } from './components/layout/RootLayout';
import { NotFoundPage } from './pages/not-found';
import { HomePage } from './pages/home';
import { LandingPage } from './pages/landing';
import { ApplicationsPage } from './pages/applications';
import { ProfilePage } from './pages/profile';
import { TestPage } from './pages/test';
import { AuthLayout } from './components/layout/AuthLayout';
import { Signin } from './pages/auth/signin';
import { SigninCallback } from './pages/auth/signin-callback';

// Create router with Framework mode API
export const router = createBrowserRouter([
	{
		Component: RootLayout,
		errorElement: <NotFoundPage />,
		children: [
			{
				Component: AuthLayout,
				children: [
					{ path: 'home', Component: HomePage },
					{ path: 'applications', Component: ApplicationsPage },
					{ path: 'profile', Component: ProfilePage },
					{ path: 'test', Component: TestPage }
				]
			}
		]
	},
	{ index: true, Component: LandingPage },
	{ path: '/auth/signin', Component: Signin },
	{ path: '/auth/signin-callback', Component: SigninCallback },
	{ path: '*', Component: NotFoundPage },
	{ path: '/app', loader: () => redirect('/applications') }
]);
