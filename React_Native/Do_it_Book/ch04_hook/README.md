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

#### useState 훅 사용하기

- React 패키지는 useState 훅 제공

  ```tsx
  import React, { useState } from 'react';
  ```

- useState 사용법

  ```tsx
  const [현재_값, set_함수] = useState(초기_값);
  set_함수 = (새로운_값) : void;
  ```

> useState 가 반환하는 `set함수(setter 함수)` 값이 바뀌면 `자동으로` 컴포넌트 `재렌더링`

- useEffect, useState 활용해서 시계 만들어보기

```tsx
export default function App() {
	const [time, setTime] = useState(new Date()); // -1-
	// -2-
	useEffect(() => {
		const id = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(id);
	}, []);
	// -2-
	return <></>;
}
```

1. `useState를` 이용해 `초기값`을 `new Date()`로 설정
   - → `return` 되는 값을 `time, setTime` 로 받아서 설정
2. useEffect의 콜백 함수 내부에 있는 `setInterval`의 콜백 함수에서
   - → 1초 간격으로 `setTime(new Date())`를 실행
   - time의 값을 변경
   - → 이러면 `setTime` 은 `time` 이 `변경` 시 → 컴포넌트 `reRender`

> 이를 useClock.ts 파일로 옮기고 커스텀 훅 생성

#### useClock 커스텀 훅 제작

```tsx
import { useState, useEffect } from 'react';

export function useClock() {
	const [time, setTime] = useState(new Date());
	useEffect(() => {
		const id = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(id);
	}, []);

	return time;
}
```

> index.ts 를 통해서 쉽게 가져올 수 있도록 설정

```tsx
export * from './useClock';
```

## useMemo와 useCallback 훅 이해하기

> 설치

    yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6
    yarn add @types/react-native-vector-icons @types/color @types/faker --dev

> 복사

     cp -r ../ch04_Simple_Hook/src .

### 수평 방향으로 ScrollView 스크롤

- R/N 코어 컴포넌트 중 `ScrollView`, `FlatList` 처럼 스크롤 기능이 있는 컴포넌트

  - → 부모/자식 관계에 있을 때 스크롤 방향을 각기 다르게 해야 하는 물리적인 제약

- `Cache.tsx, Memo.tsx` 등 에서 수직 방향으로 스크롤 되는 FlatList 사용

  - → 위 컴포넌트들을 자식 컴포넌트로 가지는 App.tsx 파일의 ScrollView → 스크롤 방향 : 수평

- ScrollView 코어 컴포넌트는 horizontal 이라는 속성을 제공
  - → true를 설정하면 수평 방향으로 스크롤 가능

```tsx
  <ScrollView horizontal={true}/> // true를 생략해도 동일하게 동작
  <ScrollView horizontal/>
```

- 그러나 수평으로 스크롤하기 위해서는 `위의 방법만으로 부족`
  - `스크롤할 컴포넌트 개수`에 `폰 넓이`를 `곱한 값` → `width 속성`에 설정

```tsx
import { Dimensions, ScrollView } from 'react-native';
const { width } = Dimensions.get('window');
const numberOfComponents = 3;
<ScrollView
	horizontal
	contentContainerStyle={{ width: width * numberOfComponents }}
/>;
```

### 전역 변수와 캐시

- 지금까지의 코드들은 컴포넌트 바깥쪽에서 `전역 변수(global variable)` 형태로 구현
  - → 데이터를 한 번 만들면 바뀌지 않게 하고 싶었기 때문

```tsx
export default function Cache() {
	const people = D.makeArray(2).map(D.createRandomPerson); // -1-
	return (
		<View style={[styles.view]}>
			<Text style={[styles.text]}>{title}</Text>
		</View>
	);
}
```

1. 만약 people을 컴포넌트 안쪽에 둔다면 reRender 할 때 마다 데이터 2개씩 생성
   - → Cache 컴포넌트가 함수, people은 지역 변수 이기 때문에 당연함

- 리액트 훅의 탄생 배경은 로컬 변수인 people을 마치 전역 변수처럼 사용하고 싶기 때문
  - → 리액트 팀은 `로컬 변수 people`이 `실제 데이터를 가지지 않고`
  - `실제 데이터` : `어딘가 캐시`
  - 로컬 변수 people : 필요할 때 `캐시한 데이터를 찾을 수` 있는 `일종의 키 저장`
  - → 이를 `참조(reference)`라고 함

```tsx
const 컴포넌트_캐시 = {
	키1: 값1,-----------------------> useState
	키2: 값2,-----------------------> useMemo
	키3: 값3,-----------------------> useCallback
};
```

