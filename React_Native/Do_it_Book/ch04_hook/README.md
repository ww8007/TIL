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

## useState 훅 이해하기

- 컴퓨터 분야에서 상태(state)

  - → 시간이 지나도 값이 유지되며 필요에 따라서는 값을 바꿀 수 있는 어떤 것을 의미

  1.  클래스의 멤버 속성
  2.  전역 변수 형태로 만들어짐

- 보통은 함수 몸통의 지역 변수 형태로는 상태를 만들지 못함
- useState : 컴포넌트 내부에 클래스의 멤버 속성 처럼 값을 유지하고 변경 가능

### 상태란

- 프로그래밍 용어로 상태(state)
  - → 어떤 값을 유지(preserve) 하는 변수
  - → 저장된 값을 변경(가변, mutable) 할 수 있어야함
  - 클래스의 `속성(property)`, `지역변수(member variable)`로 구현

> React, R/N에서 상태는 속성(property)와 마찬가지로 값이 변하면 reRendering 하는 특징을 가지고 있음

### useState 훅

```tsx
import React, { useState } from 'react';
```

- 사용법

```tsx
const [값, 값을_변경하는_함수] = useState(초기값);
```

- 값을\_변경하는 함수(setter 함수)를 호출하면 `값` 부분을 변경하고
  - → 동시에 컴포넌트를 reRender 함

> 위의 reRender 때문에 `useState 훅`은 `값`과 `setter 함수`를 `튜플(tuple)` 형태의 배열로 반환

- 이에 해당하는 것이 `배열에 적용하는 비구조화 할당 구문`

  - → 객체에 적용하는 비구조화 할당과 다르게 이름을 자유롭게 적을 수 있다는 점이 특징

- Ts의 관점에서 useState 타입 정의
  - → `타입 변수(type parameter) : S` 는 상태 타입 State의 첫 글자

```tsx
function useState<S>(initialState: S | (()=>S): [S, Dispatch<SetStateActions<S>>])
```

- 값을 변경하는 함수 시그니처(함수타입) `Dispatch<SetStateAction<S>>`
  - → `Dispatch`, `SetStateAction`의 타입 정의는 아래와 같음

```tsx
type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((previousState: S) => S);
```

- `SetStateAction<S>`를 S로 단순화 하면 `Dispatch<SetStateActions<S>>`
  - → `(value: S) => void` 타입이 됨
  - `SetStateAction<S> = ((previousState: S)=> S)` 에 해당하는 부분은 뒤에 설명

#### 상태를 사용하는 컴포넌트 구현

- React, R/N 에서 속성은 `불변 데이터(immutable, read-only data)`
- 다음 코드의 Person 컴포넌트의 매개변수 person 은 내부에서 데이터가 변하지 않고 단순히 사용만 가능한 변수

```tsx
const Person: FC<PersonProps> = ({person}) => {...}
```

- React, R/N `컴포넌트 속성`의 특징이 `불변성`임
  - → person `내용 전부나 일부를 바꾸`려면 `컴포넌트 배개변수` person → `initialPerson` 등의 이름으로 `바꾸는게 좋음`
  - 이래야 코드 작성자와 열람자가 헷갈리는 요소가 적음

```tsx
function PersonUsingValueState({ person: initialPerson }: PersonPros) {...}
```

#### 값을 상태로 했을 때 구현 방법

- 아래에서의 setter 함수는 컴포넌트의 매개변수 person의 멤버를 바꾸는 것이 아닌
  - → 지역변수 comment, retweet, heart 의 값을 바꾸기 위한 용도의 함수

> commentPressed 함수

```tsx
const commentPressed = () => {/*comment 변수 +1 하는 내용 구현*/}
<IconText onPress={commentPressed} text={comment}>
```

> commentPressed 함수 구현

```tsx
const commentPressed = () => {
	setComment(comment + 1); // -1-
};
```

1. 최적화 문제가 있음
   - → reRender 할 때 마다 똑같은 내용의 함수를 반복 생성
   - 이를 useCallback Hook을 이용해서 최적화

> useCallback Hook을 이용한 최적화

```tsx
const commentPressed = useCallback(() => {
	setComment(comment + 1); // -1-
}, []);
```

1. 심각한 문제 존재
   - → comment 값이 `단 한 번만 +1` 증가하는 버그
   - 버그의 이유는 comment의 `초기값이 N`으로 설정되었다고 할 때
   - 한 번 실행하면 `+1` 정상 동작
   - → → 그러나 `의존성 배열(dependency array)`에 comment가 없음

