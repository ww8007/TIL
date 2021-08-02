import React, { ReactElement } from 'react';

export default function App({
  name,
  age,
}: {
  name: string;
  age: number;
}): ReactElement {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
}
