import { handleSigninCallback } from '@/lib/auth/authService';
import { useEffect, useState } from 'react';

export const SigninCallback = () => {
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		handleSigninCallback()
			.catch((err) => {
				console.error('Signin callback error:', err);
				setError('Failed to complete authentication. Please try again.');
			});
	}, []);

	return (
		<div className="flex h-screen w-full items-center justify-center bg-gray-100 flex-col">
			{error ? (
				<div className="text-red-500">{error}</div>
			) : (
				<div>
					<div className="text-xl mb-4">Signing in...</div>
					<div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
				</div>
			)}
		</div>
	);
};