- N + 1 로 바뀐 comment가 useCallback에 설정된 콜백 함수에 반영되려면 comment가 의존성 목록에 존재햐아함
  - → 그러나 여기서는 의존성이 없다는 의미로 `빈 배열[]`을 사용했음
  - 그래서 바뀐 comment의 값을 콜백함수에 반영하지 않는 버그가 생긴 것

> 그러므로 comment를 useCallback 의존성 목록에 추가

```tsx
const commentPressed = useCallback(() => {
	setComment(comment + 1);
}, [comment]);
```

> 더 좋은 해결법

- 앞서 봤던 `SetStateAction<S>`의 `(previousState:S) => S` 형태로 setComment 함수를 호출
  - → 이 방식의 장점은 의존성 목록에 comment를 추가할 필요가 없음

```tsx
const commentPressed = useCallback(() => {
	setComment((comment) => comment + 1);
}, []);
```

#### 겍체를 상태로 했을 때의 구현 방법

- PersonUsingValueState useState 훅 코드 3개 사용
  - → 이를 객체를 대상으로 사용이 가능하다.

```tsx
const [person, setPerson] = useState<D.IPerson>({
	...initialPerson,
	counts: { comment: 0, retweet: 0, hear: 0 },
});
```

> 다만 객체를 사용할 때는 얕은 복사(shallow copy), 깊은 복사(deep copy) 현상과 관련

##### 얕은 복사, 깊은 복사

- 얕은 복사의 예

```tsx
let person = { comment: 1 };
let newPerson = person;
newPerson.comment = 10;
const equal = person === newPerson; //true
```

- 문제점 : `얕은 복사`를 해서 메모리 주소를 가져와버림
  - → newPerson 에서 `값을 변경해도 본 객체에 영향을 미침`

> 이래서 깊은 복사를 사용해야함

```tsx
let person = { comment: 1 };
let newPerson = { ...person };
newPerson.comment = 10;
const equal = person === new Person(); //false
```

- `깊은 복사`가 일어나면 person 과 다른 새로운 newPerson 생성하고 person의 모든 속성값

  - → newPerson에 `복사(member-wise copy)`
  - 그러므로 newPerson의 comment 속성값 변경하더라도 기존 객체는 기존 값 유지

- 제대로 구현해서 사용하기

```tsx
const commentPressed = useCallback(
	() =>
		setPerson((person) => ({
			...person,
			counts: { ...person.counts, comment: person.counts.comment + 1 },
		})),
	[]
);
```

#### 자식 컴포넌트에서 부모 컴포넌트의 상태 변경하기

- 컴포넌트를 개발할 때 리액트 훅 함수를 사용하여 로직을 추가하다 보면
  - → 코드 분량이 점점 늘어남
  - 가독성도 떨어지고 관리하기도 점점 어려워짐
  - 그렇기에 컴포넌트를 작은 기능의 컴포넌트 여러 개로 분활하여 개발하는 것은 필수 작업

```tsx
const [person, setPerson] = useState<D.IPerson>({
	...initialPerson,
	counts: { comment: 0, retweet: 0, heart: 0 },
});
return <PersonIcons person={person} setPerson={setPerson}> // -1-
```

1. 이런 식으로 person 상태와 상태를 변경할 수 있는 setter 함수(setPerson)를 넘겨주면
   - 부모 컴포넌트에서 구현할 로직을 자식 컴포넌트에서 충분히 구현이 가능함

> 여기서 중요한 것은 setPerson 함수의 타입

```tsx
export type PersonIconsProps = {
	person: D.IPerson;
	setPersonState: Dispatch<SetStateAction<D.IPerson>>;
};
```

- 다음 코드는 useState 타입 정의
  - → 상태 타입을 S라고 했을 때
  - setter 함수의 타입은 `Dispatch<SetStateAction<S>>`
  - `부모의 상태` 타입 : `D.IPerson`
  - `setPerson` 의 타입 : `Dispatch<SetStateAction<D.IPerson>>`

> useState 훅의 타입

```tsx
function useState<S>(
	initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
```

#### 배열을 상태로 했을 때의 구현 방법

- 앞에서는 people 데이터를 useMemo 훅을 사용하여 만들었음
  - → 이 부분은 useState 훅을 사용하여 `D.IPerson[]` 타입의 상태로 구현 가능

```tsx
export default function App() {
	// const people = useMemo(() => D.makeArray(10).map(D.createRandomPerson), []);
	// 기존 배열 추가 코드
	const [people, setPeople] = useState<D.IPerson[]>([]); // -1-
	const add = () =>
		setPeople((perviousPeople) => [D.createRandomPerson(), ...previousPeople]); // -2-
}
```

