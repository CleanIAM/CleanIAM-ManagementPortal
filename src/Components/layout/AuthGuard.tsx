import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { setRedirectUrl } from '@/lib/auth/authService';
import { useUserContext } from '@/lib/auth/UserContext';

export const AuthGuard = () => {
	const location = useLocation();
	const { isAuthenticated, isLoading } = useUserContext();

	if (isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-gray-100">
				<div className="flex items-center gap-5">
					<div className="mb-4 text-xl font-medium text-gray-700">Loading...</div>
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		// Store the location they tried to go to for later redirecting
		setRedirectUrl(location.pathname);
		return <Navigate to="/auth/signin" replace />;
	}

	return <Outlet />;
};
