import { useAuth } from 'react-oidc-context';

export const useSignin = () => {
  const { signinRedirect } = useAuth();
  const REDIRECT_URL = 'redirect_url';

  const signin = () => {
    // Store the pathname relative to the base path, not the full URL
    const basePath = import.meta.env.VITE_BASE_PATH || '/';
    let pathname = window.location.pathname;
    
    // Remove the base path from the pathname if it exists
    if (basePath !== '/' && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length) || '/';
    }
    
    // If at root path, redirect to /home after signin
    if (pathname === '/' || pathname === '') {
      pathname = '/home';
    }
    
    setRedirectUrl(pathname);
    void signinRedirect();
  };

  const setRedirectUrl = (pathname: string) => {
    // Store just the pathname relative to the base path
    sessionStorage.setItem(
      REDIRECT_URL,
      JSON.stringify({
        pathname,
        timestamp: Date.now()
      })
    );
  };

  const getRedirectUrl = (): string | null => {
    try {
      const data = JSON.parse(sessionStorage.getItem(REDIRECT_URL)!);
      // check if it's not expired (5 min from now is ok) and remove it from session storage
      const pathname = Date.now() - data.timestamp > 5 * 60 * 1000 ? null : data.pathname;
      sessionStorage.removeItem(REDIRECT_URL);

      return pathname;
    } catch {
      return null;
    }
  };

  return {
    signin,
    getRedirectUrl
  };
};
