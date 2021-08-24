# 리액트 내비게이션

- 모바일 앱이 동작하는 `스마트폰은 화면 크기가 작기` 때문에
- ┣ 여러 개의 작은 `화면으로 분할해 앱을 구현`해야 함
- ┣ 이 장에서는 이런 상황에 대처하고자 만든
- ┗ `리액트 내비게이션(@react-navigation)` 버전 5 패키지가 제공하는 기능 학습

## 목차

# 리액트 내비게이션 패키지 이해하기

- 리액트 내비게이션 패키지는 모바일 앱 UI를 구성할 때 반드시 사용해야 하는
- ┗ `중요한 패키지임`

## 리액트 내비게이션 패키지란?

- 모바일 앱은 화면 크기가 작아서 많은 양의 정보를 동시에 보여줄 수 없음
- ┣ 이 때문에 UI는 상당히 많은 분량의 작은 화면으로 분할하고
- ┣ 사용자가 보고자 하는 화면만 보여주게 되는데
- ┗ 이를 `내비게이션(navigation)`

- 화면 내비게이션 기능은 앱 개발자가 스스로 구현하기에는 부담감이 큼
- ┗ 그렇기 때문에 리액트 내비게이션과 같은 오픈소스 라이브러리를 이용하는 것이 일반적

- React Navigation은 내비에게이션 기능이 필요한 앱 개발에서 가장 많이 사용하는 패키지
- ┗ 이 패키지는 독립적 또는 함께 동작이 가능한 다음 3개의 패키지를 모은 것

| 패키지 이름                   | 기능                          |
| ----------------------------- | ----------------------------- |
| @react-navigation/stack       | 스택 내비게이션 기능을 제공   |
| @react-navigation/bottom-tabs | 탭 내비게이션 기능을 제공     |
| @react-navigation/drawer      | 드로어 내비게이션 기능을 제공 |

> 그런데 이들 패키지가 동작 하기 위해서 반드시 함께 설치해야 하는 패키지가 존재

### 리액트 내비게이션 앱 개발 시 필수 설치 패키지

- 리액트 내비게이션 버전 5.x 패키지는 이전 버전과 다르게 다음 패키지를 함께 설치해야 동작

> 설치

    yarn add react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
    yarn add @react-native-community/masked-view

> 필수 설치

    yarn add @react-navigation/native

- 참고로 `리액트 내비게이션`은 현재 버전 5x로 버전 5 부터는
- ┗ `@react-navigation/패키지_이름` 형태로 사용

### 리액트 내비게이션 앱 개발 시 선택적으로 설치하는 패키지

- 다음 패키지들은 사용할 때만 설치
- ┣ 보통 `@react-navigation/stack`을 가장 많이 사용하지만
- ┣ 기능을 추가할수록 `bottom-tabs`와 `drawer` 패키지까지 설치하게 됨
- ┗ 여기서는 모두 설치

> stack 설치

    yarn add @react-navigation/stack

> bottom-tabs

    yarn add @react-navigation/bottom-tabs

> drawer

    yarn add @react-navigation/drawer

### 프로젝트 만들기

> native-init

    npx react-native init ch07_Navigation_Init --template react-native-template-typescript

> 필수 패키지 설치

     yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6 react-native-appearance
     yarn add @types/react-native-vector-icons @types/color @types/faker
     yarn add react-native-keyboard-aware-scroll-view

> 내비게이션 필수 패키지 설치

    yarn add react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
    yarn add @react-native-community/masked-view
    yarn add @react-navigation/native
    yarn add @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer

> 아이폰에서 디스플레이 버그가 있는 버전
>
> > MainNavigator 오류만 안나게 설정

```tsx
import React from ' react';
import { StyleSheet, View, Text } from 'react-native';

export default function MainNavigator() {
	return (
		<View style={[styles.view]}>
			<Text>This is top text.</Text>
			<Text>This is bottom text.</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
});
```

> App.tsx 오류만 안나게 설정

- 실행 시켜보면 아이폰의 경우 `SafeAreaView`를 사용하지 않으므로
- ┗ 텍스트가 제대로 보이지 않는 오류가 생기게 됨

> 이제 이 상황을 염두에 두면서 시작

### 리액트 내비게이션 관련 package.json의 dependencies 항목

- 다음 package.json 파일 내용은 앞서 소개한 모든 패키지 설치했을 때 버전
- ┗ `@react-navigation` 패키지는 모두 버전 5임을 확인 가능

