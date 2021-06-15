import React from 'react';
import { increase, decrease } from '../modules/counter';
import Counter from '../components/Counter';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onDecrease={onDecrease} onIncrease={onIncrease} />
  );
};

export default React.memo(CounterContainer);
