import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = (cb: () => void, delay: number) => {
  const cbRef = useRef(cb);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    cbRef.current = cb;
  }, [cb]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => cbRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    set();

    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { clear, reset };
};
