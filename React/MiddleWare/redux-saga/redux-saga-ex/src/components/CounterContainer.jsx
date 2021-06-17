import React from 'react';
import { useCounter } from '../hooks/useCounter';

const CounterContainer = () => {
  const { number, increase, decrease, onClickIncrease, onClickDecrease } =
    useCounter();

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onClickIncrease}>+1</button>
      <button onClick={onClickDecrease}>-1</button>
    </div>
  );
};

export default CounterContainer;
