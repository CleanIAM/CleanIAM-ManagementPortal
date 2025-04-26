import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated, setRedirectUrl } from '@/lib/auth/authService';

export const AuthGuard = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        setIsAuth(authenticated);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="mb-4 text-xl font-medium text-gray-700">Loading...</div>
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!isAuth) {
    // Store the location they tried to go to for later redirecting
    setRedirectUrl(location.pathname);
    return <Navigate to="/auth/signin" replace />;
  }

  return <Outlet />;
};