> 이제 @react-navigation/native 패키지가 제공하는
>
> > NavigationContainer 컴포넌트를 알아보기

### NavigationContainer 컴포넌트

- 모든 리액트 네비게이션 `화면 컴포넌트(src/screens 디렉터리 컴포넌트)`
- ┗ 항상 `NavigationContainer`의 자식 컴포넌트로 동작해야 함

> NavigationContainer 컴포넌트

```tsx
import { NavigationContainer } from '@react-navigation/native';
```

- 그러므로 리액트 내비게이션을 가장 최소한으로 구현하는 `App.tsx`
- ┣ 다음 형태를 가져야함
- ┣ `src/screens` 디렉터리에 생성한 화면 컴포넌트는
- ┗━ `MainNavigator` 의 자식 컴포넌트 형태로 구현하는 것이 보통

> 리액트 내비게이션 기능 최소한으로 구현

```tsx
import React from 'react';
import MainNavigator from './src/screens/MainNavigator';
import { NavigationContainer } from '@react-navigation/native'; // -1-
export default function App() {
	return (
		<NavigationContainer>
			<MainNavigator />
		</NavigationContainer>
	);
}
```

1. NavigatorContainer 를 이용해서 감싸기

### react-native-gesture-handler와 react-native-screens 패키지 사용

- 앞서 `react-native-gesture-handler`, `react-native-screens` 패키지를 설치

- `react-native-gesture-handler` 패키지
- ┣ 네이티브 모듈에서 동작하는 진화된 `PanResponder` 역할을 함
- ┣ R/N 패키지는 `react-native-gesture-handler` 패키지를
- ┗ 다음처럼 임포트해야 한다고 설명

> react-native-gesture-handler 패키지 가져오기

```tsx
import 'react-native-gesture-handler';
```

- 리액트 내비게이션 5.x 패키지는 그 이전의 4.x 패키지와 다르게
- ┣ `상당 부분의 동작`을 `네이티브 모듈 쪽에서 동작`하게 하여
- ┣ `전체 화면 렌더링 속도`를 `향상`시켰음
- ┣ 그리고 이러한 `성능 향상`은 `react-native-screens`
- ┣ 패키지 기능을 `활용`하여야 얻을 수 있음
- ┗ `react-native-screens` 모듈을 동작하게 하려면 다음 코드를 `App.tsx` 구현

> react-native-screens 모듈 동작에 필요한 코드

```tsx
import { enableScreens } from 'react-native-screens';
enableScreen();
```

### react-native-safe-area-context 패키지의 역할

- 앞서 아이폰 화면은 텍스트가 정상적인 위치에 보이지 않았음
- ┣ `@react-navigation` 필수 패키지인
- ┣ `react-native-safe-area-context`는 다음 컴포넌트를 제공
- ┗ 아이폰 화면 문제를 해결 가능!!!

> SafeAreaProvider 컴포넌트

```tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';
```

- `SafeAReaProvider` 는 `Provider` 이기 때문에
- ┗ `MainNavigator` 의 부모 컴포넌트여야 함!

> SafeAreaProvider 컴포넌트는 MainNavigator의 부모 컴포넌트로

```tsx
<SafeAreaProvider>
	<MainNavigator />
</SafeAreaProvider>
```

### 리액트 내비게이션용 App.tsx 컴포넌트 구현하기

- 다음 코드는 언급한 내용을 종합한 최소 구현 리액트 내비게이션용 App.tsx

```tsx
import React from 'react';
import MainNavigator from './src/screens/MainNavigator';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';

enableScreens();

export default function App() {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<MainNavigator />
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
```

- 그러나 앞의 코드의 SafeAreaProvider를 사용하더라도
- ┗ 다음 코드에서 보듯 SafeAreaView를 사용해야 아이폰의 안전영역 해결

```tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainNavigator() {
	return (
		<SafeAreaView style={[styles.view]}>
			<Text style={styles.text}>This is top text.</Text>
			<Text style={styles.text}>This is bottom text.</Text>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
	text: { color: 'black' },
});
```

![캡쳐화면](2021-08-23-17-22-35.png)

## 리액트 내비게이션 테마

- 리액트 내비게이션은 theme 속성에 설정할 수 있는
- ┗ DefaultTheme과 DarkTheme 객체를 다음처럼 제공

