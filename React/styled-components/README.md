# Styled-components

- Css-in-Js 라고 부름
- emotion 도 이와 비슷한 맥락
- 자바스크립트 파일 하나에 스타일까지 작성할 수 있기 때문에 .css, .cscc를 따로 만들지 않아도 된다는 장점

> styled-components 의 가장 큰 장점은 props로 전달해주는 값을 쉽게 스타일에 적용이 가능하다는 점

## Tagged 템플릿 리터럴

- 스타일을 작성할 때 `을 사용해서 문자열에 스타일 정보를 넣어줌
- 일반 템플릿 리터럴과 다른 점
  - 템플릿 안에 자바스크립트 객체나 함수를 전달할 때 온전히 추출 가능

> 일반적으로 템플릿에 객체를 넣거나 함수를 넣으면 형태를 잃어버림
> 그러나 함수를 작성하고 함수 뒤에 템플릿 리터럴을 넣어주면 템플릿 안에 넣은 값을 온전하게 추출 가능

```js
function tagged(...args) {
  console.log(args);
}
togged`hello ${{ foo: 'bar' }} ${() => 'world'}!`;
```

## 스타일링된 엘리먼트 만들기

> 컴포넌트 파일의 상단에서 styled 불러오고 styled.태그명 사용하여 구현

- 사용해야 할 태그명이 유동적이거나 특정 컴포넌트 자체에 스타일 하고 싶은 경우

```js
// 태그의 타입을 styled 함수의 인자로 전달
const MyInput = styled('input')`
  background: gray;
`;
// 아예 컴포넌트 형식의 값을 넣어 줌
const StyledLink = styled(Link)`
  color: blue;
`;
```

- 컴포넌트를 styled의 파라미터에 넣는 경우 해당 컴포넌트에 className props를 최상위 DOM의 className 값으로 설정하는 작업이 내부적으로 되어 있어야함

```js
import React from 'react';

const Sample = ({ className }) => {
  return <div className={className}>Sample</div>;
};

export default Sample;
```

## 스타일에서 props 적용하기

- styled-components 를 사용하면 스타일 쪽에서 컴포넌트에게 전달된 props 값을 참조가 가능하다.

```js
const Box = styled.div`
  background: ${(props) => props.color || 'blue'};
`;
```

## props에 따른 조건부 스타일링

- 일반 css 클래스를 사용하면 className을 사용해서 조건부 스타일링을 했지만
- styled 에서는 props로 간단하게 조건부 렌더링 가능

> 스타일 코드 여러 줄을 props에 따라 넣어 주어야 할 경우

    css 를 styled-components 에서 불러와야함
    물론 그냥 css 를 사용하지 않아도 동작하지만
    syntax highlighting이 동작하지 않기 때문에 css 추가 해주도록 한다.
    가장 치명적 단점 : props 사용 불가

```js
const Box = styled.div`
  background: ${(props) => props.color || 'blue'};

  ${(props) =>
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `}
`;
```

## 반응형 디자인

- media 쿼리를 사용해서 적용

```css
width: 1024px;
margin: 0 auto;
@media (max-width: 1024px) {
  width: 768px;
}
@media (max-width: 768) {
  width: 100%;
}
```
