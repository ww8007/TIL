# 미들웨어 직접 만들어보기

- API 서버를 연동 할 때 API 요청에 대한 상태를 잘 관리해야 함
- 요청이 시작 될 때 로딩 중
  - 요청이 시작되었을 때 : 로딩중
  - 요청이 성공하면 서버에서 받아 온 응답에 대한 상태 관리

## 목차

- [미들웨어 직접 만들어보기](#%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EA%B8%B0)
  - [작업 환경 준비](#%EC%9E%91%EC%97%85-%ED%99%98%EA%B2%BD-%EC%A4%80%EB%B9%84)
  - [미들웨어란](#%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4%EB%9E%80)
  - [미들웨어 만들기](#%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [비동기 작업을 처리하는 미들웨어 사용](#%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%9E%91%EC%97%85%EC%9D%84-%EC%B2%98%EB%A6%AC%ED%95%98%EB%8A%94-%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EC%82%AC%EC%9A%A9)
  - [redux-thunk](#redux-thunk)
  - [미들웨어 적용하기](#%EB%AF%B8%EB%93%A4%EC%9B%A8%EC%96%B4-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [Thunk 생성 함수 만들기](#thunk-%EC%83%9D%EC%84%B1-%ED%95%A8%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [웹 요청 비동기 작업 처리하기](#%EC%9B%B9-%EC%9A%94%EC%B2%AD-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%9E%91%EC%97%85-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)%

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

> axios 를 사용하므로 axios를 설치해준다.

    yarn add axios

1. 액션 타입 선언

```js
// 액션 타입 선언
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';
```

2. thunk 함수 생성

```js
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); //요청 시작 알림
  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      typ: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};
```

3. 액션 생성함수 생성 - with handleActions

- 성공과 실패 상태에 따라서 다른 결과를 도출하도록 작성한다.
- loading 상태를 두어서 데이터가 통신 중인지 아니면 결과가 나온 값인지에 대한 판단을 하도록 도와준다.

```js
const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true,
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false,
      },
    }),
  },
  initialState
);
```

4. 컨테이너 컴포넌트 생성

> 이 과정에서는 로딩중 인지 아닌지에 대한 판별이 되게 중요하다.

    이 과정을 빼 먹는 경우가 있는데 비동기 처리 이기 때문에 이를 표현 시켜주는 것은 매우 중요한 과정이므로 잘 알아두도록 한다.

5. createRequestThunk Hook 생성

- 매 번 thunk 함수를 작성하는 것과 로딩 상태를 리듀서에서 관리하는 작업은 귀찮을 뿐 만 아니라 코드를 길어지게 만든다. 그러므로 따로 분ㄴ리해서 관리하도록 생성

```js
export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      throw e;
    }
  };
}
// 사용법 : createRequestThunk('GET_USERS', api.getUsers)
```
