/**
 * AmbientOrbs.tsx
 * Layer 2 — three large, softly blurred gradient orbs that drift on independent infinite
 * loops. The third orb (center) is reactive: it shifts toward emerald while the copilot is
 * listening, pulses cyan while processing, and re-centers behind the document viewer panel
 * when a document is being inspected.
 */
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AIActivityState } from '@/types/background';

interface AmbientOrbsProps {
  aiState: AIActivityState;
  opacity?: number;
  focalPoint?: { xRatio: number; yRatio: number } | null;
  className?: string;
}

const ORB_COLORS: Record<AIActivityState, string> = {
  idle: 'radial-gradient(circle at center, rgba(16,185,129,0.55), rgba(16,185,129,0) 70%)',
  listening: 'radial-gradient(circle at center, rgba(16,185,129,0.75), rgba(16,185,129,0) 70%)',
  processing: 'radial-gradient(circle at center, rgba(6,182,212,0.75), rgba(6,182,212,0) 70%)',
  documentUpload: 'radial-gradient(circle at center, rgba(59,130,246,0.65), rgba(59,130,246,0) 70%)',
};

export const AmbientOrbs: React.FC<AmbientOrbsProps> = ({
  aiState,
  opacity = 1,
  focalPoint = null,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const reactiveTarget = focalPoint
    ? { left: `${focalPoint.xRatio * 100}%`, top: `${focalPoint.yRatio * 100}%` }
    : { left: '50%', top: '50%' };

  const reactiveScale =
    aiState === 'listening' ? [1, 1.35, 1] : aiState === 'processing' ? [1, 1.18, 1.05, 1] : [1, 1.1, 1];

  const reactiveDuration = aiState === 'listening' ? 2.4 : aiState === 'processing' ? 3.6 : 10;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 overflow-hidden ${className}`}
      style={{
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 500ms ease',
      }}
    >
      {/* Orb 1 — Top Left, Electric Cyan */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          left: '-8%',
          top: '-10%',
          background:
            'radial-gradient(circle at center, rgba(6,182,212,0.4), rgba(6,182,212,0) 70%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [-50, 50, -50], y: [-30, 40, -30], scale: [1, 1.2, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb 2 — Bottom Right, Royal Blue, opposite phase */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          right: '-10%',
          bottom: '-12%',
          background:
            'radial-gradient(circle at center, rgba(59,130,246,0.35), rgba(59,130,246,0) 70%)',
          filter: 'blur(120px)',
          willChange: 'transform',
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [50, -50, 50], y: [30, -40, 30], scale: [1.15, 0.95, 1.15] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb 3 — Center, reactive to AI state and focal point */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          marginLeft: -250,
          marginTop: -250,
          background: ORB_COLORS[aiState],
          filter: 'blur(120px)',
          willChange: 'transform, left, top',
        }}
        animate={{
          left: reactiveTarget.left,
          top: reactiveTarget.top,
          scale: prefersReducedMotion ? 1 : reactiveScale,
        }}
        transition={{
          left: { type: 'spring', stiffness: 60, damping: 18 },
          top: { type: 'spring', stiffness: 60, damping: 18 },
          scale: prefersReducedMotion
            ? { duration: 0 }
            : { duration: reactiveDuration, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </div>
  );
};

export default AmbientOrbs;
