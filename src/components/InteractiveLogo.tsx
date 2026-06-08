import React, { useRef, useState } from 'react';

export default function InteractiveLogo() {
  const logoRef = useRef<SVGSVGElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
    
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  return (
    <svg
      ref={logoRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-12 h-12 cursor-pointer transition-transform duration-300 ease-out"
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
      }}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Continuously spinning segmented outer ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="url(#gradient)" 
        strokeWidth="4" 
        strokeDasharray="70 30"
        strokeLinecap="round"
        className="opacity-80 origin-center animate-[spin_8s_linear_infinite]" 
      />
      
      {/* Subtle static inner ring for depth */}
      <circle cx="50" cy="50" r="35" stroke="#27272a" strokeWidth="1" className="opacity-50" />
      
      <text 
        x="50%" 
        y="54%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fill="white" 
        fontSize="36" 
        fontWeight="700" 
        fontFamily="system-ui, sans-serif"
        letterSpacing="-1"
      >
        AH
      </text>

      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
    </svg>
  );
}