import { oidcClientSettings } from '@/utils/oidc-config';
import { User, UserManager } from 'oidc-client-ts';

export const userManager = new UserManager(oidcClientSettings);

export const getUser = async (): Promise<User | null> => {
	const user = await userManager.getUser();
	return user;
};

export const isAuthenticated = async (): Promise<boolean> => {
	const user = await getUser();

	return !!user && !user.expired;
};

export const signin = async () => {
	if (await isAuthenticated()) {
		console.log('User is already authenticated', await getUser());

		window.location.href = '/home';
		return;
	}

	console.log('User is not authenticated, redirecting to sign-in page');

	return await userManager.signinRedirect({});
};

export const handleSigninCallback = async () => {
	try {
		await userManager.signinCallback();

		const user = await userManager.getUser();
		console.log('signin callback: ', user);

		if (!user) {
			console.log('User not found');
			window.location.href = '/auth/signin';
			throw new Error('User not found');
		}

		console.log('User found: ', user);

		const redirectUrl = getRedirectUrl();

		if (redirectUrl) {
			window.location.href = redirectUrl;
		} else {
			window.location.href = '/home';
		}
	} catch (e) {
		console.error(e);
	}
};

// renews token using refresh token
export const renewToken = async () => {
	const user = await userManager.signinSilent();

	return user;
};

export const getAccessToken = async () => {
	const user = await getUser();
	return user?.access_token;
};

export const logout = async () => {
	await userManager.clearStaleState();
	await userManager.signoutRedirect();
};

// This function is used to access token claims
// `.profile` is available in Open Id Connect implementations
// in simple OAuth2 it is empty, because UserInfo endpoint does not exist
// export const getRole = async () =>  {
//     const user = await getUser();
//     return user?.profile?.role;
// }

// This function is used to change account similar way it is done in Google
// export const selectOrganization = async () =>  {
//     const args = {
//         prompt: "select_account"
//     }
//     await userManager.signinRedirect(args);
// }

export const REDIRECT_URL = 'redirect_url';

export const setRedirectUrl = (url: string) => {
	// just store is in session storage for now to avoid passing it around the app
	sessionStorage.setItem(
		REDIRECT_URL,
		JSON.stringify({
			url,
			timestamp: Date.now()
		})
	);
};

export const getRedirectUrl = () => {
	try {
		const data = JSON.parse(sessionStorage.getItem(REDIRECT_URL)!);
		// check if it's not expired (5 min from now is ok) and remove it from session storage
		const url = Date.now() - data.timestamp > 5 * 60 * 1000 ? null : data.url;
		sessionStorage.removeItem(REDIRECT_URL);

		return url;
	} catch {
		return null;
	}
};
