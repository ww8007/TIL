# 처음 만나는 네이티브 애니메이션

- 애니메이션은 움직임을 사용하여 앱에 생명을 불어넣음
  - ┣ 모바일 앱에서 화면 UI에 애니메이션을 적용하면 앱의 UI 요소가 작용할 때 명확한
  - ┣ 피드백을 사용자에게 제공하게 됨
  - ┗ 애니메이션에 관련하여 리액트 네이티브가 제공하는 기능을 4가지로 요약 가능

1. `Animated`
2. `Easing`
3. `PanResponder`
4. `LayoutAnimation`

> 이 절에서는 `Animated`, `Easing` 기능 학습

> 설치

     yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6 react-native-appearance
     yarn add @types/react-native-vector-icons @types/color @types/faker

> 복사 - 앞절의 src, App.tsx / 삭제 src/screens

> src/copy/Person.tsx 수정

> useCallback 다른 사용법

```tsx
// -1-
const deletePerson = useCallback(
	(id: string) => () => {
		setPeople((people) => people.filter((person) => person.id !== id));
	},
	[]
);
// -1-
// -2-
<FlatList
	data={people}
	renderItem={({ item }) => (
		<Person person={item} deletePressed={deletePerson(item.id)} />
	)}
	keyExtractor={(item) => item.id}
/>;
// -2-
```

1. `useCallback` 함수를 `화살표 함수 두개`로 이어서 사용이 가능하다.
   - ┗ 인자를 바로 호출해서 사용할 수 있다는 개념
2. `item.id`를 `deletePerson` 인자에 넣어서 호출할 수 있다는 것이 장점

## 리액트 네이티브 애니메이션의 특징

- R/N 프레임워크의 애니메이션 기능은 다음처럼 Animated 이름 공간(name space)
  - ┗ 속해 있는 다양한 클래스, 함수, 컴포넌트로 이루어짐

```tsx
import { Animated } from 'react-native';
```

- R/N 애니메이션은 두 가지 모드로 동작

1. JS 엔진 애니메이션
   - ┗ JS 엔진이 기본으로 제공하는 requestAnimationFrame 함수를 사용한 애니메이션
2. Native 모듈 애니메이션
   - ┗ 자바나 Objective-C로 구현한 애니메이션

- R/N `초기 버전`은 JS 엔진이 기본으로 제공하는 r`equestAnimationFrame API`를 이용한

  - ┣ `JS 엔진 애니메이션`을 이용
  - ┣ 그러나 `requestAnimationFrame` `반복 실행` 시
  - ┣ 상대적으로 다른 UI 컴포넌트의 동작이 `일시로 정지하는 버그`
  - ┗ `네이티브 모듈` 애니메이션 `사용 권고`

- R/N 애니메이션 기능을 구현하다 보면 useNativeDriver 라는 이름의 속성을 자주 보게됨
  - ┣ 다음으로 보는 것 처럼 속성값에 따라
  - ┣ `useNativeDriver = false` → `Js 애니메이션` 엔진
  - ┗ `useNativeDriver = true` → `Java`, `Objective-C`로 작성한 `Native 애니메이션` 엔진

### 애니메이션 구현 요령

- 현재의 R/N는 JS 엔진 애니메이션, Native 엔진 애니메이션 100% 호환이 되지 않음
  - ┣ 그렇기에 `처음 구동` 시
  - ┣ ━ useNativeDriver : `true` 로 구동 했다가
  - ┗ ━ `오류` 생기면 `false`로 변경하는 개발 방법 필요

### Animated가 제공하는 애니메이션 기능 정리

- R/N 애니메이션의 핵심 기능을 모아 놓은 Animated 이름 공간
  - ┣ `Animated.Value` 라는 `클래스`
  - ┣ `Animated.timing` 라는 `함수`
  - ┗ `Animated.View` 라는 `컴포넌트`

> 위 3가지 요소는 애니메이션 기능을 구현할 때 반드시 알아야 하는 기본 기능

- 3가지 기능에 익숙해지면 표에 나오는 Animated 다양한 기능의 사용법 또한 이해가 쉬움

| <center>역할</center>   | <center>클래스 또는 함수</center>                            |
| ----------------------- | ------------------------------------------------------------ |
| Ani 보간값 저장         | Animated.Value                                               |
|                         | Animated.ValueXY                                             |
| 단일 Ani 제어           | Animated.timing()                                            |
|                         | Animated.spring()                                            |
|                         | Animated.delay()                                             |
|                         | Animated.loop()                                              |
| 여러 개의 Ani 통합 제어 | Animated.sequence()                                          |
|                         | Animated.parallel()                                          |
|                         | Animated.stagger()                                           |
| Ani 연산                | Animated.add(), Animated.subtract(), Animated.multiply(),    |
|                         | Animated.dived(), Animated.modulo(), Animated.diffClamp      |
| Ani 이벤트              | Animated.event()                                             |
| Ani 대상 컴포넌트       | Animated.createAnimatedComponent()                           |
|                         | Animated.View, Animated.Image, Animated.Text,                |
|                         | Animated.ScrollView, Animated.FlatList, Animated.SectionList |

### R/N 애니메이션 동작 원리

- R/N Ani는 웹 브라우저의 CSS 애니메이션과 같은 개념

  - ┣ `CSS 애니메이션` : `transition`, `animate` 스타일 속성에
  - ┣ ━ `적용하고 싶은 다른 스타일` `속성값을 조정`하는 방식으로 동작
  - ┣ R/N 애니메이션 : CSS와 비슷하게 style 속성에 설정하는 `opacity`, `transform` 등의 스타일 속성에
  - ┗ ━ `Animated.Value` 클래스 객체(인스턴스)를 설정하는 방식으로 동작

- 그런데 R/N 애니메이션을 구현하는 코드 패턴이 조금 생소할 수 있음
  - ┗ 그렇기에 무작정 따라 하기 식으로 애니메이션 코드를 작성

> cd src/screens
> cp Person.tsx PersonBasic.tsx

#### 애니메이션과 보간법

- 잘 알려진대로 애니메이션의 역사는 디즈니에서 시작
- 만화 영화의 애니메이션 동작 원리는 1초에 조금씩 내용이 다른 최소 24개의 정지 영상을
- 차례대로 보여주는 것

  - ┣ 이 24장의 `정지 영상 화면`을 `프레임(frame)`이라고 하고
  - ┗ `차례대로 보여주는 것`을 `보간법`, `보간(interpolation)`

- `컴퓨터 그래픽`에서 `보간법`은 시작값과 끝값 사이에
  - ┣ 여러 개의 `중간값을 삽입`하는 `컴퓨터 계산`을 의미
  - ┣ ━ 예를 들어 0 부터 1 까지 변하는 숫자를 `단순히 0 → 1로 만드는 것이 아닌`
  - ┗ ━ ━ `0.1 → 0.2 → ... → 1` 방식으로 시작값과 끝 사이에 `여러개의 중간값`을 만든다.

