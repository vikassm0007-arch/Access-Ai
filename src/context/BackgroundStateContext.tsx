/**
 * BackgroundStateContext.tsx
 * Lightweight context so components across ACCESSAI drive the reactive background without prop-drilling.
 */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AIActivityState, BackgroundReactiveState, DEFAULT_BACKGROUND_STATE } from '@/types/background';

interface BackgroundStateContextValue extends BackgroundReactiveState {
  setAIState: (state: AIActivityState) => void;
  setHighContrast: (value: boolean) => void;
  setFocalRect: (rect: BackgroundReactiveState['focalRect']) => void;
}

const BackgroundStateContext = createContext<BackgroundStateContextValue | undefined>(undefined);

export const BackgroundStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [aiState, setAIState] = useState<AIActivityState>(DEFAULT_BACKGROUND_STATE.aiState);
  const [highContrast, setHighContrast] = useState<boolean>(DEFAULT_BACKGROUND_STATE.highContrast);
  const [focalRect, setFocalRect] = useState<BackgroundReactiveState['focalRect']>(
    DEFAULT_BACKGROUND_STATE.focalRect
  );

  const handleSetAIState = useCallback((state: AIActivityState) => setAIState(state), []);
  const handleSetHighContrast = useCallback((value: boolean) => setHighContrast(value), []);
  const handleSetFocalRect = useCallback(
    (rect: BackgroundReactiveState['focalRect']) => setFocalRect(rect),
    []
  );

  const value = useMemo<BackgroundStateContextValue>(
    () => ({
      aiState,
      highContrast,
      focalRect,
      setAIState: handleSetAIState,
      setHighContrast: handleSetHighContrast,
      setFocalRect: handleSetFocalRect,
    }),
    [aiState, highContrast, focalRect, handleSetAIState, handleSetHighContrast, handleSetFocalRect]
  );

  return <BackgroundStateContext.Provider value={value}>{children}</BackgroundStateContext.Provider>;
};

export function useBackgroundState(): BackgroundStateContextValue {
  const ctx = useContext(BackgroundStateContext);
  if (!ctx) {
    throw new Error('useBackgroundState must be used within a <BackgroundStateProvider>');
  }
  return ctx;
}
