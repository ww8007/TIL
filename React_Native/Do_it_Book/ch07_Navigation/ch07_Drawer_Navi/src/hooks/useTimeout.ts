import {useEffect} from 'react';

export const useTimeout = (
  callback: () => void,
  duration: number,
  deps: any[] = [],
): void => {
  useEffect(() => {
    if (duration === 0) {
      return;
    }
    const id = setTimeout(callback, duration);
    return () => clearTimeout(id);
  }, [duration, ...deps]);
};
