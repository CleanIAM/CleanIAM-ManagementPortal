import React from 'react';

interface ToggleProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  isChecked, 
  onChange, 
  disabled = false,
  id = "toggle" 
}) => {
  return (
    <div className="relative inline-block h-6 w-12">
      <input 
        type="checkbox" 
        id={id} 
        className="sr-only" 
        checked={isChecked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <label
        htmlFor={id}
        className={`block h-6 w-12 cursor-pointer rounded-full transition-colors ${
          isChecked ? 'bg-green-500' : 'bg-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      ></label>
      <span 
        className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform ${
          isChecked ? 'translate-x-6' : ''
        }`}
      ></span>
    </div>
  );
};
