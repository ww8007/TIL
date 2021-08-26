import {useState, useEffect, useCallback} from 'react';

export const useAsync = <T>(
  asyncCallback: () => Promise<T>,
  deps: any[] = [],
): [Error | null, () => void] => {
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    asyncCallback().catch(setError);
  }, deps);
  const resetError = useCallback(() => setError(notUsed => null), []);
  return [error, resetError];
};
