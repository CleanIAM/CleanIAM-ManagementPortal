import { NavLink } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  label: string;
}

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
  const links: NavLinkProps[] = [
    { to: '/home', label: 'Dashboard' },
    { to: '/applications', label: 'Applications' },
    { to: '/scopes', label: 'Scopes' },
    { to: '/users', label: 'Users' },
    { to: '/tenants', label: 'Tenants' },
    { to: '/profile', label: 'Profile' }
  ];

  return (
    <nav className="hidden overflow-auto sm:ml-6 sm:flex sm:space-x-8">
      {links.map(link => (
        <NavItem key={link.to} to={link.to} label={link.label} />
      ))}
    </nav>
  );
};