### R/N 애니메이션 맛보기

- R/N 에서의 애니메이션은 항상 다음코드 처럼 Animated.Value 클래스의 인스턴스 생성으로 시작

```tsx
const Person: FC<PersonProps> = ({person, deletePressed}) => {
  const animValue = new Animated.Value(0);
```

> 그러나 R/N 팀은 위의 코드 보다 useRef 훅을 사용하여
>
> > Animated.Value 클래스의 인스턴스를 캐시하는 방법을 권장

```tsx
const PersonBasic: FC<PersonProps> = ({ person }) => {
	const animValue = useRef(new Animated.Value(0)).current;
};
```

- R/N 에니메이션에서 Animated.Value 클래스의 인스턴스
  - ┗ 항상 컴포넌트의 스타일 속성에 적용되어야 함

> 렌더링된 컴포넌트의 투명도를 결정하는 opacity 스타일 속성에 animValue를 적용한 모습

```tsx
const PersonBasic: FC<PersonProps> = ({ person }) => {
	const animValue = useRef(new Animated.Value(0)).current;
	const rightViewStyle = { opacity: animValue };
};
```

- 그런데 `opacity 스타일 속성`의 타입이 number가 아닌 `Animated.Value 타입`
  - ┣ `View` 와 같은 컴포넌트를 이를 `전혀 해석하지 못함`
  - ┣━ 이 때문에 `R/N 애니메이션`은 `Animated.View`와 같은 컴포넌트를 제공
  - ┣━ `스타일 속성 설정값`이 `Animated.Value` 타입 객체인 스타일 속성 처리 `가능하게 함`

> Animated.View 컴포넌트를 사용

```tsx
const PersonBasic: FC<PersonProps> = ({ person }) => {
	const animValue = useRef(new Animated.Value(0)).current;
	const rightViewAnimStyle = { opacity: animValue };
  <Animated.View style={[styles.rightView, rightViewAnimStyle]}>
};
```

- 지금까지는 애니메이션을 준비하는 코드일 뿐 실제로 `애니메이션은 발생하지 않음`
  - ┣ 실제로 애니메이션을 진행 하려면
  - ┣ 다음 코드의 `onPress 부분`에서 보는 코드를 실행해야 함
  - ┣━ 현재 onPress `몸통 부분`은 `toValue 속성값이 1`로 설정
  - ┣━ 이에 따라 초기값 부터 `toValue값 1까지 값을 0.1, 0.2 보간` 하면서
  - ┗━ `duration 1초(1000ms)` 동안 애니메이션을 진행

```tsx
const PersonBasic: FC<PersonProps> = ({ person }) => {
	const animValue = useRef(new Animated.Value(0)).current;
	const rightViewAnimStyle = { opacity: animValue };
  const onPress = () => {
    Animated.timing(animValue, {toValue:1, useNativeDriver: true, duration: 1000}).start();
  }
  <Avatar uri={person.avatar} size={50} onPress={onPress}/>
  <Animated.View style={[styles.rightView, rightViewAnimStyle]}/>
};
```

> 정리
>
> > onPress 부분에서 보간을 이용해서 0.1 ~ 1 까지 올라가면서 1초 안에 보여지게 설정
> > 최초 실행 시 0으로 useRef가 잡혀 있기 때문에 보이지 않게 됨

### Animated.Value 클래스

> Animated는 다음과 같은 Value 클래스를 제공

```ts
export class Value {
	constructor(value: number);
	setValue(value: number): void;
}
```

- Value 클래스는 애니메이션이 실행되면 값을 보간하는
  - ┣ number 타입 값을 value라는 속성에 저장하는 클래스
  - ┣ Value 클래스의 value 속성값은 setValue 메서드를 사용하여
  - ┗━ 다른 값으로 변경이 가능!

> new 연산자를 사용하여 Animated.Value 클래스의 인스턴스(객체) 만드는 것과
>
> > 이렇게 만들어진 인스턴스의 value 속성값 100으로 변경

```ts
const animValue = new Animated.Value(0);
animValue.setValue(100);
```

> 그런데 앞에서 봤던 것 처럼 R/N useRef 훅을 사용 권고

```tsx
const animValue = useRef(new Animated.Value(0)).current;
animValue.setValue(100);
```

- `useRef` 사용 권고의 이유
  - ┣ 다음 코드에서 보듯
  - ┣ `animValue1` : 컴포넌트를 `reRender`시 마다 `끊임없이 생성`
  - ┣ `animValue2` : `처음 render` `단 한번 생성`
  - ┗━ 이후 `reRender`시 `과거 생성 객체` 그대로 `재사용`

```tsx
export default function SomeComponent() {
	// 컴포넌트 reRender 마다 생성
	const animValue1 = new Animated.Value(0);
	// 컴포넌트를 처음 렌더링할 때 단 한 번 생성
	const animValue2 = useRef(new Animated.Value(0)).current;
}
```

#### useRef 훅과 MutableRefObject 타입

- useRef 훅
  - ┣ `RefObject<T>` 타입 객체를 반환하는 버전 1
  - ┗ `MutableRefObject<T>` 타입 객체를 반환하는 버전 2

> `MutableRefObject<T>` 타입 객체를 반환하는 useRef 훅

```tsx
function useRef<T>(initialValue: T): MutableRefObject<T>;
```

- 여기서 MutableRefObject 제네릭 타입에는
  - ┣ 다음 RefObject 타입처럼 current 속성이 존재
  - ┣ `current 타입`은 `T | null` 이 `아니라` `T` 임
  - ┗ 즉 : `current !== null` 을 의미함

```tsx
interface MutableRefObject<T> {
	current: T;
}
```

- 그러므로 다음 코드의 animValue는
  - ┣ null이 될 수 없으면서
  - ┣ 변하지도 않음
  - ┗ 따라서 굳이 animValue를 useMemo, useCallback 의존성에 넣을 필요 없음

* 보간에 의해 값이 0부터 1까지 바뀌는 것은
  - ┣ animValue가 아닌
  - ┗ animValue 내부의 value 속성

```tsx
const animValue = useRef(new Animated.Value(0)).current;
```

#### Animated.View와 Animated.createAnimatedComponent 함수

- `Animated.createAnimatedComponent` 함수는
  - ┣ 다른 컴포넌트를 매개변수로 입력받아서
  - ┗━ Animated.Value 타입 객체를 처리할 수 있는 기능을 가진 새로운 컴포넌트 생성

```ts
type AnimatedComponent = Animated.createAnimatedComponent;
export function createAnimatedComponent<T>(component: T): AnimatedComponent<T>;
```

- 그런데 Animated는 View, Text, Image 등 애니메이션 대상인 컴포넌트를
  - ┣ 일일이 createAnimatedComponent 호출 방식으로 생성하지 않아도
  - ┗ 다음처럼 Animated.View, .Text, .Image 등과 같은 컴포넌트 제공