> DefaultTheme과 DarkTheme 객체

```tsx
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
```

- 다음은 DarkTheme 객체의 키와 값

> DarkTheme 객체의 키와 값

```tsx
{
    "colors": {
        "background" : "rgb(1,1,1)"
        "border": "rgb(39,39,41)"
        "card": "rgb(18, 18, 18)",
        "primary": "rgb(10,132,255)",
        "text": "rgb(229, 229, 231)",
    },
    "dark": true
}
```

- NavigationContainer는 theme 이란 속성을 제공
- ┗ theme 속성은 다음 코드처럼 DefaultTheme, DarkTheme 제공하는데 사용

> theme 속성 사용

```tsx
import { useColorScheme } from 'react-native-appearance';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export default function App() {
	const isDarkTheme = useColorScheme();
	const [theme, setTheme] = useState(isDarkTheme ? DarkTheme : DefaultTheme);
}
```

### ToggleThemeProvider 컴포넌트 적용

- 앞서 `ToggleThemeProvider` 컴포넌트와 `useToggleTheme` 커스텀 훅을 제작한 바 있음
- ┣ 이제 App.tsx 에 다음처럼 `ToggleThemeProvider` 컴포넌트를 적용하면
- ┗ `MainNavigator`의 `Switch` 컴포넌트를 조작하여 앱의 테마 변경 가능

```tsx
import React, { useState, useCallback } from 'react';

import MainNavigator from './src/screens/MainNavigator';
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToggleThemeProvider } from './src/contexts';

enableScreens();

export default function App() {
	const scheme = useColorScheme();
	const [theme, setTheme] = useState(
		scheme === 'dark' ? DarkTheme : DefaultTheme
	);
	const toggleTheme = useCallback(
		() => setTheme(({ dark }) => (dark ? DefaultTheme : DarkTheme)),
		[]
	);
	return (
		<AppearanceProvider>
			<ToggleThemeProvider toggleTheme={toggleTheme}>
				<SafeAreaProvider>
					<NavigationContainer theme={theme}>
						<MainNavigator />
					</NavigationContainer>
				</SafeAreaProvider>
			</ToggleThemeProvider>
		</AppearanceProvider>
	);
}
```

### useTheme 훅과 useToggleTheme 커스텀 훅 사용하기

- `@react-navigation/native` 패키지는 다음처럼 useTheme이란 훅을 제공
- ┗ 이 훅을 이용하면 현재 `NavigationContainer`의
- ┗ theme 속성에 설정된 테마 객체를 얻을 수 있음

> useTheme 훅

```tsx
import { useTheme } from '@react-navigation/native';
```

- 다음 코드는 `useToggleTheme`을 `Switch` 컴포넌트의
- ┣ `onValueChange` 이벤트 속성에 설정하여
- ┗ 화면의 스위치로 앱의 테마를 변경하는 기능을 구현한 것

```tsx
import React from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useToggleTheme } from '../contexts';

export default function MainNavigator() {
	const theme = useTheme();
	const toggleTheme = useToggleTheme();
	return (
		<SafeAreaView style={[styles.flex]}>
			<View style={[styles.view, { backgroundColor: theme.colors.background }]}>
				<View
					style={[styles.tobBar, { backgroundColor: theme.colors.primary }]}
				>
					<Switch value={theme.dark} onValueChange={toggleTheme} />
				</View>
				<View style={styles.view}>
					<Text style={[styles.text, { color: theme.colors.text }]}>
						This is top text.
					</Text>
					<Text style={[styles.text, { color: theme.colors.text }]}>
						This is bottom text.
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	flex: { flex: 1 },
	view: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
	tobBar: {
		width: '100%',
		flexDirection: 'row',
		padding: 5,
		justifyContent: 'flex-end',
	},
	text: { fontSize: 20 },
});
```

- 그러나 앞의 `MainNavigator.tsx`의 구현 내용은 테마 관련 코드 때문에 복잡해 보임
- ┣ 이제 다음 항부터의 샘플 코드를 간결하게 구현하도록
- ┣ `Switch`, `View`, `Text`, `TextInput` 등
- ┗ `theme.colors`의 영향을 받는 컴포넌트를 `테마 컴포넌트`로 구현

## 리액트 내비게이션용 테마 컴포넌트 구현

