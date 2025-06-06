import { useAuth } from 'react-oidc-context';
import { UserRole } from '../api/generated/cleanIAM.schemas';

/**
 * Custom hook to get the roles of the authenticated user.
 * @returns {string[]} An array of roles assigned to the user.
 */
export const useRoles = (): UserRole[] => {
  const auth = useAuth();
  const user = auth.user;

  return (user?.profile?.role || user?.profile?.roles || []) as UserRole[];
};
