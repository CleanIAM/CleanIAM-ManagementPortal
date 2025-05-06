import { router } from '@/router';
import { User } from 'oidc-client-ts';
import { AuthProviderProps } from 'react-oidc-context';
import axiosInstance from '@/lib/api/axios/custom-axios';

// Create a better way to manage auth tokens
const TokenManager = {
  setToken: (token: string) => {
    // For axios interceptor compatibility, we still need to store it somewhere
    // But now it's centralized here
    localStorage.setItem('access_token', token);
    
    // Update axios default headers for immediate requests
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  },
  removeToken: () => {
    localStorage.removeItem('access_token');
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export const oidcConfig: AuthProviderProps = {
	authority: 'https://localhost:5000',
	client_id: 'management-console-fe-client',
	redirect_uri: 'https://localhost:3001/auth/signin-callback',
	silent_redirect_uri: 'https://localhost:3001/auth/signin-callback',
	response_type: 'code',
	scope: 'openid profile roles',
	onSigninCallback: (user: User | undefined) => {
		console.log('user', user);
    
    // Use our token manager instead of directly using localStorage
    if (user?.access_token) {
      TokenManager.setToken(user.access_token);
    }
	},
	onRemoveUser: () => {
    // Use our token manager to clean up
    TokenManager.removeToken();

		router.navigate('/', {
			replace: true
		});
	},
	loadUserInfo: true
};

// Export the TokenManager for use elsewhere if needed
export { TokenManager };
