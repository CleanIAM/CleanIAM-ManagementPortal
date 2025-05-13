import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', height = 38 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 120"
      width={height * (38 / 32)}
      height={height}
      className={className}
    >
      {/* Gradients */}
      <defs>
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" /> {/* blue-800 */}
          <stop offset="100%" stopColor="#7C3AED" /> {/* purple-600 */}
        </linearGradient>
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Clean shield shape */}
      <path
        d="M50,10 
               L20,20 
               C15,25 10,35 10,50 
               C10,75 40,105 50,110
               C60,105 90,75 90,50
               C90,35 85,25 80,20
               L50,10Z"
        fill="url(#primaryGradient)"
        filter="url(#dropShadow)"
      />

      {/* Key icon */}
      <g transform="translate(31, 40)">
        {/* Circle head of key */}
        <circle cx="19" cy="10" r="10" fill="white" />

        {/* Key stem */}
        <rect x="17" y="12" width="4" height="30" rx="2" fill="white" />

        {/* Key teeth */}
        <rect x="9" y="30" width="20" height="4" rx="2" fill="white" />
        <rect x="9" y="40" width="15" height="4" rx="2" fill="white" />
      </g>
    </svg>
  );
};
