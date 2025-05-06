import { Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { useSignin } from '@/lib/auth/useSignin';
import { useEffect, useMemo } from 'react';
import { Loader } from '../public/Loader';
import axiosInstance from '@/lib/api/mutator/axios/custom-axios';

export const AuthGuard = () => {
	const auth = useAuth();
	const { signin } = useSignin();

	//TODO: test this
	useEffect(() => {
		if (!auth.isAuthenticated && !auth.isLoading) {
			signin();
		}
	}, [auth, signin]);

	// Update access token in axios interceptor
	useMemo(() => {
		axiosInstance.interceptors.request.use(
			config => {
				// Get the token from the auth context
				const token = auth.user?.access_token;

				// If token exists, add it to the headers
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				return config;
			},
			error => {
				return Promise.reject(error);
			}
		);
	}, [auth]);
	switch (auth.activeNavigator) {
		case 'signinSilent':
			return (
				<div className="flex h-screen w-full items-center justify-center">
					<Loader className="h-16 w-16" />
				</div>
			);
		case 'signoutRedirect':
			return (
				<div className="flex h-screen w-full items-center justify-center">
					<Loader className="h-16 w-16" />
				</div>
			);
	}

	if (auth.isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center">
				<Loader className="h-16 w-16" />
			</div>
		);
	}

	if (auth.error) {
		return (
			<div>
				Oops... {auth.error.name}
				<br />
				caused {auth.error.message}
			</div>
		);
	}

	if (auth.isAuthenticated) {
		return <Outlet />;
	}

	return <div>Signing in</div>;
};
