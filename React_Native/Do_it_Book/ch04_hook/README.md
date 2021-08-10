# 함수 컴포넌트와 리액트 훅

## 리액트 훅 맛보기

> React Hook, Custom Hook 에 대해서 학습

### 리액트 훅이란?

- `React FrameWork` 는 `Component` 라는 기법으로 `가상 DOM` 객체를 만들고
  - → `가상 DOM` 객체에 어떤 `변화`가 `감지`되면 해당 `변화만 화면에 재랜더링` 하여
  - → `전체 렌더링 속도를 빠르게` 하는 데 초점이 맞춰진 프레임워크
- 오랫동안 프레임워크의 컴포넌트는 `객체 지향 언어`의

  - → `상속(inheritance)` 개념에 맞춘 `클래스 형태`로 제작

- `클래스 컴포넌트 기술`은 코드를 작성 하는 방법 `복잡`
- 1초당 60회 정도의 매우 빠른 렌더링 → 화면에 정상적인 렌더링이 안되는 버그 내포

- 그러기에 React 개발팀은 컴포넌트를 함수 형태로 만들 수 있도록 변경
  - → 어떤 값을 유지(persistance) 할 수 있도록 새로운 개념의 데이터 캐시(cache) 시스템 생성
  - → 개발자에게 데이터 캐시 시스템을 쉽게 이용할 수 있도록
    - 접두사 `use`로 시작하는 여러 API 제공
    - 이를 `React Hook`

| <center>용도</center>           | <center>훅                  |
| ------------------------------- | --------------------------- |
| <center>컴포넌트 데이터 관리    | <center>useMemo             |
|                                 | <center>useCallback         |
|                                 | <center>usState             |
|                                 | <center>useReducer          |
| <center>컴포넌트 생명주기 대응  | <center>useEffect           |
|                                 | <center>useLayoutEffect     |
| <center>컴포넌트 간의 정보 공유 | <center>useContext          |
| <center>컴포넌트 메서드 호출    | <center>useRef              |
|                                 | <center>useImperativeHandle |

### 리액트 훅의 탄생 배경이 된 클래스 컴포넌트의 문제점

1. `React.Component` 에 많은 기능이 숨어 있어 코드가 직관적이지 못함
   - → `this.state`, `this.props`, `this.setState({})`, `this.forceUpdate()`
   - 위의 호출 시점과 사용법이 헷갈림
2. 너무도 많은 `생명 주기 메서드(lifecycle method)`의 의미와 정확한 구현 방법을 알기 힘듬

> 그렇기에 리액트 훅을 만들었고 훅 사용을 권장함

### 커스텀 훅이란?

- `useState`, `useCallback` 라는 리액트 훅 함수를 사용해 새로운 기능의 훅 함수인 `useToggle` 생성

  - 이처럼 개발자가 직접 만드는 훅 함수를 `커스텀 훅(custom hooks)`라고 함

- hook의 Example

```tsx
import { useState, useCallback } from 'react';

export const useToggle = (initialState: boolean = false) => {
	const [value, setValue] = useState<boolean>(initialState);
	const toggle = useCallback(() => setValue((value) => !value), []);
	return [value, toggle];
};
```

### 리액트 훅 사용 시 주의점

- 리액트 훅 함수의 특징

1. 같은 리액트 훅을 여러번 호출 가능

- → `useState`, `useEffect` 훅을 두 번 호출
- 같은 이름의 훅을 다른 목적으로 여러 번 호출 가능

```tsx
export default function App() {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);

	useEffect(() => {}, []);
	useEffect(() => {}, []);
}
```

2. `함수 컴포넌트 몸통`이 아닌, `몸통 안 복합 실행문(compound statement)`의 `{ }` 안에서는 호출 불가

- → 함수 몸통 안 `{ }` 블록에서 Hook 호출 하면 안된다.
- 로컬 변수가 되어 `{ }` 블록 안에서만 유효하게 됨

  ```tsx
  export default function App() {
  	{
  		// 로컬 변수 블록 생성
  		const [x, setX] = useState<number>(0); // -1-
  	}
  	if (true) {
  		const [x, setX] = useState<number>(0); // -2-
  	}
  	for (;;) {
  		const [x, setX] = useState<number>(0); // -3-
  	}
  	useEffect(() => {
  		const [x, setX] = useState(0); // -4-
  	}, []);
  }
  ```

  1. {} 블록 안에서 설정
  2. if 문 블록 안 → 로컬 변수
  3. for 문 안 → 로컬 변수
  4. 훅 몸통 안에서 훅을 호출

5. `비동기 함수(async 키워드 붙은 함수)`는 콜백 함수로 사용 불가

