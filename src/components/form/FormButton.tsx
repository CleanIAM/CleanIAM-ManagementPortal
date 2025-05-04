import React from 'react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  children: React.ReactNode;
}

export const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
  className = '',
  children,
}) => {
  const baseClasses = 'inline-flex justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    danger: 'border-transparent bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const stateClasses = (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${stateClasses} ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center">
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </div>
      ) : children}
    </button>
  );
};