- 앞에서 `react-native-paper` 관련 `테마 컴포넌트`를 구현한적이 있음
- ┣ 리액트 내비게이션의 테마 컴포넌트를 구현하는 기법도 마찬가지
- ┣ 테마 컴포넌트가
- ┣━ `react-native-paper`의 `useTheme` 훅을 사용 → `paper 용 테마 컴포넌트`
- ┣━ `@react-navigation/native`가 제공하는 `useTheme` 훅을 사용
- ┗━━ `리액트 내비게이션용 테마 컴포넌트`가 됨

- 이제 src/theme dir에 navigation dir 생성후 9개 파일 생성

### Switch 테마 컴포넌트 구현

- 다음 코드는 MainNavigator.tsx의 14 행 내용을 테마 전환 기능이 있는
- ┗ Switch 테마 컴포넌트로 구현한 것

```tsx
import React from 'react';
import type { FC, ComponentProps } from 'react';
import { Switch as RNSwitch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useToggleTheme } from '../../contexts';

export type SwitchProps = ComponentProps<typeof RNSwitch>;

export const Switch: FC<SwitchProps> = (props) => {
	const theme = useTheme();
	const toggleTheme = useToggleTheme();
	return <RNSwitch {...props} value={theme.dark} onValueChange={toggleTheme} />;
};
```

### View 테마 컴포넌트 구현

- 앞서 리액트 내비게이션 DarkTheme 객체의 키와 값을 본 적이 있는데
- ┣ 리액트 내비게이션 테마의 colors 객체에는
- ┣ background, border, card, primary 등의 속성이 존재
- ┣ 이 키에 설정된 값은 View 테마 컴포넌트의 backgroundColor 속성에 설정가능
- ┣ 그러므로 테마 기능이 있는 View 는 다음처럼 사용할 것을 염두에
- ┗ 두고 설계하는 것이 바라직함

> 테마 기능이 있는 View

```tsx
<View /> // backgroundColor 스타일 속성에 theme.colors.background 값 설정
<View primary /> // backgroundColor 스타일 속성에 theme.colors.primary 값 설정
<View color /> // backgroundColor 스타일 속성에 theme.colors.color 값 설정
<View border /> // backgroundColor 스타일 속성에 theme.colors.border 값 설정
```

```tsx
import React from 'react';
import type { FC, ComponentProps } from 'react';
import { View as RNView } from 'react-native';
import { useTheme } from '@react-navigation/native';

export type ViewProps = ComponentProps<typeof RNView> & {
	border?: boolean;
	card?: boolean;
	primary?: boolean;
	notification?: boolean;
};

export const View: FC<ViewProps> = ({
	border,
	card,
	primary,
	notification,
	style,
	...props
}) => {
	const { colors } = useTheme();
	const backgroundColor = card
		? colors.card
		: primary
		? colors.primary
		: notification
		? colors.notification
		: colors.background;
	const borderColor = border ? colors.border : undefined;
	const borderWidth = border ? 1 : undefined;
	return (
		<RNView
			style={[{ backgroundColor, borderColor, borderWidth }, style]}
			{...props}
		/>
	);
};
```

### TouchableView 테마 컴포넌트 구현

- 모바일 앱에서는 다음 그림에서 보듯 텍스트를
- ┣ TouchableOpacity 등으로 감싼 형태의 버튼을 자주 만들게 됨
- ┣ 이때 앞절에서 만든 TouchableView는 테마 기능이 없으므로
- ┗ 테마 기능이 있는 TouchableView 컴포넌트를 구현해 놓는 것이 코드 작성 유리

> 주의사항
>
> > TouchableOpacity의 style에 기본 스타일 속성값을 부여하는 것
> > 기본값 부여 : View에 적용하는 스타일에 따라 탄력적 대응

```tsx
import React from 'react';
import type {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import {View} from './View';
import type {ViewProps} from './View';

export type TouchableViewProps = ViewProps & {
  onPress?: () => void;
  touchableStyle?: StyleProp<ViewStyle>;
};

export const TouchableView: FC<TouchableViewProps> = ({
  children,
  onPress,
  touchableStyle,
  ...viewProps
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      // -1-
      style={[styles.touchable, touchableStyle]}>
      <View {...viewProps}>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {width: '100%', alignItems: 'center', justifyContent: 'center'},,
});
```

1. 아래와 같이 `기본값을 설정` 시 `자식 컴포넌트인 View 스타일`에 따라서
   - ┗ `탄력적으로 대응`이 가능하다!