```tsx
Animated.View = Animated.createAnimatedComponent(View);
Animated.Text = Animated.createAnimatedComponent(Text);
Animated.Image = Animated.createAnimatedComponent(Image);
```

#### Animated.timing 함수

- `Animated.timing` 함수는 다음 코드에서 보듯
  - ┣ `value`
  - ┣ `config`
  - ┣ `두 개의 매개변수` 입력 받아서
  - ┗━ `Animated.CompositeAnimation` 타입 객체를 반환하는 함수

> Animated.timing 함수

```ts
export const Animated.timing: (
  value: Animated.Value | Animated.ValueXY,
  config: Animated.TimingAnimationConfig // -1-
)=> Animated.CompositeAnimation;
```

1. `config` 타입
   - ┣ `useNativeDriver`, `toValue는` 반드시 있어야 하는 `필수 속성`
   - ┣ 나머지 3개 속성은 없어도 되는 `선택 속성`
   - ┣━ `duration` : 애니메이션 지속 시간을 설정
   - ┣━ `delay` : 애니메이션 시작 시간(0: 즉시, 1000: 1초 후)
   - ┗━ `easing` : 보간함수 모음집 의미 → 밑에서 자세히 설명

> 매개변수 config의 타입

```tsx
interface AnimationConfig {
	// 자바스크립트 엔진(false | true)
	useNativeDriver: boolean;
}
interface TimingAnimationConfig extends AnimationConfig {
	toValue: number | Animated.Value; // -1-
	duration?: number; // -2-
	delay?: number; // -3-
	easing?: (value: number) => number; // -4-
}
```

1. new Animated.Value의 끝값 설정
2. 애니메이션 진행 시간
3. 애니메이션 진행 전 대기 시간
4. Easing이 제공하는 보간 함수 설정

#### Easing 타입 객체

- R/N은 Easing 타입 객체를 다음처럼 제공

```tsx
import { Easing } from 'react-native';
```

- Easing 타입 객체는
  - ┣ `linear`
  - ┣ `ease`
  - ┗ `bounce`와 같은 `보간 함수`를 제공

> Easing 타입 객체가 제공하는 `보간 함수`

```ts
export type EasingFunction = (value: number) => number;
export interface Easing {
	linear: EasingFunction;
	ease: EasingFunction;
	quad: EasingFunction;
	sin: EasingFunction;
	exp: EasingFunction;
	bounce: EasingFunction;
}
```

- Easing.linear는 이름처럼

  - ┗ 시작값 `1 에서 2,3,4,...` 형태의 `선형`으로 끝값까지 보간

- ease, quad
  - ┗ `1, 1.3, 3.1` 형태로 값을 `비선형(nonlinear)`로 증가

> Animated.Value 타입 객체 animValue에 Animated.timing 적용하여 애니메이션 시작

```tsx
const animValue = new Animated.Value(0);
Animated.timing(animValue, {
	useNativeDriver: true, // -1-
	toValue: show ? 0 : 1, // -2-
	duration: 1000, // -3-
	easing: Easing.bounce, // -4-
}).start();
```

1. `네이티브 애니메이션` 기능 사용
2. `show 변수값`에 따라 `끝 값을 0 또는 1`로 설정
3. 애니메이션이 `진행되는 시간` : 1초
4. Easing.bounce `보간 함수` 사용

#### AnimatedCompositeAnimation 타입 객체

- `Animated.timing`은 `Animated.CompositeAnimation` 타입 객체를 `반환`
  - ┣ 이 타입은 다음처럼 `start` 라는 `메서드`가 있는 타입
  - ┗ 이 타입 객체의 `start 메서드를 호출`해야 `실제 애니메이션이 실행`

```tsx
export interface CompositeAnimation {
	start: (callback?: EndCallback) => void;
}
type EndResult = { finished: boolean };
type EndCallback = (result: EndResult) => void;
```

- start 메서드에는 이를 호출한 코드에서 애니메이션이
  - ┗ 종료되었는지 알 수 있는 콜백 함수를 매개변수로 줄 수 있음

> start 메서드를 호출하면서 애니메이션이 종료될 때 콘솔에 로그를 남기는 콜백 함수

```tsx
Animated.timing(animValue, {
	toValue: 1,
	duration: 1000,
	useNativeDriver: true,
}).start((result: { finished: boolean }) => console.log(result));
```

- 참고로 result 매개변수 값은 항상 `{finished: true}` 입니다.
  - 다음처럼 간단하게 구현해도 괜찮음

```tsx
Animated.timing(animValue, {
	toValue: 1,
	duration: 1000,
	useNativeDriver: true,
}).start(() => console.log('animated end'));
```

#### addListener 메서드

- `Animated.Value 클래스`는 다음 코드에서 보는 `addListener` 메서드를 제공
  - 이 메서드의 `콜백 함수`를 통해 `현재 보간 중인 값`을 얻을 수 있음

```tsx
export class Value {
	addListener(callback: ValueListenerCallback): string;
	removeListener(id: string): void;
	removeAllListener(): void;
}
type ValueListenerCallback = (state: { value: number }) => void;
```

> addListener 메서드를 사용하여 Animated.value 타입 객체 안에 저장된
>
> > 실제 보간값을 화면 출력 예

```tsx
export default function PersonMonitor() {
	const animValue = useRef(new Animated.Value(0)).current;
	const [realAnimValue, setRealAnimValue] = useState<number>(0);

	useEffect(() => {
		const id = animValue.addListener((state: { value: number }) => {
			setRealAnimValue(state.value);
		});
		return () => animValue.removeListener(id);
	}, []);
	return <Text>animValue: {realAnimValue}</Text>;
}
```

> PersonMonitor에 addListener를 통한 실제 보간 값 출력 해보기

```tsx
const PersonMonitor: FC<PersonProps> = ({person, deletePressed}) => {
  const animValue = useRef(new Animated.Value(0)).current;
  const [realAnimValue, setRealAnimValue] = useState<number>(0);
  const [animationEnd, setAnimationEnd] = useState<boolean>(false);
  useEffect(() => {
    const id = animValue.addListener((state: {value: number}) => {
      setRealAnimValue(state.value);
    });
    return () => animValue.removeListener(id);
  }, []);
  const rightViewAnimStyle = {opacity: animValue};
  const avatarPressed = useCallback(
    () =>
      Animated.timing(animValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 3000,
        easing: Easing.bounce,
      }).start(() => setAnimationEnd(() => true)),
    [],
  );
```

> 코드가 점점 복잡해 지기 때문에 3개의 커스텀 훅 함수를 구현하여
>
> > PersonMonitor.tsx의 코드를 간견하게 다시 작성

#### useAnimatedValue 커스텀 훅 만들기

- 앞의 PersonMonitor 컴포넌트에서는 animValue 코드를 다음 코드로 얻었음

> useRef 훅 사용

```tsx
const animValue = useRef(new Animated.Value(0)).current;
```

