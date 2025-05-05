import { router } from '@/router';
import { User } from 'oidc-client-ts';
import { AuthProviderProps } from 'react-oidc-context';

export const oidcConfig: AuthProviderProps = {
	authority: 'https://localhost:5000',
	client_id: 'management-console-fe-client',
	redirect_uri: 'https://localhost:3001/auth/signin-callback',
	silent_redirect_uri: 'https://localhost:3001/auth/signin-callback',
	response_type: 'code',
	scope: 'openid profile roles',
	onSigninCallback: (user: User | undefined) => {
		console.log('user', user);

		localStorage.setItem('access_token', user?.access_token || '');
	},
	onRemoveUser: () => {
		localStorage.removeItem('access_token');

		router.navigate('/', {
			replace: true
		});
	},
	loadUserInfo: true
};
