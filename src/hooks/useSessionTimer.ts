// src/hooks/useSessionTimer.ts
import { useState, useEffect, useCallback } from 'react';

export function useSessionTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const reset = useCallback(() => {
    setSeconds(0);
  }, []);

  return {
    seconds,
    reset,
  };
}