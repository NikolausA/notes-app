import { useEffect } from 'react';
import { useTimeout } from './use-timeout';

export const useDebounce = (cb: () => void, delay: number, dependencies: any[]) => {
  const { reset, clear } = useTimeout(cb, delay);

  useEffect(reset, [...dependencies, reset]);
  useEffect(() => clear(), []);
};