### SafeAreaView 구현

- `아이폰`에서는 `항상 다음 형태의 코드`를 작성해야 하는데 이는 상당히 번거로움
- ┣ 비록 `테마 컴포넌트는 아니지만` 코드를 좀 더 간결하게 구현할 수 잇는
- ┗ `SafeAreaView` 를 만들도록 함

```tsx
import React from 'react';
import type { FC, ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';

export type SafeAreaViewProps = ComponentProps<typeof RNSafeAreaView>;

export const SafeAreaView: FC<SafeAreaViewProps> = ({
	style,
	children,
	...props
}) => {
	return (
		<RNSafeAreaView style={[styles.flex, style]} {...props}>
			{children}
		</RNSafeAreaView>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
});
```

### Text 테마 컴포넌트 구현

- 테마 기능이 있는 `Text` 컴포넌트는 `color` 속성만 `리액트 내비게이션 테마`를 따름
- ┗ fontSize 같은 다른 스타일 속성은 직접 지정해야함

```tsx
import React from 'react';
import type { FC, ComponentProps } from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import { useTheme } from '@react-navigation/native';

export type TextProps = ComponentProps<typeof RNText>;

export const Text: FC<TextProps> = ({ style, ...props }) => {
	const { colors } = useTheme();
	return <RNText style={[{ color: colors.text }, style]} {...props} />;
};

export const UnderlineText: FC<TextProps> = ({ style, ...props }) => {
	const { colors } = useTheme();
	return (
		<RNText
			style={[
				styles.underline,
				{ color: colors.text, textDecorationColor: colors.text },
				style,
			]}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	underline: { textDecorationLine: 'underline' },
});
```

- 그런데 앞서 본 TouchableView의 사용 예를 보면 텍스트 뿐만 아니라
- ┣ 아이콘 색상도 테마에 따라 바뀌는 것이 필요함
- ┣ 그러므로 react-native-vector-icons 패키지 중
- ┗ Material CommunityIcons 아이콘 세트의 아이콘을 대상으로 테마 컴포넌트 구현

### MaterialCommunityIcon 테마 컴포넌트 구현

- 다음 코드는 MaterialCommunityIcons.tsx 파일의 구현 내용
- ┗ react-native-vector-icons 패키지의 모든 아이콘 세트는 속성이 같다는 것 고려

```tsx
import React from 'react';
import type { FC, ComponentProps } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';

export type IconProps = ComponentProps<typeof Icon>;

export const MaterialCommunityIcon: FC<IconProps> = ({ ...props }) => {
	const { colors } = useTheme();
	return <Icon color={colors.text} {...props} />;
};
```

### TextInput 테마 컴포넌트 구현

- 다음 코드는 앞에서 구현했던 코드를 바탕으로 `useTheme` 훅만
- ┣ `react-native-paper` 가 아닌 `@react-navigation/native` 패키지에서 얻으며
- ┗ `placeholderTextColor` 속성에 텍스트 색상을 설정

```tsx
import React, { forwardRef } from 'react';
import type { ForwardRefRenderFunction, ComponentProps } from 'react';
import { StyleSheet, TextInput as RNTextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';

export type TextInputProps = ComponentProps<typeof RNTextInput>;

const _TextInput: ForwardRefRenderFunction<RNTextInput, TextInputProps> = (
	{ style, ...props },
	ref
) => {
	const { colors } = useTheme();

	return (
		<RNTextInput
			ref={ref}
			style={[
				{ color: colors.text, borderColor: colors.text },
				styles.textInput,
				style,
			]}
			placeholderTextColor={colors.text}
			{...props}
		/>
	);
};

export const TextInput = forwardRef(_TextInput);

const styles = StyleSheet.create({
	textInput: { borderWidth: 1, borderRadius: 5 },
});
```

### TopBar 테마 컴포넌트 구현

- 다음 TopBar 테마 컴포넌트는 테스트 코드를 작성할 때 사용할 목적으로 만든 것
- ┗ 같은 패턴의 코드를 반복적으로 구현하는 번거로움을 줄일 목적