1. useState를 이용한 D.IPerson 타입의 빈 배열 생성
2. setter 함수를 이용한 기존 배열에 새롭게 만든 목록 추가

> D.IPerson 타입 객체를 배열에서 삭제

```tsx
const deleteAll = () => setPeople((notUsed) => []);
```

- 하지만 이렇게 구현해도 화면에는 여전히 아무런 변화가 없음
  - → 그 `원인`은 다음 코드의 `people` 변수에 있음
  - 코드에서 `children`은 `useMemo` 훅을 사용 중
  - App 컴포넌트 처음 렌더링 할 때 → `초기값인 [ ]` 으로 설정된 people을 참조하여 생성된 값을 사용
  - → 따라서 add 버튼을 누를 때 마다 people 배열에는 새로운 배열이 생겨야 하지만
  - → → `의존성 배열`(목록)이 `[ ]` 이므로 바뀐 부분이 전혀 반영이 되지 않음

> 결론적으로 `부모 컴포넌트`에서 `useMemo`를 이용해서 `최적화`를 하고 있지만
> `의존성 배열`에 `빈 배열이 들어 있기 때문`에 `변경 내용이 감지`가 안되고 `캐싱된 값`이 계속 사용되고 있는 것 이다.

- 여기서 알 수 있는 점은 `부모 컴포넌트`에서 useState를 사용해서 내려주는 것을 사용하고
  - → `최적화`를 사용한다면 `useMemo`, `useCallback`의 `의존성 배열`을 신경을 잘 쓰도록 한다.

##### 배열 데이터를 컴포넌트의 상태로 만들 때 주의할 점

- Js, Ts 언어에서 배열은 Array 클래스의 인스턴스

  - → 새로운 아이템을 기존 배열의 가장 앞에 추가하는 `prepend` 와
  - → 가장 마지막에 추가하는 `append`(또는 push) 메서드를 사용하면 안됨

- 객체를 상태를 했을 때 구현 방법 중 객체의 얕은 복사와 깊은 복사를 살펴 보았음

- 자바스크립트와 타입스크립트에서 배열은 객체
  - → 즉 배열에서도 얕은 복사와 깊은 복사에 대한 문제가 발생하게 됨

> 얕은 복사 후 두 값 비교

```tsx
let people = [];
let newPeople = people;
newPeople.prepend(10);
const equal = people == newPeople; // true
```

> 깊은 복사 후 두 값 비교

```tsx
let people = [];
let newPeople = [...people];
newPeople.add(10);
const equal = people == newPeople; // false
```

> 무조건 객체나 배열을 사용해서 값을 변경하거나 추가 할 때는 ... (전개 연산자)를 사용해서 복사
> 깊은 복사를 하지 않으면 문제가 생기게됨

> 또한 useMemo 에서도 배열의 길이 → people.length를 의존성 배열에서 검사하는게 좋음

```tsx
const children = useMemo([...생략...], [people.length])
```

## useEffect와 useLayoutEffect 훅 이해하기

- useLayoutEffect와 useEffect 생명 주기 후

> 사용법

```tsx
useEffect(콜백_함수, 의존성_목록);
useLayoutEffect(콜백_함수, 의존성_목록);
콜백_함수 = () => {};
```

- 두 훅의 콜백함수는 함수를 반환할 수 있음
  - → 반환 함수는 컴포넌트를 언마운트 할 때 단 한 번 실행

```tsx
콜백_함수 = () => {
	return 반환_함수; // 언마운트 때 단 한 번 실행
};
```

### 컴포넌트의 생명주기란?

- React, R/N 에서는 컴포넌트를 `생성`하여 `최초 렌더링` 과정을 마치면
  - → 컴포넌트를 `마운트(mount)` 했다고 함
- 마운트한 컴포넌트는 이후 구현 로직에 따라 재렌더링을 거듭 하다가
  - → 어떤 시점에서 `구현 로직에 의해 파괴(destroy)` 되어 화면에서 사라지게됨
  - → → 이를 컴포넌트가 `언마운트(unmount)` 되었다고 함

> 컴포넌트의 `마운트 과정`과 `언마운트 과정`을 합쳐서 `생명주기(life-cycle)` 이라고 함

### 리액트 네이티브 컴포넌트의 onLayout 이벤트 속성

- 모든 R/N 코어 컴포넌트는 onLayout 이벤트 속성을 제공
  - → 또한 LayoutChangeEvent 타입을 제공

```tsx
import type { LayoutChangeEvent } from 'react-native';
```

