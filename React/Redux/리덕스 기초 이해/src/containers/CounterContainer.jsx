import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Counter from '../components/Counter';
import { decrease, increase } from '../modules/counter';

const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  return (
    <Counter
      number={number}
      onIncrease={() => dispatch(increase())}
      onDecrease={dispatch(decrease())}
    />
  );
};

export default CounterContainer;
