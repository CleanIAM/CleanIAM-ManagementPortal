import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { signin } from '@/lib/auth/authService';

interface NavbarProps {
  showSignIn?: boolean;
}

export const Navbar = ({ showSignIn = true }: NavbarProps) => {
  const handleSignIn = async () => {
    try {
      await signin();
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-800">
              CleanIAM
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link to="/docs" className="text-gray-600 hover:text-gray-900">
              Docs
            </Link>
            
            {showSignIn && (
              <Button 
                onClick={handleSignIn} 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};
