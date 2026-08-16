/**
 * background.ts
 * Shared types for the ACCESSAI multi-layer animated background system.
 */

/** Discrete states the copilot can be in, used to drive background reactivity. */
export type AIActivityState = 'idle' | 'listening' | 'processing' | 'documentUpload';

/** Props shared by every background layer so they all react to the same state. */
export interface BackgroundReactiveState {
  /** Current AI/interaction state — drives color shifts, pulse speed, and focal point. */
  aiState: AIActivityState;
  /** High-contrast accessibility mode — when true, all decorative layers fade to zero. */
  highContrast: boolean;
  /** Optional bounding rect (in viewport px) of the active focal panel, e.g. the document
   *  inspector, so ambient light can shift focus behind it. Omit to keep the default layout. */
  focalRect?: { x: number; y: number; width: number; height: number } | null;
}

export const DEFAULT_BACKGROUND_STATE: BackgroundReactiveState = {
  aiState: 'idle',
  highContrast: false,
  focalRect: null,
};
