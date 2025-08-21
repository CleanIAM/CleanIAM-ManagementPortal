import { router } from '@/router';
import { AuthProviderProps } from 'react-oidc-context';

const basePath = import.meta.env.VITE_BASE_PATH || '/';
const baseUrl = `https://localhost:3001${basePath === '/' ? '' : basePath}`;

export const oidcConfig: AuthProviderProps = {
  authority: 'https://localhost:7001',
  client_id: 'management-portal',
  redirect_uri: `${baseUrl}/auth/signin-callback`,
  silent_redirect_uri: `${baseUrl}/auth/signin-callback`,
  response_type: 'code',
  scope: 'openid profile roles email offline_access',
  onSigninCallback: () => {},
  onRemoveUser: () => {
    router.navigate('/', {
      replace: true
    });
  },
  refreshTokenAllowedScope: 'offline_access',
  automaticSilentRenew: true,
  loadUserInfo: true
};
