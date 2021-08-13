# 콘텍스트와 ref 속성

- React 프레임워크에서 의미하는 콘텍스트와 이와 관련된
  1. createContext API
  2. useContext hook
  3. ref 속성
  4. forwardRef API

> 위 의 내용을 학습

## 콘텍스트 이해하기

- React 패키지는 `createContext` 라는 `API` 제공

  - → `createContext` 함수 호출로 얻은 값 : `context(콘텍스트)`

- 스위치 기능을 통해서 react-native-paper 패키지의 기본모드, 다크 모드 테마 설정 가능

> 설치

     yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6
     yarn add @types/react-native-vector-icons @types/color @types/faker
     yarn add react-native-appearance

> src/screens/MainNavigator.tsx 구현

```tsx
import React, { useState, useMemo } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './Home';

export default function MainNavigator() {
	const [index, setIndex] = useState<number>(0);
	const routes = useMemo(
		() => [{ key: 'home', title: 'Home', icon: 'home' }],
		[]
	);

	const renderScene = BottomNavigation.SceneMap({
		home: Home,
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

## 콘텍스트란?

- 컴포넌트의 속성은 부모 → 자식 컴포넌트로 어떤 정보를 전달
  - → 그러나 부모가 직계 자식이 아닌 손자, 증손자 컴포넌트에게 전달
  - → → 번거로운 `지속적인 속성 전달`

```tsx
<자식_컴포넌트 shared_props={shared_props} />;

({ shared_props }) => <손자_컴포넌트 shared_props={shared_props} />;

({ shared_props }) => <증손자_컴포넌트 shared_props={shared_props} />;
```

> React는 이런 속성 전달의 번거로움을 덜고자 콘텍스트(context) 메커니즘을 구현

- React, R/N에서 콘텍스트
  1. createContext
  2. useContext
  - 위 둘을 통해서 이루어짐

```tsx
// 부모 컴포넌트
// createContext
<Provider value={ }/>  // 부모, value에 공유할 정보 설정

// 자식 컴포넌트
useContext → 공유 정보 취득

// 손자 컴포넌트
useContext → 공유 정보 취득

// 증손자 컴포넌트

