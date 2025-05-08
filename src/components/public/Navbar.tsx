import { NavLink } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { useAuth } from 'react-oidc-context';
import { useRoles } from '@/lib/hooks/useRoles';
import { Settings, LogOut, User, Menu } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useAuth();
  const roles = useRoles();

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

  return (
    <header className="bg-white shadow-sm">
      <Container>
        <div className="flex h-16 justify-between">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          {/* Logo and desktop navigation */}
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <NavLink to="/home" className="text-xl font-bold text-blue-800">
                CleanIAM
              </NavLink>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
                }
              >
                Applications
              </NavLink>

              <NavLink
                to="/scopes"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
                }
              >
                Scopes
              </NavLink>

              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
                }
              >
                Users
              </NavLink>

              <NavLink
                to="/tenants"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
                }
              >
                Tenants
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
                }
              >
                Profile
              </NavLink>
            </nav>
          </div>

          {/* Right side user dropdown (desktop) */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* User name */}
            <div className="mr-3 sm:block">
              <span className="text-sm font-medium text-gray-700">{roles}</span>
            </div>

            <div className="relative ml-3">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200">
                    <span className="font-medium text-blue-800">{userInitials}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="truncate text-xs text-gray-500">{userEmail}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <NavLink to="/profile" className="w-full">
                      Profile
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <NavLink to="/settings" className="w-full">
                      Settings
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/applications"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Applications
              </NavLink>

              <NavLink
                to="/scopes"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Scopes
              </NavLink>

              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Users
              </NavLink>

              <NavLink
                to="/tenants"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Tenants
              </NavLink>

              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </NavLink>
            </div>

            {/* Mobile user menu */}
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200">
                    <span className="font-medium text-blue-800">{userInitials}</span>
                  </div>
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
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};
