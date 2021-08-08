# 컴포넌트 스타일링

## 03-1 style 속성과 StyleSheet API 이해

1. 컴포넌트의 `style` 속성
2. `StyleSheet API`
3. `구글 머터리얼 디자인` 색상

### style 속성과 스타일 객체

- `스타일 속성`은 컴포넌트의 `style` 속성에 설정되는 `객체의 속성`
- React, `R/N` 컴포넌트에서 `style` 속성에 설정되는 값
  - → HTML과 같은 `마크업 언어`와 `달리` `문자열이 아닌 객체`

> style 속성에 설정하는 객체를 `스타일 객체`라고 부름

```tsx
<SafeAreaView style={{}}>
```

#### 스타일 속성의 이름 표기법

- `스타일 객체`가 가지는 속성을 `스타일 속성`
- `스타일 속성` → `요가 엔진`이 지정한 이름만 사용가능

  1. `flex`
  2. `color`

  - 위와 같이 `소문자`로 시작

- 두 단어 이상으로 된 단어 → `소문자 낙타 표기법(lower camel-case notation)`

```tsx
<SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
	<Text>Hello</Text>
</SafeAreaView>
```

##### 요가 엔진

- `R/N`는 웹 브라우저에서 단순히 `Js 엔진만` 떼어 낸 것

  - → HTML은 물론 CSS 엔진 또한 존재하지 않음

- 그렇기에 `R/N`는 `요가(Yoga)`라는 이름의 `엔진`을 직접 만들었음
  - → 페이스북이 `컴포넌트의 배치(layout)`, `스타일링(styling)`을 위해 `C++` 언어로 구현
  - 웹 브라우저의 `CSS와 비슷`하지만 같지 않음

> 특징 적으로 `flex box`, `layout` 에 차이가 큼

- div 와 같은 HTML 요소에는 `style attribute(속성)` 사용 가능
- 모든 `R/N` 코어 컴포넌트에는 style 속성이 존재
  - → Yoga 엔진이 이를 해석해서 `안드로이드 프레임워크`
  - → `IOS`의 `UIKit` 프레임 워크가 요구하는 스타일링 수행

#### style 속성에 배열 설정 구문

- 컴포넌트 style 속성에는 다음처럼 `배열을 설정 가능`
- 리액트 네이티브는 style 속성 설정값이 `배열`이면 배열 안의 `스타일을 결합(merge)`
  - → `하나의 스타일 객체`로 만들어줌

```tsx
<컴포넌트_이름 style={[스타일_객체1, 스타일_객체2]}>
```

#### '뷰' 컴포넌트의 backgroundColor 스타일 속성

- `R/N` 에서 제공하는 코어 컴포넌트 중

  - → `View`
  - → `ScrollView`
  - → `SafeAreaView`
  - → `KeyboardAvoidingView`

- 위 처럼 이름에 'View' 자가 들어간 '뷰' 컴포넌트

  - → `backgroundColor` 스타일 속성으로 자신의 바탕색을 설정 가능

- `Text` 의 경우 자신의 `바탕색 설정 불가`
  - → `color` 속성으로 자신의 `글자 색` 설정 불가

> 스타일 객체를 style 속성에 지정하면 이는 `인라인 스타일(inline style)`

#### StyleSheet API

- `R/N`은 StyleSheet API를 제공

```tsx
import { StyleSheet } from 'react-native';
```

- `create` 메서드를 제공

  - → 위 메서드를 사용해서 `캐시된` `스타일 객체`를 생성 가능

- StyleSheet.create 의 목적
  - → `스타일 객체`를 네이티브 모듈 쪽으로 옮겨주는 것으로 `여러번 호출하여 일일이 전달`보다 `효율적`
  - → `키`와 함께 이에 해당하는 `스타일 객체` `쌍을 여러 개 만드`는 방식으로 사용
  1. 매개변수에 설정된 `스타일 객체`를 `네이티브 모듈 쪽에 전달`
  2. 네이티브 모듈쪽은 `전달 받은 스타일 객체` → 자신의 `로컬 저장소`에 보관`(캐시 형태)`
  3. `네이티브 모듈 쪽의 렌더링`은 로컬 저장소에 `보관된 스타일 객체`를 참조
  - → 불필요한 자바스크립트 `엔진 스레드`와 `네이티브 UI` 스레드간 `데이터 전송이 없어`
  - → `렌더링 속도`가 `빨라짐`

##### 인라인 스타일과 StyleSheet 스타일의 차이

- 컴포넌트는 필요에 따라 리액트 네이티브에 의해 `재렌더링`
- reRender 는 `상황에 따라 반복해서 발생`

