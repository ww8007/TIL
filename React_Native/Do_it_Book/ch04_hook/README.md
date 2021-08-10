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
