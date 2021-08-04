# 리덕스로 상태 관리하기

- `리덕스`는 Js를 위한 `상태 관리 프레임워크`
- 리액트를 사용하는 많은 프로젝트에서 사용됨

- 이유
  1. `컴포넌트 코드`로부터 `상태 관리 코드 분리` 가능
  2. `서버 렌더링` 시 `데이터 전달`이 편함
  3. `로컬 스토리지`에 `데이터 저장` 및 `불러오는` 코드를 `쉽게` 작성
  4. `같은 상태값`을 `다수의 컴포넌트`에서 불러오기 좋음
  5. `부모 컴포넌트`에서 `깊은 곳`에 있는 `자식 컴포넌트`에게 전달 좋음
  6. `알림창`과 같은 `전역 컴포넌트 상태값` 관리
  7. `페이지가 전환`되어도 `데이터는 살아` 있어야 할 때 좋음

## 리덕스 사용 시 따라야 할 세 가지 원칙

1. `전체 상태값`을 하나의 객체에 저장
2. `상태값`은 `불변 객체`
3. `상태값`은 `순수 함수 함수에 의해서만 변경`

### 하나의 객체에 프로그램 전체 상태값 저장

- `전체 상태값`이 `하나의 자바스크립트 객체`로 표현되기 때문에 활용도가 높아짐
- 리덕스를 사용하면 `하나의 객체`를 `직렬화(serialize)` 해서

  - -> 서버와 클라이언트가 `전체 상태값`을 주고 받을 수 있음

- 프로그램이 특정한 상태에 있을 때 발생하는 버그를 확인하기 위해 저장

  - -> `반복해서 재현` 가능
  - -> 상태값 버리지 않고 `저장`시
    - -> `실행 취소(undo)`
    - -> `다시 실행(redo)` 가능

- 그러나 상태값을 리덕스로 관리하는 것은 쉬운일이 아님
- `애니메이션`을 위한 데이터나 `문자열 입력`창의 상태값은 `컴포넌트에서 관리`하는게 좋을 수 있음
- `로직이 간단` -> 리덕스를 `사용하지 않는`게 좋을 수 있음

### 상태값을 불변객체로 관리

```js
const incrementAction = {
  type: 'INCREMENT', // -1-
  amount: 123, // -2-
};
const conditionalIncrementAction = {
  type: 'CONDITIONAL_INCREMENT', // -1-
  //-2-
  amount: 2,
  gt: 10,
  lt: 100,
  // -2-
};
store.dispatch(incrementAction); // -3-
store.dispatch(conditionalIncrementAction); // -3-
```

1. `액션 객체`는 `type 속성값`이 존재해야함
   - `type 속성값`으로 `액션 객체`를 구분
2. `type 속성값`을 제외한 나머지는 상태값을 수정하기 위해 사용하는 정보
3. `액션 객체`와 함께 `dispatch` 메서드를 호출하면 상태값이 변경

- 리덕스의 `상태값을 수정하는 유일한 방법` `액션 객체와 함께 dispatch 메서드를 호출`하는 것
- 다른 `어떤 방법`으로도 상태값을 `절대 수정하면 안됨`

- 상태값은 `dispatch 메서드가 호출된 순서`대로 `리덕스 내부`에서 변경

  - -> 우리가 `실행 순서를 보장` 받을 수 있고 `그 과정을 쉽게 이해`가능

- 또한 `액션 객체는 평범한 자바스크립트 객체`이기 때문에 `입력된 순서를 저장`해놓고

  - -> `그 과정을 쉽게 재현 가능`

- 상태값 수정이라는 하나의 목표를 보면 불변을 굳이 사용해야 하나? 의문점 가질 수 있음

  - -> 그러나 `이전 상태값과` `이후 상태값을 비교`해서 변경 여부 파악에서는 `불변 객체가 유리`

- 상태값 변경을 빠르게 확인할 수 있으면 `메모이제이션`과 같은 기능 활용 좋음
- `렌더링 속도` 올리는데 유리

### 오직 순수 함수에 의해서만 상태값을 변경해야 한다.

