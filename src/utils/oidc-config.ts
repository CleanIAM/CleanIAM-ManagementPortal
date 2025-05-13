import { router } from '@/router';
import { AuthProviderProps } from 'react-oidc-context';
export const oidcConfig: AuthProviderProps = {
  authority: 'https://localhost:5000',
  client_id: 'management-portal',
  redirect_uri: 'https://localhost:3001/auth/signin-callback',
  silent_redirect_uri: 'https://localhost:3001/auth/signin-callback',
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
