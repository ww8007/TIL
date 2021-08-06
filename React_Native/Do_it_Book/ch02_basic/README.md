# 리액트 네이티브 기본 다지기

## ch02-2

### npx pod-install

- ios 디렉터리의 Podfile은 android 디렉터리의 build.gradle에 해당
- node_modules 디렉터리의 native_modules을 설치하라는 의미

### JSX = Js + XML

- XML

  - → 태그 이름을 자유롭게 지을 수 있는 eXtensible Markup Language
  - 리액트와 리액트 네이티브에서 Js와 XML 결합 → JSX

- JSX

  - React.createElement 호출 코드를 좀 더 단순하고 간결하게 만들 수 있음
  - 이런게 가능한 이유는 ESNext 자바스크립트 컴파일러 바벨이 플러그인 구조로 동작

- 바벨은 수십 개의 플러그인을 일일이 설치하는 번거로움 덜기 위해서 `preset` 이 포함된 패키지 포함하여 제공
  - RN : metro-react-native-babel-preset 패키지 사용

> JSX 구문이 동작하기 위해서 확장자 → `.tsx`, `import React`

### React.createElement와 JSX 구문과의 관계

- React.createElement는 컴포넌트를 가상 DOM 객체로 만듬
- 컴포넌트는
  - → `여러개의 속성(property)`
  - → 하나 이상의 자식 컴포넌트
  - 가질 수 있음

> createElement 사용법

    ```js
    가상_DOM_객체 = createElement(컴포넌트_이름_또는_문자열, 속성_객체, 자식_컴포넌트)
    ```

### JSX 구문에서 중괄호({})의 의미

- XML 마크업 언어에 자바스크립트 코드를 삽입하기 위해서는 XML 문법에는 없는 기능 필요
- XML 마크업 구조에 중괄호`({}`)를 사용하여 Js 코드를 감싸는 형태의 문법을 제공

> 중괄호

     변수값을 XML 구문 안에 표현 가능

- JSX문 자체를 변수에 담을 수 있음
  ```js
  const virtualDom = (
    <SafeAreaView>
      <Text>JSX world!</Text>
    </SafeAreaView>
  );
  ```
- 변수에 담는 과정 생략하고 함수의 반환값으로 사용 가능

  ```js
  export default function App() {
    return (
      <SafeAreaView>
        <Text>JSX world!</Text>
      </SafeAreaView>
    );
  }
  ```

### 표현식과 실행문 그리고 JSX

- `표현식` : `return` 키워드 없이 어떤 값을 반환하는 코드

  - → `1, true, 'Hello world!'` 처럼
  - → `값으로 평가`하는 어떤 것
  - `1+1 같은 코드 조각`, `함수 호출로 반환한 값` 등 `값`이 되는 모든 것

- `실행문` : 표현식의 반대개념 `execution statement`

  - → `실행문` 그 자체로는 `값`이 아님
  - → ex : `if 문`은 실행문이기 때문에 JSX 코드 안에서 사용하지 못함
  - `switch/case` 문이나 `for 문` 또한 실행문

- console.log
  - `가상 DOM 객체`를 `반환하지 않기` 때문에 오류 발생
  - JSX 코드를 구성하는 한 줄 한 줄 모두 `React.createElement` 호출 코드로 반환되어야 함

#### 조건에 따라 분기되는 JSX문 작성법

1. if 문을 JSX문 바깥에 둠
2. if 문을 단축 평가 형태로 구현
   - → true의 반대 개념으로 undefined 반환
   - JSX 파서 입장에서 undefined, null은 무시하면 그만
   ```js
   {
     isLoading && <Text>hi</Text>;
   }
   {
     !isLoading && <Text>hi</Text>;
   }
   ```
3. JSX 문을 변수에 담아 문제 해결
   ```js
   const children = isLoading ? (<Text>Loading...</Text>)
   return <SafeArea>{children}</SafeArea>
   ```

- `true 문`의 반대 개념은 `undefined`

### 배열을 JSX문으로 만들 때 조심할 점

- 일반적인 경우 내가 알고 있는 `map`을 이용해서 컴포넌트를 만들면 된다.
- 100개의 컴포넌트 배열을 만드는 예

```js
export default function App() {
  const children = new Array(100)
    .fill(null)
    .map((notUsed, index) => <Text>Hello world! {index}</Text>);

  return <SafeAreaView>{children}</SafeAreaView>;
}
```

- Array : 자바스크립트가 기본으로 제공하는 클래스
- `undefined` 아이템이 있는 배열에는 map 메서드를 사용할 수 없음
- `null`로 채운 배열에는 map 메서드 사용 가능