- 리덕스에서 `상태값을 변경하는 함수`를 `리듀서(reducer)`라고 부름
- `리듀서`의 구조

  ```js
  (state, action) => nextState;
  ```

- `리듀서`는 `이전 상태값`과 `액션 객체`를 `입력으로 받아`서 `새로운 상태값 생성`

  - -> 순수함수!!!

- `순수 함수`는 `부수 효과(side effect)`를 발생시키지 않아야 함
  - -> `부수효과` : 전역 변수 값 수정, API 요청 등의 `함수 외부의 상태를 변경`시키는 것
- `순수 함수`는 `같은 인수`에 대해서 `항상 같은 값을 반환`해야함
  - -> `반환값`을 계산할 때 `랜덤 함수`나 `시간 함수`를 이용하면 순수 함수가 아님
  - -> `리듀서` 내부에 setTimeout이나 시간, 랜덤 이용하지 않도록 함

```js
// 장동현님 안녕하세요. 지금은 10시 30분 입니다. // -1-
sayHello1('장동현');
sayHello2('장동현', '10:30');
```

1. 두 함수는 주석의 내용과 `같은 문자열을 반환`
2. sayHello1 함수는 내부적으로 시간 함수 호출하기 때문에 순수 함수가 아니다.
   - `같은 인수`를 입력해도 `호출 시점` 따라서 `다른 값 출력`되기 때문에

> 순수 함수의 또 다른 장점은 테스트 코드 작성이 쉬움

```js
// -1-
const now = new Date();
const hour = now.getHours();
const minute = now.getMinutes();
expect(sayHello('장동현')toBe(
    `장동현님 안녕하세요. 지금은 ${hour}시 ${minute}분입니다.`
))
// -1-
// -2-
expect(sayHello2('장동현')toBe(
    `장동현님 안녕하세요. 지금은 10시 30분입니다.`
))
// -2-
```

1. sayHello 함수는 내부적으로 현재 시각을 사용하기 때문에 테스트 코드에서도 현재 시간을 가져와야 함
   - 하지만 현재 시각을 가져오는 시점이 서로 다르므로 `간헐적으로 테스트 실패 가능성`
   - `일정 수준의 오차 허용` 가능 -> `번거로움`
2. `순수 함수` 작성 -> `고민 없이 테스트 코드` 작성 가능

- `리듀서는 순수 함수`이기 때문에 `상태값`과 `액션 객체를 입력`하면
  - -> `항상 같은 다음 상태값` 반환
  - -> `실행된 액션 객체 순서대로 저장`하고
  - -> 나중에 `똑같은 순서대로 dispatch` 실행하면 `쉽게` `리플레이(replay)` 가능

## 리덕스 주요 개념 이해

- 리덕스의 `상태값이 변경되는 과정`

| 액션 | →   | 미들웨어 | →   | 리듀서 | →   | 스토어 |
| ---- | --- | -------- | --- | ------ | --- | ------ |
| ⬆️   |     | ⬅️       | 뷰  | ⬅️     |     | ⬇️     |

- `뷰`는 리액트의 `컴포넌트`라고 생각할 수 있음
- `상태값을 변경`하는 과정에서 거치게 되는 리덕스의 4가지 요소
  1. 액션
  2. 미들웨어
  3. 리듀서
  4. 스토어 학습

### 액션

- `액션(action)`은 `type 속성`을 가진 `자바스크립트 객체`
- `액션 객체`를 `dispatch 메서드에 넣어서 호출`하면
  - → 리덕스는 `상태값을 변경`하기 위해 위의 표 과정 실행
  - → 액션 객체는 `type 속성 이외에 원하는 속성값` 얼마든지 넣을 수 있음

#### 액션을 발생시키는 예제 코드

```js
store.dispatch({ type: 'ADD', title: '영화 보기', priority: 'hight' }); // -1-
store.dispatch({ type: 'REMOVE', id: 123 });
store.dispatch({ type: 'REMOVE_ALL' });
```

- 각 액션은 `고유한 type 속성값`을 사용 → `Typescript type guard`와 비슷한 역할
  - → `식별가능한 유니온 타입` 이용

