import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useBackgroundState } from '@/context/BackgroundStateContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const MouseAnimation: React.FC = () => {
  const { highContrast } = useBackgroundState();
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics springs for trailing outer ring
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop mouse devices (not touch devices)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let particleId = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if mouse is hovering an interactive element (button, link, input, card)
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }

      // Spawn trailing particle sparks on swift mouse move
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 15 && Math.random() > 0.4) {
        lastX = e.clientX;
        lastY = e.clientY;
        const newParticle: Particle = {
          id: particleId++,
          x: e.clientX + (Math.random() * 12 - 6),
          y: e.clientY + (Math.random() * 12 - 6),
          size: Math.random() * 4 + 2,
          color: Math.random() > 0.5 ? '#06B6D4' : '#10B981',
        };

        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  // Hide when in high contrast mode or when mouse is off-screen
  if (highContrast || !isVisible) return null;

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Outer Trail Glow Ring with Spring Physics */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/40 pointer-events-none mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 52 : isMouseDown ? 28 : 36,
          height: isHovered ? 52 : isMouseDown ? 28 : 36,
          backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.15)' : 'rgba(6, 182, 212, 0.05)',
          borderColor: isHovered ? 'rgba(16, 185, 129, 0.8)' : 'rgba(6, 182, 212, 0.4)',
          boxShadow: isHovered
            ? '0 0 25px rgba(6, 182, 212, 0.6), inset 0 0 15px rgba(16, 185, 129, 0.4)'
            : '0 0 12px rgba(6, 182, 212, 0.2)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* 2. Inner Precise Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 pointer-events-none shadow-lg shadow-cyan-500/50"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isMouseDown ? 0.7 : isHovered ? 1.4 : 1,
          width: 8,
          height: 8,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* 3. Trailing Particle Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed top-0 left-0 rounded-full pointer-events-none"
          initial={{ x: p.x, y: p.y, opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2, y: p.y + 15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setParticles((prev) => prev.filter((item) => item.id !== p.id));
          }}
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 8px ${p.color}`,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}
    </div>
  );
};
