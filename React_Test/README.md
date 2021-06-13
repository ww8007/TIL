# 리액트 테스트의 소개

- 리액트 컴포넌트를 테스트 할 때 주로 어떠한 결과가 화면상에 잘 타나났는지 어떠한 이벤트 혹이 함수가 호출 됐을 때 원하는 업데이트가 잘 반영이 되는지를 확인
- 이를 수행하는 가장 기본적 방법은 **react-dom/test-utils** 안에 들어있는 유틸 함수 사용

### Enzyme

- 컴포넌트의 내부 기능을 자주 접근
  - props와 state 확인
  - 컴포넌트의 내장 메서드 직접 호출

### react-test-library

- 렌더링 결과에 조금 더 집중
  - DOM에 대해서 신경 더 씀
  - 컴포넌트 인스턴스 무시
- 어떠한 이벤트가 발생했을 때 화면에 원하는 변화가 생겼는 지 확인용

- 모든 테스트를 DOM 위주로 진행
- 컴포넌트의 props나 state를 조회하는 일은 없음

> 컴포넌트 리펙토링

    주로 내부 구조, 네이밍은 많이 바뀔 수 있지만
    실제 작동 방식은 크게 바뀌지 않음

- 위의 이유로 인해서 컴포넌트 기능이 똑같이 작동한다면 내부 구현 방식이 많이 바뀌어도 테스트를 통과시키도록 설계

> yarn add @testing-library/react @testing-library/jest-dom
> yarn add @types/jest
> jest-dom은 jest 확장 DOM에 관련된 matcher 추가

- DOM 시뮬레이션을 위한 JSDOM 이라는 도구를 사용하여 document.body에 리액트 컴포넌트를 렌더링 함
- clean-up-after-each를 불러오면 각 테스트 케이스가 끝날 때 마다 기존에 가상의 화면에 남아있는 UI 정리
- jest-dom/extend-expect를 불러와서 jest에서 DOM 관련 matcher를 사용 할 수 있게 해줌

### 스냅샷 테스팅

- 렌더링된 결과가 이전에 렌더링한 결과와 일치하는지 확인하는 작업
- 컴포넌트가 렌더링 됐을 때 이 스냅샷과 일치하지 않으면 테스트가 실패함
- 스냅샷을 업데이트 하고 싶다면 테스트가 실행되고 있는 콘솔창에서
- press u

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`<Profile> matches snapshot 1`] = `
<div>
  <div>
    <b>
      ww8007
    </b>
    <span>
      (
      장동현
      )
    </span>
  </div>
</div>
`;
```

### 다양한 쿼리

- render 함수를 실행하고 나면 그 결과물 안에는 다양한 쿼리 함수들이 존재
- 이들은 react-testing-library 기반인

  - dom-testing-library에서 지원하는 함수들

- Variant와 Queries의 조합으로 네이밍이 이루어짐

### Variant

1. getBy
   - getBy\*로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 하나를 선택
   - 없으면 에러 throw
2. getAllBy
   - getAllBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 여러개를 선택
   - 하나도 조건에 일치하지 않는다면 에러 throw
3. queryBy
   - queryBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 하나를 선택
   - 없다해도 에러를 발생키지 않음
4. queryAllBy
   - queryAllBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트 여러개를 선택
   - 존재하지 않더라도 에러를 내뿜지 않음
5. findBy
   - findBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 엘리먼트가 하나가 나타날 때 까지 기다렸다가 해당 DOM을 선택하는 Promise 반환
   - 기본 timeout 4500ms -> 4.5초 이후에도 나타나지 않으면 에러 발생
6. findAllBy
   - findBy\* 로 시작하는 쿼리는 조건에 일치하는 DOM 여러개가 나타날 때 까지 기다렸다가 해당 DOM을 선택하는 Promise 반환
   - 기본 timeout 4500ms -> 4.5초 이후에도 나타나지 않으면 에러 발생

### Queries

1. ByLabelText

   - label이 있는 input의 label 내용으로 input을 선택

   ```js
    <label for="username-input">아이디</label>
    <input id="username-input" />
   const inputNode = getByLabelText('아이디');
   ```

2. ByPlaceholder

   - placeholder 값으로 input 및 textarea 선택

   ```js
   <input placeholder="아이디" />;

   const inputNode = getByPlaceholderText("아이디");
   ```

3. ByText

   - 엘리먼트가 가지고 있는 텍스트 값으로 DOM을 선택

   ```js
   <div>Hello World!</div>;

   const div = getByText("Hello World!");
   ```

4. ByAltText

   - alt 속성을 가지고 있는 엘리먼트(주로 img)를 선택

   ```js
   <img src="/awesome.png" alt="awesome image" />;

   const imgAwesome = getByAltText("awesome image");
   ```

5. ByTitle

   - ByTitle 은 title 속성을 가지고 있는 DOM 혹은 title 엘리먼트를 지니고있는 SVG 를 선택 할 때 사용합니다.

   - title 속성은 html 에서 툴팁을 보여줘야 하는 상황에 사용하곤 합니다.

   ```js
   <p>
     <span title="React">리액트</span>는 짱 멋진 라이브러리다.
   </p>

   <svg>
     <title>Delete</title>
     <g><path/></g>
   </svg>

   const spanReact = getByTitle('React');
   const svgDelete = getByTitle('Delete');
   ```

6. ByDisplayValue

   - ByDisplayValue 는 input, textarea, select 가 지니고 있는 현재 값을 가지고 엘리먼트를 선택합니다.

   ```js
   <input value="text" />;

   const input = getByDisplayValue("text");
   ```

7. ByRole

   - 특정 role 값을 지니고 있는 엘리먼트 선택

   ```js
   <span role="button">삭제</span>;

   const spanRemove = getByRole("button");
   ```

8. ByTestId

   - 다른 방법을 통해서 선택을 못하는 경우 사용
   - 특정 DOM에서 직접 test 할 때 사용할 id를 달아서 선택하는 것

   ```js
   <div data-testid="commondiv">흔한 div</div>;

   const commonDiv = getByTestId("commondiv");
   ```

### 쿼리 사용의 의문

- 위와같이 엄청나게 많은 쿼리가 있다.
- 메뉴얼에서는 아래와 같이 우선순위를 따라서 사용하는 것을 권장

1. getByLabelText
2. getByPlaceholderText
3. getByText
4. getByDisplayValue
5. getByAltText
6. getByTitle
7. getByRole
8. getByTestId

- DOM의 querySelector 를 사용가능하지만 이것 보다는 data-testid 를 설정하는 것이 좋음

### 이벤트 다루기

- fireEvent() 함수
  - 이벤트를 발생 시켜주는 특징이 있다.

> fireEvent.이벤트 이름(DOM, 이벤트객체);

- click 이벤트의 경우에는 이벤트 객체를 따로 넣어주지 않아도 된지만
- change 이벤트의 경우에는 다음과 같이 넣어줘야함

```js
fireEvent.change(myInput, { target: { value: "hello world" } });
```
