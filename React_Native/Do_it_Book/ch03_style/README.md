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

## 자원과 아이콘 사용하기

- 모바일 앱 개발에서 `자원(assets, resource)`은 앱에 포함하여 배포하는
  - → `이미지`, `폰트`, `아이콘` 등의 파일을 의미

> 모바일 앱은 통신이 끊어지는 `오프라인 상황`에 `염두`를 두어야 함

- 회사 로고 이미지, 폰트, 아이콘 등을 `백엔드`에서 가져오게 설정하면

  - → `오프라인 때 아무것도 안뜨는 상황`이 발생가능
  - 그러면 서버사이드 렌더링을 활용하면?
  - → 필수 자원은 `앱에 포함해 배포`하는 것이 좋음

- 여기서는 R/N 앱에 자원을 탑재하는 방법과 탑재된 자원을 코드에서 어떻게 활용하는지

> 설치

     yarn add react-native-vector-icons react-native-paper color faker
     yarn add @types/color @types/faker --dev
     yarn add @types/react-native-vector-icons --dev

> types 같은 경우는 dev를 활용해서 배포단계에서는 제거 되도록 설정!!!

> 전 폴더 복사해서 가져오기

     cp -r ../../ch02_basic/ch02/src . && rm src/screens/*.*
     mkdir assets && cd assets
     mkdir images fonts

- mkdir `폴더1` `폴더2`
  - → 두개의 폴더 생성 가능

### 배경에서 사용할 이미지 내려받기

[unsplash]('https://unsplash.com')

> 다운로드 한 파일 복사 해오기

      cp -R ../../../../../../Downloads bj.jpg

### ImageBackground 코어 컴포넌트 사용하기

> R/N은 `import` 문으로 얻을 수 있는 `ImageBackground` 라는 `코어 컴포넌트` 제공

```tsx
import { ImageBackground } from 'react-native';
```

> ImageBackground 사용하여 bg.jpg 이름의 이미지 파일 화면에 출력

```tsx
<ImageBackground style={{flex: 1}} source={require('./src/assets/images/bj.jpg')}>
```

- R/N에서 이름에 `Image` `포함`되어 있다면

  - → 항상 `source 속성`에 `require` 사용해서 읽는 방식으로 파일 설정
  - `Image`, `ImageBackground`

> ImageBackground의 경우 이름에 View가 없지만 → View 가진 것 처럼 자식 컴포넌트 가질 수 있음

- ImageBackground source 속성에 bg.jpg 파일의 내용을 전부 `로딩한 데이터 설정`

  - → 이 코드가 bg.jpg 같은 이미지 파일 자원은 `별도의 파일이 아닌 소스 코드에 삽입된 형태로 배포`

- 또한 width, height 스타일 속성값을 설정
  - → `width`, `height` : 100% 가능하지만
  - `직관적`으로 `flex : 1`

```tsx
<ImageBackground
	style={[styles.flex]} // -1-
	source={require('./src/assets/images/bg.jpg')} // -2-
/>
```

1. `flex : 1` 설정
   - width, height 두 번 보다 효과적
2. `source`를 꼭 설정
   - require 방식을 사용해서 `인코딩` 하여 js 파일에 `내장`한다는 점을 기억하자!!!

#### base64 인코딩 방식 이미지 삽입

> HTML에서 `이미지 파일`은 `base64` 방식으로 `삽입(embed)` 가능

```tsx
<img src='data:image/png;base64, iVB0MynNameIsHow...'>
```

- `Node.js` 가 기본 제공하는 `require API` 는 대상 파일이 `이미지`라면 `base64` 로 인코딩된 문자열 반환
  - → R/N 앱에서 이미지 파일은 `자바스크립트 코드에 삽입된 형태`로 배포

> 이 말이 import, require 하면 base64 인코딩 → js 코드에 포함 같은 말

### Image 코어 컴포넌트

> R/N은 다음과 같은 Image 코어 컴포넌트 제공

```tsx
import { Image } from 'react-native';
```

- Image 코어 컴포넌트는 ImageBackground 처럼 이미지 파일을 화면에 렌더링 기능 제공
- Image는 ImageBackground와 달리 자식 컴포넌트를 가질 수 없음
  - → `source` 속성에 `{uri: 이미지_파일_웹_주소}` 설정
  - → `require` : `인코딩된 이미지를 앱내 배포`하겠다는 의미

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet, ImageBackground, Image } from 'react-native';
import * as D from './src/data';

const avatarUrl = D.randomAvatarUrl();
const avatarSize = 50; // -3-

export default function App() {
	return (
		<SafeAreaView style={[styles.flex]}>
			<ImageBackground
				style={[styles.imageBackground, styles.flex]}
				source={require('./src/assets/images/bg.jpg')} // -1-
			>
				<Image source={{ uri: avatarUrl }} style={styles.image} /> // -2-
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	flex: { flex: 1 },
	imageBackground: { padding: 10 },
	image: {
		// -3-
		width: avatarSize,
		height: avatarSize,
		borderRadius: avatarSize / 2,
		// -3-
	},
});
```

1.  `source` 부분에 `require` 이용해서 Js 코드에 내장해서 내보낸다는 의미
2.  `uri` 속성을 이용해서 서버 주소에서 `렌더링 시 가져온다는` 의미
3.  `size`를 정해놓고 사용해야 함

    - background의 경우 전체 속성이라 flex로 사용해도 무관
    - 그러나 Image 의 경우 정해진 w,h 사용

      > 정리

           source : `{{url : ''}}` `css` 속성으로 사용
           require : `{require: ''}`  `Node.js 제공` require API
           SafeArea 부분에서의 padding만 ios, android 다른 값

### 폰트 직접 설정하고 사용하기

> 폰트를 내려받아 사용하는 법 학습

- `./src/assets/fonts` directory에 다운받아서 놔두면 된다.

- 원래 `R/N의` 경우 기본 폰트를 제공하기 때문에 특별히 폰트를 설치하지 않아도
  - → `텍스트가 화면에 나타남`
  - 그래도 사용하고 싶은 폰트가 따로 있을 수 있으므로 사용가능하게 설정해줌
  - 이 때 `설정한 폰트가 정상 동작하지 않으면` `기본 폰트가 동작`하기 때문에 오류 검출 힘듬

> 다음으로 폰트를 앱에 반영하는 방법 학습

#### react-native.config.js

> 폰트를 적용시키기 위해서는 react-native.config.js 파일 필요

1. react-native.config.js 라는 구성 파일이 필요함
2. npx react-native link 실행

- react-native.config.js

```tsx
module.exports = {
	// -1-
	project: {
		// -1-
		ios: {}, // -2-
		android: {}, // -2-
	},

	assets: ['./src/assets/fonts'],
};
```

1. `project` 키가 반드시 있어야함
2. project가 `ios`, `android` 키를 설정
   - `link` 명령어 ios, android `디렉토리 대상`으로 동작 한다는 것을 명심

#### react-native link 명령으로 폰트 자원 링크

> 이미지 파일과 달리 폰트 파일은 그냥 사용할 수 없음

> 명령어

     npx react-native link

- 명령어 의미
  - → `project에` `ios`, `android` 키가 있으므로
  - → `assets` 키에 설정된 내용을 `두 디렉터리에 반영`

```text
npx react-native link
info Linking assets to ios project
warn Group 'Resources' does not exist in your Xcode project. We have created it automatically for you.
info Linking assets to android project
success Assets have been successfully linked to your project
```

- 결과
  - → `ios` : `Xcode` 프로젝트에 `Resources` 디렉터리 생성
  - → `android` : `자원을 링크(Linking assets)`

> 그러나 이러면 yarn ios 가 동작하지 않음

     이 문제에 대해서는 뒤에서 설명

#### src/assets 디렉터리와 네이티브 쪽 모듈과의 관계

- `npx react-native link` 명령을 실행하면 `android` 쪽은

  - → `src/assets/fonts` `dir` 파일이 네이티브 쪽으로 복사

- `ios`
  - `Resources` 항목 생성
  - 지금 버전에는 잘되나 봄...
  - 원래는 `yarn ios` 할 시 복사가 일어난다고 명시가 되어있음

#### fontFamily 스타일 속성

- 지금까지는 Text 컴포넌트는 `폰트 설정 없이` 사용

  - → R/N이 `기본 폰트`를 제공

- 그러나 설치한 폰트를 사용하려면

  - → Text의 `fontFamily` 속성에 현재 자원 dir/폰트*파일*이름

- R/N는 CSS와 달리 부모 요소에 텍스트 관련 스타일 속성을 지정 못함
  - → 번거롭지만 자식 요소에 일일이 설정

```tsx
        <View style={[styles.flex, styles.padding10]}> // -1-
          // -2-
          <Text style={[styles.regular, styles.text]}>{text} []</Text>
          <Text style={[styles.medium, styles.text]}>{text} []</Text>
          <Text style={[styles.semiBold, styles.text]}>{text} []</Text>
          <Text style={[styles.bold, styles.text]}>{text} []</Text>
          // -2-
        </View>


  regular: {fontFamily: 'DancingScript-Regular', fontWeight: '400'},
  medium: {fontFamily: 'DancingScript-Medium', fontWeight: '500'},
  semiBold: {fontFamily: 'DancingScript-SemiBold', fontWeight: '600'},
  bold: {
    fontFamily: 'DancingScript-Bold',
    fontWeight: Platform.select({ios: '700', android: '600'}), // -3-
  }
```

1. 부모 컴포넌트에는 `flex`와 `padding` 속성만 지정
2. 폰트의 경우 귀찮지만 따로 지정을 해야함
3. 운영체제 별로 `ios : 700`, `android : 600` 다른 값 지정
   - → android : 700 이 지원이 안됨

#### fontWeight 스타일 속성

> Text 컴포넌트 폰트 외에도 `fontWeight` 스타일 속성 이용

- → 글꼴 두께 변경 가능

- 11가지 지정 가능
  - `normal`, `bold`, `'100 ~ 900'`

#### textAlign 스타일 속성

- Text 컴포넌트에 width, height 스타일 속성 적용 시

  - → `전체 텍스트 크기 !== Text 컴포넌트 크기` 불일치
  - → 꼭 `width, height 문제가 아닌` 그냥 `길어서` 문제 생기는 경우도 발생

- 이럴 때 textAlign 사용
  1. `left` : `default`
  2. `center`
  3. `right`

#### react-native-icons 아이콘 패키지

> 설치

     npx react-native link react-native-vector-icons

> 삭제

     npx react-native unlink react-native-vector-icons

- 아이콘 가져오기

```tsx
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
```

- Icon 컴포넌트 사용법

```tsx
<Icon name='아이콘_이름' size={아이콘_크기} colors='아이콘_색상' onPress={콜백_함수}>
```

### 맥에서 Xcode로 react-native-vector-icons 패키지 설정하기

- 앞서 설정한 `npx react-native link react-native-vector-icons`

  - → ios 디렉터리의 `Podfile`에 이 패키지와 관련된 내용을 삽입만 함

- 즉 원격지의 패키지가 개발 컴퓨터 쪽에 설치되지 않은 상태
  - → pod install 을 하여서 설치를 진행하여야 함

> 진행

     cd ios && npx pod-install

> 오류 해결법

1. 파일 디렉토리의 ios 폳더로 들어가서 .xcworkspace 파일을 더블클릭
2. 설치 폰트 이외 다른 모든 것들은 삭제한다.
   - → shift 키 누르고 모두 삭제

### flex: 1의 의미

- View 컴포넌트에 `flex: 1` 스타일 속성이 없다면

  - → `height(bgImage) - (paddingTop + paddingBottom)` 만큼의 높이 여분이 생김
  - `flex 스타일 속성에 0 이 아닌 값`을 가지는 컴포넌트가 없다면 `여분이 남게됨`

- 하지만 `flex: 1` 을 설정하게 된다면 `ImageBackground`와 같은 `부모 컴포넌트`의 `height 여분`이
  - → 모두 `flex : 1` 인 `컴포넌트의 높이`가 됨

## 컴포넌트 배치 관련 스타일 속성 탐구

> 설치

     yarn add react-native-vector-icons react-native-paper color faker
     yarn add @types/react-native-vector-icons @types/color @types/faker --dev

> `flexDirection`, `justifyContent`, `alignItems`, `flexWrap` 등 `flexbox`, `position` 관련 스타일 학습

> dir 복사

     cp -r ../ch03_icon/src .

> 폴더 생성

     mkdir -p src/copy
     touch src/copy/CopyMe.tsx

> 파일 복사

     cp copy/CopyMe.tsx screens/TopBar.tsx
     cp copy/CopyMe.tsx screens/Content.tsx
     cp copy/CopyMe.tsx screens/BottomBar.tsx

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import TopBar from './src/screens/TopBar';
import BottomBar from './src/screens/BottomBar';
import Content from './src/screens/Content';
export default function App() {
	return (
		<SafeAreaView style={[styles.flex]}>
			<TopBar />
			<Content />
			<BottomBar /> // -1-
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	flex: { flex: 1, backgroundColor: Colors.lightBlue100 },
});
```

1. 이름과는 달리 아래쪽에 위치 하지 않는 모습을 볼 수 있음
   <img src="https://user-images.githubusercontent.com/54137044/128640636-38aa2d1d-40db-4bd9-9889-5d05bd1eaba6.png" width="200px" >

### flex:1 과 height : '100%'의 차이

- 앞 부분에서 flex : 1 을 통해서 아이콘을 화면 아래에 배치

> 가운데 컨텐츠에 flex : 1 을 똑같이 적용

- 결국 flex 값을 설정하면 내가 expo에서 했던 것과 동일하게 크기를 나눠가지게됨

- `여분 높이 / (1 + 2) X 1` , `여분 높이 / (1 + 2) X 2`

### flexDirection 스타일 속성

- `flexbox` 레이아웃은 `부모 컴포넌트의 크기가 고정`일 떼

  - → 자식 컴포넌트를 `자신의 영역에 배치`하는 기법

- But `flexbox 레이아웃`은 부모 컴포넌트가 자식 컴포넌트를 배치할 때
  - → `수직`이나 `수평` 방향 `한쪽`으로만 배치가 가능
  - 이 `방향`은 `flexDirection` 으로 조정 가능

> 설정 가능 값

     1. row
     2. column

- 기본값 : `column` → 지금까지 화면 `아래로 아이템이 배치된 이유`

- 실전적용

- 아바타 이미지와 아이콘 사이의 공간을 모두 `Text` 가 차지하도록 해야 함
  - 그러나 `Text` 컴포넌트에는 flex 스타일 속성을 부여 불가
  - → `Text` 를 `View 로 감싸고` 이 감싼 `View` 에 `flex : 1` 부여

```tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as D from '../data';

const name = D.randomName();
const avatarUrl = D.randomAvatarUrl(name);

export default function CopyMe() {
	return (
		<View style={[style.view]}>
			<Image style={style.avatar} source={{ uri: avatarUrl }} />
			<View style={style.centerView}>
				<Text style={[style.text]}>{name}</Text>
			</View>
			<Icon name="menu" size={24} color="white" />
		</View>
	);
}

const style = StyleSheet.create({
	view: {
		padding: 5,
		backgroundColor: Colors.blue900,
		flexDirection: 'row', // -1-
		alignItems: 'center', // -2-
	},
	text: { fontSize: 20, color: 'white', textAlign: 'center' },
	avatar: { width: 40, height: 40, borderRadius: 20 },
	centerView: { flex: 1 }, // -3-
});
```

1. `flexDirection` 을 `row`로 설정하여서 가로 방향으로 요소가 배치되도록 설정
2. alignItems 속성을 이용
3. Text 에 직접적으로 flex 속성을 설정할 수 없으므로 이렇게 View를 이용해서 Text를 감싸도록 한다.

### alignItems 스타일 속성

- `alignItems` 스타일 속성은 이름대로 `부모 요소의 높이나 넓이에 여분`이 있을 경우

  - → `여분을 이용하여 배치 간격을 조정`하는데 사용

- stretch

  - 부모 컴포넌트의 크기에 여분이 있으면 → 자식 컴포넌트의 크기를 늘림

- alignItems 는 flexDirection 속성값에 따라서 동작 방향이 달라짐
  - → row : 수직 방향 배치에 영향
  - → column : 수평 방향 배치에 영향

### justifyContent

- 기본값 : flex-start
- flexDirection 값에 따라 진행 방향이 달라짐

> 지정 가능 값

     1. flex-start
     2. center
     3. flex-end
     4. space-around
     5. space-between
     6. space-evenly

- 접두사가 space- 인 경우 부모 요소의 여백을 자식 요소의 간격에 반영
- `space-around`

- `space-between`

  - 폰 `좌 우측`에 `padding`을 적용 하는지, 아닌지

- `space-evenly`
  - `부모 컴포넌트 - (자식 컴포넌트 넓이의 합)`
  - `(자식 컴포넌트의 수 + 1) 로 나누어` 얻은 `여분 넓이 균등 부여`

### flexWrap 스타일 속성

- `줄을 바꿔가며` 정상적으로 렌더링 하고 싶은 경우
  - → `wrap`, `wrap-reverse` 속성을 부여
- 기본값 : nowrap

> 설정 가능 값

     1. nowrap
     2. warp
     3. wrap-reverse

<img src="https://user-images.githubusercontent.com/54137044/128673437-dd00af18-b874-4976-aeef-f0421e2ae654.png" width="200px" >

### overflow 스타일 속성

- `overflow` 스타일 속성은 `전체 콘텐츠의 크기가 컴포넌트보다 클 때`
  - → 이를 어떻게 할지 결정

> 설정 가능 값

      1. visible
      2. hidden
      3. scroll

1. `visible`
   - 콘텐츠는 컴포넌트 크기와 무관하게 컴포넌트 바깥으로 렌더링
2. `hidden`
   - 컴포넌트 바깥으로 `렌더링 되지 않음`
3. `scroll`
   - 웹과 달리 `scroll`을 설정해도 스크롤 효과는 발생하지 않음
   - → 스크롤은 `ScrollView`, `FlatList` 코어 컴포넌트에서만 가능

### ScrollView의 contentContainerStyle 속성

- `ScrollView` 는 다른 코어 컴포넌트와 달리 style 속성 이외에

  - → `contentContainerStyle` 속성을 별도로 제공

- `contentContainerStyle` 속성은 `스크롤 대상 컴포넌트`에 적용되는 속성
  - 앞의 `View` 와 달리 `View` → `ScrollView` 변경 → `contentContainerStyle` `속성에 스타일 객체`를 설정
  - `flex : 1` 또한 없어야 함

```tsx
export default function CopyMe() {
	const children = avatars.map((avatarUrl, index) => (
		<View key={index.toString()} style={style.avatarView}>
			<Image style={style.avatar} source={{ uri: avatarUrl }} />
		</View>
	));
	return (
		<ScrollView contentContainerStyle={[style.view]}>{children}</ScrollView> // -1-
	);
}
```

1. View → ScrollView, style → contentContainerStyle 두개를 바꿔야지 잘 작동
2. style 속성에서 `flex : 1` 속성 `없애주는거` 잊지 말기

### 화면에 뜬 효과 보여주기

- `화면위에 아이콘이 떠 있는 느낌`
  - → `플로팅 액션 버튼(floating action button)`

### React.Fragment 컴포넌트와 <></> 단축 구문

- 아래와 같이 아이콘을 이용해서 자식 컴포넌트 형태로 `JSX` 구성

```tsx
<View style={styles.absoluteView}>
  <Icon name="feather" size={50} color="white">
</View>
```

- FAB 효과 : 화면에 뜬 효과 주기 위해서는
  - → 아이콘이 `SafeAreaView` 의 `자식 컴포넌트여서는 안됨`
  - 그러나 지금까지 해 온 것들은 싹다 `SafeAreaView` 가 `최상위 컴포넌트` 였음

> 그래서 React 는 `Fragment` 라는 컴포넌트를 제공

```tsx
import React, { Fragment } from 'react';
```

> `JSX는` `XML` 문이어야 하기 때문에 `부모 컴포넌트 없이는 여러개의 컴포넌트가 올 수 없음`

- Fragment 는 `실제 존재 하지는 않지만` XML 문법이 요구하는 `부모 컴포넌트로 동작`하도록 만들어짐

#### left, right, top, bottom과 position 스타일 속성

- left, right, top, bottom 스타일 속성은 컴포넌트가 렌더링되는 위치를 바꾸고 싶은 경우 사용

- 스타일 속성은 `position : absolute` 인 경우 컴포넌트에 반영

```tsx
const styles = StyleSheet.create({
	flex: { flex: 1, backgroundColor: Colors.lightBlue100 },
	absoluteView: {
		backgroundColor: Colors.purple900,
		position: 'absolute', // -1-
		right: 30, // -2-
		bottom: Platform.select({ ios: 100, android: 80 }), // -3-
		padding: 10,
		borderRadius: 35,
	},
});
```

1. position : 'absolute' 를 설정행줘야지 제대로 동작
2. right : 30 속성을 줘서 오른쪽에서 30 만큼 떨어지게 설정
3. bottom의 경우는 ios, android 경우가 다르기 때문에 이렇게 설정

<img src="https://user-images.githubusercontent.com/54137044/128676584-b7d6eab4-2558-4323-b779-f390cf201460.png" width="200px" >

## 재사용할 수 있는 컴포넌트 만들기

> 설치

     yarn add react-native-vector-icons react-native-paper color faker
     yarn add @types/color @types/faker --dev
     yarn add @types/react-native-vector-icons --dev