useContext → 공유 정보 취득
```

- 콘텍스트 기능을 사용하는 React, R/N 코드는 항상 이름에

  - → `Provider` 자가 들어간 컴포넌트
  - → `use콘텍스트_이름()` 형태의 커스텀 훅을 사용

- 콘텍스트 기능을 구현한 `react-native-paper` 같은 패키지 또한
  - → `Provider` 자가 들어간 컴포넌트
  - → `useTheme` 형태의 `Provider가 제공하는 정보를 사용`할 수 있게 하는 `커스텀 훅`

> 이제 react-native-paper 패키지의 테마 기능을 사용하는 코드를 작성하면서
> 콘텍스트가 어떤 방식 동작하는지 학습

### 테마 기능이란?

- 아이폰은 IOS 13
- 안드로이드는 버전 10(API29)
- 다크 모드(dark mode)라는 기능이 생겼음

- 낮 : 기본모드
- 밤 : 어두운 색상의 다크 모드

- 요즘 이를 사용하는 것이 매우 많음
  - → 이를 사용하려면 `context 기법`을 무조건 사용!!!

#### AppearanceProvider 컴포넌트와 useColorScheme 커스텀 훅

- R/N 패키지는 AppearanceProvider 컴포넌트와 useColorScheme 커스텀 훅을 제공

```tsx
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
```

- React, R/N 에서 제공자를 뜻하는 `Provider` 자가 들어간 컴포넌트는 항상

  - → 최상위 컴포넌트(root component)로 동작해야 함

- 그리고 이런 컴포넌트는 React framework가 제공하는 context 기능을 사용하여 만듬

- 다음 코드에서 `AppearanceProvider` Provider를 포함
  - MainNavigator의 상위 컴포넌트로 만든다.

```tsx
export default function App() {
	return (
		<AppearanceProvider>
			<SafeAreaView>
				<MainNavigator />
			</SafeAreaView>
		</AppearanceProvider>
	);
}
```

- `Provider` 컴포넌트를 제공하는 패키지는 항상 이 컴포넌트가 제공하는 기능 사용할 수 있도록

  - → `use기능()` 형태의 커스텀 훅을 제공
  - → 그러므로 `AppearanceProvider`는 `useColorScheme` 이란 이름의 커스텀 훅을 제공

- 다음 코드는 `useColorScheme` 커스텀 훅을 호출하여 앱이
  - `다크모드`로 동작 중인지 확인

```tsx
export default function App() {
	const scheme = useColorScheme(); // 이 코드 패턴은
	return (
		<AppearanceProvider>
			<MainNavigator />
		</AppearanceProvider>
	);
}
```

- 이 코드 패턴은 React, R/N에서 context 기능을 사용할 때 2개 패턴 중 하나로
  - → `Provider` 관련 커스텀 훅 호출을 한 컴포넌트에서 모두 이용해야 할 때의 패턴

> 그런데 useColorScheme은 폰의 운영체제가 다크 모드인지만 알려줌

- 앞서 본 화면처럼 실제로 모드에 따라 바탕색과 글자 색을 바꾸려면 또 다른 `Provider` 컴포넌트 필요

#### Provider 컴포넌트

- react-native-paper 패키지는 다음처럼 Provider 컴포넌트를 제공

```tsx
import { Provider } from 'react-native-paper';
```

- 그런데 Provider는 너무 일반적인 이름이라 혼락스러울 수 있으므로 다음처럼 PaperProvider로 변경해서 사용

```tsx
import { Provider as PaperProvider } from 'react-native-paper';
```

- PaperProvider 또한 `Provider` 이므로 다음처럼 MainNavigator의 상위 컴포넌트

  - → 부모 컴포넌트로 동작해야 함

- 다음 코드에는 두 개의 `Provider` 컴포넌트가 존재

  - `Provider`의 순서는 JSX 구문만 따른다면 자유롭게 설정 가능

- 콘텍스트 기능은 완전히 독립적으로 동작하므로 기능이 다른 콘텍스트에 영향을 주지 않음!!!

> 다만 MainNavigator 처럼 특정 `Provider`가 제공하는 기능을 커스텀 훅을 통해 사용하고 싶다면
> 해당 Provider의 자식 컴포넌트로 만들어야 함

```tsx
import { Provider as PaperProvider } from 'react-native-paper';
export default function App() {
	return (
		<AppearanceProvider>
			<SafeAreaView>
				<MainNavigator />
			</SafeAreaView>
		</AppearanceProvider>
	);
}
```

##### PaperProvider의 theme 속성

- PaperProvider는 theme이란 선택 속성을 제공
- react-native-paper 패키지는 theme 속성에 설정할 수 있는 값으로 두 가지 제공

```tsx
import { DefaultTheme, DarkTheme } from 'react-native-paper';
```

> 위의 내용들을 바탕으로

```tsx
import React, { useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { Provider as PaperProvider } from 'react-native-paper';
import { DefaultTheme, DarkTheme } from 'react-native-paper';
import MainNavigator from './src/screens/MainNavigator';
export default function App() {
	const scheme = useColorScheme();
	const [theme, setTheme] = useState(
		scheme === 'dark' ? DarkTheme : DefaultTheme
	);
	const toggleTheme = useCallback(
		() => setTheme((theme) => (theme.dark ? DefaultTheme : DarkTheme)),
		[]
	);
	return (
		<AppearanceProvider>
			<PaperProvider theme={DarkTheme}>
				<SafeAreaView style={[styles.safeAreaView]}>
					<MainNavigator />
				</SafeAreaView>
			</PaperProvider>
		</AppearanceProvider>
	);
}

const styles = StyleSheet.create({
	safeAreaView: { flex: 1 },
});
```

#### useTheme 커스텀 훅으로 PaperProvider의 테마 기능 사용해 보기

- R/N 패키지는 다음처럼 useTheme 이라는 커스텀 훅을 제공

```tsx
import { useTheme } from 'react-native-paper';
```

- useTheme 커스텀 훅은 다음처럼 `theme 객체를 반환`
  - → theme 객체는 `PaperProvider`의 `theme 속성`에 `설정한 값`이 `콘텍스트를 통해 전달`된 것

```tsx
const theme = useTheme();
```

- 위에서 얻은 theme 에서 비구조화 할당 구문으로 fonts, colors 속성을 얻을 수 있음

```tsx
const { fonts, colors } = theme;
```

> theme 객체가 제공하는 속성을 알아보려면

    `console.log(Object.keys(theme))` 실행해 보면 됨

> dark mode로 실행

```tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Home() {
	const theme = useTheme();
	const { fonts, colors } = theme;
	return (
		<View style={[styles.view, { backgroundColor: colors.background }]}>
			<View style={[styles.bar, { backgroundColor: colors.primary }]}>
				<Text style={[styles.text, { color: colors.text }, fonts.medium]}>
					TopBar
				</Text>
			</View>
			<View style={styles.content}>
				<Text style={[styles.text, { color: colors.text }, fonts.regular]}>
					TopBar
				</Text>
			</View>
			<View style={[styles.bar, { backgroundColor: colors.accent }]}>
				<Text style={[styles.text, { color: colors.text }, fonts.light]}>
					BottomBar
				</Text>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1 },
	bar: { height: 50, flexDirection: 'row', padding: 5, alignItems: 'center' },
	content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	text: { fontSize: 20, textAlign: 'center' },
});
```

- 앞의 코드에서 가장 흥미로운 부분

  - → `useTheme` 커스텀 훅의 사용
  - → → 부모 컴포넌트 쪽에 구현한 `Provider` 컴포넌트 제공 `콘텍스트 기능`
  - → → `자식 컴포넌트에 사용`할 때의 패턴

- 만약 useTheme 커스텀 훅이 없다면
  - → 밑 코드와 같이 계속 해서 속성을 넘겨 받아야 함
  - 훅이 있으면 코드가 간편해짐

> 훅 없이 구현 하기...

```tsx
type HomeProps = {
	theme: any;
};
function Home({ theme }: HomeProps) {}
```

#### createContext API 탐구

- context 기능을 구현할 때 `가장 먼저 해야할` 일!
  - → react 패키지가 제공하는 `createContextAPI` 사용하여 `context 객체 생성`

```tsx
import React, { createContext } from 'react';
```

> 그러나 Ts 에서는 다음 코드 패턴으로 createContext API를 호출해야함

```tsx
type ContextType = {
	// 공유하려는 데이터 속성
};
const defaultContextValue: ContextType = {
	// 공유하려는 데이터 속성 초기값
};
const SomeContext = createContext<ContextType>(defaultContextValue);
```

> src/contexts sub dir 생성

> ToggleThemeContext 생성

```tsx
import React, { createContext } from 'react';

