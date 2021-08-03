import React from 'react';

interface Props {
  name: string;
  age?: number;
}

export const MyComponent = ({ name, age = 23 }: Props) => {
  const onClickMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
  };
  const onClick2 = (e: MouseEvent) => {
    console.log(e.clientX);
  };
  return (
    <div>
      <p>{name}</p>
      {/* <p>{age.substr(0)}</p> 타입 에러 */}
    </div>
  );
};

export const MyComponent2: React.FunctionComponent<Props> = function ({
  name,
  age = 23,
}) {
  return (
    <div>
      <p>{name}</p>
      {/* <p>{age.substr(0)}</p> 타입 에러 */}
    </div>
  );
};
