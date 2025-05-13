import { Loader } from '@/components/public/Loader';
import { useAuth } from 'react-oidc-context';

export const Signin = () => {
  const auth = useAuth();

  if (!auth.isLoading) {
    auth.signinRedirect();
  }

  return (
    <div className="flex h-dvh items-center justify-center">
      <Loader className="h-10 w-10" />
    </div>
  );
};
