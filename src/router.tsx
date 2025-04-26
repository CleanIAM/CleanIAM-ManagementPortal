import { createBrowserRouter, redirect } from 'react-router-dom';

import RootLayout from './Components/layout/RootLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import ApplicationsPage from './pages/ApplicationsPage';
import ProfilePage from './pages/ProfilePage';
import TestPage from './pages/TestPage';

// Create router with Framework mode API
export const router = createBrowserRouter([
	{
		path: '/',
		Component: RootLayout,
		errorElement: <NotFoundPage />,
		children: [
			{ index: true, Component: HomePage },
			{ path: 'applications', Component: ApplicationsPage },
			{ path: 'profile', Component: ProfilePage },
			{ path: 'test', Component: TestPage },
			{
				path: '*',
				Component: NotFoundPage
			}
		]
	},
	// Example of a redirect
	{
		path: '/app',
		loader: () => redirect('/applications')
	}
]);
