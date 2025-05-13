import { NavLink } from 'react-router-dom';
import { Settings, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from 'react-oidc-context';

export const UserProfileMenu = () => {
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
      await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="hidden sm:ml-6 sm:flex sm:items-center">
      {/* User name */}
      <div className="mr-3 sm:block">
        <span className="text-sm font-medium text-gray-700">{userName}</span>
      </div>

      <div className="relative ml-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <span className="sr-only">Open user menu</span>
            <Avatar>
              <AvatarFallback className="bg-blue-200 text-blue-800">{userInitials}</AvatarFallback>
            </Avatar>
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
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