1. ADD 라는 단어 하나만으로 충돌을 피하기 위해서는 다음과 같이 `접두사`를 붙이는 방법 많이 사용

```js
store.dispatch({ type: 'todo/ADD', title: '영화 보기', priority: 'hight' }); // -1-
store.dispatch({ type: 'todo/REMOVE', id: 123 });
store.dispatch({ type: 'todo/REMOVE_ALL' });
```

- `dispatch` 메서드를 호출할 때 직접 `액션 객체`를 입력하는 방법은 사용하지 않는게 좋음
  - → 액션 객체 : type 속성값이 존재 해야함
- `todo/App` 액션의 경우 title, priority라는 두 속성값이 항상 존재하도록 강제
  - → `액션 생성자 함수`를 이용해서 해결

##### 액션 생성자 함수의 예

```js
// -1-
function addTodo({ title, priority }) {
  return { type: 'todo/ADD', title, priority };
}
function removeTodo({ id }) {
  return { type: 'todo/REMOVE', id };
}
function removeAllTodo() {
  return { type: 'todo/REMOVE_ALL' };
}
// -1-
// -2-
store.dispatch(addTodo({ title: '영화보기', priority: 'high' }));
store.dispatch(removeTodo({ id: 123 }));
store.dispatch(removeAllTodo());
// -2-
```

1. 세 개의 `액션 생성자 함수`를 정의
   - `액션 생성자 함수`를 `필요한 인수`와 함께 호출하면
   - 항상 같은 구조의 `액션 객체`가 만들어짐
   - 나중에 `액션 객체`의 구조를 변경할 때는 `액션 생성자 함수`만 수정
2. `dispatch 메서드를 호출`할 때는 `액션 생성자 함수`를 이용

- `type 속성값`은 `리듀서`에서 `액션 객체를 구분`할 때도 사용되기 때문에 `상수 변수`로 만드는 것이 좋음

##### 액션 타입 변수로 만들어서 관리하기

```js
// -1-
export const ADD = 'todo/ADD';
export const REMOVE = 'todo/REMOVE';
export const REMOVE_ALL = 'todo/REMOVE_ALL';
// -1-
// -2-
export function addTodo({ title, priority }) {
  return { type: ADD, title, priority };
}
export function removeTodo({ id }) {
  return { type: REMOVE, id };
}
export function removeAllTodo() {
  return { type: REMOVE_ALL };
}
// -2-
```

1. `type 이름`을 `상수 변수`로 생성
   - 위의 변수는 `리듀서`에서도 필요하기 때문에 `export 키워드`를 사용해서 외부에 노출
2. `액션 생성자 함수`도 외부에서 호출해야 하므로 외부로 노출 → dispatch

- 앞에서 살펴본 리덕스 3가지의 원칙에 위배 되지 않음 -> `액션 생성자 함수`에서는 `부수효과` 발생 괜찮

  1. `전체 상태값`을 `하나의 객체`에 저장
  2. `상태값`은 `불변 객체`
  3. `상태값`은 `순수 함수 함수에 의해서만 변경`

- Ex : `addTodo` 함수에서 새로운 할일을 서버에 저장하기 위해 `API 호출 가능`
  - `액션 생성자 함수`에서 API 호출과 같은 비동기 코드 제어 방법 -> 추후에 설명

#### 정리

- `액션객체` : `type 속성`을 가진 자바스크립트 객체
  - `type 속성`으로 구분하여 사용
- 가장 많이 쓰는 액션 생성 방법
  1.  `액션 타입 변수`로 `상수 변수` 생성
      ```js
      export const ADD = 'todo/ADD';
      ```
      -
  2.  `액션 생성자 함수`에 `return 타입`으로 `상수 변수` 삽입 (action constructor function)
      - return 값으로 객체 리턴하면서 `필요한 인수`를 같이 리턴 가능
      - 함수에 인자로 `필요한 인수 받아오도록 export 설정`
      ```js
      export function addTodo({ title, priority }) {
        return { type: ADD, title, priority };
      }
      ```
  3.  dispatch에 `액션 생성자 함수`를 집어넣어서 호출하도록 한다.