- 이 타입은 `onLayout` 이벤트 속성에 설정하는 이벤트 처리기의 `입력 매개변수 타입`

```tsx
const onLayout = (e: LayoutChangeEvent) => {};
```

> LayoutChangeEvent 타입 layout 얻기

```tsx
export interface LayoutChangeEvent {
	nativeEvent: {
		layout: LayoutRectangle;
	};
}
```

> LayoutRectangle의 멤버 변수

```tsx
export interface LayoutRectangle {
	x: number;
	y: number;
	width: number;
	height: number;
}
```

> 위 둘을 이용해서 렌더링한 컴포넌트의 위치와 크기를 알 수 있게 됨

```tsx
const onLayout = (e: LayoutChangeEvent) => {
	const { layout } = e.nativeEvent;
	console.log('onLayout', layout);
};
<View onLayout={onLayout} />;
```

#### useLayoutEffect와 useEffect 훅의 호출 순서

- onLayout 이벤트를 호출했다는 것은 컴포넌트의 렌더링이 끝났다는 것을 의미
  - → `useLayoutEffect`, `useEffect`, `onLayout` 이벤트가 발생하는 순서

| 컴포넌트 | <center> → </center> | useLayoutEffect 호출     | <center> → </center> | useEffect 호출                 | <center> → </center> | onLayout 이벤트 발생 |
| -------- | -------------------- | ------------------------ | -------------------- | ------------------------------ | -------------------- | -------------------- |
|          | 컴포넌트 렌더링 시작 |                          | 화면 나타남          |                                |                      |                      |
| 컴포넌트 | <center> → </center> | useEffect 반환 함수 호출 | <center> → </center> | useLayoutEffect 반환 함수 호출 | <center> → </center> | 컴포넌트 파괴        |

#### useLayoutEffect와 useEffect 훅의 차이점

- React 프레임워크에서

  - → `useLayoutEffect` : `동기(synchronous)`로 실행
  - → `useEffect` : `비동기(asynchronous)`로 실행

- 위의 말의 의미는 `useLayoutEffect` 훅은 `콜백 함수가 끝날 때 까지`
  - → `프레임워크가 기다`린다는 의미
  - `but` `useEffect`는 기다리지 `않음`

> 공식문서에서는 가능한 useEffect 훅을 사용
> 구현할 수 없을 때에 한하여 useLayoutEffect 훅을 사용할 것을 권고

### ActivityIndicator 코어 컴포넌트

- 대부분의 모바일 앱은 원격지 서버에서 데이터를 가져올 때
  - → 기다림을 의미하는 회전 아이콘을 화면에 표시

```tsx
import { ActivityIndicator } from 'react-native';

<ActivityIndicator size="large" color="black" />;
```

#### setTimeout API 호출하기

- ActivityIndicator 컴포넌트는 작업이 끝나기를 기다림을 의미하는 컴포넌트
  - → 작업이 끝났을 때는 화면에서 사라져야 함
  - useState 를 이용해서 loading 변수를 만들어서 true 일 경우만 render 하게 가능

```tsx
useEffect(() => {
	const id = setTimeout(() => seLoading(false), 3000);
	return () => clearTimeout(id);
}, [loading]);
```

### 타입스크립트 제공 Pick 타입

- 타입스크립트는 `Pick` 이라는 타입을 제공
  - → `Pick` 타입은 `제네릭 타입`으로
  - → → 대상 타입의 `전체 속성 중 필요한 속성만 선택`해 `간결한 속성`의
  - → → `새로운 타입`을 만들어냄

```tsx
type ResultType = Pick<대상_타입, 속성1 | 속성2 | .../>
```

> 앞에서의 예제처럼 IPerson 타입 중 'id', 'avatar' 속성만 빼와서 사용하고 싶은 경우

```tsx
type ResultType = Pick<D.IPerson, 'id' | 'avatar'/>
```

### setInterval API 호출하기

> 1초 마다 랜덤한 아바타 이미지가 차례 대로 나오게 하는 법

1. avatars 배열 생성
   - useState 훅을 사용하여 빈 avatars 배열을 만드는 것 부터 시작

```tsx
export default function interval() {
	const [avatars, setAvatars] = useState<IdAndAvatar[]>([]);
	return <></>;
}
```

2. 아바타 렌더링
   - 배열에 유요한 데이터가 있으면 여러개의 데이터 렌더링

```tsx
export default function interval() {
	const [avatars, setAvatars] = useState<IdAndAvatar[]>([]);
	const children = avatars.map(({ id, avatar }) => (
		<Avatar key={id} uri={avatar} />
	));
	return <ScrollView>{children}</ScrollView>;
}
```

