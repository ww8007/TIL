# 제너레이터 함수

- redux-saga 에서 이용되는 문법 중 하나
- ES6 제너레이터(generator) 함수 문법 사용

```js
function weirdFunction() {
  return 1;
  return 2;
  return 3;
  return 4;
  return 5;
}
```

- 하나의 함수에서 여러개 반환 하는 것은 -> 불가능

> but Generator -> 이를 가능하게 만든다.

- 제너레이터가 처음 만들어지면 함수의 흐름은 멈춰있는 상태
  - console.log()로 찍어도 아무것도 안나오는 이유가 여기 있음
- next() 가 호출 되면 다음 yield가 있는 곳 까지 다시 함수가 멈춤
- 제너레이터를 함수를 이용하면 함수를 도중에 멈출 수 있고
- 순차적으로 여러 값을 반환시킬 수 있음
- next 함수에 파라미터를 넣으면 제너레이터 함수에서 yield를 사용해서 해당 값 조회 가능

```js
function* sumGenerator() {
  console.log('sumGenerator 생성');
  let a = yield;
  let b = yield;
  yield a + b;
}
const sum = sumGenerator();
console.log(sum.next());
console.log(sum.next(1));
console.log(sum.next(2));
console.log(sum.next());
```
