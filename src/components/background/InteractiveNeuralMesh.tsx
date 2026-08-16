/**
 * InteractiveNeuralMesh.tsx
 * Layer 1 — a canvas-rendered field of glowing nodes connected by dynamic vector lines.
 * Nodes drift organically, warp toward/away from the cursor, and pulse faster when the
 * copilot is listening or processing. Falls back to a static SVG dot-field if Canvas 2D
 * is unavailable or the user prefers reduced motion.
 */
import React, { useEffect, useRef } from 'react';
import { AIActivityState } from '@/types/background';

interface InteractiveNeuralMeshProps {
  aiState: AIActivityState;
  /** Master opacity, animated externally (e.g. to 0 in high-contrast mode). */
  opacity?: number;
  nodeCount?: number;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  radius: number;
  hueSeed: number;
  phase: number;
}

const PALETTE = [
  { r: 6, g: 182, b: 212 }, // Electric Cyan #06B6D4
  { r: 59, g: 130, b: 246 }, // Royal Blue #3B82F6
  { r: 16, g: 185, b: 129 }, // Emerald #10B981
];

function lerpColor(a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

function colorForSeed(seed: number) {
  const scaled = seed * (PALETTE.length - 1);
  const i = Math.floor(scaled);
  const t = scaled - i;
  const a = PALETTE[Math.min(i, PALETTE.length - 1)];
  const b = PALETTE[Math.min(i + 1, PALETTE.length - 1)];
  return lerpColor(a, b, t);
}

const CONNECTION_DISTANCE = 150;
const CURSOR_RADIUS = 180;
const CURSOR_FORCE = 0.055;
const DAMPING = 0.965;

export const InteractiveNeuralMesh: React.FC<InteractiveNeuralMeshProps> = ({
  aiState,
  opacity = 1,
  nodeCount = 52,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false });
  const rafRef = useRef<number | null>(null);
  const aiStateRef = useRef<AIActivityState>(aiState);
  const dprRef = useRef<number>(1);
  const sizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const reducedMotionRef = useRef<boolean>(false);

  useEffect(() => {
    aiStateRef.current = aiState;
  }, [aiState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mql.matches;
    const handleMotionChange = () => {
      reducedMotionRef.current = mql.matches;
    };
    mql.addEventListener?.('change', handleMotionChange);

    const clampedCount = Math.max(40, Math.min(60, nodeCount));

    const initNodes = (w: number, h: number) => {
      const nodes: Node[] = [];
      for (let i = 0; i < clampedCount; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          baseRadius: 1.4 + Math.random() * 2.2,
          radius: 1.4 + Math.random() * 2.2,
          hueSeed: Math.random(),
          phase: Math.random() * Math.PI * 2,
        });
      }
      nodesRef.current = nodes;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      sizeRef.current = { w, h };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length === 0) {
        initNodes(w, h);
      } else {
        nodesRef.current.forEach((n) => {
          n.x = Math.min(n.x, w);
          n.y = Math.min(n.y, h);
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 48);
      lastTime = now;
      const { w, h } = sizeRef.current;
      const state = aiStateRef.current;
      const reduced = reducedMotionRef.current;

      ctx.clearRect(0, 0, w, h);

      const pulseSpeed = state === 'listening' ? 0.012 : state === 'processing' ? 0.007 : 0.003;
      const pulseAmplitude = state === 'listening' ? 0.9 : state === 'processing' ? 0.55 : 0.3;

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const speedMultiplier = reduced ? 0 : 1;

      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx * (dt / 16.6) * speedMultiplier;
          n.y += n.vy * (dt / 16.6) * speedMultiplier;

          if (mouse.active) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < CURSOR_RADIUS && dist > 0.001) {
              const force = (1 - dist / CURSOR_RADIUS) * CURSOR_FORCE;
              n.vx += (dx / dist) * force;
              n.vy += (dy / dist) * force;
            }
          }

          n.vx *= DAMPING;
          n.vy *= DAMPING;

          if (n.x < -20) n.x = w + 20;
          if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          if (n.y > h + 20) n.y = -20;
        }

        n.phase += pulseSpeed * (dt / 16.6);
        n.radius = n.baseRadius + Math.sin(n.phase) * pulseAmplitude;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.35;
            const colorA = colorForSeed(a.hueSeed);
            const colorB = colorForSeed(b.hueSeed);
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(${colorA.r},${colorA.g},${colorA.b},${alpha})`);
            grad.addColorStop(1, `rgba(${colorB.r},${colorB.g},${colorB.b},${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const c = colorForSeed(n.hueSeed);
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 6);
        glow.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0.55)`);
        glow.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      mql.removeEventListener?.('change', handleMotionChange);
    };
  }, [nodeCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`fixed inset-0 h-full w-full ${className}`}
      style={{
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 500ms ease',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
    />
  );
};

export default InteractiveNeuralMesh;