3. 1초에 한 개씩 아바타 추가
   - → useEffect 훅의 콜백 함수에 setInterval 호출
   - → → 콜백 함수에서 setAvatars를 사용해서 랜덤하게 추가 하도록 설정

```tsx
useEffect(() => {
	const id = setInterval(() => {
		if (start) {
			setAvatars((avatars) => [
				...avatars,
				{ id: D.randomId(), avatar: D.randomAvatarUrl() },
			]);
		}
	}, 1000);
	return () => clearInterval(id);
}, [start]); // -1-
```

1. 코드에서 중요한 곳은 start 변수를 의존성 목록에 추가하는 부분
   - → useEffect와 같은 생명주기 훅은 자신의 의존성 목록에
   - → → start 와 같은 의존성이 있고, 이 값이 변하면 콜백 함수가 반환한 종료 함수
   - → → 호출하여서 콜백 함수를 파괴한 다음, 자신의 매개변수로 입력한 콜백 함수 다시 호출

> useEffect 의존성 배열

     1. `의존성 목록`에 있는 항목이 `변하면`
     2. 콜백함수가 `반환한 종료 함수` 호출(위의 clearInterval())
     3. `콜백 함수 파괴`
     4. 자신의 매개변수로 입력한 `콜백함수 다시 호출`

### fetch API 사용하기

- fetch는 Js 엔진에서 제공하는 API
  - HTTP 프로토콜의 GET, POST, PUT, DELETE 제공

> blob, json, text 와 같은 method가 있는 Response 타입 객체 Promise로 받아옴

```tsx
function fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
interface Response {
	blob(): Promise<Blob>;
	json(): Promise<any>;
	text(): Promise<string>;
}
```

#### Promise 객체의 then-체인

- Promise 객체는 then 메서드를 통해 실제 데이터를 얻어야 함
  - → `then 메서드`는 `또 다른 Promise 객체`나 `어떤 값`을 `반환` 가능
  - 계속해서 엮을 수 있음 : 이를 then-체인

#### any 타입 데이터에서 원하는 정보만 추출하기

- 백엔드에서 받아온 정보가 어떤 것을 내포하고 있는지 모를 수 있음
  - → `res.json()` 으로 얻은 `데이터 타입 : any[]`

> ICountry.ts

```tsx
export type ICountry = {
	region: string;
	subregion: string;
	name: string;
	capital: string;
	population: string;
};
```

```tsx
fetch('https://google.com')
	.then((res) => res.json())
	.then((result: any[]) => {});
```

> any 타입 데이터 result에서 특정 타입이 정의한 속성만 골라내는 법

- 현재 `result : any[]` 타입의 배열

  - → `result.map()` 메서드 호출 가능

- 그러면 목표는 `any[] 배열`에서

  - → `ICountry` 타입이 `정의한 속성만 추려낸`
  - → → `ICountry[]` 타입 데이터를 얻는 것으로 바뀜

- 이 때 any → ICountry 타입 변환은 코드에서 보듯
- 골라낸 속성이 있는 객체를 Ts 타입 구문의 타입 단언 방식으로 구현 가능

> 타입 단언

```tsx
.then((result: any[])=> {
	return result.map((data: any)=> {
		const {region, subregion, name, capital, population} = data;
		return {region, subregion, name, capital, population} as ICountry; // -1-
	})
})
```

1. 타입 딘언을 통한 타입 변환

##### 타입 단언이란?

- Ts 에는 독특하게타입 변환이 아닌
  - → 타입 단언(type assertion)이라는 용어를 사용

> 타입 단언의 두 형태

```tsx
<타입>객체;
```

```tsx
객체 as 타입;
```

- 위 둘은 ES5 Js 구문이 아님
  - → 따라서 Js 타입 변호나 구문과 구분하고자 타입 단언이라는 용어 사용

> 만약 data를 뽑아온것을 타입 별로 분리해서 다른 타입으로 변경해서 사용하고 싶은 경우 이렇게 사용하면 된다.

## 커스텀 훅 이해하기

- 지금까지 컴포넌트의 훅 함수 코드 패탠을 보면 비슷한 점을 발견할 수 있음

  - → 이럴 때는 비슷한 패턴의 훅 호출을 조합해서 재사용할 수 있는 조금 더 간결하게 구현하는 것이 좋음

- 커스텀 훅(custom hooks)은 여러 개의 리액트 훅과 커스텀 훅을 조합하여 재사용할 수 있는 새로운 훅을 만드는 기능

