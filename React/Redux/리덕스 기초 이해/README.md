# 리덕스 기초 이해

- 소규모 프로젝트에서는 컴포넌트가 가진 state로 만으로도 가능
- 하지만 규모 up -> 리덕스 적용을 고려
- react-redux 에서 제공하는 유틸 함수
  - connect, Provider 사용

## 목차

- [리덕스 기초 이해](#%EB%A6%AC%EB%8D%95%EC%8A%A4-%EA%B8%B0%EC%B4%88-%EC%9D%B4%ED%95%B4)
  - [Ducks 패턴 적용](#ducks-%ED%8C%A8%ED%84%B4-%EC%A0%81%EC%9A%A9)
  - [액션 타입 정의](#%EC%95%A1%EC%85%98-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98)
  - [액션 생성 함수 만들기](#%EC%95%A1%EC%85%98-%EC%83%9D%EC%84%B1-%ED%95%A8%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [초기 상태 및 리듀서 함수 작성](#%EC%B4%88%EA%B8%B0-%EC%83%81%ED%83%9C-%EB%B0%8F-%EB%A6%AC%EB%93%80%EC%84%9C-%ED%95%A8%EC%88%98-%EC%9E%91%EC%84%B1)
  - [초기 상태 및 리듀서 함수 만들기](#%EC%B4%88%EA%B8%B0-%EC%83%81%ED%83%9C-%EB%B0%8F-%EB%A6%AC%EB%93%80%EC%84%9C-%ED%95%A8%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [루트 리듀서 생성](#%EB%A3%A8%ED%8A%B8-%EB%A6%AC%EB%93%80%EC%84%9C-%EC%83%9D%EC%84%B1)
  - [리덕스 적용하기](#%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [스토어 만들기](#%EC%8A%A4%ED%86%A0%EC%96%B4-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용](#provider-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%A0%81%EC%9A%A9)
  - [Redux DevTools 설치 및 사용](#redux-devtools-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%82%AC%EC%9A%A9)
  - [컨테이너 컴포넌트 만들기](#%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [리덕스 더 편하게 사용하기](#%EB%A6%AC%EB%8D%95%EC%8A%A4-%EB%8D%94-%ED%8E%B8%ED%95%98%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [redux-actions](#redux-actions)
  - [counter 모듈에 적용](#counter-%EB%AA%A8%EB%93%88%EC%97%90-%EC%A0%81%EC%9A%A9)
  - [todos 모듈에 적용](#todos-%EB%AA%A8%EB%93%88%EC%97%90-%EC%A0%81%EC%9A%A9)
  - [Hooks를 사용하여 컨테이너 컴포넌트 만들기](#hooks%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
  - [useSelector 로 상태 조회하기](#useselector-%EB%A1%9C-%EC%83%81%ED%83%9C-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B8%B0)
  - [useDispatch 를 사용하여 액션 디스패치](#usedispatch-%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EC%95%A1%EC%85%98-%EB%94%94%EC%8A%A4%ED%8C%A8%EC%B9%98)
  - [useStore를 사용하여 리덕스 스토어 사용하기](#usestore%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EB%A6%AC%EB%8D%95%EC%8A%A4-%EC%8A%A4%ED%86%A0%EC%96%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [useActions 유틸 Hook 만들어서 사용하기](#useactions-%EC%9C%A0%ED%8B%B8-hook-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%84%9C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)%

## Ducks 패턴 적용

- 액션 타입, 액션 생성 함수, 리듀서 함수를 한 파일에 작성

## 액션 타입 정의

- 가장 먼저 해야할 일
- 대문자로 정의
- 문자열 내용 : 모듈이름/액션이름
  - 모듈 이름을 붙이는 이유는 겹치는 것을 고려하기 때문!!!

> 모듈 이름을 붙여서 겹치지 않도록 작성하는 것이 point

```js
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
```

## 액션 생성 함수 만들기

- export를 사용해서 다른 파일에서 불러와서 사용이 가능
- 화살표 함수를 이용해서 생성하도록 한다.

```js
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
```

## 초기 상태 및 리듀서 함수 작성

1. 초기 상태 지정 - initialState

```js
const initialState = {
  number: 0,
};
```

2. 리듀서 함수 작성

- 현재 상태를 참조하여 -> 새로운 객체를 생성해서 반환하는 코드
- 액션 생성 함수는 export 리듀서 export default
  - 이는 여러개 내보내는 것과 한개만 내보내는 차이이다.

```js
function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
}
```

## 초기 상태 및 리듀서 함수 만들기

- 모듈의 초기 상태와 리듀서 함수를 작성
- 업데이트 방식이 조금 까다로워 짐
  - 객체에 한 개 이상의 값이 들어가므로 불변성을 유지시켜줘야 함
  - spread 연산자를 활용해서 작성 (...)

> 불변성 유지

    map, concat, filter를 사용해서 불변성을 유지시키는게 특징이다.

```js
function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}
```

## 루트 리듀서 생성

- createStore 함수를 사용해서 스토어를 만들 때는 리듀서를 하나만 사용해야 함
- 기존에 만들었던 리듀서들을 하나로 만들어주는 작업이 필요
- combineReducers라는 유틸 함수 사용

```js
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers([counter, todos]);

export default rootReducer;
```

## 리덕스 적용하기

- 스토어를 만들고 리액트 애플리케이션에 리덕스를 적용하는 작업은
- src/index.js 에서 이루어짐

## 스토어 만들기

```js
import { createStore } from 'redux';
import rootReducer from './modules/index';

const store = createStore(rootReducer);
```

## Provider 컴포넌트를 사용하여 프로젝트에 리덕스 적용

- 리액트 컴포넌트에서 스토어를 사용할 수 있도록 설정
- react-redux에서 제공하는 Provider 컴포넌트로 감싸줌
- store를 props로 전달해줘야함

```js
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

## Redux DevTools 설치 및 사용

- 크롬에서 확장프로그램을 사용해서 좀 더 편리하게 볼 수 있음

```js
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(rootReducer, composeWithDevTools());
```

## 컨테이너 컴포넌트 만들기

- 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 부름
- 리덕스와 연동을 위해서 react-redux 에서 제공되는 connect 함수를 사용해야 함

```js
connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
```

- mapStateProps : 리덕스 store 안의 상태 -> 컴포넌트의 props
- mapDispatchToProps : 액션 생성 함수 -> 컴포넌트의 props

- connect 함수를 호출하면 또 다른 함수 반환
- 반환된 함수에 컴포넌트 **파라미터**로 넣어주면 리덕스와 연결된 컴포넌트 생성

> connect를 이용해 합친 함수를 이용해서 타깃 컴포넌트를 리덕스와 연결

- 기본적인 connect를 이용해서 컴포넌트 - 리덕스 연결

```js
const mapStateToProps = (state) => ({
  number: state.counter.number,
});
const mapDispatchToProps = (dispatch) => ({
  increase: () => {
    dispatch(increase());
  },
  decrease: () => {
    dispatch(decrease());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
```

- 익명함수를 이용하여 리펙토링

```js
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => ({
    increase: () => dispatch(increase()),
    decrease: () => dispatch(decrease()),
  })
)(CounterContainer);
```

- 익명함수 리펙토링

```js
increase: () => dispatch(increase());
increase: () => {
  return dispatch(increase());
};
```

- bindActionCreators 를 통한 리펙토링

```js
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  (dispatch) => bindActionCreators({ increase, decrease }, dispatch)
)(CounterContainer);
```

- 액션 생헝 함수로 이루어진 객체로 파라미터 지정
  - 매우 간결해지는 장점이 있음
  - connect 함수가 내부적으로 bindActionCreators 작업을 대신 해줌

```js
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  {
    increase,
    decrease,
  }
)(CounterContainer);
```

## 리덕스 더 편하게 사용하기

- 위의 내용들은 다시 리액트를 배우는 입장으로써 너무 난잡하고 어렵게 다가와짐

- redux-actions 라는 라이브러리와 immer 라이브러리 사용해서 더 편하게 작성이 가능

## redux-actions

- 액션 생성 함수를 더 짧은 코드로 작성이 가능
- 리듀서를 작성할 때도 switch/case 문이 아닌 handleActions라는 함수를 사용하여 각 액션 마다 업데이트 함수를 설정하는 형식으로 작성 가능

## counter 모듈에 적용

- 매번 객체를 만들어줄 필요가 없이 간단하게 액션 생성 함수를 선언이 가능

- createAction

```js
import { createAction } from 'redux-actions';
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
```

- handleActions
  - 첫 번째 파라미터에 각 액션에 대한 업데이트 함수
  - 두 번째 파라미터에 초기 상태를 넣어줌

> 코드가 정리되어 initialState가 파라미터 처럼 안보이지만 파라미터가 맞으므로 빼먹지 않도록 한다.

```js
import { handleActions } from 'redux-actions';
const counter = handleActions({
  [INCREASE]: (state, action) => ({
    number: state.number + 1,
  }),
  [DECREASE]: (state, action) => ({
    number: state.number - 1,
  }),
  initialState,
});
```

## todos 모듈에 적용

- 액션 생성 함수에서 파라미터가 필요한 경우

  - 액션에 필요한 추가 데이터는 payload 라는 이름을 사용

- 액션 생성 함수에서 받아 온 파라미터를 변형을 주어서 넣고 싶은경우
  - 두번째 파라미터에 payload를 정의하는 함수로 따로 선언하여 넣어주면 됨

```js
const MY_ACTION = 'sample/MY_ACTION';
const myAction = createAction(MY_ACTION, (text) => `${text}`);
const action = myAction('hello world');
```

- createAction 으로 만든 액션 생성 함수는 파라미터로 받아 온 값을 객체 안에 넣어주는 것이 아닌 action.payload 라는 이름을 공통적으로 넣어줌
- handleActions 라는 의미가 사용된다고 보면 될 것 같음!!!

## Hooks를 사용하여 컨테이너 컴포넌트 만들기

- 리덕스 스토어와 연동된 컨테이너 컴포넌트 만들 때 connect 함수를 사용하는 대신 react-redux에서 제공하는 Hooks를 사용 가능

## useSelector 로 상태 조회하기

- useSelector 훅을 사용하면 connect 함수를 사용하지 않고 리덕스의 상태를 조회 가능

```js
const 결과 = useSelector(상태 선택 함수);
```

```js
import { useSelector, useDispatch } from 'react-redux';
const number = useSelector((state) => state.counter.number);
```

## useDispatch 를 사용하여 액션 디스패치

- 컴포넌트 내부에서 스토어의 내장 함수 dispatch 를 사용할 수 있게 해줌

```js
const dispatch = useDispatch();
dispatch({ type: 'SAMPLE_ACTION' });
```

- 그러나 이렇게만 만들면 리렌더링 될 때 마다 함수가 새롭게 만들어짐
  - 여기서 사용할 수 있는게 useCallback()

```js
import React, { useCallback } from 'react';
const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
```

## useStore를 사용하여 리덕스 스토어 사용하기

- useStore Hooks 를 사용하면 내부에서 리덕스 스토어 객체를 직접 사용 가능
- 직접 스토어에 접근할 일은 흔치 않으니 필요할 때만 사용

```js
const store = useStore();
store.dispatch({ type: 'SAMPLE_ACTION' });
store.getState();
```

## useActions 유틸 Hook 만들어서 사용하기

- useActions는 원래 react-redux에 내장된 상태로 릴리즈될 계획이었으나 개발 팀에서 꼭 필요하지 않다고 생각하여 제외돈 Hook
- 여러 개의 액션을 사용해야 하는 경우 코드를 훨씬 깔끔하게 정리 가능

> Array.isArray -> 배열인지 확인 하는 방법

    typeof 를 사용하면 object가 나오기 때문에 확실하게 확인 불가

- 액션 생성 함수를 액션을 디스패치하는 함수로 변환해줌
- 액션 생성 함수를 사용하여 액션 객체 생성
- 스토어에 디스패치하는 작업을 해주는 함수를 자동으로 생성