### 미들웨어

- `미들웨어(middleware)`는 `리듀서`가 `액션을 처리하기 전`에 실행되는 `함수`
  → `디버깅 목적`으로 `상태값 변경`
  → 리듀서에서 발생한 `예외`를 `서버로 전송`하는 목적으로 이용 가능

- 리덕스 사용시 특별히 `미들웨어 설정하지 않았으면`
  → `액션`은 바로 `리듀서`에게 보내짐

```js
const myMiddleware = (store) => (next) => (action) => next(action);
```

- 미들웨어는 함수 `세 개가 중첩된` 구조로 되어있음
- 화살표 함수가 연속으로 표현된 코드가 익숙치 않으면 헷갈릴 수 있음

#### 화살표 함수 사용하지 않은 미들웨어 코드

```js
const myMiddleware = function (store) {
  return function (next) {
    return function (action) {
      return next(action);
    };
  };
};
```

- 코드에서 알 수 있듯 미들웨어는 `스토어`와 `액션 객체`를 기반으로 필요한 작업 수행 가능
- `next` 함수를 호출하면 `다른 미들웨어 함수가 호출`되면서 `최종적`으로 `리듀서 함수 호출`
  → 위의 코드는 아무런 작업도 하지 않고 `next` 함수를 호출하기 때문에 무의미한 미들웨어 함수

#### 미들웨어 설정법

```js
import { createStore, applyMiddleware } from 'redux';
// -1-
const middleware1 = (store) => (next) => (action) => {
  console.log('미들웨어1 시작');
  const result = next(action);
  console.log('미들웨어1 종료');
  return result;
};

const middleware2 = (store) => (next) => (action) => {
  console.log('미들웨어2 시작');
  const result = next(action);
  console.log('미들웨어2 종료');
  return result;
};
// -1-
// -2-
const myReducer = (state, action) => {
  console.log('나의 리듀서');
  return state;
};
// -2-
const store = createStore(myReducer, applyMiddleware(middleware1, middleware2)); // -3-
store.dispatch({ type: 'someAction' }); // -4-
```

1. 간단한 두 개의 미들웨어 정의
2. 아무 일도 하지 않는 리듀서를 정의
3. applyMiddleware 함수를 이용해서 `미들웨어가 입력된 스토어`를 생성
4. 4번 코드에 의해 출력되는 로그를 순서대로 나열

> 로그

     1. 미들웨어1 시작
     2. 미들웨어2 시작
     3. 나의 리듀서
     4. 미들웨어2 종료
     5. 미들웨어1 종료

1. `middleware1` 미들웨어에서 호출한 `next 함수`
   → `middleware2` `미들웨어 함수` 실행하게 됨
2. `middleware2` 미들웨어에서 호출한 next 함수
   → `스토어`가 원래 갖고 있던 `dispatch 메서드`를 호출
3. `최종적`으로 `스토어의 dispatch` 메서드는 `리듀서`를 호출

- 각 미들웨어는 `리듀서 호출 전후`에 `필요한 작업`을 정의 가능

#### 리덕스의 applyMiddleware 함수

- `applyMiddleware` 함수의 내부 구현

```js
const applyMiddleware =
  (...middlewares) =>
  (createStore) =>
  (...args) => {
    const store = createStore(...args); // -1-
    const funcsWithStore = middlewares.map((middleware) => middleware(store)); // -2-
    const chainedFunc = funcsWithStore.reduce((a, b) => (next) => a(b(next))); // -3-
    return {
      ...store,
      dispatch: chainedFunc(store.dispatch), // -4-
    };
  };
```

1. 입력된 `createStore` 함수를 호출해서 `스토어`를 `생성`
2. 생성된 `스토어`와 함께 `모든 미들웨어의 첫 번째 함수`를 `호출`
   - 미들웨어의 `첫 번째` 함수를 호출하면 `next 매개변수`를 갖는 `두 번째` 함수가 만들어짐
   - `funcsWithStore` 의 모든 함수는 `클로저`를 통해 `store 객체 접근` 가능