export type ToggleThemeContextType = {}; // -1-
const defaultToggleThemeContext = {}; // -2-

const ToggleThemeContext = createContext<ToggleThemeContextType>(
	defaultToggleThemeContext // -3-
);
```

1. 공유하려는 `데이터 속성`
2. 공유하려는 데이터 `속성의 초기값` 설정
3. `createContext` 를 이용한 1, 2 번을 조합한 `Context` 생성

##### context 객체가 제공하는 Provider 컴포넌트

- `createContext API`로 `생성된 객체`는

  - → `Provider`와 `Consumer`가 제공하는 기능을 사용하는
  - → → 클래스 컴포넌트를 위한 컴포넌트

- 하지만 여기서는 `함수 방식으로 컴포넌트`를 구현

  - → 그렇기에 `Consumer는 무시`해도 됨
  - → → 함수 컴포넌트에서는 Consumer 보다 훨씬 사용법이 간단한 : `custom hook` 사용!

- `Provider 컴포넌트`는 다음처럼 `value`와 `children` 속성이 존재하는
  - → `ProviderProps` 속성을 제공
  - 타입 변수 T : `createContext<T>` 와 같아야 함
  - `children`은 이전 children과 `똑같은 의미`의 속성
  - `value` : `context Provider`가 `제공하는 기능`

```tsx
interface ProviderProps<T> {
	value: T;
	children?: ReactNode;
}
```

> 위를 바탕으로 ToggleThemeContext 생성

```tsx
import React, { createContext, FC } from 'react';

