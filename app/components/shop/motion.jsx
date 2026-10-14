import React from 'react';

/**
 * HoneycombPattern — seamless hexagonal tiling background
 * Used across the shop experience (SnapSqueezeSip, AppleLogoReveal, etc.)
 */
export function HoneycombPattern({
  id = 'honeycomb-pattern',
  size = 28,
  opacity = 0.1,
  color = '#c87a1e',
  className = 'absolute inset-0 w-full h-full pointer-events-none',
}) {
  const w = size * Math.sqrt(3);
  const h = size * 3;
  const halfW = w / 2;
  const quarterH = size / 2;
  const threeQuarterH = size * 1.5;

  return (
    <svg className={className} aria-hidden="true" width="100%" height="100%">
      <defs>
        <pattern
          id={id}
          width={w}
          height={h}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`
              M ${halfW} 0 
              L ${w} ${quarterH} 
              L ${w} ${threeQuarterH} 
              L ${halfW} ${2 * size} 
              L 0 ${threeQuarterH} 
              L 0 ${quarterH} 
              Z
              M 0 ${2 * size} 
              L ${halfW} ${2.5 * size} 
              L ${halfW} ${3 * size}
              M ${w} ${2 * size} 
              L ${halfW} ${2.5 * size}
              M ${halfW} 0 
              L ${halfW} ${-quarterH}
            `}
            fill="none"
            stroke={color}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default HoneycombPattern;