> useAnimatedValue 등의 커스텀 훅으로 간결하게 작성

```tsx
const animValue = useAnimatedValue(0);
```

> custom hook 3개 생성

    touch useAnimatedValue.ts useMonitorAnimatedValue.ts useStyle.ts

```tsx
import { useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimatedValue = (initValue: number = 0): Animated.Value => {
	return useRef(new Animated.Value(initValue)).current;
};
```

> 이번에는 animValue의 실제 보간값을 얻는 코드를 간결하게 작성할 수 있는 커스텀 훅을 만들 예정

#### useMonitorAnimatedValue 커스텀 훅 만들기

- 앞의 PersonMonitor 컴포넌트에서는 realAnimaValue를 다음 코드로 얻었음

> realAnimValue 얻기

```tsx
const [realAnimValue, setRealAnimValue] = useState<number>(0);
useEffect(() => {
	const id = animValue.addListener((state: { value: number }) => {
		setRealAnimValue(state.value);
	});
	return () => animValue.removeListener(id);
}, []);
```

> 간결하게 구현한 코드

```tsx
const realAnimValue = useMonitorAnimatedValue(animValue);
```

> custom hook 생성 → useAnimatedValue

```tsx
import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

export function useMonitorAnimatedValue(animValue: Animated.Value) {
	const [realAnimValue, setRealAnimValue] = useState<number>(0);

	useEffect(() => {
		const id = animValue.addListener((state: { value: number }) => {
			setRealAnimValue(state.value);
		});
		return () => animValue.removeListener(id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return realAnimValue;
}
```

#### useStyle 커스텀 훅 만들기

- 앞의 PersonMonitor 컴포넌트에서 애니메이션 관련 스타일 객체를 다음 코드로 구현

> 애니메이션 관련 스타일 객체

```tsx
const animStyle = useMemo(() => ({ opacity: animValue }), []);
```

> 다음 처럼 구현 할 수 있다면 코드 가속성이 up 되는 효과를 얻을 수 있음

```tsx
const animStyle = useStyle({ opacity: animValue });
```

> touch 명령어를 이용해서 src/hooks 디렉터리에 useStyle 커스텀 훅 구현

```tsx
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';

export const useStyle = (style: object, deps: any[] = []) => {
	return useMemo(() => style, deps);
};
```

> 다음으로 index.ts에 새로 작성한 훅 반영

```ts
export * from './useStyle';
export * from './useAnimatedValue';
export * from './useMonitorAnimatedValue';
```

- 커스텀 훅이 정상적으로 동작하는지 테스트 코드를 작성할 차례
  - ┗ 그전에 토글 애니메이션을 알아보도록 설정

### 토글 애니메이션 구현

- 화면 UI에 적용되는 애니메이션은 `초기 상태에서 애니메이션을 진행`
  - ┣ `컴포넌트 구현 로직`에 따라 `원래의 상태로 돌아가는 방식`으로 구현하는게 흔함
  - ┗━ 이처럼 순환 방식의 애니메이션 → 토글 애니메이션(toggle animation)

> 아까 작성한 3개의 커스텀 훅과 useToggle 커스텀 훅을 이용해서 토글 애니메이션 구현

> 다음 코드는 useToggle 커스텀 훅을 이용하여 started 변수를 생성
>
> > useToggle 커스텀 훅으로 started 변수 만들기

```tsx
const PersonToggle: FC<PersonProps> = ({ person }) => {
	const [started, toggleStarted] = useToggle(false);
};
```

- started 변수의 의미
  - ┣ started : false 인 경우
  - ┠━ `Animated.timing(animValue, {toValue: 1})` 애니메이션을 진행
  - ┠ 끝나면 started : true
  - ┗━ `Animated.timing(animValue, {toValue: 0})` 애니메이션을 진행

> 토글 애니메이션 구현한 코드

```tsx
import { useAnimated, useToggle } from '../hooks';

const animValue = useAnimatedValue(0);

const onPress = useCallback(() => {
	Animated.timing(animValue, {
		toValue: started ? 0 : 1,
		useNativeDriver: true,
		duration: 1000,
	}).star(toggleStarted);
}, [started);
```

- started : false

  - ┣ toValue : 1
  - ┗ 진행이 끝나면 toggleStarted를 호출

- started : true
  - ┣ onPress 호출 시 → started : true
  - ┣ toValue : 0 을 향해 애니메이션을 진행
  - ┗ started: false 로 바뀜

> 실제 구현 코드

```tsx
const PersonMonitor: FC<PersonProps> = ({person, deletePressed}) => {
  const animValue = useAnimatedValue(0);
  const realAnimValue = useMonitorAnimatedValue(animValue);
  const [started, toggleStarted] = useToggle(false);
  const avatarPressed = useCallback(() => {
    Animated.timing(animValue, {
      toValue: started ? 0 : 1,
      useNativeDriver: true,
      duration: 1000,
      easing: Easing.bounce,
    }).start(toggleStarted);
  }, [started]);
  const rightViewAnimStyle = useStyle({opacity: animValue});
```

#### Animated.Value 클래스의 interpolate 메서드

- 애니메이션 코드를 작성하다 보면

  - ┣ Animated.Value 객체의 `보간값을 다른 값으로 바꾸고 싶은 경우`가 있음
  - ┣━ 예를 들어 `입력 범위`는 `0 ~ 1 까지 보간`
  - ┗━ 출력 범위는 `0 ~ 100 까지 출력`하고 싶을 때

- 또 비슷하게 `색상으로 출력 범위를 표현 가능`

  - ┠ 입력값 0 : 출력 색상 red
  - ┣ 입력값 0.5 : 출력 색상 red, blue 중간 색상
  - ┗ 입력값 1 : blue 색상으로 만들고 싶은

- 또한 회전 각도로 바꾼 경우

> Animated.Value 클래스는 다음처럼 `interpolate` 메서드를 제공하여 입력 보간값을
>
> > `새로운 보간값`으로 바꿀 수 있게 함

```tsx
export class Value {
	interpolate(config: InterpolationConfigType): AnimatedInterpolation;
}
class AnimatedInterpolation {
	interpolate(config: InterpolationConfigType): AnimatedInterpolation;
}
```

- interpolate 메서드는 InterpolationConfigType 객체를 입력 매개변수로 받아
  - ┗ `interpolate`란 메서드가 있는 새로운 객체를 반환

```tsx
type ExtrapolateType = 'extend' | 'identify' | 'clamp';

type InterpolationConfigType = {
	inputRage: number[];
	outputRage: number[] | string[];
	easing?: (input: number) => number;
};
```

> 앞에 설명했던 input에 따른 output 설정 하는 것이 여기 이용

```tsx
animValue.interpolate({ inputRage: [0, 1], outputRange: [0, 100] });
animValue.interpolate({ inputRage: [0, 1], outputRange: ['red', 'blue'] });
animValue.interpolate({ inputRage: [0, 1], outputRange: ['0deg', '360deg'] });
```

