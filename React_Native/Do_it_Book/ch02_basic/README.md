# 리액트 네이티브 기본 다지기

## 목차

- [리액트 네이티브 기본 다지기](#%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EA%B8%B0%EB%B3%B8-%EB%8B%A4%EC%A7%80%EA%B8%B0)
  - [ch02-2](#ch02-2)
    - [npx pod-install](#npx-pod-install)
    - [JSX = Js + XML](#jsx--js--xml)
    - [React.createElement와 JSX 구문과의 관계](#reactcreateelement%EC%99%80-jsx-%EA%B5%AC%EB%AC%B8%EA%B3%BC%EC%9D%98-%EA%B4%80%EA%B3%84)
    - [JSX 구문에서 중괄호({})의 의미](#jsx-%EA%B5%AC%EB%AC%B8%EC%97%90%EC%84%9C-%EC%A4%91%EA%B4%84%ED%98%B8%EC%9D%98-%EC%9D%98%EB%AF%B8)
    - [표현식과 실행문 그리고 JSX](#%ED%91%9C%ED%98%84%EC%8B%9D%EA%B3%BC-%EC%8B%A4%ED%96%89%EB%AC%B8-%EA%B7%B8%EB%A6%AC%EA%B3%A0-jsx)
      - [조건에 따라 분기되는 JSX문 작성법](#%EC%A1%B0%EA%B1%B4%EC%97%90-%EB%94%B0%EB%9D%BC-%EB%B6%84%EA%B8%B0%EB%90%98%EB%8A%94-jsx%EB%AC%B8-%EC%9E%91%EC%84%B1%EB%B2%95)
    - [배열을 JSX문으로 만들 때 조심할 점](#%EB%B0%B0%EC%97%B4%EC%9D%84-jsx%EB%AC%B8%EC%9C%BC%EB%A1%9C-%EB%A7%8C%EB%93%A4-%EB%95%8C-%EC%A1%B0%EC%8B%AC%ED%95%A0-%EC%A0%90)
  - [02-3 컴포넌트와 속성 이해하기](#02-3-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EC%86%8D%EC%84%B1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)
    - [널 병합 연산자](#%EB%84%90-%EB%B3%91%ED%95%A9-%EC%97%B0%EC%82%B0%EC%9E%90)
    - [JSX에서의 Text](#jsx%EC%97%90%EC%84%9C%EC%9D%98-text)
    - [리액트 네이티브가 제공하는 두 가지 서비스](#%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C%EA%B0%80-%EC%A0%9C%EA%B3%B5%ED%95%98%EB%8A%94-%EB%91%90-%EA%B0%80%EC%A7%80-%EC%84%9C%EB%B9%84%EC%8A%A4)
      - [사용자 컴포넌트](#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
      - [화살표 방식으로 함수 컴포넌트 만들기](#%ED%99%94%EC%82%B4%ED%91%9C-%EB%B0%A9%EC%8B%9D%EC%9C%BC%EB%A1%9C-%ED%95%A8%EC%88%98-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0)
    - [속성이란?](#%EC%86%8D%EC%84%B1%EC%9D%B4%EB%9E%80)
      - [JSX 속성 설정 구문](#jsx-%EC%86%8D%EC%84%B1-%EC%84%A4%EC%A0%95-%EA%B5%AC%EB%AC%B8)
    - [속성의 용도](#%EC%86%8D%EC%84%B1%EC%9D%98-%EC%9A%A9%EB%8F%84)
    - [함수 컴포넌트의 타입](#%ED%95%A8%EC%88%98-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%ED%83%80%EC%9E%85)
    - [타입스크립트 3.8 버전의 import type 구문](#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-38-%EB%B2%84%EC%A0%84%EC%9D%98-import-type-%EA%B5%AC%EB%AC%B8)
    - [ScrollView 코어 컴포넌트와 key 속성](#scrollview-%EC%BD%94%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-key-%EC%86%8D%EC%84%B1)
  - [02-4 컴포넌트의 이벤트 속성 이해하기](#02-4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%86%8D%EC%84%B1-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0)
    - [이벤트 속성과 이벤트 처리기](#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%86%8D%EC%84%B1%EA%B3%BC-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%B2%98%EB%A6%AC%EA%B8%B0)
      - [Button 코어 컴포넌트](#button-%EC%BD%94%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
        - [버튼 사용 예](#%EB%B2%84%ED%8A%BC-%EC%82%AC%EC%9A%A9-%EC%98%88)
      - [Alert API](#alert-api)
      - [터처블 코어 컴포넌트](#%ED%84%B0%EC%B2%98%EB%B8%94-%EC%BD%94%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
        - [Text 코어 컴포넌트의 onPress 이벤트 속성](#text-%EC%BD%94%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-onpress-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%86%8D%EC%84%B1)
        - [TextInput 코어 컴포넌트](#textinput-%EC%BD%94%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8)
          - [특징](#%ED%8A%B9%EC%A7%95)

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

## 02-3 컴포넌트와 속성 이해하기

- 가짜 데이터를 생성 하기 위해서 faker 패키지 설정

  > 설치

      yarn add faker @types/faker

### 널 병합 연산자

- `??` 연산자는 ESNext 자바스크립트와 타입스크립트에서 널 병합 연산자
  - → nulish coalescing operator
  - name처럼 연산자 앞이 변숫값이 null, undefined → 연산자 뒤의 값에는 randomName()을 사용

### JSX에서의 Text

- `JSX 구문`에서 문자열이 아닌 person과 같은 `객체`는
  - → Text 사이에 `객체를 바로 사용이 불가능` 하다.
  - `XML 구문에서 자식 요소` : `문자열`, `XML 요소`여야 하기 때문
- 이런 이유로 `JSON.stringfy`를 사용해서 `문자열로 변환`해서 사용

```js
<SafeAreaView>
	<Text>{JSON.stringify(person, null, 2)}</Text>
</SafeAreaView>
```

- 2개의 공백 문자를 속성값에 붙여 보기 좋게 출력

### 리액트 네이티브가 제공하는 두 가지 서비스

1. `Text` 와 같은 `코어 컴포넌트(core component, Platform)`
   - → 화면에 `어떤 내용을 렌더링`
2. `Alert` 과 같은 `API(Application Programming interface)`
   - → `폰의 하드웨어`나 `운영체제`가 `제공하는 기능`이 필요할 때

> 리액트와 같은 framework 에서는 자신만의 컴포넌트 생성가능

     사용자 정의 컴포넌트 - `사용자 컴포넌트`
     user-defined component - `user component`

#### 사용자 컴포넌트

- `객체지향 프로그래밍 `
  - → `컴포넌트` : `UI를 담당`하는 `클래스` 의미
- 오랫동안 React, R/N 은 객체지향 방식의 클래스 컴포넌트 사용

- 그러나 `function component` 등장 후 `Hook` 등장
  - Hook은 함수 방식으로 제작된 컴포넌트에서만 사용 가능
- `사용자 컴포넌트`가 해야 할 일 : 네이티브가 제공하는 `코어 컴포넌트`를 `화면에 렌더링`
  - 앱 사용자의 화면터치, 입력 → `이벤트로 형태`로 얻어 적절한 내용을 `코어 컴포넌트에 반영`

#### 화살표 방식으로 함수 컴포넌트 만들기

- `속성(property)`의 유무에 따라 `화살표`, `function` 분리

- `속성이 없는` 경우 : `function`
- `속성이 있는` 경우 : `화살표`

- 타입스크립트 문법은 `화살표 함수`가 `익명 함수` 형태인 경우 `export default 허용`

```ts
export default () => null;
```

> 이걸 몰라서 지금까지 고생...

> class는 Component 클래스 상속, render 메서드 구현 → 복잡

### 속성이란?

- 프로그래밍 용어에서 `속성(property)`

  - → 클래스의 멤버 변수(member variable)

- `컴포넌트` 또한 `화면 UI를 담당하는 클래스`

  - → 속성을 가질 수 있음

- But 속성은 그 값이 바뀔 수 있음

- 가변(mutable) : 수시로 바뀜
- 불변(immutable) : 한 번 설정되면 다시는 바뀌지 않음

- 바뀐 속성값 화면 반영 → `재랜더링(re-rendering)`

> React, R/N 에서의 속성 → `클래스 속성 + 재렌더링`

#### JSX 속성 설정 구문

> XML과 같은 마크업 언어에서 속성 → attribute

     TypeScript → property 라고 속성을 지칭

- `string` 타입 속성값 지정
  - → `따옴표`로 감싸야함

```js
<Person name="Jack" />
```

- `number` 타입 속성값 지정
  - → `중괄호 기호({})`

```js
<Person age={22}>
```

- `객체` 타입 속성값 지정
  - → 중괄호 두개
  1. 안쪽 : 객체를 만드는 구문
  2. 바깥쪽 : JSX 구문

```js
<Person {{name : 'jack', age: 32}}>
```

### 속성의 용도

> 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달하고 싶은 경우 사용

```jsx
const person = 'jang'

export default function App() {
  return <My person={person}>
}
```

### 함수 컴포넌트의 타입

- React.createElement 사용법

```js
가상_DOM_객체 = createElement(
	컴포넌트_이름_또는_문자열,
	속성_객체,
	자식_컴포넌트
);
```

- 타입스크립트로 속성을 구현하고자 createElement의 함수 정의 학습

  - createElement 타입 정의를 확인하는 가장 쉬운 방법

  1. 편집기에 함수 이름을 작성
  2. 함수 이름을 클릭하고
  3. 마우스 오른쪽 버튼을 클릭
  4. `[정의로 이동]`을 실행

- createElement 함수 정의

```jsx
    function createElement<P extends {}>( // -1-
        type: FunctionComponent<P>,
        props?: Attributes & P | null,
        ...children: ReactNode[]): FunctionComponentElement<P>;
```

1. 타입 변수(type parameter) P는 Property의 첫 글자
   - `FunctionComponent`는 이름이 너무 길기 때문에 react 패키지는 `좀 더 간단`한 이름 `FC` 타입을 제공
   - 결론 : `FunctionComponent` 타입은 `FC` 타입, 함수 컴포넌트의 타입은 `FC`

- FC 타입을 사용하기 전 타입스크립트 3.8버전 새로 등장한 import type 학습

### 타입스크립트 3.8 버전의 import type 구문

- `FC` 타입은 `import type` 구문을 사용
- `Component 클래스`는 단순히 `import` 사용

- 타입은 타입스크립트가 코드를 자바스크립트로 `컴파일할 때`만 필요한 정보

  - → 타입스크립트 코드가 자바스크립트 코드로 `컴파일`되고 나면
  - → 타입 관련 내용은 `코드에서 아예 사라지게` 됨

- 이와 달리 클래스는 물리적으로 동작하는 메서드와 속성을 가짐

  - → 자바스크립트로 변환 해도 컴파일된 형태 그대로 남아있음

- `FC`는 컴파일되면 완전히 사라지는 정보
  - → `import type` 구문을 이용해서 사용
  - → `FC` 처럼 타입스크립트 컴파일에만 필요한 타입은 항상 `import type` 사용

```tsx
import React from 'react';
import { Text } from 'react-native';
import * as D from '../data';

export type PersonProps = {
	person: D.IPerson;
};
export default function Person({ person }: PersonProps) {
	return <Text>{JSON.stringify(person, null, 2)}</Text>;
}
export const Person2 = ({ person }: PersonProps) => {
	return <Text>{JSON.stringify(person, null, 2)}</Text>;
};
```

- stack overflow를 찾아본 결과 `FC`를 이용하는 것 `보다` `function`을 이용하는게 가시적이고 직관적
- 지금 업데이트된 리엑트에서는 class 형에 대한 제네릭을 딱히 보여주지 않음
- 이에 대한 내용 벨로그 정리
  - [velog]('https://velog.io/@ww8007/Typescript-React.FC')

### ScrollView 코어 컴포넌트와 key 속성

- 여러개의 Person 컴포넌트를 만들어 각각 다른 person 속성을 전달
  - → 화면에서 칸이 부족해서 안보이는 현상이 발생
  - → 이럴 때 사용하는 것이 `ScrollView`

> ScrollView

     Person 컴포넌트를 ScrollView의 자식 컴포넌트로 만들면
     → 스크롤 기능 이용해서 모든 컴포넌트 확인 가능

```tsx
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import Person from './src/screens/Person';
import * as D from './src/data';

const people = D.makeArray(100).map(D.createRandomPerson);

export default function App() {
	const children = people.map((person) => (
		<Person key={person.id} person={person} />
	));
	return (
		<SafeAreaView>
			<ScrollView>{children}</ScrollView>
		</SafeAreaView>
	);
}
```

> `ScrollView`로 감싸면 스크롤 뷰로 동작하게 됨

- 모든 리액트와 리액트 네이티브 컴포넌트

  1. `key`
  2. `children`
  3. `ref`

  - → `3개의 속성`을 기본으로 가짐

- key 속성은 리액트 프레임워크가 컴포넌트의 `렌더링 속도를 최적화` 하는데 필요한 속성

- `faker.random.uuid()`로 생성 → `범용 고유 식별자(universally unique identifier)`의 약자
- 네트워크 카드의 `MAC 주소`
- `호출 시각` → 중복 값이 생성되지 않음

## 02-4 컴포넌트의 이벤트 속성 이해하기

- 사용자가 버튼을 터치학서나 텍스트를 입력했을 때 발생하는 이벤트를 처리하는 방법

### 이벤트 속성과 이벤트 처리기

- React, R/N 컴포넌트 속성 중 `onPress`, `onChangeText` 처럼 `on~` 접두사

  - → 이를 이벤트 속성(event property) 라고 부름
  - → 이벤트 속성에는 항상 콜백 함수를 설정해야 함
  - → → 이를 `이벤트 콜백 함수`, `이벤트 처리기(event handler)`

- 컴포넌트에서 해당 이벤트가 발생하면 자동으로 이벤트 속성이 정한 함수를 호출

#### Button 코어 컴포넌트

- R/N은 `Button` `코어 컴포넌트`를 제공

```js
import { Button } from 'react-native';
```

- Button 코어 컴포넌트는 `onPress` 속성을 제공

  - → 접두어가 on이므로 이 속성에는 `callback 함수` 지정

- `콜백 함수 형태`
  ```js
  콜백_함수 = () => {
  	/*함수 몸통*/
  };
  ```

##### 버튼 사용 예

```ts
<Button title="home" color="blue" onPress={()=> console.log('home pressed')}> // -1-
```

1. `title` : 반드시 설정해야 하는 필수 속성
2. `color?`: 있어도 되고 없어도 되고
   - `ts의 선택 매개변수 느낌으로 생각`

#### Alert API

> API : Application Programming Interface

- 리액트 네이티브에서 API는 `JSX 구문`에서 사용되는 `코어 컴포넌트`와 다름
- `타입 스크립트 코드`에서 `사용하는 기능`

```ts
import { Alert } from 'react-native';
```

- `Alert` 은 다음과 같은 `alert 정적 메서드`를 제공
  - → 메서드 `호출` 시 `대화상자(dialog)`가 화면에 나타남

```tsx
import React from 'react';
import { SafeAreaView, Alert, Button } from 'react-native';

export default function App() {
	return (
		<SafeAreaView>
			<Button
				title="Home" // -1-
				onPress={() => Alert.alert('home pressed', 'message')} // -2-
			/>
		</SafeAreaView>
	);
}
```

1. `Button` 코어 컴포넌트의 `필수속성`인 `title` 지정
2. `title` : home pressed
   - → message : message 로 설정

> `안드로이드`와 `ios`의 모습이 다름

     보여지는 모양 또한 다르고
     눌렀을 시 보여지는 모양도 다름 기억!!!

#### 터처블 코어 컴포넌트

- `Button`이 가지는 한가지 `문제점` : `디자인에 융통성`이 `없음`
  - → 이렇기에 R/N은 접두어 `Touchable~` 이 붙는 두 가지 코어 컴포넌트 제공

```tsx
import { TouchableOpacity, TouchableHighlight } from 'react-native';
```

- 위의 컴포넌트들의 특징

  1. 컴포넌트 영역에 터치가 일어나면 → `onPress` `이벤트 속성`에 설정된 `이벤트 핸들러 콜백 함수`를 호출
  2. 단 한개의 자식 컴포넌트만 올 수 있음

- `TouchableOpacity`, `TouchableHighlight`는 터치가 일어 났을 때 시각 효과만 다를 뿐

  - 동작은 같다는 것을 기억

- `TouchableOpacity`

  - → `터치`가 일어나면 컴포넌트 `바탕색의 투명도(opacity)` 바뀜

- `TouchableHighlight`
  - → `터치`가 일어나면 컴포넌트 `바탕색의 전체 색`이 바뀜

> 결과적으로 둘 다 화면에 `보여지는 모습은 같음`

##### Text 코어 컴포넌트의 onPress 이벤트 속성

- Text 컴포넌트도 onPress 이벤트 속성을 제공
  - → Button 이나 터쳐블 컴포넌트처럼 텍스트 터치하면
  - → onPress 에 설정된 이벤트 처리기를 호출

> 터치 시 텍스트에 아무런 효과가 없다는 것이 다른 점

```tsx
import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { Text } from 'react-native';

const onPress = () => Alert.alert('home pressed', 'message');

export default function App() {
	return (
		<SafeAreaView>
			<Text onPress={onPress}>Press me</Text>
		</SafeAreaView>
	);
}
```

##### TextInput 코어 컴포넌트

> 텍스트를 입력하고 할 때는 TextInput 코어 컴포넌트를 사용

```tsx
import { TextInput } from 'react-native';
```

```tsx
<TextInput
	placeholder="enter your name"
	onChangeText={(text: string) => console.log(text)}
	onFocus={() => console.log('onFocus')}
	onBlur={() => console.log('onBlur')}
	onEndEditing={() => console.log('end edit')}
/>
```

###### 특징

1. `defaultValue` 가질 수 있음
2. `입력된 텍스트`는 `value` 속성값으로 얻을 수 있음
3. 텍스트 `입력` → `onChangeText` `이벤트 처리기` 실행
4. `placeholder` 속성을 어떤 값을 설정해야 하는지 명시 가능
5. `editable` 속성 → `false` 설정 시 → `입력 못하게` 가능
6. `keyboardType` 속성
   1. `default`
   2. `numeric`
   3. `email-address`
7. `포커스를 가지게` 하는 → `focus` 메서드
   - → `포커스를 잃게` 하는 → `blur` 메서드 존재
8. 텍스트를 `입력할 수 있는` 상태(포커스 가짐) → `onFocus` 이벤트를 호출

- → 입력 `못하는` 경우 → `onBlur` 이벤트 호출

9. 텍스트 입력이 `모두 끝나면` → `onEndEditing` 이벤트 호출
10. 자식 요소를 가지지 못함

> onChangeText 속성에 설정할 수 있는 콜백 함수는 아래와 같은 함수 시그니처 가짐

```tsx
onChangeText(text: string) => void
```

> 함수 시그니처

     타입스크립트에서는 `모든 변수는 어떤 타입`을 가지게 됨
     `함수도 어떤 타입`을 가짐
     함수 선언문에서 `이름만 제외한 부분`을
      → `함수 시그니처`
      → `함수 타입`
