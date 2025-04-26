import { handleSigninCallback } from '@/lib/auth/authService';
import { useEffect } from 'react';

export const SigninCallback = () => {
	useEffect(() => {
		handleSigninCallback();
	}, []);

	return (
		<div className="flex h-screen w-full items-center justify-center bg-gray-100">
			Signing in...
		</div>
	);
};
