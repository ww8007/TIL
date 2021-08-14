import {useState, useCallback} from 'react';

export function useToggle(
  initialValue: boolean = false,
  deps: any[] = [],
): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toggleValue = useCallback(() => setValue(value => !value), deps);
  return [value, toggleValue];
}
