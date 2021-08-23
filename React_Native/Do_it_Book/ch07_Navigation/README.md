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
- ┣ 상당 부분의
