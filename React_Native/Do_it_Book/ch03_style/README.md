# 컴포넌트 스타일링

## 03-1 style 속성과 StyleSheet API 이해

1. 컴포넌트의 style 속성
2. StyleSheet API
3. 구글 머터리얼 디자인 색상

### style 속성과 스타일 객체

- 스타일 속성은 컴포넌트의 style 속성에 설정되는 객체의 속성
- React, R/N 컴포넌트에서 style 속성에 설정되는 값
  - → HTML과 같은 마크업 언어와 달리 문자열이 아닌 객체

> style 속성에 설정하는 객체를 스타일 객체라고 부름

```tsx
<SafeAreaView style={{}}>
```

#### 스타일 속성의 이름 표기법

- 스타일 객체가 가지는 속성을 스타일 속성
- 스타일 속성 → 요가 엔진이 지정한 이름만 사용가능

  1. flex
  2. color

  - 위와 같이 소문자로 시작

- 두 단어 이상으로 된 단어 → 소문자 낙타 표기법(lower camel-case notation)

```tsx
<SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
	<Text>Hello</Text>
</SafeAreaView>
```

##### 요가 엔진

- R/N는 웹 브라우저에서 단순히 Js 엔진만 떼어 낸 것

  - → HTML은 물론 CSS 엔진 또한 존재하지 않음

- 그렇기에 R/N는 요가(Yoga)라는 이름의 엔진을 직접 만들었음
  - → 페이스북이 컴포넌트의 배치(layout), 스타일링(styling)을 위해 C++ 언어로 구현
  - 웹 브라우저의 CSS와 비슷하지만 같이 않음

> 특징 적으로 flex bot layout 에 차이가 큼

- div 와 같은 HTML 요소에는 style attribute(속성) 사용 가능
- 모든 R/N 코어 컴포넌트에는 style 속성이 존재
  - → Yoga 엔진이 이를 해석해서 안드로이드 프레임워크
  - → IOS의 UIKit 프레임 워크가 요구하는 스타일링 수행

#### style 속성에 배열 설정 구문

- 컴포넌트 style 속성에는 다음처럼 배열을 설정 가능
- 리액트 네이티브는 style 속성 설정값이 배열이면 배열 안의 스타일을 결합(merge)
  - → 하나의 스타일 객체로 만들어줌

```tsx
<컴포넌트_이름 style={[스타일_객체1, 스타일_객체2]}>
```

#### '뷰' 컴포넌트의 backgroundColor 스타일 속성

- R/N 에서 제공하는 코어 컴포넌트 중

  - → View
  - → ScrollView
  - → SafeAreaView
  - → KeyboardAvoidingView

- 위 처럼 이름에 'View' 자가 들어간 '뷰' 컴포넌트

  - → backgroundColor 스타일 속성으로 자신의 바탕색을 설정 가능

- Text 의 경우 자신의 바탕색 설정 불가
  - → color 속성으로 자신의 글자 색 설정 불가

> 스타일 객체를 style 속성에 지정하면 이는 인라인 스타일(inline style)

#### StyleSheet API

- R/N은 StyleSheet API를 제공

```tsx
import { StyleSheet } from 'react-native';
```

- create 메서드를 제공

  - → 위 메서드를 사용해서 캐시된 스타일 객체를 생성 가능

- StyleSheet.create 의 목적
  - → 스타일 객체를 네이티브 모듈 쪽으로 옮겨주는 것으로 여러번 호출하여 일일이 전달보다 효율적
  - → 키와 함께 이에 해당하는 스타일 객체 쌍을 여러 개 만드는 방식으로 사용
  1. 매개변수에 설정된 스타일 객체를 네이티브 모듈 쪽에 전달
  2. 네이티브 모듈쪽은 전달 받은 스타일 객체 → 자신의 로컬 저장소에 보관(캐시 형태)
  3. 네이티브 모듈 쪽의 렌더링은 로컬 저장소에 보관된 스타일 객체를 참조
  - → 불필요한 자바스크립트 엔진 스레드와 네이티브 UI 스레드간 데이터 전송이 없어
  - 렌더링 속도가 빨라짐

##### 인라인 스타일과 StyleSheet 스타일의 차이

- 컴포넌트는 필요에 따라 리액트 네이티브에 의해 재렌더링
- reRender 는 상황에 따라 반복해서 발생

- 위와 같은 상황을 고려하면 인라인 스타일 방식은
  - → Js 엔진쪽 스레드에서 → UI 스레드 쪽으로 브리지를 경유해서 옮겨감
  - → 내용이 컴포넌트 로직에 의해 바뀌지 않을 때는 디스플레이 속도 ↓

> 정적 스타일 → StyleSheet.create
> 동적(컴포넌트 로직에 의해 변화) → 인라인 스타일

#### 구글 material 디자인 색상과 react-native-paper 패키지

- CSS에서 색상은 `#fff` 처럼 `16진수 RGB` 값으로 표현
- 이 보다는 `Colors.blue500` 처럼 표현 하는 것이 직관적

- 구글은 Google Material Design 이라는 다지안 가이드라인을 제공

  - → 모든 `안드로이드 앱`을 가능한 이 가이드에 지켜서 디자인 할 것을 권고
  - → IOS는 이를 지킬 필요는 없지만 똑같이 보이는 것이 중요한 편

- 구글 색상표에서 세로줄의 색 이름은 색상을

  - → HSL(Hue-Saturation-Light) 방식으로 표현
  - 세로줄 : Hue 값을 30도씩 회전해 만든 것
  - 가로줄 : Light 값을 조금씩 어둡게 해가며 만든 것

- react-native-paper 패키지는 Colors 심벌 제공
  - → `Blue 열 500번` 색상을 `Colors.blue500` 처럼 표현 가능

```tsx
import { Colors } from 'react-native-paper';
```

> 설치

     yarn add react-native-vector-icons react-native-paper

##### 디자인 색상 테마와 color 패키지

- material 디자인은 앱의 색상을

  1. 주 색상 (primary color)
  2. 보조 색상 (secondary color)

  - 로 나눠서 앱의 테마(theme) 색상을 결정할 것을 권고

- 앱의 테마 색상이 결정되면 글자가 모든 글자가 모든 색상에서 잘 보일 수 있도록
  - 글자 색상도 잘 결정

> 어떤 색보다 좀 더 밝게 어둡게, 투명도(alpha)를 더하거나 빼거나

     이런 경우 color 패키지를 설치해서 사용

> 설치

     yarn add color
     yarn add @types/color --dev

```tsx
import { Colors } from 'react-native-paper';
import Color from 'color';

console.log(Colors.blue500);

console.log(Color(Colors.blue500).alpha(0.5).lighten(0.5).string());
```

- 실사용

```tsx
import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import Color from 'color';

console.log(Colors.blue500);
console.log(Color(Colors.blue500).alpha(0.5).lighten(0.5).string());

export default function App() {
	return (
		<SafeAreaView style={[styles.safeAreaView]}>
			<Text style={[styles.text]}>Hello</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Colors.blue500,
	},
	text: {
		fontSize: 20,
		color: Color(Colors.blue500).alpha(0.7).lighten(0.9).string(),
	},
});
```