3. 모든 미들웨어의 `두 번째 함수`를 `체인`으로 연결 (`reduce` 이용)
   → 미들웨어가 세개 였다면 chainedFunc 함수 → `next => a(b(c(next)))`
4. `외부에 노출`되는 스토어의 `dispatch` 메서드는 미들웨어가 적용된 버전으로 변경됨
   → 미들웨어 두 개 였다면 `a(b(store.dispatch))`와 같음
   → 사용자가 `dispatch` 메서드를 호출하면 `첫 번째 미들웨어 함수`부터 실행
   → `마지막` 미들웨어가 `store.dispatch` 메서드를 호출

#### dispatch 메서드의 내부 구현

```js
function dispatch(action) {
  currentState = currentReducer(currentState, action); // -1-
  for (let i = 0; i < listeners.length; i++) {
    listeners[i](); // -2-
  }
  return action;
}
```

1. `리듀서` 함수를 호출해서 `상태값을 변경`
2. `dispatch` 메서드가 호출될 때마다 등록된 `모든 이벤트 처리함수 호출`
   → `상태값이 변경되지 않아도` 이벤트 처리 함수를 `호출`하는 것에 주목
   → `상태값 변경`을 `검사`하는 코드는 각 `이벤트 처리 함수`에서 `구현`해야 함
   → `react-redux` 패키지의 `connect` 함수에서는 `자체적`으로 상탯값 변경을 검사

#### 미들웨어 활용 예

- 개발 환경에서 디버깅 목적으로 미들웨어를 활용가능
- 액션이 발생할 때마다 이전 상태값과 이후 상태값을 로그로 출력하는 미들웨어 코드

##### 로그를 출력해 주는 미들웨어

```js
const printLog = (store) => (next) => (action) => {
  console.log(`prev state = ${store.getState()}`);
  const result = next(action); // -1-
  console.log(`next state = ${store.getState()}`);
  return result;
};
```

1. next 함수를 호출하면 리듀서가 호출되기 때문에 next 함수 호출 전후로 로그를 출력

##### 에러 정보를 전송해 주는 미들웨어

```js
const reportCrash = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (err) {
    // 서버로 예외 정보 전송
  }
};
```

- 참고로 리듀서뿐만 아니라 하위의 미들웨어 코드에서 발생하는 예외도 catch

##### 실행을 연기할 수 있는 미들웨어

```js
const delayAction = (store) => (next) => (action) => {
  // -1-
  const delay = action.meta && action.meta.delay;
  if (!delay) {
    return next(action);
  }
  // -1-
  const timeoutId = setTimeout(() => next(action), delay); // -2-
  return function cancel() {
    clearTimeout(timeoutId); // -3-
  };
};
```

1. 액션 객체에 `delay` 정보가 포함되어 있지 않다면 아무 일도 안한다.
2. 만약 `delay` 정보가 포함되어 있다면 `정해진 시간만큼 연기`
3. `반환된 함수를 호출`하면 `next` 함수의 `호출을 막을 수 있음`

> 활용법

```js
const cancel = store.dispatch({
  type: 'SomeAction',
  meta: { delay: 1000 },
});
// ...
cancel();
```

- 의문점 : 생성된 미들웨어를 여러 미들웨어를 엮어 뒀을 경우 이게 순서를 지켜서 실행이 될련지
  → 나중에 실행 시켜보기로 결정

##### 로컬 스토리지에 값을 저장하는 미들웨어

```js
const saveToLocalStorage = (store) => (next) => (action) => {
  // -1-
  if (action.type === 'SET_NAME') {
    localStorage.setItem('name', action.name);
  }
  return next(action);
};
```

1. 'SET_NAME' 애션이 발생할 때마다 로컬 스토리지에 값을 저장

##### useStore를 사용하여 리덕스 스토어 사용하기

- useStore Hooks 를 사용하면 `내부`에서 `리덕스 스토어 객체`를 직접 `사용 가능`
- 직접 스토어에 접근할 일은 흔치 않으니 필요할 때만 사용

