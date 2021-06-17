# redux-saga

- redux-saga 는 제너레이터 함수 문법을 기반으로 비동기 작업을 관리
- redux-saga 는 우리가 디스패치하는 액션을 모니터링해서 그에 따라 필요한 작업을 따로 수행할 수 있는 미들웨어

- 아래와 같은 형식으로 보여주기가 가능하다.

```js
function* watchGen() {
  console.log('모니터링 중');
  let prevAction = null;
  while (true) {
    const action = yield;
    console.log('이전 액션', prevAction);
    prevAction = action;
    if (action.type === 'HELLO') {
      console.log('안녕하세요');
    }
  }
}

const watch = watchGen();
console.log(watch.next());
console.log(watch.next({ type: 'HELLO' }));
console.log(watch.next({ type: 'HELLO' }));
```

## 비동기 카운터 만들기

> yarn add redux-saga
