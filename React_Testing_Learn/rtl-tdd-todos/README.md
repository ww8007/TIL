# TDD 개발 흐름으로 투두리스트 만들기

## 컴포넌트 계획

1. TodoForm
   -  input과 버튼으로 이루어진 form, submit 이벤트가 발생하면 새로운 항목 추가 가능
1. TodoItem
   -  todo 항목을 보여주는 컴포넌트
   -  todo 객체를 props로 받아와서 랜더링
   -  텍스트를 클릭하면 텍스트에 삭제선
   -  우측에 삭제 버튼을 누르면 항목이 사라져야함
1. TodoList
   -  todos 배열을 받아와서 여러개의 TodoItem 컴포넌트로 랜더링
1. TodoApp
   -  할일 목록 추가, 토글, 삭제 기능이 구현되는 컴포넌트

## TodoForm 개발

-  jest.fn() jest에서 제공하는 mock 함수
-  toBeCalled 또는 toBeCalledWith 같은 matcher를 사용해서 함수가 호출 됐는지, 호출 됐다면 어떤 파라미터로 호출 됐는지 이런 것들을 쉽게 확인 가능

### 리펙토링

-  아래와 같이 props가 존재하면 props를 넘겨주도록 코딩이 가능
-  input과 button이 반복 되므로 return 같으로 넘겨주어 비구조화 할당으로 사용이 가능하도록 리펙토링

```js
const setup = (props = {}) => {
   const utils = render(<TodoForm {...props} />);
   const { getByPlaceholderText, getByText } = utils;
   const input = getByPlaceholderText("할 일을 입력하세요");
   const button = getByText("등록");
   return {
      ...utils,
      input,
      button,
   };
};
```

-  꼭 필요한 작업은 아니고 자신의 코딩 취향을 따라서 작성을 하면 된다.
