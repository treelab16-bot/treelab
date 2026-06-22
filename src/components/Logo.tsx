import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
  size?: number;
}

export default function Logo({
  className = '',
  showText = true,
  textColor = 'text-dark-green',
  size = 40
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`} id="treelab-logo">
      {/* SVG Icon of Tree+Lab combining exact visual details of the original design */}
      <svg
        width={size}
        height={size + 6}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Tree growing from the top neck of the flask */}
        <g id="tree-branches" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-green">
          {/* Main trunk bridging beaker opening */}
          <path d="M50 50V35" strokeWidth="3.5" />
          
          {/* Main branches */}
          <path d="M50 38C42 34 35 28 35 20" />
          <path d="M50 38C58 34 65 28 65 20" />
          <path d="M50 30C40 24 45 12 40 5" />
          <path d="M50 30C60 24 55 12 60 5" />
          <path d="M50 25V10" />

          {/* Leaves - Left Side */}
          <path d="M35 20C31 22 26 21 24 16C24 11 29 11 35 20Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M38 12C33 13 29 10 28 5C32 2 36 6 38 12Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M48 10C44 7 44 2 48 0C52 2 52 7 48 10Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M26 28C22 29 18 26 18 20C22 18 25 22 26 28Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M22 38C17 38 14 34 15 29C19 29 21 33 22 38Z" fill="currentColor" fillOpacity="0.85" />

          {/* Leaves - Right Side */}
          <path d="M65 20C69 22 74 21 76 16C76 11 71 11 65 20Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M62 12C67 13 71 10 72 5C68 2 64 6 62 12Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M74 28C78 29 82 26 82 20C78 18 75 22 74 28Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M78 38C83 38 86 34 85 29C81 29 79 33 78 38Z" fill="currentColor" fillOpacity="0.85" />
          
          {/* Small leaves top center */}
          <path d="M43 18C41 14 44 9 48 8C49 12 46 16 43 18Z" fill="currentColor" fillOpacity="0.85" />
          <path d="M57 18C59 14 56 9 52 8C51 12 54 16 57 18Z" fill="currentColor" fillOpacity="0.85" />
        </g>

        {/* Laboratory Flask / Beaker */}
        <g id="flask-beaker">
          {/* Beaker Outline */}
          <path
            d="M40 48H60V66L78.6 94.5C81.2 98.5 78.4 104 73.6 104H26.4C21.6 104 18.8 98.5 21.4 94.5L40 66V48Z"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinejoin="round"
            className="text-dark-green"
          />
          {/* Lip / Rim of Beaker */}
          <path
            d="M37 48H63"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="text-dark-green"
          />
          
          {/* Dots on Beaker Neck (Symmetrical and exactly matching original) */}
          <circle cx="50" cy="53" r="1.5" fill="currentColor" className="text-dark-green" />
          <circle cx="50" cy="57" r="1.5" fill="currentColor" className="text-dark-green" />
          <circle cx="50" cy="61" r="1.5" fill="currentColor" className="text-dark-green" />
          <circle cx="50" cy="65" r="1.5" fill="currentColor" className="text-dark-green" />
          
          {/* Liquid in Beaker bottom */}
          <path
            d="M23.5 98C32 94.5 40 101.5 50 98C60 94.5 68 101.5 76.5 98C77.4 99.4 77.8 101.3 77.1 102.3C76.2 103.5 75.1 103.6 73.6 103.6H26.4C24.9 103.6 23.8 103.5 22.9 102.3C22.2 101.3 22.6 99.4 23.5 98Z"
            fill="currentColor"
            className="text-primary-green"
            opacity="0.9"
          />

          {/* Sprouting Seed/Leaves floating inside the flask liquid */}
          <g transform="translate(46, 82)">
            {/* Small seed circle */}
            <circle cx="4" cy="11" r="2.5" fill="currentColor" className="text-accent-gold" />
            {/* Left sprout leaf */}
            <path d="M4 11C2 9 0 6 1 4C3 4 5 7 4 11Z" fill="currentColor" className="text-accent-gold" />
            {/* Right sprout leaf */}
            <path d="M4 11C6 9 8 6 7 4C5 4 3 7 4 11Z" fill="currentColor" className="text-accent-gold" />
          </g>
        </g>
      </svg>
      
      {showText && (
        <div className="flex flex-col select-none">
          <span className={`font-serif text-xl font-bold tracking-tight ${textColor} leading-none`}>
            TREE LAB
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] font-mono text-accent-gold font-semibold leading-none mt-1">
            GROW SMARTER
          </span>
        </div>
      )}
    </div>
  );
}
