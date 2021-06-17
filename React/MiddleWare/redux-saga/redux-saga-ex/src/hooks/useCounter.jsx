import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  increaseAsync,
  decreaseAsync,
  increase,
  decrease,
} from '../module/counter';
export function useCounter() {
  const dispatch = useDispatch();
  const number = useSelector((state) => state.counter);
  //   const increase = useSelector((state) => state.increase);
  //   const decrease = useSelector((state) => state.decrease);
  const onClickIncrease = useCallback(
    () => dispatch(increaseAsync()),
    [dispatch]
  );
  const onClickDecrease = useCallback(
    () => dispatch(decreaseAsync()),
    [dispatch]
  );
  return { number, increase, decrease, onClickDecrease, onClickIncrease };
}
