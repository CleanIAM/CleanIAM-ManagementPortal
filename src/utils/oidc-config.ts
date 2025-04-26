export const oidcClientSettings = {
	authority: 'https://localhost:5000',
	client_id: 'management-console-fe-client',
	redirect_uri: 'https://localhost:3000/auth/signin-callback',
	silent_redirect_uri: 'https://localhost:3000/auth/signin-callback',
	post_logout_redirect_uri: 'https://localhost:3000/',
	response_type: 'code',
	scope: 'openid profile'
};
