export const oidcClientSettings = {
	authority: 'https://localhost:5000',
	client_id: 'management-console-fe-client',
	redirect_uri: 'http://localhost:3000/signin/callback',
	silent_redirect_uri: 'http://localhost:3000/signin/callback',
	post_logout_redirect_uri: 'http://localhost:3000/',
	response_type: 'code',
	// this is for getting user.profile data, when open id connect is implemented
	//scope: 'api1 openid profile'
	// this is just for OAuth2 flow
	scope: 'api1'
};