- `InterpolationConfigType`의 `easing`은 `Animated.timing`의 `easing`과 의미가 같음

- `extrapolate`의 사전적 의미 : ...을 기반으로 추론하다.

  - `extrapolate`는 -1, 2 처럼 `inputRange`를 벗어난 값일 경우
  - 어떤 값으로 outputRange를 만들지 결정하는 속성

- `Animated.timing`의 `easing`에 Easing.bounce 같은 값을 설정하거나

  - Animated.spring 함수를 사용할 때 발생

- extrapolate 범위를 벗어난 값이 발생했을 때 이 값을 무시할지 그냥 사용할지
  - ┣ 그냥 사용할지를 결정할 목적으로 사용
  - ┣ clamp : 이 값은 무시 → 가장 자주 사용하는 값
  - ┣ extend : 기본 값 → 범위 내 값을 계산한 공식을 범위 외 값에도 똑같이 적용
  - ┗ identity : 어떤 공식도 적용하지 않고 입력값 그대로를 출력값으로 적용

> easing, extrapolate 사용의 예

```tsx
animValue.interpolate({
	inputRange: [0, 1],
	outputRange: [0, 100],
	easing: Easing.bounce,
	extrapolate: 'clamp',
});
```

> 이제 interpolate를 이용해서 person.name 부분의 폰트 크기와 색상에 애니메이션 적용
>
> > cp PersonToggle.tsx PersonInterpolate.tsx

> 첫 번째 할 일은 다음과 같은 textAnimStyle 만들기

```tsx
import { useStyle } from '../hooks';

const textAnimStyle = useStyle({});
```

- 여기서 fontSize 스타일 속성에 `interpolate` 메서드를 이용
  - ┣ 출력 범위에
  - ┣━ 초깃값 : 0 → 10
  - ┗━ 끝값 : 1 → 30

> 입력 범위와 출력 범위 설정

```tsx
const textAnimStyle = useStyle({
	fontSize: animValue.interpolate({
		inputRange: [0, 1],
		outputRange: [10, 30],
	}),
});
```

- 마찬가지 방법으로 `color 스타일 속성`은
  - ┠ 초기값 : 0 → Colors.lightBlue900
  - ┣ 기본값 : 0.7 → Colors.lime500
  - ┗ 끝값 : 1 → Colors.pink500

```tsx
const textAnimStyle = useStyle({
	color: animValue.interpolate({
		inputRange: [0, 0.7, 1],
		outputRange: [Colors.lightBlue900, Color.lime500, Colors.pink500],
	}),
});
```

- 한 가지 알아야 할 점은 fontSize 와 같은 몇몇 스타일 속성에는 네이티브 애니메이션 적용 불가
  - useNativeDriver : false 로 설정을 하도록 한다.

```tsx
useNativeDriver: false;
```

> 실제 구현 코드

```tsx
const PersonMonitor: FC<PersonProps> = ({person, deletePressed}) => {
  const animValue = useAnimatedValue(0);
  const realAnimValue = useMonitorAnimatedValue(animValue);
  const [started, toggleStarted] = useToggle(false);
  const avatarPressed = useCallback(() => {
    Animated.timing(animValue, {
      toValue: started ? 0 : 1,
      useNativeDriver: false, // fontSize를 사용하기 때문에 false로 설정
      duration: 1000,
      easing: Easing.bounce,
    }).start(toggleStarted);
  }, [started]);
  const rightViewAnimStyle = useStyle({opacity: animValue});

  const textAnimStyle = useStyle({
    fontSize: animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 30],
    }),
    color: animValue.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [Colors.lightBlue900, Colors.lime500, Colors.blue900],
    }),
  });
```

#### interpolate 유틸 함수 만들기

> Animated.Value의 interpolate 메서드는
>
> > 코드 양이 많아 조금 번거로움

- utils 서브 디렉터리를 만들고 이곳에 필요한 함수를 생성

```ts
import { Animated } from 'react-native';

export const interpolate = (
	animValue: Animated.Value,
	outputRange: number[] | string[],
	inputRange: number[] = [0, 1] // -1-
): Animated.AnimatedInterpolation => {
	return animValue.interpolate({ inputRange, outputRange });
};
```

1. 매개변수로 자주 사용하는 `[0, 1]` 배열을 기본값으로 하므로 타이핑 수고를 덜어줌

## transform 스타일 속성에 적용하는 애니메이션

- 모든 React 컴포넌트는 `transform`이란 스타일 속성 가질 수 잇음

> 설치

     yarn add react-native-vector-icons react-native-paper color faker moment moment-with-locales-es6 react-native-appearance
     yarn add @types/react-native-vector-icons @types/color @types/faker
     yarn add react-native-keyboard-aware-scroll-view

### transform 스타일 속성 탐구

- R/N transform 스타일 속성은 transform과 같은 개념
  - ┗ 제한적이나마 3D transform을 지원

```tsx
// prettier-ignore
transform: [
  // number 타입의 속성만 사용
  {translateX: 속성값}, {translateY: 속상값},
  // 0deg 등 타입 속성값 사용
  {rotateX: 속상값}, {rotateY: 속성값}, {rotateZ: 속성값},
  {rotate: 속성값}, //rotateX와 rotateY 같을 시
  {scaleX: 속성값}, {scaleY: 속성값}, //number 타입 속성값 사용
  {scale: 속성값} // scaleX 와 scaleY 같을 시
]
```

- `transform` `스타일 속성`에 대해 알아야 할 것은 속성을 적용한 컴포넌트는

  - ┗ `레이아웃 위치`와 `디스플레이 위치`가 `다르다는 점`

- 즉 R/N은 스타일 속성이 없을 때의 `위치에 컴포넌트가 있다고 생각`
  - `transform` 속성을 `적용한 위치에 컴포넌트가 디스플레이` 될 뿐

> transform

- `스타일 속성`에

  - ┣ `translateX`
  - ┣ `translateY`
  - ┗━ 설정하면 다음 방향으로 이동

- `rotate` 설정

  - ┣ 컴포넌트는 `시계 방향(clockwise)`으로 회전
  - ┣ `rotateX` : `아래에서 위쪽`으로 회전하는 것 처럼
  - ┣ `rotateY` : `왼쪽에서 오른쪽`으로 회전하는 것 처럼
  - ┗ `rotateZ` : `시계 방향으로 회전`하는 것 처럼

- transform 속성에 `scale`을 적용하면 `값이 1일 때 기준`

  - ┣ `1 보다 크면` : `확대`
  - ┗ `1 보다 작으면` : `축소`

- `transform` 속성에 `scaleX`를 적용

  - ┗ 수평 방향 확대/축소

- `transform` 속성에 `scaleY`를 적용
  - ┗ 수직 방향 확대/축소

#### transform 스타일 속성에 애니메이션 적용하기

> import 구문 수정

```tsx
import Person from './PersonTransform';
```