```tsx
export default function App() {
	useEffect(async () => {
		await Promise.resolve(1);
	}, []);
}
```

### 프로젝트 만들기

> touch react-native.config.js

```tsx
module.exports = {
	project: {
		ios: {},
		android: {},
	},
	assets: ['./src/assets/fonts'],
};
```

> npx react-native link

#### 오늘 날짜와 현재 시간 출력하기

- 시계 앱을 만들려면 오늘 날짜와 현재 시각을 알아야 함

- Date 클래스

```tsx
const time = new Date(); // time에 날짜 얻어오기
time.toLocaleDateString(); // 오늘 날짜
time.toLocaleTimeString(); // 현재 시각
```

```tsx
import React from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
const time = new Date();
export default function App() {
	return (
		<SafeAreaView style={styles.safeAreaView}>
			<Text style={[styles.digitFont, styles.time]}>
				{time.toLocaleTimeString()}
			</Text>
			<Text style={styles.digitFont}>{time.toLocaleDateString()}</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	digitFont: { fontFamily: 'MajorMonoDisplay-Regular', fontWeight: '400' },
	time: { fontSize: 40 },
});
```

#### setInterval 함수로 시계 만들기

- Js는 `setInterval` 이라는 함수를 기본 제공
  - → `갱신주기(duration)` 마다 `콜백 함수`를 계속 호출

```tsx
const id = setInterval(콜백_함수, 갱신_주기);
콜백_함수 = () => {};
```

- `setInterval` : `id 값을 반환`

  - → `더 이상 호출 하지 않으`려면 `clearInterval` 함수 호출
  - `setInterval` 함수는 `시스템 메모리 자원`을 사용함
  - 그러기에 `setInterval` 함수가 동작하지 않도록 `clearInterval` 함수 호출

- `메모리 누수 방지`

```tsx
clearInterval(id);
```

> 시계 만드는 코드

```tsx
let time = new Date();
const duration = 1000; // 1 sec
const id = setInterval(() => {
	time = new Date();
}, duration);
```

- App 컴포넌트가 갱신한 시각을 화면에 반영하기 위해서
  - → 다음과 같은 코드 형태를 가져야함

```tsx
export default function App() {
	let time = new Date();
	const id = setInterval(() => {
		time = new Date();
		// 갱신한 시각이 반영되도록 App 재랜더링 하는 함수 필요
		forceUpdate();
	}, 1000);
	return <></>;
}
```

- 위의 코드의 심각한 문제점은 App을 `재렌더링` 할 때 마다 `setInterval` 호출
  - → setInterval 쪽 코드는 `컴포넌트가 처음 렌더링될 때 한 번만 호출해야 함`

#### useEffect 훅 사용하기

- React Hook → R/N 이 아닌 React 에서 제공하는 기능

```tsx
import React, { useEffect } from 'react';
```

- useEffect는 의존성 목록에 있는 조건 중 어느 하나라도 충족되면 콜백 함수 다시 실행

```tsx
useEffect(콜백_함수, 의존성_목록);
콜백_함수 = () => {};
```

- 컴포넌트를 생성 할 때 한 번만 실행

  - → 의존성 목록에 `빈 배열[]`을 지정
  - `[]`일 경우 `첫 번째 매개변수`의 `콜백 함수`를 단 한번만 실행

  ```tsx
  useEffect(() => {}, []);
  ```

- useEffect의 콜백 함수에 setInterval 지정

  ```tsx
  export default function App() {
  	let time = new Date();
  	useEffect(() => {
  		const id = setInterval(() => {
  			time = new Date(); // 현재 시각을 갱신
  		}, 1000);
  	}, []);
  	return <></>;
  }
  ```

- useEffect가 반환하는 함수

  ```tsx
  useEffect(()=> {
  	컴포넌트 생성 시 한 번 실행
  	return () => {} // 컴포넌트 파괴 시 한 번 실행
  }, [])
  ```

- 이를 이용해서 setInterval 의 메모리 누수를 막기 위해
  - → clearInterval 을 반환 하도록 설정하면 됨
    ```tsx
    export default function App() {
    	let time = new Date();
    	useEffect(() => {
    		const id = setInterval(() => {
    			time = new Date(); // 현재 시각을 갱신
    		}, 1000);
    		return () => clearInterval(id);
    	}, []);
    	return <></>;
    }
    ```

> 하지만 여기서는 `setInterval` 호출이 한 번 발생 하였을 뿐 갱신한 시각 반영 X
> 그러기에 갱신한 시각 반영 → `useState` 라는 또 다른 리액트 훅을 사용
