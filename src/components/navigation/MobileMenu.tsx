import { NavLink } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileMenuToggle = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  return (
    <div className="flex items-center sm:hidden">
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <Menu className="h-6 w-6" />
      </button>
    </div>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink = ({ to, label, onClick }: MobileNavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive 
            ? 'border-blue-500 bg-blue-50 text-blue-700' 
            : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
        } block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
      }
      onClick={onClick}
    >
      {label}
    </NavLink>
  );
};

export const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const auth = useAuth();

  // Get user information from auth context
  const userProfile = auth.user?.profile;
  const userName = userProfile?.name || 'User';
  const userEmail = userProfile?.email || 'user@example.com';

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const userInitials = getInitials(userName);

  const handleLogout = async () => {
    try {
      await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin + '/' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!isOpen) return null;

  const links = [
    { to: '/home', label: 'Dashboard' },
    { to: '/applications', label: 'Applications' },
    { to: '/scopes', label: 'Scopes' },
    { to: '/users', label: 'Users' },
    { to: '/tenants', label: 'Tenants' },
    { to: '/profile', label: 'Profile' }
  ];

  return (
    <div className="sm:hidden">
      <div className="space-y-1 pb-3 pt-2">
        {links.map((link) => (
          <MobileNavLink 
            key={link.to} 
            to={link.to} 
            label={link.label} 
            onClick={() => setIsOpen(false)} 
          />
        ))}
      </div>

      {/* Mobile user menu */}
      <div className="border-t border-gray-200 pb-3 pt-4">
        <div className="flex items-center px-4">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-blue-200 text-blue-800">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-3">
            <div className="text-base font-medium text-gray-800">{userName}</div>
            <div className="text-sm font-medium text-gray-500">{userEmail}</div>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <NavLink
            to="/profile"
            className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </NavLink>

          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