> useStyle 커스텀 훅을 이용한 transform 스타일 속성이 있는
>
> > nameAnimStyle 스타일 객체 만들기

```tsx
const nameAnimStyle = useStyle({
	transform: [],
});
```

> 애니메이션이 진행되면 수평방향(translateX)으로 500px 이동하는
>
> > nameAnimStyle 객체 생성

```tsx
const nameAnimStyle = useStyle({
	transform: [
		{
			translateX: animValue.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 500],
			}),
		},
	],
});
```

> 180도 회전하는 emailAnimStyle 객체도 생성

```tsx
const emailAnimStyle = useStyle({
	transform: [
		{
			rotate: animValue.interpolate({
				inputRange: [0, 1],
				outputRange: ['0deg', '180deg'],
			}),
		},
	],
});
```

> 아래로 200px 동시에 45도 회전하면서 크기는 두 배 commentAnimStyle

```tsx
const commentAnimStyle = useStyle({
	transform: [
		{
			translateY: animValue.interpolate({
				inputRange: [0, 1],
				outputRange: [0, 200],
			}),
		},
		{
			rotate: animValue.interpolate({
				inputRange: [0, 1],
				outputRange: ['0deg', '45deg'],
			}),
		},
		{
			scale: animValue.interpolate({
				inputRange: [0, 1],
				outputRange: [1, 2],
			}),
		},
	],
});
```

- 앞서 컴포넌트에 `transform` 스타일 속성을 적용하면 `레이아웃 위치`와

  - ┣ `디스플레이(렌더링) 위치`가 달라진다고 했음
  - ┗ 이게 어떤 의미인지 설명

- R/N는 `transform 스타일 속성을 적용한 컴포넌트`가 배치된 위치
  - ┣ `onLayout` 이벤트 속성으로 `알려준 위치에 있다고 생각`
  - ┣ 따라서 `화면에 보이지 않더라도` `위치했던 부분이 없어지지 않음`
  - ┣ 다른 `컴포넌트 레이아웃 위치를 침범`하기도 함
  - ┗ 단 애니메이션이 적용된 컴포넌트 : `부모 컴포넌트 레이아웃 바깥으로 못나감`

> 조금 다른 이야기로 transform 속성에 여러 개의 아이템이 있는 배열 적용 시
>
> > 구현이 조금 번거로움

```tsx
const style = useStyle({
  transform: [{translateX: 0}, {rotate: '0deg', {scale: 1}}]
})
```

#### useTransformStyle 커스텀 훅 제작

- `{translateX, rotate, scale}` 형태의 객체를
  - ┣ `[{translateX}, {rotate}, {scale}]` 형태의 배열로 바꾸기 위해서는
  - ┗ `Object.keys`로 `translateX`와 같은 *`키값 배열`*을 먼저 만들어야함

> 키값 배열 만들기

```tsx
const transform = { translateX, rotate, scale };
Object.keys(transform); // ['translateX', 'rotate', 'scale']
```

> map 메서드를 사용해 객체의 배열로 만들기

```ts
Object.keys(transform).map((key) => ({ [key]: transform[key] }));
// 이를 이용해서 적용
```

> 실제 customHook

```tsx
import { useStyle } from './useStyle';

export const useTransformStyle = (
	transform: Record<string, any>,
	deps: any[] = []
) => {
	return useStyle(
		{
			transform: Object.keys(transform).map((key) => ({
				[key]: transform[key],
			})),
		},
		deps
	);
};
```

> Object.keys 를 통해서 키값 배열로 객체 새로 만들기
>
> > ┣ 1. 키 값만 가진 배열 생성
> > ┗ 2. Object.keys를 이용해서 `{key : 값}` 객체 생성

#### useTransformStyle 테스트 코드 작성

> 앞서 만든 커스텀 훅을 이용하여 축구공 아이콘이 왼쪽에서 오른쪽
>
> > 끝으로 진행하는 애니메이션을 구현

> 축구공 아이콘을 생성

```tsx
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesomeIcon);
const iconSize = 50;
```

- 축구공 아이콘을 컴포넌트의 오른쪽 끝으로 이동하려면 `부모 컴포넌트`가
  - ┣ `화면에서 차지하는 크기`를 알아야함
  - ┗ 앞에서 만들었던 `useLayout` 커스텀 훅을 이용

```tsx
import { useLayout } from '../hooks';

const [layout, setLayout] = useLayout();
<View onLayout={setLayout}>
	<Animated style={[iconAnimStyle]} name="soccer-ball-o" />
</View>;
```

- 이처럼 `layout` 속성을 알면 부모 컴포넌트의 오른쪽 끝 지점은
  - ┣ `layout.width - iconSize` 가 됨
  - ┣ 코드에서 `중요한 부분`
  - ┣━━ `layout.width`는 초기값 0으로 최초 설정
  - ┣━━ `onLayout` 이벤트 발생 시 그 때 부모 컴포넌트 크기를 알게됨
  - ┣━━ 이는 `layout.width`가 `useTransformStyle` 커스텀 훅의 의존성 목록
  - ┗━━ `포함되어야 한다는 것`을 의미!!!!

```tsx
const iconSize = 50;
const iconAnimStyle = useTransformStyle(
	{
		translateX: animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, layout.width - iconSize],
		}),
	},
	[layout.width]
);
```

> 이렇게 만들어진 iconAnimStyle 이용해서 AnimatedIcon 컴포넌트에 적용시
>
> > 화면 왼쪽에서 오른쪽으로 이동하는 애니메이션을 만들 수 있음

```tsx
<View onLayout={setLayout}>
	<Animated style={[iconAnimStyle]} name="soccer-ball-o" />
</View>
```

### 애니메이션 연산 관련 함수

- Animated는 `+, -, *, /, %` 등 연산에 대응하는 함수를 제공

> 연산 관련 함수

```tsx
type Value = Animated.Value;
export function add(a: Value, b: Value): Animated.AnimatedInterpolation;
export function subtract(a: Value, b: Value): Animated.AnimatedInterpolation;
export function multiply(a: Value, b: Value): Animated.AnimatedInterpolation;
export function divide(a: Value, b: Value): Animated.AnimatedInterpolation;
export function modulo(a: Value, b: Value): Animated.AnimatedInterpolation;
```

- 그런데 여기서 주의할 점은 두 매개변수의 타입은 `number가 아닌`
  - ┗ `Animated.Value`임을 유의!!!

> number가 아닌 Animated.Value의 형식으로 치환하여 사용

```tsx
const [_10, set_10] = useState(new Animated.Value(10));
const [_20, set_20] = useState(new Animated.Value(20));
const textStyle = useStyle({
	fontSize: Animated.add(_10, Animated.multiply(animValue, _20)),
});
```

> Animated.Value 타입 변수 만들기

```tsx
const PersonArithmetic: FC<PersonProps> = ({ person }) => {
	const [fontSize, setFontSize] = useState<number>(0);
	const _fontSize = new Animated.Value(fontSize);
};
```

