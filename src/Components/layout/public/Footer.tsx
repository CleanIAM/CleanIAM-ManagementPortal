import React from 'react';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">CleanIAM</h3>
            <p className="text-gray-400">
              Modern Identity and Access Management
            </p>
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} CleanIAM. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-white">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};
