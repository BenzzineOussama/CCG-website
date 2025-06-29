'use client'

import React from 'react'

interface LogoProps {
  className?: string
  variant?: 'full' | 'icon'
  width?: number
  height?: number
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'full',
  width = 200,
  height = 60 
}) => {
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <svg 
          width={width} 
          height={height} 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="16" cy="16" r="16" fill="#22C55E"/>
          <path d="M16 6C16 6 8 14 8 18.5C8 23 11.5 26 16 26C20.5 26 24 23 24 18.5C24 14 16 6 16 6Z" fill="white"/>
          <path d="M16 8C16 8 10 14.5 10 18.5C10 21.5 12.5 24 16 24C19.5 24 22 21.5 22 18.5C22 14.5 16 8 16 8Z" fill="#E5E7EB" opacity="0.3"/>
          <circle cx="13" cy="18" r="2" fill="white" opacity="0.7"/>
        </svg>
      </div>
    )
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 200 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g id="logo-group">
          <path d="M 25 5 L 45 5 L 55 20 L 45 35 L 25 35 L 15 20 Z" fill="#22C55E" opacity="0.1"/>
          
          <g transform="translate(30, 12)">
            <path d="M10 0C10 0 0 10 0 15C0 20 4.5 24 10 24C15.5 24 20 20 20 15C20 10 10 0 10 0Z" fill="#22C55E"/>
            <path d="M10 3C10 3 3 11 3 15C3 18.5 6 21 10 21C14 21 17 18.5 17 15C17 11 10 3 10 3Z" fill="#1DB954"/>
            <circle cx="7" cy="14" r="2" fill="white" opacity="0.6"/>
          </g>
          
          <g id="company-name">
            <path d="M 70 20 Q 70 10, 80 10 L 85 10 L 85 14 L 80 14 Q 74 14, 74 20 L 74 25 Q 74 31, 80 31 L 85 31 L 85 35 L 80 35 Q 70 35, 70 25 Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
            <rect x="90" y="22" width="8" height="3" fill="#22C55E"/>
            <path d="M 103 20 Q 103 10, 113 10 L 118 10 L 118 14 L 113 14 Q 107 14, 107 20 L 107 25 Q 107 31, 113 31 L 118 31 L 118 35 L 113 35 Q 103 35, 103 25 Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
            <rect x="123" y="22" width="8" height="3" fill="#22C55E"/>
            <path d="M 136 20 Q 136 10, 146 10 L 151 10 L 151 14 L 146 14 Q 140 14, 140 20 L 140 25 Q 140 31, 146 31 L 150 31 L 150 23 L 146 23 L 146 19 L 154 19 L 154 35 L 146 35 Q 136 35, 136 25 Z" fill="currentColor" stroke="currentColor" strokeWidth="0.5"/>
          </g>
          
          <text x="70" y="48" fontFamily="Arial, sans-serif" fontSize="8" fill="#6B7280" letterSpacing="1">
            PLOMBERIE • CHAUFFAGE • CLIMATISATION
          </text>
          
          <rect x="70" y="52" width="110" height="1" fill="#22C55E" opacity="0.5"/>
        </g>
      </svg>
    </div>
  )
}

export default Logo