> 위 코드에 또 다른 Animated.Value 타입 객체 animValue를 만들면
>
> > animStyle 객체와 fontSize 스타일 속성에 Animated.add와 같은 사칙 연산 코드 사용

```tsx
const PersonArithmetic: FC<PersonProps> = ({ person }) => {
	const [fontSize, setFontSize] = useState<number>(0);
	const _fontSize = new Animated.Value(fontSize);
	const animValue = useAnimatedValue(10);
	const animStyle = useStyle(
		{
			fontSize: Animated.add(_fontSize, animValue),
		},
		[fontSize]
	);
};
```

- useState 훅 호출로 얻은 `setFontSize` `setter 함수`를 이용
- ┣ `fontSize` 변경 시 `_fontSize<Animated.Value>`는
- ┣ `new Animated.Value(10)`의 효과를 가지게 됨
- ┣ `Animated.add(_fontSize, animValue)` 코드는 10부터 20까지의 보간이 발생
- ┗ 결과적으로 10부터 20까지 변하는 애니메이션 발생

```tsx
const increaseFontSize = useCallback(
	(fontSize: number) => () => {
		setFontSize((notUsed) => fontSize);
	},
	[]
);
<Text onPress={increaseFontSize(10)}>add fontSize +10</Text>;
```

> 위와 같은 방법을 이용하면 Animated.timing 함수 없이도
>
> > Animated.Value 타입 객체의 내부 값을 변경할 수 있음

### 다시 사용할 수 있는 ImageSlider 컴포넌트 제작

- 인스타그램과 같은 모바일 앱은 여러장의

  - ┣ 이미지 파일을 좌우 스크롤을 통해 볼 수 있는 화면 UI를 제공
  - ┗ 이를 구현하는 ImageSlider 컴포넌트를 제공

- `FlatList`의 `horizontal 속성에 true 지정`
  - ┣ 수평 방향으로 스크롤하면서 여러개의 이미지를 볼 수 있도록 구현한 것
  - ┣ 화면 UI에서 이런 방식으로 여러 개의 이미지를 볼 수 있게 하는 것
  - ┗ `이미지 슬라이더(Image Slider)` 또는 `캐러셀(Carousel)`

#### ImageSlider 컴포넌트 초기 구현 모습

> 화면 UI를 위해 ImageSlider에는 다음 3개의 속성이 있어야 함

```tsx
export type ImageSliderProps = {
	imageUrls: string[]; // 이미지 URL이 있는 배열
	imageWidth: number; // 이미지 크기
	showThumbnails?: Boolean; // 화면 아래에 썸네일 표시 여부
};
```

#### FlatList 코어 컴포넌트의 수평 스크롤 관련 기능 탐구

- FlatList : horizontal 속성을 제공

  - ┗ `true`를 설정하면 아이템이 수평 방향으로 배치

- 실제로 FlatList의 아이템을 화면처럼 보이게 하기위해서는

  - ┣ `contentContainerStyle`의 `width 스타일 속성`에
  - ┣ `이미지 개수 x 이미지 크기` 만큼의 픽셀 길이를 설정
  - ┗ imageWidth란 이름의 속성을 선언하여 width 스타일 스타일 속성 적용

- 또한 FlatList `좌우 스크롤로 현재 보는 이미지를 바꾸`려면

  - ┣ `scrollEnabled` 속성을 `true`로 설정해야함
  - ┣━━ `scrollEnabled`는 `기본값이 true`
  - ┣ 하지만 `단순히 scrollEnabled 속성만 true`로 설정하면
  - ┣━━ `두 개의 이미지가 한꺼번에 보이는` 상황이 발생
  - ┣ `버그`를 해결하기 위해서는 (항상 이미지 왼쪽 끝이 FlatList 왼쪽 끝 일치)
  - ┗━ `pagingEnabled` 속성을 `true`로 설정 `(기본값 false)`

- FlatList는 기본적으로 스크롤하면 스크롤 바를 화면에 표시
  - ┣ showsHorizontalScrollIndicator 속성에 false
  - ┗ 스크롤바를 숨길 수 있음

> FlatList 하단에 썸네일 이미지 나열
>
> > 특정 썸네일 이미지를 누르면 이미지가 FlatList에 보이는 기능 구현

- FlatList 스크롤하면 스크롤바를 화면에 표시

- FlatList : scrollToIndex 메서드를 제공
  - ┣ index 속성이 있는 객체를 매개변수로 호출시 index 번째
  - ┣ index 번째 아이템 컴포넌트를 화면에 보이도록 함
  - ┗ scrollEnabled 속성값의 true/false 상관없이 동작

```tsx
scrollToIndex: (params: {
  index: number;
}) => void;
```

- FlatList 또한 다음처럼 구현된 scrollToTop과 scrollToEnd 메서드도 제공

```tsx
const scrollToTop = () => scrollToIndex({ index: 0 });
const scrollToEnd = () => scrollToIndex({ index: data.length - 1 });
```

- 앞서 `useRef` 훅을 사용하여 `FlatList`의 `scrollToEnd` 메서드 호출한 적 있음
  - ┣ FlatList의 scrollToIndex 메서드를 호출하려면 `scrollToEnd` 호출 때와 마찬가지로
  - ┗ `useRef` 훅을 사용하여 `생성한 객체를 ref 속성`에 설정

> FlatList의 scrollToIndex 메서드를 호출하는 코드

```tsx
export const ImageSlider: FC<ImageSliderProps> = ({
	imageUrls,
	imageWidth,
	showThumbNails,
}) => {
	const flatListRef = useRef<FlatList | null>(null);
	const selectImage = (index: number) => () => {
		flatListRef.current?.scrollToIndex({ index });
	};
	return <FlaList ref={flatListRef} />;
};
```

- 앞서 만든 selectImage 함수를 다음 코드처럼 TouchableView
  - ┣ onPress 설정하면 index 번째 썸네일 이미지를 누를 때 마다
  - ┗ 해당 이미지가 화면에 나타남

```tsx
{
	showThumbNail && (
		<View>
			{images.map((uri, index) => (
				<TouchableViw onPress={selectImage(index)} />
			))}
		</View>
	);
}
```

> 실제 코드에 추가

```tsx
export const ImageSlider: FC<ImageSliderProps> = ({
  imageUrls,
  imageWidth,
  showThumbnails,
}) => {
  const flatListRef = useRef<FlatList | null>(null);
  const selectImage = useCallback(
    (index: number) => () => {
      flatListRef.current?.scrollToIndex({index});
    },
    [],
  );
  const circles = useMemo(
    () =>
      imageUrls.map((uri, index) => <View key={index} style={styles.circle} />),
    [],
  );
  const thumbnails = useMemo(
    () =>
      imageUrls.map((uri, index) => (
        <TouchableView
          key={index}
          onPress={selectImage(index)}
          style={[styles.thumbnail]}>
          <Image source={{uri}} style={{width: 30, height: 30}} />
        </TouchableView>
      )),
    [],
  );
```

