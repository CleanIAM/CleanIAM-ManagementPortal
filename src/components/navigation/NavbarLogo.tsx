import { NavLink } from 'react-router-dom';

export const NavbarLogo = () => {
  return (
    <div className="flex flex-shrink-0 items-center">
      <NavLink to="/home" className="text-xl font-bold text-blue-800">
        CleanIAM
      </NavLink>
    </div>
  );
};