```tsx
import React from 'react';
import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Switch } from './Switch';
import { View } from './View';
import type { ViewProps } from './View';

export type TopBarProps = ViewProps & {
	noSwitch?: boolean;
};

export const TopBar: FC<TopBarProps> = ({
	noSwitch,
	children,
	style,
	...props
}) => {
	const { dark } = useTheme();
	return (
		<View card={!dark} primary={dark} style={[styles.topBar, style]} {...props}>
			{children}
			<View style={[styles.flex]} />
			{!noSwitch && <Switch />}
		</View>
	);
};

const styles = StyleSheet.create({
	topBar: { flexDirection: 'row', padding: 5, alignItems: 'center' },
	flex: { flex: 1 },
});
```

### 실제 구현

- [파일로 이동](./ch07_Navigation_Init/src/screens/MainNavigator.tsx)

![](2021-08-24-00-08-51.png)

## src/copy 디렉터리 파일 다시 구현

- 다음 코드는 src/copy 디렉터리의 CopyMe.tsx 파일 내용에 리액트 내비게이션 테마 색상을 적용한 것
- ┗ 이 코드가 화면에서 어떤 모습으로 보일지는 다음 절에서 확인

```tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, View, Text, TopBar } from '../theme/navigation';

const title = 'CopyMe';
export default function CopyMe() {
	return (
		<SafeAreaView>
			<View style={[styles.view]}>
				<TopBar />
				<View style={[styles.content]}>
					<Text style={styles.text}>{title}</Text>
				</View>
			</View>
			<Text style={[styles.text]}>{title}</Text>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: { flex: 1, padding: 5 },
	text: { fontSize: 20 },
	content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
```

- 이제 src/copy 디렉터리의 People.tsx, Person.tsx, Person.style.ts 파일을 수정
- 수정 내용은 단지 시각적으로 현실감 있게 구현

# 스택 내비게이션 이해하기

- 스택 내비게이션은 내비게이션의 가장 기본 기능
- ┗ 여기서는 스택 내비게이션 기능을 알아보도록 함

> native-init

    npx react-native init ch07_Stack_Navi --template react-native-template-typescript

> 필수 패키지 설치

     yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6 react-native-appearance
     yarn add @types/react-native-vector-icons @types/color @types/faker
     yarn add react-native-keyboard-aware-scroll-view

> 내비게이션 필수 패키지 설치

    yarn add react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
    yarn add @react-native-community/masked-view
    yarn add @react-navigation/native
    yarn add @react-navigation/stack @react-navigation/bottom-tabs @react-navigation/drawer

## 스택 내비게이션이란?

- 스택 내비게이션은 `여러 개의 화면 컴포넌트를 미리 만들어`두고
- ┣ `그 중 하나`만 화면에 표시하는 것
- ┣ 리액트 내비게이션에서 화면 컴포넌트 간의 이동은 조금 뒤 설명하는
- ┣ `useNavigation` 훅을 호출하여 얻은 `navigation 객체`의
- ┣ `navigate`나 `goBack` 메서드를 호출 하는 방식으로 실행
- ┣ `'스택(stack)'`이란 이름이 붙은 이유는 마치 `스택의 push/pop` 메서드 처럼
- ┗ `push`, `goBack` 메서드는 `pop` 메서드와 똑같은 개념으로 동작

- 스택 내비게이션 개발은 `@react-navigation/stack` 패키지가 제공하는
- ┗ `createStackNavigator` 함수를 호출하는 것에서 시작!!!

### createStackNavigator 함수

- @react-navigation/stack 패키지는 다음처럼 createStackNavigator 함수를 제공

> createStackNavigator 함수

```tsx
import { createStackNavigator } from '@react-navigation/stack';
```

- 이 함수를 호출하면 `Navigator`와 `Screen`이란 이름의 컴포넌트를 제공하는
- ┗ Stack 객체를 얻을 수 있음

```tsx
const Stack = createStackNavigator();
// <Stack.Navigator>
// <Stack.Screen>
```

- Stack 객체가 제공하는 Navigator와 Screen은 다음 코드처럼 부모/자식 형태로
- ┗ 사용하도록 설계된 컴포넌트

> Navigator와 Screen 컴포넌트 사용

```tsx
const stack = createStackNavigator();

export default function MainNavigator() {
    return (
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home}>
        </Stack.Navigator>
    )
}
```

> 실제 코드 작성

```tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';

const Stack = createStackNavigator();

export default function MainNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="HomeLeft" component={HomeLeft} />
			<Stack.Screen name="HomeRight" component={HomeRight} />
		</Stack.Navigator>
	);
}
```

