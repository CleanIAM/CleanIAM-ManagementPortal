import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NoAccessProps {
  /**
   * The title to display in the no access message
   */
  title?: string;
  
  /**
   * The detailed message to display
   */
  message?: string;
  
  /**
   * Whether to show a home page link
   * @default true
   */
  showHomeLink?: boolean;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Displays a visually appealing message when the user doesn't have permission to access a resource.
 */
export const NoAccess: React.FC<NoAccessProps> = ({
  title = "Access Restricted",
  message = "You don't have permission to access this resource.",
  showHomeLink = true,
  className = "",
}) => {
  return (
    <div className={`flex min-h-[60vh] flex-col items-center justify-center ${className}`}>
      <div className="mx-auto max-w-md px-4 py-12 text-center">
        {/* Visual illustration */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Shield with keyhole */}
            <div className="absolute -inset-0.5 rounded-full bg-red-100 blur-md"></div>
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-red-500 bg-white shadow-lg">
              <ShieldAlert className="h-14 w-14 text-red-500" />
            </div>
            {/* Status indicator */}
            <div className="absolute -right-2 -top-2 h-6 w-6 rounded-full border-4 border-white bg-red-500"></div>
          </div>
        </div>

        {/* Text content */}
        <h2 className="mb-3 text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mb-8 text-gray-600">{message}</p>
        
        {/* Visual divider */}
        <div className="mx-auto mb-8 h-px w-16 bg-gray-300"></div>
        
        {/* Action button */}
        {showHomeLink && (
          <Link to="/home" className="inline-block">
            <Button 
              variant="outline" 
              className="group rounded-full bg-white px-6 py-2 transition-all hover:bg-blue-50 hover:text-blue-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Return to Dashboard
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