```js
const store = useStore();
store.dispatch({ type: 'SAMPLE_ACTION' });
store.getState();
```

#### 미들웨어 정리

1. `미들웨어`는 `디버깅`, `실행연기`, `로컬스토리지 값 저장`, `오류 서버전송` 등 편하게 사용 가능
2. `스토어`와 `액션 객체 기반`으로 필요한 작업 수행
3. next : 다른 미들웨어 호출 → 최종적 리듀서 함수 호출
4. 미들웨어를 여러개 생성하고 `createStore` 함수 이용
   → `(combineReducer로 적용된 rootReducer, applyMiddleware(미들웨어들))`

### 리듀서

- `리듀서(reducer)`는 `액션이 발생했을 때` `새로운 상태값`을 만드는 `함수`
- 리듀서의 구조

```js
(state, action) => nextState;
```

#### 할 일 목록 데이터를 처리하는 리듀서 함수

```js
// -1-
function reducer(state = INITIAL_STATE, action) {
  // -1-
  switch (action.type) {
    case REMOVE_ALL: // -2-
      // -3-
      return {
        ...state,
        todos: [],
      };
    // -3-
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state; // -4-
  }
}
```

- `리덕스`는 `스토어를 생성`할 때 `상태값이 없는 상태`로 `리듀서를 호출`

1. `매개변수의 기본값`을 사용해서 `초기 상태값`을 정의
2. 각 `액션 타입별로 case 문` 만들어서 처리
3. 상태값은 `불변 객체로 관리`해야 하므로 수정 할 때마다 `새로운 객체`를 생성
   → `전개 연산자`를 사용하면 `상태값을 분변 객체`로 관리 가능
4. 처리할 액션이 없다면 `상태값을 변경하지 않음`

> 전개 연산자를 사용하더라도 수정하려는 값이 상태값의 깊은 곳에 있다면 쉽지 않음

#### 리듀서 작성 시 주의 사항

1. 데이터 참조
   - 리덕스의 상태값은 `불변 객체`이기 때문에 언제든지 `객체의 참조값이 변경`될 수 있음
     → 객체를 참조할 때는 `객체의 참조값`이 아니라 `고유한 ID` 값을 이용하는게 좋음

```js
switch (action.type) {
    case REMOVE:
      state.removeID = action.id;
      break;
```

2. 순수 함수

- `리듀서`는 `순수 함수`로 작성해야 함
  - `랜덤함수`를 이용해서 다음 상태값을 만들지 말 것
    → 같은 인수를 호출해도 `다른 값이 반환`될 수 있기 때문에 순수 함수가 `아님`
  - `API 호출` 같은 부수효과를 내부에서 사용하지 않기
    → `부수효과`를 호출하는 함수(API)는 순수 함수가 아님
    → `API 호출`은 `액션 생성자 함수`, `미들웨어`에서 하면됨

#### createReducer 함수로 리듀서 작성하기

- 지금까지 리듀서 함수를 작성할 때 `switch 문` 사용
- `createReducer` 함수를 이용하면 switch 문보다 더 `간결하게 리듀서 함수를 작성` 가능
- `createReducer` 함수는 리덕스 `자체 제공은 아니`지만 많이 쓰임

```js
// -1-
const reducer = createReducer(INITIAL_STATE, {
  // -2-
  [ADD]: (state, action) => state.todos.push(action.todo);
  [REMOVE_ALL]: state => (state.todos = []);
  [REMOVE]: (state, action) => (state.todos = state.todos.filter(todo => todo.id !== action.id))
  // -2-
})
```

1. createReducer 함수의 첫 번째 인자로 초기 상태 값 입력
2. createReducer 함수의 두 번째 인자는 액션 처리 함수를 담고 있는 객체

#### createReducer 함수의 코드

```js
import produce from 'immer';

function createReducer(initialState, handlerMap) {
  // -1-
  return function (state = initialState, action) {
    // -1-
    // -2-
    return produce(state, (draft) => {
      // -2-
      // -3-
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
      // -3-
    });
  };
}
```