export type ToggleThemeContextType = {};
const defaultToggleThemeContext = {};

const ToggleThemeContext = createContext<ToggleThemeContextType>(
	defaultToggleThemeContext
);

type ToggleThemeContextProps = {}; // -1-
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
	children,
}) => {
	const value = {};
	return (
		<ToggleThemeContext.Provider value={value}>
			{children}
		</ToggleThemeContext.Provider>
	);
};
```

1. FC 타입은 children 속성을 기본 제공하기 때문에 속성을 명시적으로 제공하지 않아도 됨

##### useContext 훅

> react 패키지는 useContext 훅을 제공

```tsx
import { useContext } from 'react';
```

- `useContext` 훅은 콘텍스트 `객체가 제공`하는
  - → `Provider` 컴포넌트의 `value` 속성값을 얻을 `목적으로 사용`하는 훅

```tsx
export const useToggleTheme = () => {
	const value = useContext(ToggleThemeContext);
	return value;
};
```

- 앞서 사용했던 useColorScheme, useTheme 커스텀 훅 또한 이런 코드 패턴으로 만들어진 커스텀 훅

> App.tsx 에 내용추가

```tsx
export default function App() {
	const scheme = useColorScheme();
	const [theme, setTheme] = useState(
		scheme === 'dark' ? DarkTheme : DefaultTheme
	);
	const toggleTheme = useCallback(
		// eslint-disable-next-line no-shadow
		() => setTheme((theme) => (theme.dark ? DefaultTheme : DarkTheme)),
		[]
	);
	return (
		<AppearanceProvider>
			<PaperProvider theme={theme}>
				<ToggleThemeProvider toggleTheme={toggleTheme}>
					<SafeAreaView style={[styles.safeAreaView]}>
						<MainNavigator />
					</SafeAreaView>
				</ToggleThemeProvider>
			</PaperProvider>
		</AppearanceProvider>
	);
}
```

##### ToggleThemeProvider에 toggleTheme 속성 추가

- 아래 코드는 ToggleThemeProvider 컴포넌트에 toggleTheme 속성을 추가하고
  - → 얻은 toggleTheme 함수를 ToggleThemeContext.Provider의 value 속성에 설정

```tsx
type ToggleThemeContextProps = {
  toggleTheme: () => void;
}
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
  children, toggleTheme
}) => {
  const value = {
    toggleTheme
  }
  return <ToggleThemeContext.Provider value={value}>
}
```

- 그런데 value 속성의 타입은 제네릭 함수 createContext<T>(defaultValue)의 타입 변수 T와 같아야함
- ToggleThemeContextType에 ()=> void 타입의 toggleTheme 선언,
- defaultToggleThemeContext에 toggleThem의 기본 형태를 구현

```tsx
export type ToggleThemeContextType = {
	toggleTheme: () => void;
};

const defaultToggleThemeContext = {
	toggleTheme: () => {},
};
```

- 이럴 때 useToggleTheme 커스텀 훅의 구현 내용에 따르면 toggleTheme 함수는 다음 코드 형태로 얻을 수 있음

```tsx
const toggleTheme = useToggleTheme();
```

> 위의 내용을 바탕으로 구현

```tsx
import React, { createContext, FC, useContext } from 'react';

export type ToggleThemeContextType = {
	toggleTheme: () => void;
};
const defaultToggleThemeContext = {
	toggleTheme: () => {},
};

const ToggleThemeContext = createContext<ToggleThemeContextType>(
	defaultToggleThemeContext
);

type ToggleThemeContextProps = {
	toggleTheme: () => void;
};
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
	children,
	toggleTheme,
}) => {
	const value = { toggleTheme };
	return (
		<ToggleThemeContext.Provider value={value}>
			{children}
		</ToggleThemeContext.Provider>
	);
};

export const useToggleTheme = () => {
	const toggleTheme = useContext(ToggleThemeContext);
	return toggleTheme;
};
```

#### Switch 컴포넌트

- R/N은 다음처럼 Switch