- 위와 같은 상황을 고려하면 `인라인 스타일` 방식은
  - → `Js 엔진쪽 스레드`에서 → `UI 스레드` 쪽으로 `브리지를 경유`해서 옮겨감
  - → 내용이 컴포넌트 로직에 의해 바뀌지 않을 때는 `디스플레이 속도 ↓`

> `정적` 스타일 → `StyleSheet.create` > `동적`(컴포넌트 로직에 의해 변화) → `인라인 스타일`

#### 구글 material 디자인 색상과 react-native-paper 패키지

- CSS에서 색상은 `#fff` 처럼 `16진수 RGB` 값으로 표현
- 이 보다는 `Colors.blue500` 처럼 표현 하는 것이 직관적

- 구글은 `Google Material Design` 이라는 `디자인 가이드라인을` 제공

  - → 모든 `안드로이드 앱`을 가능한 이 가이드에 지켜서 디자인 할 것을 권고
  - → `IOS`는 이를 지킬 필요는 없지만 `똑같이 보이는 것`이 중요한 편

- 구글 색상표에서 세로줄의 색 이름은 색상을

  - → `HSL(Hue-Saturation-Light)` 방식으로 표현
  - `세로줄` : `Hue 값을 30도씩 회전`해 만든 것
  - `가로줄` : `Light 값을 조금씩 어둡게` 해가며 만든 것

- `react-native-paper` 패키지는 Colors 심벌 제공
  - → `Blue 열 500번` 색상을 `Colors.blue500` 처럼 표현 가능

```tsx
import { Colors } from 'react-native-paper';
```

> 설치

     yarn add react-native-vector-icons react-native-paper

##### 디자인 색상 테마와 color 패키지

- `material` 디자인은 앱의 색상을

  1. `주 색상 (primary color)`
  2. `보조 색상 (secondary color)`

  - 로 나눠서 `앱의 테마(theme)` 색상을 결정할 것을 권고

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

## View 컴포넌트와 CSS 박스 모델

- CSS 박스 모델과 View의 스타일 속성 학습

### Platform과 Dimensions API

- `R/N` 은 IOS, Android 환경 둘다 지원

  - → 어느 환경에서 실행되는지 알아야 할 때가 존재
  - → Platform API 제공

> Platform API : 앱이 실행되는 폰이 안드로이드폰인지 아니면 아이폰인지 확인

```tsx
import { Platform } from 'react-native';
console.log(Platform.OS);
```

> Dimension API : 실행된 폰의 크기를 알아낼 때

```tsx
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
```

- 비구조화 할당 구문을 이용하여 width, height 정보를 알아냄
  - 폰을 회전(landscape) 모드라도 변하지 않음

### 뷰 컴포넌트의 backgroundColor 스타일 속성

- 이름에 View가 포함되어 있으면 backgroundColor 스타일 속성으로 바탕색을 설정 가능

- Text의 경우 color 속성을 이용해서 글자색 변경

```tsx
import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Colors } from 'react-native-paper';
import Color from 'color';

const { width, height } = Dimensions.get('window');
export default function App() {
	return (
		<SafeAreaView style={[styles.safeAreaView]}>
			<Text style={[styles.text]}>{Platform.OS}</Text> // -1-
			<Text style={[styles.text]}>width : {width}</Text> // -2-
			<Text style={[styles.text]}>height : {height}</Text> // -2-
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: Colors.blue500,
	},
	text: {
		fontSize: 20, // -3-
		color: Color(Colors.blue500).alpha(0.7).lighten(0.9).string(),
	},
});
```

1. `Platform.OS` 속성을 이용해서 ios, android 판별
2. `Dimensions.get('window')` 에서 구조분해 된 `width`, `height` 이용해서 너비, 높이 파악
3. `fontSize` 속성에는 무조건 `undefined, number` 가 들어가야함

### width와 height 스타일 속성과 값 설정 방법

- R/N은 CSS 박스 모델을 적용한 컴포넌트를 사용
  - → width, height 속성을 이용하여 자신의 크기 설정 가능

> width, height 속성 값 설정 방법

1. `명시적`으로 `R/N 기본(default)` 설정 따르기
2. `pixel` 단위의 `숫자`를 직접 설정
3. `부모 요소`의 `w, h 기준`으로 `자식 컴포넌트` 크기 `퍼센트(%)` 로 설정
4. `flex` 속성을 사용하여 `여러 자식 컴포넌트`가 부모 컴포넌트의 크기 분할

#### 1,2. 명시적으로 픽셀 단위의 값 설정

