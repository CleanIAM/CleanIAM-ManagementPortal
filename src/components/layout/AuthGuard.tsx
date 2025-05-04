import { Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { useSignin } from '@/lib/auth/useSignin';
import { useEffect } from 'react';

export const AuthGuard = () => {
	const auth = useAuth();
	const { signin } = useSignin();

	//TODO: test this
	useEffect(() => {
		if (!auth.isAuthenticated && !auth.isLoading && !auth.error) {
			signin();
		}
	}, [auth, signin]);

	switch (auth.activeNavigator) {
		case 'signinSilent':
			return <div>Signing you in...</div>;
		case 'signoutRedirect':
			return <div>Signing you out...</div>;
	}

	if (auth.isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-gray-100">
				<div className="flex flex-col items-center">
					<div className="mb-4 text-xl font-medium text-gray-700">Loading...</div>
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
				</div>
			</div>
		);
	}

	if (auth.error) {
		return (
			<div>
				Oops... {auth.error.name} caused {auth.error.message}
			</div>
		);
	}

	if (auth.isAuthenticated) {
		return <Outlet />;
	}

	return <div>Signing in</div>;
};
