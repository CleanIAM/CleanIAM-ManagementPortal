import { NavLink } from 'react-router-dom';
import { useRoles } from '@/lib/hooks/useRoles';
import { UserRole } from '@/lib/api/generated/cleanIAM.schemas';

type NavLinkProps = {
  to: string;
  label: string;
  roles?: UserRole[]; // Optional roles that can access this link
};

const NavItem = ({ to, label }: NavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive
            ? 'border-blue-500 text-gray-900'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
      }
    >
      {label}
    </NavLink>
  );
};

export const NavbarLinks = () => {
  const userRoles = useRoles();

  // Define links with role requirements
  const links: NavLinkProps[] = [
    { to: '/home', label: 'Dashboard' }, // Available to all authenticated users
    { to: '/applications', label: 'Applications', roles: [UserRole.Admin, UserRole.MasterAdmin] },
    { to: '/scopes', label: 'Scopes', roles: [UserRole.Admin, UserRole.MasterAdmin] },
    { to: '/users', label: 'Users', roles: [UserRole.Admin, UserRole.MasterAdmin] },
    { to: '/tenants', label: 'Tenants', roles: [UserRole.MasterAdmin] },
    { to: '/profile', label: 'Profile' } // Available to all authenticated users
  ];

  // Filter links based on user roles
  const visibleLinks = links.filter(link => {
    // If no roles specified, show to everyone
    if (!link.roles) return true;

    // If roles specified, check if user has any of the required roles
    return link.roles.some(role => userRoles.includes(role));
  });

  return (
    <nav className="hidden overflow-auto sm:ml-6 sm:flex sm:space-x-8">
      {visibleLinks.map(link => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ))}
    </nav>
  );
};