- 이 코드는 `Home`, `HomeLeft`, `HomeRight` 라는 이름의 3개 화면 컴포넌트를 생성
- 셋 중 가장 먼저 생성하는 Home 컴포넌트를 화면에 출력하는 내용

- 리액트 내비게이션의 모든 `Navigator` 컴포넌트는
- ┣ `initialRouteName` 이란 속성을 제공
- ┣ Navigator에 `initialRouteName` 설정이 없으면 가장 먼저 생기는
- ┗━ Screen 컴포넌트가 화면에 나타남

- 파일을 저장하고 화면을 보면
- ┣ `Stack.Screen` `name` 속성에 설정한 텍스트가
- ┣ 안드로이드는 화면 왼쪽 위
- ┣ 아이폰은 화면 가운데 위에 보이는데
- ┣ 이를 React Navigation `헤더(header)`
- ┗ 그러나 `아이폰`에서는 `헤더와 TopBar 사이에 틈이 존재`

> 현상에 이유에 대해서는 뒤에서 설명

### useNavigation 커스텀 훅 함수

- `@react-navigation/native` 패키지는 다음 useNavigation 패키지를 사용

> useNavigation

```tsx
import { useNavigation } from '@react-navigation/native';
```

- 이 useNavigation 훅을 호출하여 다음처럼 navigation 객체를 얻을 수 있음

> navigation 객체 얻기

```tsx
const navigation = useNavigation();
```

- 이렇게 얻어진 navigation 객체는 다음 3가지 메서드를 제공

> navigation 객체의 가지 메서드

```tsx
{
    navigate(routerName: string, params?:object): void;
    goBack(): void;
    canGoBack(): boolean;
}
```

### navigation 객체의 navigate 메서드

- `navigate` 메서드는 이름대로 다른 화면 컴포넌트로 이동하고 싶을 때 사용
- ┣ 다음 코드는 `navigate` 메서드를 사용하여 `MainNavigator.tsx`에서
- ┣ name을 'HomeLeft'로 설정한 화면 컴포넌트로 이동

> 컴포넌트 이동

```tsx
navigation.navigate('HomeLeft');
```

- navigate 메서드는 다음처럼 `두 번째 매개변수에 파라미터`를 줄 수 있음
- ┗ 이에 대해서는 잠시 후 설명

```tsx
navigation.navigate('HomeRight', { name: 'Jack', age: 32 });
```

> 실제 코드 작성

```tsx
  const navigation = useNavigation();
  const goLeft = useCallback(() => navigation.navigate('HomeLeft'), []);
  const goRight = useCallback(
    () => navigation.navigate('HomeRight', {name: 'Jack', age: 32}),
    [],

```

- 이 코드는 `navigation.navigate`를 사용하여 goLeft, goRight 함수를 구현
- ┗ 그리고 구현한 함수를 각각 onPress 이벤트 속성에 설정

### navigation 객체의 canGoBack과 goBack 메서드

- navigation 객체의 canGoBack 메서드는
- ┣ goBack 메서드를 호출할 수 있는지를 결정하는 데 사용
- ┣ HomeLeft는 Home 에서 `navigation.navigate('HomeLeft')`
- ┣ 호출로 화면에 나타난 것이므로 다음 처럼 goBack 메서드를 호출하면
- ┗ 다시 Home 화면으로 돌아갈 수 있음

> 이전 화면으로 되돌아 가기

```tsx
navigation.canGoBack() && navigation.goBack();
```

- goBack, goCenter 함수를 `navigation.canGoBack`
- ┗ `navigation.goBack`, `navigation.navigate` 형태로 구현

```tsx
const navigation = useNavigation();
const goBack = useCallback(() => {
	navigation.canGoBack() && navigation.goBack();
}, []);
const goRight = useCallback(() => {
	navigation.navigate('HomeRight', { id: D.randomId() });
}, []);
```

- 여기서는 navigation.navigate('HomeRight')가 아닌
- ┣ `navigation.navigate('HomeRight', {id: D.randomId()})` 형태로 구현
- ┗ 이에 대해서는 잠시 후 알아보도록 함

- 앞의 코드 `navigation.navigate` 메서드에는
- ┣ 두 번째 매개변수에 `파라미터(params)` 라는 객체를 입력할 수 있음
- ┗ `HomeRight` 컴포넌트를 구현하면서 이 파라미터와 `useRoute` 커스텀 훅을 알아보기

### useRoute 커스텀 훅 함수

- @react-navigation/native