- 이를 알아보기 위해서 파일 생성

```ts
const cache: Record<string, any> = {}; // -1-

export const createOrUse = <T>(key: string, callback: () => T) => {
	// -2-
	if (!cache[key]) {
		// -2-
		cache[key] = callback();
	}
	return cache[key];
};
```

1. `cache` 라는 이름의 `전역 변수` 존재
   - → 변수의 타입은 `Record<string, any>`
   - Ts 에서 기본 제공하는 타입
   - → `2`번의 형태 코드를 컴파일 오류 없이 실행하게 해줌
   - → Record 는 `Record<키_타입, 값_타입>` 형태로 사용 하는 `제네릭 타입(generic type)`

- cache
  - → `키` 타입 : `string(문자열)`
  - → `값` 타입 : `any(색인 타입(index type))`

> 위 코드는 `cache[key] 존재` → 그 값을 반환
> 없으면 `callback 호출` → cache[key]에 저장하고 반환

- `캐시를 구현하는 전형적인 방법`

  - → 앞의 파일에서 본 `createOrUse` 부분이 Cache.tsx 파일의 사용방법이
  - `리액트 훅의 구현 원리`임

- 리액트 훅의 뛰어난 점은 `people` 같은 `키 부분`을 `사용자 코드에서 관리 하지 않고`
  - → `리액트 프레임워크 내부에서 관리`하여 `호출 부분을 매우 간결`하게 해줌

#### FlatList 코어 컴포넌트의 특징

- View가 들어간 컴포넌트와 달리 부모 컴포넌트의 `width` 속성을 자동으로

  - → 자신의 `width` 속성값으로 설정하지 않음

- 부모 컴포넌트인 View 스타일 속성에 설정된 `alignItems` 영향 받지 않기 위해
  - → `FlatList` 스타일에 `width : '100%'`를 설정하여 `View의 width 값을 얻어야 함`

### 의존성이란?

- React 프레임워크 내부에서 관리하는 캐시는 어떤 상황이 일어나면 `갱신해야 할 경우가 생김`

  - → `React Hook` 에서는 이것을 `의존성(dependency)` 이라고 함
  - 캐시한 값을 갱신하는 `의존성은 여러개일 수` 있음

- 리액트 훅에서 이와 같은 `여러 개의 의존성`을 `배열 형태`로 모아 놓은 것을 `의존성 목록`
  - → `의존성 목록 중 어느 것 하나라도 조건이 충족`하면
  - `캐시를 자동 갱신`하고 해당 컴포넌트를 `reRender` 하게 됨

> 의존성이 전혀 없다면 의존성 목록에 단순히 빈 배열 사용

### useMemo 훅

- 다음의 코드는 people을 반복적으로 생성해서 비효율적

```tsx
import * as D from '../data';

export default function Memo() {
	const people = D.makeArray(2).map(D.createRandomPerson);
	return <></>;
}
```

> 이럴 때 사용 할 수 있도록 React는 useMemo hook 제공

- 사용법

```tsx
const 캐시된_데이터 = useMemo(콜백_함수, [의존성1, 의존성2, ...]);
콜백_함수 = () => 원본_데이터;
```

- `useMemo` 뿐만 아닌 `useCallback`, `useEffect` 훅

  - → 의존성 목록에 있는 `의존성에 변화` 있다면
  - `콜백 함수를 자동으로 호출`하여서 `의존성을 반영`
  - 대부분의 콜백 함수는 `한 번만 호출하면 충분` → `의존성 없다([ ]) 빈 배열 사용`

- Ts 관점에서의 useMemo 함수 시그니처

```tsx
useMemo<T>(()=> T, [의존성1, 의존성2, ...]): T
```

> 의존성이 동작 잘하는지 확인 하기

```tsx
import React, { useMemo } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Colors } from 'react-native-paper';
import color from 'color';
import Person from '../copy/Person';
import * as D from '../data';
// import {createOrUse} from './createOrUse';
import { useClock } from '../hooks';

const title = 'Memo';
export default function Memo() {
	const time = useClock(); // -1-
	const people = useMemo(
		() => D.makeArray(2).map(D.createRandomPerson),
		[
			// time
		]
	); // -2-
	return (
		<View style={[styles.view]}>
			<Text style={[styles.text]}>{title}</Text>
			<FlatList
				style={styles.flatList}
				data={people}
				renderItem={({ item }) => <Person person={item} />}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1, padding: 5, backgroundColor: Colors.blue900 },
	text: { fontSize: 20, color: 'white' },
	flatList: { width: '100%' },
	itemSeparator: {
		borderWidth: 1,
		borderColor: color(Colors.grey500).lighten(0.5).string(),
	},
});
```

