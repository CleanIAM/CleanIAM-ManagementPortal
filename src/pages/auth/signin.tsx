import { signin } from '@/lib/auth/authService';
import { useEffect } from 'react';

export const Signin = () => {
	useEffect(() => {
		signin()
			.then(() => {
				console.log('Sign-in successful');
			})
			.catch(error => {
				console.log('Sign-in error: ', error);
			});
	}, []);

	return (
		<div className="flex h-screen w-full items-center justify-center bg-gray-100">
			Signing in...
		</div>
	);
};
