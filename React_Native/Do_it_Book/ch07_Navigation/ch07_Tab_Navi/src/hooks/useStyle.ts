/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo} from 'react';

export const useStyle = (style: object, deps: any[] = []) => {
  return useMemo(() => style, deps);
};
