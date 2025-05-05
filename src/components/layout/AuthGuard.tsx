import { Outlet } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { useSignin } from '@/lib/auth/useSignin';
import { useEffect } from 'react';
import { Loader } from '../public/Loader';

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