1. `createReducer` 함수는 `리듀서 함수를 반환`
   - 초기 상태값인 `initialState` 변수를 `state 매개변수의 기본값`으로 사용
2. `리듀서 함수 전체`를 `이머의 produce 함수`로 감싸기
3. 등록된 액션 처리 함수가 있다면 실행

#### 리듀서 정리

1. `리듀서(reducer)`는 `액션이 발생했을 때` `새로운 상태값`을 만드는 `함수`
2. `상태값`은 `불변 객체`로 관리 해야 하므로 수정 할 때마다 `새로운 객체` 생성
   → `immer`를 사용하거나, `전개 연산자` 사용
3. 리듀서는 `순수 함수`로 작성되어야 함
   → `랜덤함수 불가`, `API 호출`같은 `부수효과 불가`
   → 부수효과의 경우 `액션 생성자 함수`, `미들웨어`에서 이 역할 수행
4. `createReducer`로 좀 더 편하게 리듀서 작성 가능

### 스토어

- `스토어(store)`는 `리덕스의 상태값`을 가지는 객체
- `액션의 발생`은 스토어의 `dispatch` 메서드로 시작

- 스토어는 `액션이 발생`하면

  1. `미들웨어 함수를 실행`하고
  2. `리듀서를 실행`해서 `상태값을 새로운 값`으로 `변경`

- 마지막으로 사전에 등록된 `이벤트 처리 함수`에게 액션의 처리가 `끝났음`을 알림

- 리덕스의 첫 번째 원칙에서 애플리케이션의 `전체 상태값` → `하나의 스토어`의 저장
- 기술적으로는 여러개 스토어를 만들어서 사용해도 문제 X

  - `But` 단순히 데이터의 종류에 따라 구분하기 위한 용도라면
  - `combineReducer` 함수를 이용하는게 좋음
  - 특별한 이유가 없다면 `스토어는 하나!!!`

- 외부에서 상태값 변경 여부를 알기 위해서는 스토어에 `이벤트 처리 함수`를 등록
- 스토어의 `subscribe` 메서드를 사용해서 `상태값 변경 여부` 검사

#### 스토어의 subscribe 메서드를 사용한 예

```js
const INITIAL_STATE = { value: 0 };
const reducer = createReducer(INITIAL_STATE, {
  INCREMENT: (state) => (state.value += 1),
});
const store = createStore(reducer);

let prevState;
// -1-
store.subscribe(() => {
  // -1-
  const state = store.getState();
  // -2-
  if (state === prevState) {
    // -2-
    console.log('상태값 같음');
  } else {
    console.log('상태값 변경');
  }
  prevState = state;
});

store.dispatch({ type: 'INCREMENT' }); // -3-
store.dispatch({ type: 'OTHER_ACTION' }); // -4-
store.dispatch({ type: 'INCREMENT' }); // -5-
```

1. `subscribe` 메서드를 이용해서 `이벤트 처리 함수`를 등록
   - 스토어에 등록된 함수는 `액션이 처리될 때 마다` 호출
2. 상태값이 변경됐는지 `검사`
   - `상태값이 불변 객체`이기 때문에 단순한 비교로 상태값 변경 여부를 확인
3. INCREMENT와 같이 `등록된 액션` → `상태값 변경` 로그
   - `등록된 액션이 아닐 경우` → `상태값 같음` 로그

#### 스토어 정리

1. `스토어`는 `리덕스의 상태값`을 가지는 객체
2. `액션의 발생`은 `dispatch` 메서드로 시작
3. `액션 발생` 시
   1. `미들웨어 함수` 실행
   2. `리듀서(함수)` 실행 → `상태값` 변경
   3. `이벤트 처리함수`에게 액션 처리 끝남 알림
4. 스토어는 `하나만` 존재하는게 좋음
5. `이벤트 처리함수` : `외부`에서 상태값 변경 여부를 알기 위해 사용
   - `subscribe` 메서드를 이용
   - 상태값은 불변객체 → 단순한 비교로 확인 가능
     ```js
     if (state === prevState)
     ```