> 이제 어떤 ImageSlider 아래 어떤 이미지를 선택했는지를 나타내는 애니메이션 구현

### 슬라이드 애니메이션 구현

- Animated가 제공하는 사칙 연산 함수를 사용하여 이미지 개수만큼 나열한

  - ┗ 원들 중에서 index 번째만 다른 색상으로 표현하는 애니메이션 구현

- 애니메이션의 원리는 이미지 개수보다 1개 더 많은 원을 수평으로 배치
  - ┗ 선택을 뜻하는 짙은 색 원이 특정 index 위에 출력되게 하는 것

> 수평 방향으로 원 나열

```tsx
export const ImageSlider: FC<ImageSliderProps> = ({
	images,
	imageWidth,
	showThumbnails,
}) => {
	const circles = useMemo(
		() =>
			images.map((uri, index) => <View kye={index} style={styles.circle} />),
		[]
	);
	<View style={{ flexDirection: 'row' }}>{circles}</View>;
};

const styles = StyleSheet.create({
	circle: {
		width: circleWidth,
		height: circleWidth,
		borderRadius: circleWidth / 2,
		marginRight: circleMarginRight,
		backgroundColor: Colors.pink100,
	},
});
```

> position 스타일 속성값이 'absolute'인 Animated.View를 View의 자식요소로 추가
>
> > 이 Animated.View는 현재 index를 반영함 → backgroundColor 색상이
> > circles 보다 좀 더 진함

- Animated.View에 `position: 'absolute'` 추가 이유
  - ┗ Animated.View가 다른 circles 위에 겹쳐져야 하기 때문

> Animated.View 컴포넌트 추가

```tsx
<View style={{ flexDirections: 'row' }}>
	{circles}
	<Animated.View style={[styles.circle, styles.selectedCircle]} />
</View>;
const styles = StyleSheet.create({
	selectedCircle: { position: 'absolute', backgroundColor: Colors.pink700 },
});
```

- 이제 Animated.View 가 다른 원 위에 겹치도록 설정
  - ┣ `position : 'absolute'` 이기 때문에 처음 렌더링 시
  - ┣ 다른 `형제 컴포넌트의 배치와 무관`하게 `부모 컴포넌트의 왼쪽 위`에 나타남
  - ┣ 이제 `Animated.View`를 다음처럼
  - ┣━━ `(원 크기 + 원 오른쪽 마진) x 이미지 인덱스` 만큼 `오른쪽으로 이동`
  - ┗━━ index 위치의 원과 겹치게 됨

> 이 공식을 Animated.add, Animated.multiply 사칙 연산 함수를 사용하여 구현

```tsx
const circleWidth = 10,
	circleMarginRight = 5;

const selectIndexAnimValue = useAnimatedValue();

const circleWidthAnimValue = useAnimatedValue(circleWidth);
const circleMarginRightAnimValue = useAnimatedValue(circleMarginRight);
```

> 이 뒤에 Animated.View transform 스타일 속성의 translateX에 앞에
>
> > 공식을 적용시 Animated.View가 특정 index 번째의 원과 겹치게 됨

```tsx
const translateX = useTransformStyle({
  translateX: Animated.multiply(
    selectedIndexAnimValue,
    Animated.add(circleWidthAnimValue, circleMarginRightAnimValue)
  );
})
<View style={{flexDirection: 'row'}}>
  {circles}
  <Animated.View style={{styles.circle, styles.selectedCircle, translateX}}/>
</View>
```

- 앞의 코드는 `selectedIndexAnimValue`를 단지 `현재 초깃값 0`으로 설정

  - ┣ 이 `변수를 바꾸는 코드`를 구현하지 않았음
  - ┣ `translateX`는 정상 동작하지 않음
  - ┗ `selectedIndexAnimValue` 의 `값을 변경하는 코드` 구성

- 이를 위해서는 `FlatList`의 `onScroll 이벤트 속성`을 이해해야 함

  - ┣ FlatList는 `스크롤이 일어나면`
  - ┣ `다음 onScroll 이벤트 속성`에 설정된
  - ┗ `이벤트 처리기 함수`를 호출

- `onScroll에 설정한 이벤트 처리기`는 다음
- ┣ `NativeScrollEvent` 타입 속성
- ┣━━ `contentOffset` 을 통해 얻을 수 있음
- ┣ 현재 `horizontal 속성이 true` 이기 때문에
- ┗━━ `contentOffset.x` 값을 통해 `스크롤 위치`를 알 수 있음

> 스크롤 위치 확인

```tsx
export interface NativeScrollEvent {
	contentOffset: NativeScrollPoint;
}
export interface NativeScrollPoint {
	x: number;
	y: number;
}
```

- 다음 코드처럼 `contentOffset.x`를 `이미지 크기로 나누면`
- ┣ `화면에 있는 이미지의 index`를 얻을 수 있음
- ┣━━ 이 값을 `selectedIndexAnimValue` 의 `값으로 변경`시
- ┗━━ `translate` 관련 코드가 동작

```tsx
const onScroll = useCallback(
	(event: NativeSyntheticEvent<NativeScrollEvent>) => {
		if (imageWidth == 0) return; // imageWidth가 0일 시 아래 index 변수값 무한 방식
		const { contentOffset } = event.nativeEvent;
		const index = Math.round(contentOffset.x / imageWidth);
		selectedIndexAnimValue.setValue(index);
	},
	[imageWidth]
);
<FlatList onScroll={onScroll} />;
```

- 코드가 동작하면서 `Animated.timing` 이나 `Animated.spring`을 전혀 호출 X
- ┣ Animated.View가 `미끄러지듯 부드럽게 이동`하는 모습을 볼 수 있음
- ┣ 이는 `selectedIndexAnimValue` 가
- ┣━ `Animated.Value` `타입 객체`이므로
- ┣━ `보간을 진행`하면서
- ┗━ `setValue`로 저장한 `value 속상값을 새로운 값으로 바꾸기 때문`

> 이제 썸네일 이미지를 눌렀을 때도 Animated.View가 움직이는 코드를 추가로 구현
>
> > 썸네일 이미지를 누를 때는 항상 다음 selectImage 2차 고차 함수를 호출
> > 여기에 selectIndexAnimValue를 변경하는 다음 코드를 추가하면 간단히 구현 가능

```tsx
const selectImage = useCallback(
	(index: number) => () => {
		selectedIndexAnimValue.setValue(index); // 추가
		flatListRef.current?.scrollToIndex({ index }); // 이 코드 없이도 동작
	},
	[]
);
```

<img src="https://user-images.githubusercontent.com/54137044/130202512-92981bfa-d04f-4902-a147-435131f4b1e3.png" width="200px" >

> 실제 구현 코드

<img src='https://user-images.githubusercontent.com/54137044/130204035-4d9a6be3-a83f-42b0-b366-d7f40db39a1f.png'>
