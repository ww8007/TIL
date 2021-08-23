# 콘텍스트와 ref 속성

- React 프레임워크에서 의미하는 콘텍스트와 이와 관련된
  1. createContext API
  2. useContext hook
  3. ref 속성
  4. forwardRef API

> 위 의 내용을 학습

## 목차

- [콘텍스트와 ref 속성](#콘텍스트와-ref-속성)
  - [목차](#목차)
  - [콘텍스트 이해하기](#콘텍스트-이해하기)
  - [콘텍스트란?](#콘텍스트란)
    - [테마 기능이란?](#테마-기능이란)
      - [AppearanceProvider 컴포넌트와 useColorScheme 커스텀 훅](#appearanceprovider-컴포넌트와-usecolorscheme-커스텀-훅)
      - [Provider 컴포넌트](#provider-컴포넌트)
        - [PaperProvider의 theme 속성](#paperprovider의-theme-속성)
      - [useTheme 커스텀 훅으로 PaperProvider의 테마 기능 사용해 보기](#usetheme-커스텀-훅으로-paperprovider의-테마-기능-사용해-보기)
      - [createContext API 탐구](#createcontext-api-탐구)
        - [context 객체가 제공하는 Provider 컴포넌트](#context-객체가-제공하는-provider-컴포넌트)
        - [useContext 훅](#usecontext-훅)
        - [ToggleThemeProvider에 toggleTheme 속성 추가](#togglethemeprovider에-toggletheme-속성-추가)
      - [Switch 컴포넌트](#switch-컴포넌트)
      - [react-native-paper 패키지가 제공하는 useTheme 커스텀 훅](#react-native-paper-패키지가-제공하는-usetheme-커스텀-훅)
      - [Home 컴포넌트에 toggleTheme 함수와 Switch 컴포넌트 사요하기](#home-컴포넌트에-toggletheme-함수와-switch-컴포넌트-사요하기)
  - [useRef 훅 이해하기](#useref-훅-이해하기)
    - [ref 속성이란?](#ref-속성이란)
      - [ref 속성의 타입](#ref-속성의-타입)
    - [useRef 훅](#useref-훅)
      - [여기서 짚고 가는 옵션 체이닝 연산자](#여기서-짚고-가는-옵션-체이닝-연산자)
      - [onContextSizeChange 이벤트 속성](#oncontextsizechange-이벤트-속성)
      - [Input.tsx 파일 구현](#inputtsx-파일-구현)
        - [TextInput 컴포넌트에서의 useRef 훅 활용 방법](#textinput-컴포넌트에서의-useref-훅-활용-방법)
        - [Keyboard.dismiss()로 키보드 강제로 내리기](#keyboarddismiss로-키보드-강제로-내리기)
        - [KeyboardAvoidingView 코어 컴포넌트](#keyboardavoidingview-코어-컴포넌트)
        - [react-native-keyboard-aware-scroll-view 패키지 설치와 활용](#react-native-keyboard-aware-scroll-view-패키지-설치와-활용)
        - [KeyboardAwareScrollView의 scrollToFocusedInput 메서드](#keyboardawarescrollview의-scrolltofocusedinput-메서드)
        - [AutoFocusProvider 컴포넌트와 useAutoFocus 커스텀 훅](#autofocusprovider-컴포넌트와-useautofocus-커스텀-훅)
  - [useImperactiveHandle 훅 이해하기](#useimperactivehandle-훅-이해하기)
    - [테마 컴포넌트 구현](#테마-컴포넌트-구현)
      - [forwardRef API](#forwardref-api)
      - [forwardRef API의 타입](#forwardref-api의-타입)
      - [src/theme/paper/TextInput 컴포넌트 구현](#srcthemepapertextinput-컴포넌트-구현)
      - [src/theme/paper/Text 컴포넌트 구현](#srcthemepapertext-컴포넌트-구현)
      - [scr/theme/paper/View.tsx](#scrthemepaperviewtsx)
    - [useImperativeHandle 훅이란?](#useimperativehandle-훅이란)
      - [useImperativeHandle 훅의 동작 원리](#useimperativehandle-훅의-동작-원리)
      - [useImperativeHandle 훅의 타입](#useimperativehandle-훅의-타입)
        - [ImperativeTextInput 사용자 컴포넌트 구현](#imperativetextinput-사용자-컴포넌트-구현)
      - [Imperative 컴포넌트 구현](#imperative-컴포넌트-구현)

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

- `컴포넌트의 속성`은 `부모 → 자식` 컴포넌트로 어떤 `정보를 전달`
  - → 그러나 부모가 직계 자식이 아닌 `손자, 증손자` 컴포넌트에게 전달
  - → → 번거로운 `지속적인 속성 전달`

```tsx
<자식_컴포넌트 shared_props={shared_props} />;

({ shared_props }) => <손자_컴포넌트 shared_props={shared_props} />;

({ shared_props }) => <증손자_컴포넌트 shared_props={shared_props} />;
```

> React는 이런 속성 전달의 번거로움을 덜고자 `콘텍스트(context) 메커니즘`을 구현

- React, R/N에서 콘텍스트
  1. `createContext`
  2. `useContext`
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
  - → `use콘텍스트_이름()` 형태의 `커스텀 훅`을 사용

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

- 이럴 때 `useToggleTheme` 커스텀 훅의 구현 내용에 따르면 `toggleTheme` 함수는 다음 코드 형태로 얻을 수 있음

```tsx
const { toggleTheme } = useToggleTheme();
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

- R/N은 다음처럼 Switch 컴포넌트를 제공

```tsx
import { Switch } from 'react-native';
```

- Switch 컴포넌트는 `value` 속성과 `onValueChange` 이벤트 속성을 제공

  - → `value` : true, false
  - → `onValueChange : (boolean) => void` 타입 이벤트 처리기 설정

- value 값 달라지면 이벤트 처리기를 호출

#### react-native-paper 패키지가 제공하는 useTheme 커스텀 훅

- react-native-paper 패키지는 Provider 컴포넌트의 theme 속성에
  - → 설정한 값을 얻을 수 있는 useTheme 커스텀 훅을 제공

```tsx
import { useTheme } from 'react-native-paper';
```

> useTheme 훅을 사용해 theme 객체를 얻어오기

```tsx
const theme = useTheme();
```

> 속성값 얻기

```tsx
const { dark, colors, fonts } = useTheme();
```

> dark 값을 Switch 코어 컴포넌트의 value 속성에 적용

```tsx
<Switch value={dark} />
```

#### Home 컴포넌트에 toggleTheme 함수와 Switch 컴포넌트 사요하기

- 앞서 useToggleTheme 커스텀 훅을 만들었음
- Switch 컴포넌트 관련 코드에 useToggleTheme 훅을 호출해 얻은
  - → toggleTheme 함수를 onValueChange 이벤트 속성에 설정
  - → → 스위치를 옮길 때 마다 즉시 화면의 바탕색과 글자 색을 바꿀 수 있음

```tsx
import { useToggleTheme } from '../contexts';

export default function Home() {
	const { dark, colors, fonts } = useTheme();
	const toggleTheme = useToggleTheme();
	return <Switch value={dark} onValueChange={toggleTheme} />;
}
```

> 실제로 적용

```tsx
import React from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useToggleTheme} from '../contexts';
export default function Home() {
  const theme = useTheme();
  const {fonts, colors, dark} = theme; // -1-
  const toggleTheme = useToggleTheme(); // -2-
  return (
    <View style={[styles.view, {backgroundColor: colors.background}]}>
      <View style={[styles.bar, {backgroundColor: colors.primary}]}>
        <Text style={[styles.text, {color: colors.text}, fonts.medium]}>
          TopBar
        </Text>
        <View style={[{flex: 1}]} />
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
```

1. dark 속성 추가해서 비구조화 이용해서 가져오기
2. useToggleTheme 함수 빼온것을 함수화 시켜서 변수에 할당

## useRef 훅 이해하기

- **`useRef`**, **`useImperactiveHandle`** 흑은 ref 라는 속성에 적용하는 값을 만드는 훅

  - **↳** 사실 React, R/N가 제공하는 컴포넌트에는 모두 reference의 앞 3글자만 딴
  - **↳** → ref 라는 속성이 존재

- App 같은 사용자 컴포넌트도 ref 속성을 가질 수 있음

  - **↳** ref 속성이 있는 사용자 컴포넌트는 **`forwardRef`** 함수로 생성해야 한다는 조건이 있음

> 설치

     yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6
     yarn add @types/react-native-vector-icons @types/color @types/faker
     yarn add react-native-appearance react-native-localize
     yarn add react-native-keyboard-aware-scroll-view

> 전 파일 복사

    cp -r ../ch05_Context/src .
    cp ../ch05_Context/App.tsx .
    rm src/screens/*.*

> MainNavigator 설정

```tsx
import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './Home';
import Input from './Input';
import KeyboardAvoid from './KeyboardAvoid';
import KeyboardAware from './KeyboardAware';
import AutoFocus from './AutoFocus';
export default function MainNavigator() {
	const [index, setIndex] = useState<number>(0);
	const [routes] = useState([
		{ key: 'home', title: 'Home', icon: 'home' },
		{ key: 'input', title: 'Input', icon: 'apple-keyboard-caps' },
		{ key: 'avoid', title: 'KeyboardAvoid', icon: 'keyboard-variant' },
		{ key: 'aware', title: 'KeyboardAware', icon: 'keyboard-settings-outline' },
		{ key: 'auto', title: 'AutoFocus', icon: 'home-automation' },
	]);

	const renderScene = BottomNavigation.SceneMap({
		home: Home,
		input: Input,
		avoid: KeyboardAvoid,
		aware: KeyboardAware,
		auto: AutoFocus,
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

### ref 속성이란?

- React, R/N 제공하는 코어 컴포넌트 중

  - ↳ `TextInput`, `ScrollView`, `FlatList` 컴포넌트처럼 `메서드`를 제공하는 것이 있음

- TextInput : focus, blur 같은 메서드를 제공
- ScrollView, FlatList : scrollToTop, scrollEnd 와 같은 메서드를 제공

- 그런데 컴포넌트의 메서드를 호출 하기 위해서는

  - ↳ ` 컴포넌트의 리액트 요소``(react element, 객체 지향 언어에서 클래스의 인스턴스) ` 를 얻을 수 있어야
  - ↳ → `컴포넌트_객체.메서드()` 형태로 호출이 가능하다.

- React, R/N 은 네이티브 컴포넌트가 제공하는 메서드를 호출할 수 있도록 ref 속성을 제공
  - ↳ ref 속성으로 `컴포넌트의 인스턴스(instance)`를 얻을 수 있으며 이를 이용하여
  - ↳ → `ref.메소드()` 형태로 호출 가능

#### ref 속성의 타입

- ref 속성의 타입에 대해서 학습
- 앞서 구현 하였던 FlatList를 찾아서 ref 를 입력 후 → [정의로 이동] 클릭

> VSCode 편집기에서는 ClassAttributes 라는 타입의 속성을 안내
>
> > 지금은 함수 컴포넌트 관점에서 ref를 다루기 때문에
> > 그 위 RefAttributes의 ref 속성 타입 `Ref<T>`에 주목

> RefAttributes의 ref 속성

```ts
interface RefAttributes<T> extends Attributes {
	ref?: Ref<T> | undefined;
}
```

- 비슷한 방법으로 계속 정의를 찾다보면 ref 속성의 타입은
  - ↳ `current` 속성이 있는 RefObject 제네릭 타입임을 확인 가능
  - ↳ → `타입 변수 T` : FlatList, ScrollView, TextInput 처럼 `컴포넌트 이름`을 의미

> ref 속성의 타입

```ts
interface RefObject<T> {
	readonly current: T | null;
}
```

- 그런데 앞의 `RefObject<T>` 에서 `current` 속성의 타입은
  - ┣ `T | null` 임
  - ┣ 즉 `current = null 일 수 있음`
  - ┗ FlatList 등의 `React 요소의 값`이 설정되어 `컴포넌트의 메서드 호출` 가능

### useRef 훅

> React 패키지는 useRef 훅을 제공

```tsx
import React, { useRef } from 'react';
```

- [정의로 이동] 방식으로 useRef 함수 타입을 확인 하면
- ┣ `MutableRefObject`
- ┗ `RefObject`

- 여기서는 `RefObject<T>` 이므로 두 번재 버전의 useRef 훅을 사용

```tsx
function useRef<T>(initialValue: T): MutableObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
```

> 위에서 두번 째 버전의 useRef 사용 → 다음 형태로 코드 작성
>
> > 코드 형태

```tsx
const flatList = useRef<FlatList | null>(null);
<FlatList ref={flatList} />;
```

- 이렇게 코드를 작성하여 flatList의 값을 얻으면 다음 코드 형태로 scrollEnd 메서드를 호출 가능하다.

> 옵션 체이닝 연산자 사용

```tsx
flatList.current?.scrollToEnd();
```

- 여기서 `scrollToEnd` 메서드 호출 시
  - ┣ `옵션 체이닝 연산자(option chaining operator) : ?.`
  - ┗ 사용한 `이유` → flatListRef의 `Type` : `RefObject<FlatList | null>`
  - ┗ current 속성이 null 일 수 있기 때문

> 다음에서 add 버튼을 눌러서 아이템을 추가하는 경우

     추가 한 아이템을 보기 위해서 계속 스크롤을 해야함
     추가할 때 마다 자동으로 스크롤 되는 기능을 구현

#### 여기서 짚고 가는 옵션 체이닝 연산자

> 객체 깊숙한 곳에 사용하고 싶은 속성이 존재 할 경우

- 보통의 경우 우리는 . (체이닝 연산자)를 사용해서 배열이나 객체에 있는 값을 사용
- 만약 참조가 `nullish (null 또는 undefined)`이라면
  - ┗ 에러가 발생하는 것 대신에 표현식의 `리턴 값`은 `undefined`로 통일 됨

> 일반 적인 경우의 객체 값 얻기

```js
let nestedProp = obj.first && obj.first.second;
```

> 옵션 체이닝 사용 시

```js
let nestedProp = obj.first?.second;
```

- 이는 함수에서도 사용이 가능!!!
- 함수 호출과 optional chaining을 사용함으로써 메서드를 찾을 수 없는 경우에 예외를 발생시키는 것 대신에 그 표현식은 자동으로 undefined를 반환한다.

> 만약 속성 이름은 존재하지만 이게 함수가 아니라면 오류가 생기게 된다.

> null 병합 연산자와 같이 사용하기

- 옵션 체이닝을 사용한 후 아무 값도 찾을 수 없을 때 기본 값 주기 위해 사용 가능

```js
let customer = {
	name: 'Carl',
	details: { age: 82 },
};
const customerCity = customer?.city ?? 'Unknown city';
console.log(customerCity); // Unknown city
```

> 배열 항목에 접근

```js
let arrayItem = arr?.[42];
```

#### onContextSizeChange 이벤트 속성

- `ScrollView`, `FlatList는` `onContentSizeChange` 이벤트 속성을 제공
  - ┗ 속성의 이름대로 콘텐츠의 넓이나 높이가 변하면 설정된 콜백 함수를 호출

> onContentSizeChange 이벤트 속성

```ts
onContentSizeChange?: (w:number, h: number) => void;
```

- `FlatList` : `아이템을 추가`하면 아이템의 높이 크기가 증가
  - ┗ `onContentSizeChange` `이벤트 발생`

> onContentSizeChange `콜백 함수`에서 `scrollToEnd 메서드를 호출`하면 아이템 추가에 따른 자동 스크롤 기능 구현 가능

```tsx
const onContextSizeChange = useCallback(() =>
	flatListRef.current?.scrollToEnd(),
	, [flatListRef.current]
);
<FlatListRef onContentSizeChange={onContentSizeChange}/>
```

> 실제 구현

```tsx
const flatListRef = useRef<FlatList | null>(null); // -1-
// -2-
const onContentSizeChange = useCallback(
	() => flatListRef.current?.scrollToEnd(),
	// eslint-disable-next-line react-hooks/exhaustive-deps
	[flatListRef.current]
);
// -2-
return (
	<View style={[styles.view, { backgroundColor: theme.colors.surface }]}>
		<View style={[styles.topBar, { backgroundColor: theme.colors.accent }]}>
			<Text onPress={add} style={styles.text}>
				add
			</Text>
			<Text onPress={removeAll} style={styles.text}>
				remove all
			</Text>
			<View style={{ flex: 1 }} />
			<Switch value={theme.dark} onValueChange={toggleTheme} />
		</View>
		<FlatList
			ref={flatListRef} // -3-
			data={people}
			renderItem={({ item }) => <Person person={item} />}
			keyExtractor={(item) => item.id}
			onContentSizeChange={onContentSizeChange} // -3-
		/>
	</View>
);
```

1. `ref` 설정
2. `flatList.current` 를 의존성 배열에 설정하여서
   - ┗ 변경시 마다 `스크롤이 자동으로 이동`하도록 설정
3. FlatList ref에 설정한 `flatListRef` 설정
   - ┗ `onContentSizeChange` 에 직접 만든 함수 설정

#### Input.tsx 파일 구현

```tsx
export default function CopyMe() {
	const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
	const { dark, colors } = useTheme();
	const toggleTheme = useToggleTheme();

	return (
		<View style={[styles.view, { backgroundColor: colors.surface }]}>
			<View style={[styles.topBar, { backgroundColor: colors.accent }]}>
				<Text style={[styles.textButton]}>focus</Text>
				<Text style={[styles.textButton]}>dismiss keyboard</Text>
				<View style={{ flex: 1 }} />
				<Switch value={dark} onValueChange={toggleTheme} />
			</View>
			<View style={[styles.textView]}>
				<Text style={[styles.textInput, { color: colors.text }]}>email</Text>
				<TextInput
					style={[
						styles.textInput,
						{ color: colors.text, borderColor: colors.placeholder },
					]}
					value={person.email}
					placeholder="enter your email"
					onChangeText={(email) =>
						setPerson((person) => ({ ...person, email }))
					}
				/>
			</View>
		</View>
	);
}
```

> 만약 IOS 에서 키보드 올라오지 않으면 `command` + `k`

##### TextInput 컴포넌트에서의 useRef 훅 활용 방법

- TextInput 컴포넌트는 focus 메서드를 제공
  - ┗ 메서드를 호출하면 키보드가 올라 오도록 설정 가능

```tsx
export default function Input() {
	const textInputRef = useRef<TextInput | null>(null);
	<TextInput ref={textInputRef}>
}
```

- 이제 textInputRef 값을 얻었으므로
  - ┗ focus 버튼을 터치 시 TextInput에 포커스를 줄 수 있음

```tsx
const setFocus = () => {
	textInputRef.current?.focus();
};
<Text onPress={setFocus}>focus</Text>;
```

##### Keyboard.dismiss()로 키보드 강제로 내리기

- R/N는 키보드 관련 프로그래밍이 가능하도록 Keyboard API 제공

```tsx
import { Keyboard } from 'react-native';
```

- 화면에 나타난 키보드는 다음 코드를 실행 시 사라짐

> 키보드 내리기

```tsx
Keyboard.dismiss();
```

> 위를 통한 키보드 내리기 프로그래밍

```tsx
const dismissKeyboard = () => {
	keyBoard.dismiss();
};
<Text onPress={dismissKeyboard}>dismiss keyboard</Text>;
```

> 더 간단하게 작성

```tsx
<Text onPress={Keyboard.dismiss}>dismiss keyboard</Text>
```

- IOS `TextInput`이 다음 화면 왼쪽처럼 화면 아래에 있다면
  - ┣ 키보드가 올라왔을 때 `TextInput을 기릴 수 있음`
  - ┗ 그래서 R/N이 이런 경우를 예방하고 `KeyboardAvoidingView` 제공

##### KeyboardAvoidingView 코어 컴포넌트

```tsx
import { KeyboardAvoidingView } from 'react-native';
```

- `KeyboardingAvoidingView` 다음처럼 `TextInput` 컴포넌트를 자식 요소로 하여
  - ┣ `TextInput` 가리지 않도록 하는 기능을 수행
  - ┗ `KeyboardingAvoidingView` → View 이기 때문에 `flex : 1` 같이 스타일링 가능

```tsx
<KeyboardAvoidingView>
	<View style={{ flex: 1 }} />
	<View>
		<Text>email</Text>
		<TextInput placeholder="enter your email" />
	</View>
</KeyboardAvoidingView>
```

- React 공식문서는 `KeyboardAvoidingView`의 `behavior` 속성에 플렛폼에 따라
  - ┗ `padding`, `height` 값을 줄 것을 권유

```tsx
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
	<View style={{ flex: 1 }} />
	<View>
		<Text>email</Text>
		<TextInput placeholder="enter your email" />
	</View>
</KeyboardAvoidingView>
```

- 이제 src/screens/Input.tsx KeyboardAvoid.tsx 파일로 복사 생성
  - ┗ KeyboardAvoid.tsx 파일을 다시 복사

> 하지만 아쉽게도 버그가 존재함
> react-native-keyboard-aware-scroll-view 패키지가 제공하는

     KeyboardAwareScrollView 사용하면 해결 가능

##### react-native-keyboard-aware-scroll-view 패키지 설치와 활용

> 복사

     cp keyboardAvoid.tsx KeyboardAware.tsx && cd ../..

- 이 패키지는 다음처럼 `KeyboardAwareScrollView` 제공

```tsx
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
```

- 이제 KeyboardAwareScrollView 를 통해서 두 개의 TextInput 감싸면 됨

```tsx
<KeyboardAwareScrollView>
	<View style={{ flex: 1 }} />
	<View style={[styles.textView]}>
		<TextInput />
	</View>
	<View>
		<Text>name</Text>
		<TextInput />
	</View>
</KeyboardAwareScrollView>
```

> 하지만 여전히 ios 버그 존재

##### KeyboardAwareScrollView의 scrollToFocusedInput 메서드

- `KeyboardAwareScrollView`는 `scrollToFocusedInput` 메서드 제공
  - ┣ 이 메서드는 이름처럼 `포커스를 가진`
  - ┗ `TextInput`을 `수직 방향 스크롤을 통해` `항상 화면에 나타냄`

> ref 속성값 얻기

```tsx
const scrollViewRef = useRef<KeyboardScrollView | null>(null);
<KeyboardScrollView ref={scrollViewRef} />;
```

- `scrollViewRef` 값을 사용하면
- ┗ `scrollToFocusedInput` 메서드 호출 하는 `함수 작성가능`

> scrollToFocusedInput 메서드 호출

```tsx
const scrollToInput = (reactNode: any) => {
	scrollViewRef.current?.scrollToFocusedInput(reactNode);
};
```

> autofocus 함수 구현

```tsx
import { findNodeHandle } from 'react-native';
import type {
	NativeSyntheticEvent,
	TextInputFocusEventData,
} from 'react-native';

const autoFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) =>
	scrollToInput(findNodeHandle(event.target));
```

- 이제 `TextInput`의 `onFocus 이벤트 속성`에 앞서 구현한 `autoFocus` 함수를 설정하면 이 TextInput은 `항상 화면에 나타남`

> 이렇게 하면 버그는 안생기지만 항상 이렇게 KeyboardAwareScrollView를 사용 할 때마다
>
> > 이런식 으로 코드를 짜는 것은 비 효율적
> > 그렇기에 커스텀 훅을 이용

##### AutoFocusProvider 컴포넌트와 useAutoFocus 커스텀 훅

```tsx
import { AutoFocusProvider, useAutoFocus } from '../contexts';

export default function AutoFocus() {
	const autoFocus = useAutoFocus();
	return <TextInput onFocus={autoFocus} />;
}
```

> Provider 생성

```tsx
import React, { createContext, useContext } from 'react';
import { View, Text } from 'react-native';
import { findNodeHandle } from 'react-native';
import type { FC, ComponentProps } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputFocusEventData,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export type FocusContextType = {};

const defaultFocusContext = {};
const AutoFocusContext = createContext<FocusContextType>(defaultFocusContext);
export type AutoFocusProviderProps = ComponentProps<
	typeof KeyboardAwareScrollView
>;

export const AutoFocusProvider: FC<AutoFocusProviderProps> = ({
	children,
	...props
}) => {
	const value = {};
	return (
		<AutoFocusContext.Provider value={value}>
			{children}
		</AutoFocusContext.Provider>
	);
};

export const useAutoFocus = () => {
	const value = useContext(AutoFocusContext);
	return value;
};
```

> autoFocus 함수 구현

```tsx
export type FocusEvent =

```

> 완성본

```tsx
import React, { createContext, useCallback, useContext, useRef } from 'react';
import { findNodeHandle } from 'react-native';
import type { FC, ComponentProps } from 'react';
import type {
	NativeSyntheticEvent,
	TextInputFocusEventData,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

export type FocusContextType = { autoFocus: (e: FocusEvent) => void };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultFocusContext = { autoFocus: (e: FocusEvent) => {} };
const AutoFocusContext = createContext<FocusContextType>(defaultFocusContext);
export type AutoFocusProviderProps = ComponentProps<
	typeof KeyboardAwareScrollView
>;

export type AutoFocusContextType = {
	autoFocus: (e: FocusEvent) => void;
};

export const AutoFocusProvider: FC<AutoFocusProviderProps> = ({
	children,
	...props
}) => {
	const scrollRef = useRef<KeyboardAwareScrollView | null>(null);
	const scrollInput = useCallback((reactNode: any) => {
		scrollRef.current?.scrollToFocusedInput(reactNode);
	}, []);
	const autoFocus = useCallback((e: FocusEvent) => {
		scrollInput(findNodeHandle(e.target));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const value = { autoFocus };
	return (
		<AutoFocusContext.Provider value={value}>
			<KeyboardAwareScrollView
				{...props}
				style={{ flex: 1, width: '100%' }}
				ref={scrollRef}
			>
				{children}
			</KeyboardAwareScrollView>
		</AutoFocusContext.Provider>
	);
};

export const useAutoFocus = () => {
	const { autoFocus } = useContext(AutoFocusContext);
	return autoFocus;
};
```

## useImperactiveHandle 훅 이해하기

- AutoFocus.tsx 파일 내용을 forwardRef API, useImperactive Handle 훅을 사용하여 다시 구현
- react-native-paper 테마 색생 관련 내용을 별도 테마 컴포넌트로 구현
  - ┗ 코드 구현의 간결

> 설치

     yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6
     yarn add @types/react-native-vector-icons @types/color @types/faker
     yarn add react-native-appearance react-native-localize react-native-keyboard-aware-scroll-view

> App.tsx 복사

### 테마 컴포넌트 구현

- 여기는 앞에 내용의 useRef 뿐만 아닌

  - ┣ forwardRef API
  - ┣ useImperativeHandle
  - ┗ 훅을 사용해서 만듬

- 앱의 모습은 똑같지만 구현 코드는 많이 다름
  - ┗ 그렇기에 AutoFocus.tsx 파일 사용

> 몇 가지 테마 컴포넌트를 만들어서 코드를 더 간결하게 구성

> 생성

     mkdir -p src/theme/paper

- 7장 에서는 src/theme dir에 navigation이란 이름의 서브 디렉터리 생성

  - ┗ react-navigation 패키지의 테마 컴포넌트를 구현 할 예정

- paper 디렉터리의 컴포넌트는

  - ┣ AutoFocus 파일의 react-native-paper 관련 테마 코드를
  - ┣ paper 쪽 컴포넌트로 옮겨서 결과적으로
  - ┗ 파일의 테마 관련 코드를 좀 더 관결하게 구현할 목적으로 만든는 컴포넌트

- 테마 컴포넌트를 구현할 때 보통 네이티브 컴포넌트와 같은 이름으로
  - ┣ 컴포넌트 이름을 지음
  - ┗ 똑같은 이름으로 컴포넌트 이름을 짓는다.

```tsx
import { View, Text, TextInput } from 'react-native';
import { View, Text, TextInput } from '../theme/paper';
```

- react-native 코어 컴포넌트 TextInput 이름으로 가져온 이유

  - ┗ 이번에 제작할 컴포넌트 이름도 TextInput 이기 때문

- 오류가 많이 생기는 이유
  - ┣ onFocus
  - ┣ value
  - ┗ 이들은 TextInput 컴포넌트가 제공하는 속성

> 이 속성은 RNTextInput의 속성이므로 다음 코드로 간단히 오류를 없앨 수 있음

```tsx
export type TextInputProps = ComponentPops<typeof RNTextInput & {}>

export const TextInput: FC<TextInputProps> = (props) => {
	return <RNTextInput ref={textInputRef} style={textInputStyle {...props}}>
}
```

- useMemo로 구현한 부분 없애기

```tsx
export const TextInput: FC<TextInputProps> = (props) => {
	const { colors } = useTheme();
	return (
		<RNTextInput
			ref={textInputRef}
			style={[{ color: colors.text, borderColor: colors.placeholder }, style]}
			{...props}
		/>
	);
};
```

> style 속성 또한 FC 타입이 제공하는 속성
>
> > 즉 굳이 TextInputProps에 style 속성을 선언하지 않아도 동작함

```tsx
// -1-
export type TextInputProps = ComponentProps<typeof RNTextInput> & {
	// style?: StyleProp<TextStyle>
};
// -1-
// -2-
export const TextInput: FC<TextInputProps> = ({ style, ...props }) => {};
// -2-
```

1. style 속성을 굳이 지정하지 않아도 됨
2. FC 속성을 지정하면 style 속성을 props에 지정이 가능함

> ref 속성은 좀 더 특별함
>
> > 원칙적으로 ref 속성은 R/N 코어 컴포넌트에만 적용할 수 잇는 속성
> > ref 속성은 {...props} 형태로 구현할 수 없음

#### forwardRef API

- react 패키지는 다음처럼 `forwardRef API`

```tsx
import React, { forwardRef } from 'react';
```

- 앞에서 ref 속성은 React, R/N가 제공하는 컴포넌트에만 사용할 수 있다고 설명
- forwardRef API로 생성한 사용자 정의 컴포넌트에서는 ref 속성을 설명한 바 있음

> forwardRef API로 생성한 사용자 정의 `ref 속성`을 사용할 수 있음
>
> > ┣ `forwardRef API` 는 이름대로 `부모 컴포넌트에서 생성한`
> > ┗ `ref를 자식 컴포넌트로 전달`

> 부모 컴포넌트

```tsx
const textInputRef = useRef();
<TextInputView ref={textInputRef} />;
```

> 자식 컴포넌트 - forwardRef 사용

```tsx
const TextInputView = ({ textInputRef }) => {
	return <TextInput ref={textInputRef} />;
};
```

> forwardRef API 코어 컴포넌트가 아닌 사용자 컴포넌트에서 다음처럼 ref 속성을 할 수 있게 도와줌

```tsx
import { TextInput as RNTextInput } from 'react-native';
import { TextInput } from '../theme/paper';

export default function Themed() {
	const textInputRef = useRef<RNTextInput | null>(null);
	return <TextInput ref={textInputRef} />;
}
```

> 하지만 Ts로 forwardRef API 사용하기 위해서는 조금 복잡한 타입 선언이 필요

#### forwardRef API의 타입

- forwardRef의 타입
  - ┣ 여기서 `타입 변수 T` : `ref의 대상 컴포넌트`
  - ┣ `P 컴포넌트의 속성 타입`

> forwardRef 타입

```tsx
function forwardRef<T, P = {}>(
	render: ForwardRefRenderFunction<T, P>
): 반환_타입;
```

- 앞의 forwardRef 타입을 보면 `ForwardRefRenderFunction` 타입 매개변수를 입력받는 함수인 것을 알 수 잇음

> ForwardRefRenderFunction 타입

```tsx
interface ForwardRefRenderFunction<T, P={}> {
	(props: PropsWithChildren<P>, ref: ((instance: T|null) | MutableRefObject<T| null> | null): ReactElement | null)
}
```

#### src/theme/paper/TextInput 컴포넌트 구현

- `ForwardRefRenderFunction`에서 매개변수 부분의 복잡한 타입 부분을 생략하고
  - ┗ 단순하게 만든 것

```tsx
interface ForwardRefRenderFunction {
	(props, ref): ReactElement | null;
}
```

- 이 타입 선언을 보면 다음 코드 형태로 ref 속성을 얻을 수 잇음

> ref 속성 얻기

```tsx
const TextInput = (속성, re) => {...}
```

> ref 속성에 설정된 값을 얻어야 하는 컴포넌트가 가져야 할 코드 패턴
>
> > 1.  컴포넌트 타입은 `ForwardRefRenderFunction<속성_타입>` 이어야 함
> > 2.  컴포넌트 속성과 ref 속성은 `({속성, ref})` 형태로 수신
> > 3.  `forwardRef(컴포넌트_타입)`을 내보낸다.(export)

> src/theme/paper/TextInput.tsx

```tsx
import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import type { ComponentProps } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { useTheme } from 'react-native-paper';

export type TextInputProps = ComponentProps<typeof RNTextInput>;

const _TextInput: ForwardRefRenderFunction<RNTextInput, TextInputProps> = (
	{ style, ...props },
	ref // -1-
) => {
	const { colors } = useTheme();

	return (
		<RNTextInput
			ref={ref}
			style={[{ color: colors.text, borderColor: colors.placeholder }, style]}
			{...props}
		/>
	);
};

export const TextInput = forwardRef(_TextInput);
```

- 지금 만드는 TextInput 컴포넌트는 forwardRef 대상 컴포넌트
  - ┣ FC가 아닌 `ForwardRenderFunction` 타입을 import
  - ┣ 이렇게 타입이 바뀌어서 `1번`과 같이 ref 속성 값을
  - ┣ 두 번째 매개변수로 얻을 수 있게됨

> 여기서 index.ts로 해서 내보내야 하기 때문에
>
> > `forwardRef(_TextInput)`가 반환 한 값을 TextInput으로 설정

#### src/theme/paper/Text 컴포넌트 구현

- Text 테마 컴포넌트는 TextInput과 달리 ref의 대상이 아님
  - ┗ 단순히 `FC` 타입으로 구현해도 무방

> Text.tsx 구현

```tsx
import React from 'react';
import type { FC, ComponentProps } from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from 'react-native-paper';

export type TextProps = ComponentProps<typeof RNText>;

export const Text: FC<TextProps> = ({ style, ...props }) => {
	const { colors } = useTheme();
	return <RNText style={[{ color: colors.text }, style]} {...props} />;
};
```

#### scr/theme/paper/View.tsx

- react-native-paper 패키지의 테마 색상 중 View 컴포넌트에 적용할 수 잇는 것에는
- ┗ background, surface, accent 등 몇 가지가 존재

```tsx
import React from 'react';
import type { FC, ComponentProps } from 'react';
import { View as RNView } from 'react-native';
import { useTheme } from 'react-native-paper';

export type ViewProps = ComponentProps<typeof RNView> & {
	accent?: boolean;
	notification?: boolean;
	primary?: boolean;
	surface?: boolean;
	background?: boolean;
};

export const View: FC<ViewProps> = ({
	style,
	accent,
	notification,
	primary,
	surface,
	background,
	...props
}) => {
	const { colors } = useTheme();
	const backgroundColor = accent
		? colors.accent
		: notification
		? colors.notification
		: primary
		? colors.primary
		: surface
		? colors.surface
		: background
		? colors.background
		: 'transparent';
	return <RNView style={[{ backgroundColor }, style]} {...props} />;
};
```

> 만든 3개의 theme을 index.tsx 파일에 적용

> 그 뒤 src/screens/Themed.tsx 파일에 구현 내용을 반영

### useImperativeHandle 훅이란?

> react 패키지는 다음처럼 useImperativeHandle 훅을 제공

```tsx
import React, { useImperativeHandle } from 'react';
```

- 프로그래밍 언어 분야에서는

  - ┣ `명령형 프로그래밍(imperative programming)`
  - ┣ `선언형 프로그래밍(declarative programming`
  - ┗ 용어가 등장

- `Ts` 부분이 `명령형 프로그래밍`에 해당

  - ┗ `Js` `선언형 프로그래밍`에 해당

- `핸들(handle)` 이란 단어를 프로그래밍 용어로 사용할 때
  - ┣ `불투명한 식별자(opaque identifier)` 의미가 존재
  - ┣ 식별자 : 무엇인가를 구분하는 용도로 사용하는 숫자나 문자열

> `useImperativeHandle` 훅은 JSX가 아닌 TSX 에서 컴포넌트 기능을 사용할 때 필요한 훅

#### useImperativeHandle 훅의 동작 원리

- 다음 코드가 성립할 수 있는 이유는 TextInput 코어 컴포넌트가
  - ┗ `focus` 라는 `메서드를 제공` 한다는 것을 `미리 알고` 있기 때문

```tsx
const textInputRef = useRef<TextInput | null>(null);
const setFocus = () => textInputRef.current?.focus();
```

> 하지만 만약 다음과 같은 타입의 객체가 있다고 가정

```tsx
export type TextInputMethods = {
	focus: () => void;
	dismiss: () => void;
};
```

- 앞의 `useRef<TextInput | null>(null)` 부분 코드에 다음처럼
  - ┣ `TextInput` 대신 `TextInputMethods` 를 사용하면 어떨까?
  - ┗ useImperativeHandle 훅의 탄생 배경

> TextInputMethods를 대신 사용

```tsx
const methods = useRef<TextInputMethods | null>(null);
const setFocus = () => methodsRef.current?.focus();
const dismissKeyboard = () => methodsRef.current?.dismiss();
```

#### useImperativeHandle 훅의 타입

```tsx
function useImperactiveHandle<T, R extends T>(
	ref: Ref<T> | undefined,
	init: () => R,
	deps?: DependencyList
): void;
```

- 이 타입의 정의에서
  - ┣ ref : forwardRef API 호출로 얻는 값을 입력하는 용도
  - ┗ init : useMemo 훅 때와 비슷하게 `() => 메서드_객체` 형태의 함수를 입력하는 용도

> 다음 코드는 useMemo 훅과 useImperativeHandle 훅의 코드 사용법ㅂ이 비슷하다는 것을 말해줌
>
> > useMemo 훅과 useImperactiveHandle 훅의 사용법

```tsx
const object = useMemo(() => ({}), []);
const handle = useImperactiveHandle(ref, () => ({}), []);
```

- useImperactiveHandle 훅은 사용법이 조금 복잡하기 때문에
  - ┗ forwardRef API를 이용한 컴포넌트를 먼저 제작

##### ImperativeTextInput 사용자 컴포넌트 구현

> src/screens 디렉터리에 ImperativeTextInput.tsx 파일을 생성

- ImperativeTextInput 컴포넌트는 ref 속성으로 동작
  - ┗ 다음과 같은 초기 구현이 필요

```tsx
import React, { forwardRef, useImperativeHandle } from 'react';
import type { ForwardRefRenderFunction, ComponentProps } from 'react';
import { TextInput as RNTextInput } from 'react-native';

export type TextInputMethods = {
	focus: () => void;
	dismiss: () => void;
};

export type ImperativeTextInputProps = ComponentProps<typeof RNTextInput>;

const ImperativeTextInput: ForwardRefRenderFunction<
	TextInputMethods, // -2-
	ImperativeTextInputProps
> = (props, ref) => {
	useImperativeHandle(
		ref, // -1-
		() => ({
			focus: () => {},
			dismiss: () => {},
		}),
		[]
	);
	return <RNTextInput {...props} />;
};
export default forwardRef(ImperativeTextInput);
```

1. forwardRef 로 전달받은 ref 값을 `useImperativeHandle`의 첫 번째 매개변수로 입력
   - ┣ 그런데 이 ref의 타입은 `2`의 TextInputMethods 임

- 이 때문에 TextInputMethods의 두 개의 메서드를 가진 객체를 반환하는 함수

  - 두 번째 매개변수에 입력

- 다음 코드는 focus, dismiss 메서드를 구현한것
  - ┗ useRef 훅의 사용 예와 동일

```tsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { ForwardRefRenderFunction, ComponentProps } from 'react';
import { TextInput as RNTextInput, Keyboard } from 'react-native';

export type TextInputMethods = {
	focus: () => void;
	dismiss: () => void;
};

export type ImperativeTextInputProps = ComponentProps<typeof RNTextInput>;

const ImperativeTextInput: ForwardRefRenderFunction<
	TextInputMethods,
	ImperativeTextInputProps
> = (props, ref) => {
	const textInputRef = useRef<RNTextInput | null>(null);
	useImperativeHandle(
		ref,
		() => ({
			focus: () => {
				textInputRef.current?.focus();
			},
			dismiss: () => {
				Keyboard.dismiss;
			},
		}),
		[]
	);
	return <RNTextInput ref={textInputRef} {...props} />;
};
export default forwardRef(ImperativeTextInput);
```

- Ts는 `focus: () => {}` 형태의 코드를
  - ┣ 간결하게 `focus() {}` 형태로 사용하게 하는 구문을 제공
  - ┣ 이 코드는 `TextInputMethods` 타입이 요구하는 두 메서드를 구현
  - ┗ 앞서 `src/theme/paper` 디렉터리에 구현한 `TextInput` 컴포넌트를 사용하지는 않음

> 그러므로 구현하였던 TextInput 컴포넌트를 사용하여 `RNTextInput` 부분을 다시 구현

```tsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { ForwardRefRenderFunction } from 'react';
import { TextInput as RNTextInput, Keyboard } from 'react-native';
import { TextInput } from '../theme/paper/';
import type { TextInputProps } from '../theme/paper';

export type TextInputMethods = {
	focus: () => void;
	dismiss: () => void;
};

export type ImperativeTextInputProps = TextInputProps;

const ImperativeTextInput: ForwardRefRenderFunction<
	TextInputMethods,
	ImperativeTextInputProps
> = (props, ref) => {
	const textInputRef = useRef<RNTextInput | null>(null);
	useImperativeHandle(
		ref,
		() => ({
			focus: () => {
				textInputRef.current?.focus();
			},
			dismiss: () => {
				Keyboard.dismiss;
			},
		}),
		[]
	);
	return <TextInput ref={textInputRef} {...props} />;
};
export default forwardRef(ImperativeTextInput);
```

- 위 코드에서는
  - ┣ `RNTextInput` 대신 `테마 기능을 구현한` `TextInput`을 사용
  - ┣ `RNTextInput` 타입 대신 `TextInput`의 타입을 사용
  - ┗ 이것으로 `ImperativeTextInput`은 테마 기능을 가짐

> 이제 src/screens 디렉터리의 Imperative.tsx 파일에
>
> > ImperativeTextInput 컴포넌트를 적용

#### Imperative 컴포넌트 구현

> 만들었던 ImperativeTextInput 가져와서 사용

```tsx
import ImperativeTextInput from './ImperativeTextInput';
import type { TextInputMethods } from './ImperativeTextInput';
```
