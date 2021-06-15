# 미들웨어 직접 만들어보기

- API 서버를 연동 할 때 API 요청에 대한 상태를 잘 관리해야 함
- 요청이 시작 될 때 로딩 중
  - 요청이 시작되었을 때 : 로딩중
  - 요청이 성공하면 서버에서 받아 온 응답에 대한 상태 관리

## 작업 환경 준비

yarn add redux react-redux redux-actions

> 루트 리듀서 작성할 때 유의 사항

    combineReducers 로 묶을 때 배열([])이 아닌 객체({}) 형식으로 묶도록 한다.

- 간단한 카운터 구현 완료

## 미들웨어란

- 액션을 디스패치 했을 때 이를 처리하기 앞서 사전에 지정된 작업들을 실행

  - 미들웨어는 액션과 리듀서 사이의 중간자

- 액션 -> 미들웨어 -> 리듀서 -> 스토어

- 리듀서가 액션을 처리하기 전 미들웨어가 할 수 있는 작업은 여러가지가 존재
  1. 전달받은 액션을 단순히 콘솔에 기록
  1. 전달받은 액션 정보를 기반으로 액션을 취소하거나
  1. 전달받은 액션 기반으로 다른 종류의 액션을 추가로 dispatch

## 미들웨어 만들기

- 실제 프로젝트를 작업할 때 미들웨어를 직접 만들어서 사용할 일은 그리 많지 않음
- 다른 개발자가 만들어 놓은 미들웨어를 사용하면 됨
- 미들웨어의 작동방식을 이해하는 것이 이 학습의 목표
- 원하는 미들웨어를 찾을 수 없거나 기존 미들웨어를 커스터 마이징 해서 사용 가능

```js
const loggerMiddleware = (store) => (next) => (action) => {
  //미들웨어의 기본 구조
};
```

> 미들웨어 : 함수를 반환하는 함수를 반환하는 함수

    store : 리덕스 스토어 인스턴지
    action : dispatch 된 액션

- next : 함수 형태

  - store.dispatch 와 비슷한 역할을 수행

- next(action)을 호출하면 그 다음 처리해야 할 미들웨어에게 액션을 넘겨주고
- 그 다음 미들웨어가 없다면 리듀서에게 넘겨줌

> next(action)

    1. 다음 처리해야 할 미들웨어에게 액션 전달
    1. 없다면 -> 리듀서

- 액션 -> 미들웨어1 -> next -> 미들웨어2 -> next -> 리듀서 -> 스토어

> 미들웨어 내부에서 store.dispatch 를 사용하면 첫 번째 미들웨어 부터 다시 처리

- next를 사용하지 않으면 액션이 리듀서에게 전달되지 않음
  - 액션이 무시됨

## 비동기 작업을 처리하는 미들웨어 사용

- 오픈 소스 커뮤니티에 공개된 미들웨어를 사용하여 비동기 작업 관리

1. redux-thunk
   - 비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어
   - 객체가 아닌 함수 형태의 액션을 디스패치 할 수 있게 해줌
2. redux-saga
   - 특정 액션이 디스패치되었을 때 정해진 로직에 따라 다른 액션을 디스패치 시키는 규칙을 작성
   - 비동기 처리 작업을 더 쉽게 해줌

## redux-thunk

- Thunk
  - 특정 작업을 나중에 할 수 있도록 미루기 위해 함수 형태로 감싼 것을 의미

```js
const addOne = (x) => x + 1;
function addOneThunk(x) {
  const thunk = () => addOne(x);
  return thunk;
}

const fn = addOneThunk(1);
setTimeout(() => {
  const value = fn();
  console.log(value);
}, 1000);
```

```js
const addOne = (x) => x + 1;
const addOneThunk = (x = () => addOne(x));

const fn = addOneThunk(1);
setTimeout(() => {
  const value = fn(); // fn이 실행되는 시점에 연산이 됨
  console.log(value);
}, 1000);
```

- 위와 같은 형식으로 특정 작업을 나중에 하도록 설정

## 미들웨어 적용하기

> yarn add redux-thunk

```js
import ReduxThunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));
```

## Thunk 생성 함수 만들기

- redux-thunk는 액션 생성 함수에서 일반 액션 객체를 반환하는 대신에 함수를 반환

```js
export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};

export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};
```

## 웹 요청 비동기 작업 처리하기

- thunk의 속성을 활용하여 웹 요청 비동기 작업을 처리하는 방법
- JSONplaceholder(https://jsonplaceholder.typicode.com)
- 포스트 읽기
  - GET https://jsonplaceholder.typicode.com/posts/:id