> 예제 yarn 설치

    yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6
    yarn add @types/react-native-vector-icons @types/color @types/faker

### react-native-paper 패키지 제공 BottomNavigation 컴포넌트 사용하기

- `react-native-paper` 패키지가 제공하는 `BottomNavigation`

  - → 화면 아래쪽에 화면을 전활할 수 있는 아이콘 버튼을 표시

- BottomNavigation 컴포넌트를 사용하기 위해서
  1.  navigationState
  2.  onIndexChange
  3.  renderScene
  - 위 3개의 속성에 적절한 값을 설정해야 함

> BottomNavigation의 3개 속성

```tsx
<BottomNavigation
	navigationState={{ index, routs }}
	onIndexChange={setIndex}
	renderScene={renderScene}
/>
```

> MainNavigator 코드

```tsx
import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

export default function MainNavigator() {
	const [index, setIndex] = useState<number>(0); // -1-
	const [routes] = useState([]); // -2-

	const renderScene = BottomNavigation.SceneMap({}); // -3-
	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
}
```

1. `BottomNavigation` 에서 사용할 `initialState`와 `setter 함수` 설정
   - → initialState : index
   - → setter : setIndex
2. `routes` `빈배열` 설정

> BottomNavigation에 출력하고 싶은 화면 컴포넌트 Home이 있다고 가정

```tsx
import Home from './Home';
```

> key, title, icon 키가 있는 객체를 routes에 추가

```tsx
const [routs] = useState([{ key: 'home', title: 'Home', icon: 'home' }]);
```

> 마지막으로 `routes의 key 값`(여기서는 home)에 해당하는 컴포넌트를 `SceneMap`에 설정

```tsx
const renderScene = BottomNavigation.SceneMap({
	home: Home,
});
```

> 최종적 복사해서 사용할 모습

```tsx
import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

export default function MainNavigator() {
	const [index, setIndex] = useState<number>(0);
	const [routes] = useState([
		//{key: 'home', title: 'Home', icon: 'home'} // -1-
	]);

	const renderScene = BottomNavigation.SceneMap({
		//home: Home, // -2-
	});
	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
}
```

1. routes에 `key, title, icon` 정보를 가진 객체 추가
2. routes에 `key` 값에 해당하는 컴포넌트를 설정

> MaterialCommunityIcons 아이콘 세트

    react-native-paper는 react-native-vector-icons 패키지의
    MaterialCommunityIcons 아이콘 세트를 사용한다.
    이 세트가 제공하는 아이콘의 이름은
    ('materialdesignicons.com') 에서 확인 가능

### 커스텀 훅 이란?

- `커스텀 훅`은 리액트 프레임워크가 기본으로 제공하는 `useState`, `useEffect와` 같은 `훅을 조합`

  - → 만들어낸 `새로운 훅 함수`를 뜻함
  - `커스텀 훅`은 이전 리액트 컴포넌트에서는 불가능했던 `로직 공유의 유연성`을 제공

- 보통 여러 컴포넌트에서 공통으로 사용하는 코드를 추려내서 만들게 됨
  - → 시계를 만들었을 때 사용했던 useClock
  - → → 컴포넌트의 로직 부분 코드가 훨씬 간결해지므로 코드의 가독성이 높아지고 관리가 편해진다는 장점

> 커스텀 훅을 만들 때 함수 이름은 항상 `use~`

     특징 : 함수 몸통에서 다른 커스텀 훅 함수를 호출 가능

#### useToggle 커스텀 훅 제작

- 앞 timer 에서 다음 패턴의 코드를 구사

```tsx
export default function Timer() {
	const [loading, setLoading] = useState(false);
	const toggleLoading = useCallback(
		() => setLoading((loading) => !loading),
		[]
	);
}
```

- Interval 컴포넌트는 변수 이름만 다를 뿐 다음처럼 같은 패턴의 코드를 사용

```tsx
export default function Interval() {
	const [start, setStart] = useState(false);
	const toggleStart = useCallback(() => setStart((start) => !start), []);
}
```

> 같은 패턴의 코드를 hook 으로 생성하기 위해서 복사

```tsx
import { useState, useCallback } from 'react';
// -1-
export default function Timer(
	initialValue: boolean = false,
	deps: any[] = []
): [boolean, () => void] {
	// -1-
	const [value, setValue] = useState(initialValue); // -2-
	const toggleValue = useCallback(() => setValue((value) => !value), deps); // -2-
	return [value, toggleValue];
}
```

