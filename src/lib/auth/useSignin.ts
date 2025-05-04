import { useAuth } from 'react-oidc-context';

export const useSignin = () => {
	const { signinRedirect } = useAuth();
	const REDIRECT_URL = 'redirect_url';

	const signin = () => {
		setRedirectUrl(window.location.href);
		void signinRedirect();
	};

	const setRedirectUrl = (url: string) => {
		// just store is in session storage for now to avoid passing it around the app
		sessionStorage.setItem(
			REDIRECT_URL,
			JSON.stringify({
				url,
				timestamp: Date.now()
			})
		);
	};

	const getRedirectUrl = (): string | null => {
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

	return {
		signin,
		getRedirectUrl
	};
};
