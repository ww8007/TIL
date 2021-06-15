import React from 'react';
import {
  increase,
  decrease,
  increaseAsync,
  decreaseAsync,
} from '../modules/counter';
import Counter from '../components/Counter';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increaseAsync()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decreaseAsync()), [dispatch]);
  return (
    <Counter number={number} onDecrease={onDecrease} onIncrease={onIncrease} />
  );
};

export default React.memo(CounterContainer);