1. `deps`란 이름의 `의존성 목록`을 `입력 매개변수`로 하는 부분을 추가
   - → 또한 initialValue를 입력으로 추가여서 초기값을 지정해서 받아옴
2. `loading` 이라는 변수 이름을 `value와 같이 알기 쉬운 이름`으로 바꿈
   - → deps에 기본값([]) 빈 배열을 추가하여서 호출 쪽 코드가 간결해 지도록 설정

> 커스텀 훅의 반환값 타입을 명시하지 않으면 useToggle을 사용할 때 타입 스크립트 오류 메시지

    	반환 타입을 지정해준다.

```tsx
import { useState, useCallback } from 'react';

export default function Timer(
	initialValue: boolean = false,
	deps: any[] = []
): [boolean, () => void] {
	// -1-
	const [value, setValue] = useState(initialValue);
	const toggleValue = useCallback(() => setValue((value) => !value), deps);
	return [value, toggleValue];
}
```

1. return 값의 타입 지정
   - → `initialState` : `boolean`
   - → `setter(세터함수)` : `() => void`

#### useTimeout 커스텀 훅 제작

> 기본 Timer 컴포넌트의 구성

```tsx
useEffect(() => {
	const id = setTimeout(() => setLoading(false), 3000);
	return () => clearTimeout(id);
}, [loading]);
```

- 기존 코드를 옮겨서 useTimeout 커스텀 훅을 제작 가능

```tsx
import { useEffect } from 'react';

export const useTime = (
	callback: () => void,
	duration: number,
	deps: any[] = []
): void => {
	useEffect(() => {
		console.log(deps);
		if (duration === 0) return; // -1-
		const id = setTimeout(callback, duration);
		return () => clearTimeout(id);
	}, [duration, ...deps]);
};
```

1. duration이 0 일 경우 setTimeout을 호출하지 않겠다는 뜻

#### useInterval 커스텀 훅 제작

- useEffect 부분은 Timer 컴포넌트의 useEffect 코드와 호출하는 API만 다를 뿐 같은 패턴
  - → useInterval 커스텀 훅은 useTimeout 훅과 똑같은 패턴으로 구현 가능

```tsx
import { useEffect } from 'react';

export const useInterval = (
	callback: () => void,
	duration: number,
	deps: any[] = []
): void => {
	useEffect(() => {
		if (duration === 0) return;
		const id = setInterval(callback, duration);
		return () => clearInterval(id);
	}, [duration, ...deps]);
};
```

### useLayout 커스텀 훅 제작

- onLayout 이벤트 속성에 설정하는 콜백 함수 다음처럼 구현한 적이 있음
  - → 코드를 좀 더 개발 친화적인 `커스텀 훅`으로 다시 구현

```tsx
const onLayout = useCallback((e: LayoutChangeEvent) => {
	const { layout } = e.nativeEvent;
	console.log(Platform.OS, 'onLayout called', layout);
}, []);
```

> LayoutChangeEvent 타입 추가

```tsx
import { useCallback } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';

export const useLayout = () => {
	const onLayout = useCallback((e: LayoutChangeEvent) => {
		const { layout } = e.nativeEvent;
	}, []);
};
```

> layout 객체를 상태로 하여 다음처럼 useLayout.ts 구현

```tsx
import { useCallback, useState } from 'react';
import type { LayoutChangeEvent, LayoutRectangle } from 'react-native';
// -1-
export const useLayout = (): [
	LayoutRectangle,
	(e: LayoutChangeEvent) => void
	// -1-
] => {
	// -2-
	const [layout, setLayout] = useState<LayoutRectangle>({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});
	// -2-
	// -3-
	const onLayout = useCallback((e: LayoutChangeEvent) => {
		const { layout } = e.nativeEvent;
		setLayout(layout);
	}, []);
	// -3-
	return [layout, onLayout];
};
```

1. return 함수를 배열로 설정
   - → 첫번째 : `useState`의 `initialState로` 설정된 `layout`
   - → 두번째 : `LayoutChangeEvent` 를 event 인자로 가지는 `함수`
2. `useState`를 통해서 `initialState` → `layout`에 값 저장
   - → `setter` 함수 : `setLayout`
3. `onLayout`을 `useCallback`을 사용해서 설정
   - → `e: LayoutChangeEvent`를 설정하는 것을 유념
   - → `e.nativeEvent`에서 `layout`을 비구조화 할당

### 커스텀 훅 버전으로 다시 구현하기

- 앞서 작성한 커스텀 훅을 테스트하는 코드 작성

#### LifeCycle 컴포넌트를 커스텀 훅 버전으로 다시 구현하기

