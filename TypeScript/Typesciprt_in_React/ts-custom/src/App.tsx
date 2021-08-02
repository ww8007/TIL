import React, { ReactElement } from 'react';
import { getValue } from './legacy';
import Icon from './icon.jpg';
// window.myValue = 123;
export default function App({
  name,
  age,
}: {
  name: string;
  age: number;
}): ReactElement {
  const value = getValue();
  console.log(value.toFixed(2));
  return (
    <div>
      <img src={Icon} />
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
}
