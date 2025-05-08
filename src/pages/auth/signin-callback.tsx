import { Loader } from '@/components/public/Loader';
import { useSignin } from '@/lib/auth/useSignin';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

export const SigninCallback = () => {
  const auth = useAuth();
  const { getRedirectUrl } = useSignin();

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>;
    case 'signoutRedirect':
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <Loader className="h-10 w-10" />
        </div>
      </div>
    );
  }

  if (auth.error) {
    return (
      <div>
        Oops... {auth.error.name} caused {auth.error.message}
      </div>
    );
  }

  if (auth.isAuthenticated) {
    const url = getRedirectUrl();
    if (url) {
      return <Navigate to={url} state={{ from: window.location.pathname }} replace />;
    }
    // if no redirect url is set, just go to the home page
    return <Navigate to="/home" state={{ from: window.location.pathname }} replace />;
  }

  return <Navigate to="/auth/signin" state={{ from: window.location.pathname }} replace />;
};
