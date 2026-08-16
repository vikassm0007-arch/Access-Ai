/**
 * BackgroundSystem.tsx
 * Composes InteractiveNeuralMesh (Layer 1), AmbientOrbs (Layer 2), and MicroGrid (Layer 3)
 * into a single fixed backdrop, reacting to aiState, highContrast, and focalRect.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveNeuralMesh } from './InteractiveNeuralMesh';
import { AmbientOrbs } from './AmbientOrbs';
import { MicroGrid } from './MicroGrid';
import { useBackgroundState } from '@/context/BackgroundStateContext';
import { AIActivityState } from '@/types/background';

interface BackgroundSystemProps {
  aiState?: AIActivityState;
  highContrast?: boolean;
  focalRect?: { x: number; y: number; width: number; height: number } | null;
}

export const BackgroundSystem: React.FC<BackgroundSystemProps> = (props) => {
  const ctx = useBackgroundState();
  const aiState = props.aiState ?? ctx.aiState;
  const highContrast = props.highContrast ?? ctx.highContrast;
  const focalRect = props.focalRect !== undefined ? props.focalRect : ctx.focalRect;

  const focalPoint =
    focalRect && typeof window !== 'undefined'
      ? {
          xRatio: (focalRect.x + focalRect.width / 2) / window.innerWidth,
          yRatio: (focalRect.y + focalRect.height / 2) / window.innerHeight,
        }
      : null;

  const decorativeOpacity = highContrast ? 0 : 1;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
        animate={{ backgroundColor: highContrast ? '#000000' : '#0B0F19' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
      >
        <MicroGrid opacity={decorativeOpacity} />
        <AmbientOrbs aiState={aiState} opacity={decorativeOpacity} focalPoint={focalPoint} />
        <InteractiveNeuralMesh aiState={aiState} opacity={decorativeOpacity} />
      </div>
    </>
  );
};

export default BackgroundSystem;
