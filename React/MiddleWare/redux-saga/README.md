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

> takeEvery

    들어오는 모든 액션에 대해 특정 작업을 처리해 줌

1. 액션 타입 선언

- saga 함수에 사용할 액션과
- 비동기 처리를 위한 Saga에 대한 액션을 둘 다 선언해줘야 한다.

```js
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECEASE_ASYNC = 'counter/DECREASE_ASYNC';
```

2. createAction을 이용해서 액션 생성

> saga 타입은 마우스 클릭이 payload 로 잡힐 수 있기 때문에 이를 유의해야함

```js
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECEASE_ASYNC, () => undefined);
```

3. Saga 함수 생성

- rootReducer를 이용해서 통합 관리를 위해서 saga를 내보낸다.

```js
function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(increase());
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takLatest(DECEASE_ASYNC, decreaseSaga);
}
```

## rootSaga 등록

```js
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './counter';

const rootReducer = combineReducers({
  counter,
});
export function* rootSaga() {
  yield all([counterSaga()]);
}

export default rootReducer;
```

## API 요청 상태 관리하기

- counter 에서 하던 방식과 동일하다.
- 다른 점은 generator 함수를 이용해서 함수를 생성 한다는 점 이다.

> call

    Promise 를 반환하는 함수를 호출하고 기다릴 수 있음
    첫 번째는 파라미터 함수, 나머지는 파라미터에는 해당 함수에 넣을 인수

- saga 함수 생성
  - startLoading, endLoading을 다른 모듈로 생성해서 로딩의 시작과 끝을 알리는 용으로 사용한다.

```js
function* getPostSaga(action) {
  yield put(startLoading(GET_POST));
  try {
    const post = yield call(api.getPost, action.payload);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(endLoading(GET_POST));
}
```
