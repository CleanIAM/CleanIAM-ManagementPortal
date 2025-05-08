import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { NavbarLogo } from './NavbarLogo';
import { NavbarLinks } from './NavbarLinks';
import { UserProfileMenu } from './UserProfileMenu';
import { MobileMenu, MobileMenuToggle } from './MobileMenu';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-dvw bg-white shadow-sm">
      <Container>
        <div className="flex h-16 justify-between">
          {/* Mobile menu button */}
          <MobileMenuToggle isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />

          {/* Logo and desktop navigation */}
          <div className="flex">
            <NavbarLogo />
            <NavbarLinks />
          </div>

          {/* User profile menu */}
          <UserProfileMenu />
        </div>

        {/* Mobile menu */}
        <MobileMenu isOpen={mobileMenuOpen} setIsOpen={setMobileMenuOpen} />
      </Container>
    </header>
  );
};
