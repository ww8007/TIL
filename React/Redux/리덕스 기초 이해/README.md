# 리덕스 기초 이해

- 소규모 프로젝트에서는 컴포넌트가 가진 state로 만으로도 가능
- 하지만 규모 up -> 리덕스 적용을 고려
- react-redux 에서 제공하는 유틸 함수
  - connect, Provider 사용

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