```tsx
const { width, height } = Dimensions.get('window'); // -1-

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: Colors.blue500,
		height: height, // -2-
	},
});
```

1. `Dimensions.get('window')` 를 사용해서 `w, h 비구조화 할당`
2. 비구조화 할당된 height 값 바탕으로 safeAreaView의 height 설정

> 만약 `height : height` 처럼 속성 이름 값 === 변수 이름

     값을 담은 변수부분 `생략 가능`
     이를 `단축 구문` 이라고 함

#### 3. 부모 요소 크기를 기준으로 퍼센트를 설정

- App.tsx 파일에서 `SafeAreaView` 의 `부모 컴포넌트` === `App`
- `App과 같은 사용자 컴포넌트`는 `렌더링에 참여 X`

  - → `R/N 코어 컴포넌트`만 `렌더링`에 직접적으로 참여

- `렌더링 관점`에서만 보면 SafeAreaView 의 `부모 컴포넌트`는 `App 이 아님`

  - → `네이티브 쪽 모듈`에서 생성된 `Java`, `Objective-C` 로 구현한 네이티브 컴포넌트
  - → 네이티브 컴포넌의 `크기`는 `폰의 크기`와 `같음`

- `Dimensions.get('window')`의 `반환값` === `네이티브 쪽 최상위 컴포넌트의 크기`

- 위의 관점에서 height 속성에 설정된 100% 의 의미

```tsx
const styles = StyleSheet.create({
	safeAreaView: {
		height: '100%', // -1-
	},
});
```

- CSS에서 퍼센트의 값 → 항상 부모 컴포넌트 크기를 기준

1. `100%의 의미` → `네이티브 쪽 최상위 컴포넌트`의 height 값의 100%

- → `height : '100%'` === `height : Dimensions.get('window')`

#### 4. flex 스타일 속성

- 앞의 방법들은 컴포넌트의 width, height 속성값을 어떻게 설정하는지 확인

- w, h 속성 대신 `flex 스타일 속성에 1 적용` → `height : '100%'` 와 동일

> w,h 속성과 flex 속성 동시 사용

     `w, h 속성`의 `적용 우선순위가 더 높음`
     flex 우선순위가 낮으므로 `flex`를 쓰고 싶다면 `w, h 작성 X`

#### 5. margin 스타일 속성

- `View` 자가 들어간 컴포넌트뿐만 아니라 대부분의 코어 컴포넌트

  - → margin 이라는 스타일 속성을 설정 가능

- `margin`

  1. marginLeft
  2. marginRight
  3. marginTop
  4. marginBottom

- `margin` : `부모 / 자식 간` 혹은 `이웃한 형제 요소`
  - → `컴포넌트와의 간격`을 결정하는데 사용

> marginLeft === marginRight

     `marginHorizontal` 사용 가능

> marginTop === marginBottom

      marginVertical

> marginHorizontal === marginVertical

      `margin` 으로 동시 사용

```tsx
const { width, height } = Dimensions.get('window'); // -1-

const styles = StyleSheet.create({
	safeAreaView: {
		backgroundColor: Colors.blue500,
		flex: 1,
		margin: '10%',
	},
});
```

#### padding 스타일 속성

- `부모/자식 관계`에서 `부모 컴포넌트 쪽`에 적용하는 스타일 속성
- 대부분 `부모 컴포넌트 내부에 자식 컴포넌트 배치` 시
  - → 자식 컴포넌트가 자신의 영역을 꽉 채우지 않고
  - → `간격을 주는 것`이 시각적으로 좋아 보임

> margin 에서 사용했던 `Horizontal`, `Vertical` 사용 가능

#### border 관련 스타일 속성

- R/N 코어 컴포넌트는 대부분 자신 영역의 `경계(border)`를 설정할 수 있는
  - → 스타일 속성 사용 가능

1. `borderWidth` : border 넓이를 의미
2. `borderColor` : border 색생 의미
3. `borderRadius` : 모서리의 둥근 정도
4. `borderStyle` : 실선, 점선등 border 스타일을 의미

#### SafeAreaView in ios, android

- 화면은 `안드로이드와 ios에서 서로 다른 상태`로 출력
- `android`
  - → `SafeAreaView` → 단순히 `View`로 동작
- `ios`
  - → `SafeAreaView` → View자가 들어갔지만
    - `padding 스타일 동작 X`

> 아래에서 이 문제를 해결한 방법 제시

##### Platform.select 메서드

> Platform 객체는 `select` 메서드를 제공

- 그러므로 운영체제 별로 다른 `padding` 값을 가지도록 해결한다.

```tsx
paddingLeft: Platform.select({ ios: 0, android: 20 });
```
