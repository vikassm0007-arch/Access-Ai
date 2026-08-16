/**
 * MicroGrid.tsx
 * Layer 3 — a faint technical grid that grounds the interface, with a radial mask so it
 * fades out near the viewport edges, plus periodic vertical "data stream" pulses that sweep
 * down the grid lines to read as live telemetry rather than static wallpaper.
 */
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MicroGridProps {
  opacity?: number;
  streamCount?: number;
  className?: string;
}

const GRID_SIZE = 48; // px between grid lines

export const MicroGrid: React.FC<MicroGridProps> = ({ opacity = 1, streamCount = 7, className = '' }) => {
  const prefersReducedMotion = useReducedMotion();
  const gridId = 'accessai-micro-grid';
  const maskId = 'accessai-micro-grid-fade';

  const streaks = useMemo(() => {
    return Array.from({ length: streamCount }, (_, i) => ({
      id: i,
      leftPercent: 8 + ((i * 84) / Math.max(streamCount - 1, 1)) + (Math.random() * 4 - 2),
      duration: 3 + Math.random() * 2.5,
      delay: Math.random() * 2,
      repeatDelay: Math.random() * 5,
      height: 90 + Math.random() * 120,
    }));
  }, [streamCount]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={{ zIndex: 0, pointerEvents: 'none', opacity, transition: 'opacity 500ms ease' }}
    >
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={gridId} width={GRID_SIZE} height={GRID_SIZE} patternUnits="userSpaceOnUse">
            <path
              d={`M ${GRID_SIZE} 0 L 0 0 0 ${GRID_SIZE}`}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth={1}
            />
          </pattern>
          <radialGradient id={`${maskId}-gradient`} cx="50%" cy="42%" r="75%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill={`url(#${maskId}-gradient)`} />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} mask={`url(#${maskId})`} />
      </svg>

      {!prefersReducedMotion &&
        streaks.map((s) => (
          <motion.div
            key={s.id}
            className="absolute top-0"
            style={{
              left: `${s.leftPercent}%`,
              width: 1,
              height: s.height,
              background:
                'linear-gradient(to bottom, rgba(6,182,212,0) 0%, rgba(6,182,212,0.55) 45%, rgba(16,185,129,0.55) 55%, rgba(16,185,129,0) 100%)',
              willChange: 'transform, opacity',
            }}
            initial={{ y: '-20%', opacity: 0 }}
            animate={{ y: '120vh', opacity: [0, 1, 1, 0] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: s.repeatDelay,
              ease: 'linear',
            }}
          />
        ))}
    </div>
  );
};

export default MicroGrid;