```tsx
import React, { useEffect, useLayoutEffect, useCallback } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Colors } from 'react-native-paper';
import type { LayoutChangeEvent } from 'react-native';
import { useLayout } from '../hooks';
export default function LifeCycle() {
	const [layout, setLayout] = useLayout(); // -1-

	return (
		<View onLayout={setLayout} style={styles.view}>
			<Text style={styles.title}>LifeCycle</Text>
			<Text style={styles.title}>
				layout : {JSON.stringify(layout, null, 2)}
			</Text>
		</View>
	);
}
// prettier-ignore
const styles = StyleSheet.create({
  view: {flex: 1, alignItems: 'center', backgroundColor: Colors.blue100},
  title: {fontSize: 30, fontWeight: '600'},
  });
```

1. layout, setLayout → 을 return으로 배열로 받아오게 됨
   - → View 에서 onLayout을 통해서 setLayout callback 함수 실행

#### Timer 컴포넌트를 커스텀 훅 버전으로 다시 구현

- 다음 코드는 앞서 구현한 useToggle과 useTimeout 커스텀 훅을 가장 간단하게 적용
- 이 코드는 useTimeout 호출에 loading에 대한 의존성이 없어서
  - → 처음 렌더링 할 때 useTimeout의 콜백 함수를 단 한번만 호출

```tsx
import { useToggle, useTimeout } from '../hooks';

export default function Timer() {
	const [loading, toggleLoading] = useToggle(true);
	useTimeout(() => toggleLoading, 3000); // loading에 대한 의존성 필요
}
```

> 그러나 useTimeout에 loading을 의존성 목록에 넣어주면 콜백 함수를 3초에 한 번씩 무한히 반복 호출

> 그렇기 때문에 loading → true 일 경우만 toggleLoading이 수행되도록 설정 한 모습이다.

```tsx
export default function Timer() {
  const [loading, toggleLoading] = useToggle(true);

  useTimeout(() => loading && toggleLoading(), 3000, [loading]); // -1-
	return (
		...
	)
```

1. loading이 true 인 경우만 toggleLoading이 동작하도록 `&&` 연산자 사용

#### Interval 컴포넌트를 커스텀 훅 버전으로 다시 구현

- 다음 코드는 useEffect 훅 대신
  - → useInterval 커스텀 훅을 사용하여 구현의미 더 정확하게 전달

```tsx
export default function Interval() {
	useInterval(
		() => {
			if (start) {
				setAvatars((avatars) => [
					...avatars,
					{ id: D.randomId(), avatar: D.randomAvatarUrl() },
				]);
			}
		},
		1000,
		[start]
	);
}
```

> 더 간결하게 구현도 가능함

```tsx
export default function Interval() {
	useInterval(
		() => [...avatars, { id: D.randomId(), avatar: D.randomAvatarUrl() }],
		1000,
		[start]
	);
}
```

> 실제로 사용해보기

     src/screens/Interval.tsx

```tsx
export default function Interval() {
  const [avatars, setAvatars] = useState<IdAndAvatar[]>([]);
  const [start, setStart] = useState(true);
  const toggleStart = useCallback(() => setStart(start => !start), []);
  const clearAvatars = useCallback(() => setAvatars(() => []), []);
  useInterval(
    () => {
      if (start) {
        setAvatars(avatars => [
          ...avatars,
          {id: D.randomId(), avatar: D.randomAvatarUrl()},
        ]);
      }
    },
    1000,
    [start],
  );
```

### 짚고 가는 setTimeout setInterval 차이

> setInterval

- 앞서 진행 중인 코드의 완료 유무와 관계없이
  - → 정해진 시간 간격에 무조건 지정된 코드를 호출
  - 그러나 지정된 시간 간격에 도달하더라도 지정된 코드를 실행할 수 없는 경우
  - → setInterval은 이벤트를 큐에 저장
  - 이벤트가 중첩되거나 처리할 수 없는 상황인 경우 코드가 무시 될 수 있음

> setTimeout

- 처음 지정한 간격만큼 기다린 후 지정된 코드를 실행
  - 지정된 코드가 끝난 시점에 다시 setTimeout 함수 호출
  - 실행 중 코드가 지연 되더라도
  - → 모든 처리가 끝난 다음에 이벤트가 중첩되지 않음

> 결론

     일회성 타이밍 아니고 일정 시간별로 반복실행 하고 싶다면
     `setTimeout()`, setInterval()을 사용하여 반복가능

## Promise 객체와 async/await 구문의 이해

- Promise 타입은 ES5 Js가 기본으로 제공하는 타입
