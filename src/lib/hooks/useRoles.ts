import { useAuth } from 'react-oidc-context';

/**
 * Custom hook to get the roles of the authenticated user.
 * @returns {string[]} An array of roles assigned to the user.
 */
export const useRoles = (): string[] => {
	const auth = useAuth();
	const user = auth.user;

	if (!user) {
		return [];
	}

	const roles = (user.profile?.roles as string[]) || [];
	console.log('User roles:', roles);

	return roles;
};
