import { NavLink } from 'react-router-dom';
import { Logo } from '../public/Logo';

export const NavbarLogo = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <NavLink to="/home" className="flex items-center gap-2 text-xl font-bold text-blue-800">
        <Logo />
        <span>CleanIAM</span>
      </NavLink>
    </div>
  );
};