1. 1초 마다 변경 되도록 `time` 가져오기
2. 주석 해제하고 마우스를 이용해서 오른쪽으로 밀어보면 `1초 마다 변경`되는 것을 확인할 수 있음

#### useMemo의 메모이제이션 기능

- useMemo : Memo의 `메모이제이션(Memoization)`의 줄임말

- `메모이제이션`은 `과거에 계산한 값을 반복해서 사용`할 때 `그 값을 캐싱`

  - → 계산 속도를 높이는 `코드 최적화 기법(optimization technique)`의 하나

- 다음 코드는 `피보나치 수`를 구하는 `알고리즘`
  - → 지속적으로 `fibonacci(1)`, `fibonacci(2)`, `fibonacci(3)`을 계산하고 저장
  - 과거에 계산한 값을 어딘가 별도로 저장했다가 필요할 때 불러와서 사용
  - 전체 함수 호출 속도를 높일 수 있다는게 최대 장점

```tsx
import React, { useMemo } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Colors } from 'react-native-paper';
import * as D from '../data';
import { fibonacci } from './fibonacci';

const title = 'Fibo';
export default function Fibo() {
	const memorizedFibonacci = useMemo(() => fibonacci, []); // -1-
	// -2-
	const fibos = useMemo(
		() =>
			D.makeArray(21).map((my, index) => ({
				number: index,
				fibonacci: memorizedFibonacci(index),
			})),
		[]
	);
	// -2-
	return (
		<View style={[styles.view]}>
			<Text style={[styles.text]}>{title}</Text>
			<FlatList
				contentContainerStyle={styles.contentContainerStyle}
				style={styles.flatList}
				data={fibos}
				renderItem={({ item }) => (
					<Text style={styles.text}>
						{item.number} : {item.fibonacci}
					</Text>
				)}
				keyExtractor={(item) => item.number.toString()}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1, padding: 5, backgroundColor: Colors.blue900 },
	text: { fontSize: 20, color: 'white' },
	flatList: { width: '100%' },
	contentContainerStyle: { alignItems: 'center' },
});
```

1. useMemo 훅을 사용해서 fibonacci 함수가 계산한 값을 메모
2. 0 부터 20 까지의 피보나치 값을 계산하고 이를 화면에 렌더링 함

### useCallback 훅

- 다음 컴포넌트의 비효율은 Person 컴포넌트가 reRender 될 때 마다
  - → iconPressed 함수를 지속적으로 생성

```tsx
export default function Person() {
	const iconPressed = () => Alert.alert('onPressed');
	return <Icon onPress={iconPressed} />;
}
```

> 그래서 React는 useCallback 훅을 제공

```tsx
const 캐시된_콜백_함수 = useCallback(원본_콜백_함수, 의존성_목록);
```

- useMemo 훅 : 데이터나 함수 호출의 결과 값을 캐시
- useCallback 훅 : 콜백 함수를 캐시

> useCallback 훅을 이용한 avatarPressed 이벤트 처리 함수를 캐시
> 매개변수가 있는 콜백 함수에도 적용 가능

```tsx
import React, { useCallback } from 'react';
export default function Person() {
	const avatarPressed = useCallback(() => Alert.alert('Avatar Pressed'), []);
	return <Avatar onPress={avatarPressed} />;
}

export default function Person() {
	const textChanged = useCallback((text: string) => console.log(text), []);
	return <TextInput onChangeText={avatarPressed} />;
}
```

> 고차 함수에 적용

```tsx
export default function Person() {
	const iconPressed = useCallback(
		(what: string) => () => Alert.alert(`${what} pressed.`),
		[]
	);
	return (
		<View>
			<IconText onPress={iconPressed('comment')} name="comment" />
			<IconText onPress={iconPressed('retweet')} name="twitter-retweet" />
		</View>
	);
}
```

### 고차 함수란?

- Ts 에서 함수는 변수에 담긴 `함수 표현식`

  - → `함수 표현식` : 일종의 값

- 따라서 `함수`의 `반환값으로 함수를 사용` 가능
  - → 어떤 `함수가 또 다른 함수를 반환` 할 때 그 함수를 고차 함수라고 부름
  - `high-order function`

> 우리가 React 에서 평범하게 쓰는 `return XML 문`이 고차 함수!!!
