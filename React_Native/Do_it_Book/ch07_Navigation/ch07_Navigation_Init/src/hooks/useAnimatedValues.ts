/* eslint-disable react-hooks/exhaustive-deps */
import {useMemo} from 'react';
import {Animated} from 'react-native';

const makeArray = (length: number) => new Array(length).fill(null);

export const useAnimatedValues = (length: number, initialValue: number = 0) => {
  return useMemo(
    () => makeArray(length).map(() => new Animated.Value(initialValue)),
    [],
  );
};
