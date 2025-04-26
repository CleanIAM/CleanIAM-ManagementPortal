import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/auth/authService';

export const AuthLayout = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const authenticated = await isAuthenticated();
				if (!authenticated) {
					navigate('/auth/signin');
				}
			} catch (error) {
				console.error('Authentication check failed:', error);
				navigate('/auth/signin');
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, [navigate]);

	if (loading) {
		return (
			<div className="flex h-screen w-full items-center justify-center bg-gray-100">
				<div className="flex flex-col items-center">
					<div className="mb-4 text-xl font-medium text-gray-700">Loading...</div>
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
				</div>
			</div>
		);
	}

	return <Outlet />;
};
