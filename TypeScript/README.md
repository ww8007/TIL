# 타입스크립트

- 자바스크립트는 동적 타입 언어
- 따라서 변수의 타입은 런타임에 의해서 결정

- 반대로 정적 타입의 언어도 존재
- 정적 타입 언어의 변수의 타입 -> 컴파일 타임에 결정
  - 예로 `자바`, `C++`, `PHP`

> 동적 타입, 정적 타입

    동적 : 변수의 타입 -> 런타임 시점
    정적 : 변수의 타입 -> 컴파일 타임 시점

## 목차

- [타입스크립트](#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)
  - [목차](#%EB%AA%A9%EC%B0%A8)
  - [타입스크립트란](#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%9E%80)
    - [동적 타입 언어와 정적 타입 언어](#%EB%8F%99%EC%A0%81-%ED%83%80%EC%9E%85-%EC%96%B8%EC%96%B4%EC%99%80-%EC%A0%95%EC%A0%81-%ED%83%80%EC%9E%85-%EC%96%B8%EC%96%B4)
      - [정적 타입 언어가 생산성이 높은 이유](#%EC%A0%95%EC%A0%81-%ED%83%80%EC%9E%85-%EC%96%B8%EC%96%B4%EA%B0%80-%EC%83%9D%EC%82%B0%EC%84%B1%EC%9D%B4-%EB%86%92%EC%9D%80-%EC%9D%B4%EC%9C%A0)
    - [타입스크립트의 장점](#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%9E%A5%EC%A0%90)
    - [실습을 위한 준비](#%EC%8B%A4%EC%8A%B5%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%A4%80%EB%B9%84)
      - [Ts에서 타입 선언의 방법](#ts%EC%97%90%EC%84%9C-%ED%83%80%EC%9E%85-%EC%84%A0%EC%96%B8%EC%9D%98-%EB%B0%A9%EB%B2%95)
  - [Ts의 여러 가지 타입](#ts%EC%9D%98-%EC%97%AC%EB%9F%AC-%EA%B0%80%EC%A7%80-%ED%83%80%EC%9E%85)
    - [Ts의 다양한 타입](#ts%EC%9D%98-%EB%8B%A4%EC%96%91%ED%95%9C-%ED%83%80%EC%9E%85)
      - [null과 undefined 타입](#null%EA%B3%BC-undefined-%ED%83%80%EC%9E%85)
      - [문자열 리터럴과 숫자 리터털 타입](#%EB%AC%B8%EC%9E%90%EC%97%B4-%EB%A6%AC%ED%84%B0%EB%9F%B4%EA%B3%BC-%EC%88%AB%EC%9E%90-%EB%A6%AC%ED%84%B0%ED%84%B8-%ED%83%80%EC%9E%85)
      - [any 타입](#any-%ED%83%80%EC%9E%85)
      - [void와 never 타입](#void%EC%99%80-never-%ED%83%80%EC%9E%85)
      - [object 타입](#object-%ED%83%80%EC%9E%85)
      - [교차 타입과 유니온 타입](#%EA%B5%90%EC%B0%A8-%ED%83%80%EC%9E%85%EA%B3%BC-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%83%80%EC%9E%85)
      - [type 키워드로 타입에 별칭주기](#type-%ED%82%A4%EC%9B%8C%EB%93%9C%EB%A1%9C-%ED%83%80%EC%9E%85%EC%97%90-%EB%B3%84%EC%B9%AD%EC%A3%BC%EA%B8%B0)
    - [열거형 타입](#%EC%97%B4%EA%B1%B0%ED%98%95-%ED%83%80%EC%9E%85)
      - [명시적으로 원소의 값 입력하기](#%EB%AA%85%EC%8B%9C%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%9B%90%EC%86%8C%EC%9D%98-%EA%B0%92-%EC%9E%85%EB%A0%A5%ED%95%98%EA%B8%B0)
      - [열거형 타입의 객체 사용하기](#%EC%97%B4%EA%B1%B0%ED%98%95-%ED%83%80%EC%9E%85%EC%9D%98-%EA%B0%9D%EC%B2%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
      - [열거형 타입의 값으로 문자열 할당하기](#%EC%97%B4%EA%B1%B0%ED%98%95-%ED%83%80%EC%9E%85%EC%9D%98-%EA%B0%92%EC%9C%BC%EB%A1%9C-%EB%AC%B8%EC%9E%90%EC%97%B4-%ED%95%A0%EB%8B%B9%ED%95%98%EA%B8%B0)
      - [열거형 타입을 위한 유틸리티 함수](#%EC%97%B4%EA%B1%B0%ED%98%95-%ED%83%80%EC%9E%85%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%9C%A0%ED%8B%B8%EB%A6%AC%ED%8B%B0-%ED%95%A8%EC%88%98)
        - [열거형 타입의 원소 개수를 알려주는 함수](#%EC%97%B4%EA%B1%B0%ED%98%95-%ED%83%80%EC%9E%85%EC%9D%98-%EC%9B%90%EC%86%8C-%EA%B0%9C%EC%88%98%EB%A5%BC-%EC%95%8C%EB%A0%A4%EC%A3%BC%EB%8A%94-%ED%95%A8%EC%88%98)
        - [열거형 타입에 존재하는 값인지 검사하는 함수](#%EC%97%B4%EA%B1%B0%ED%98%95-%ED%83%80%EC%9E%85%EC%97%90-%EC%A1%B4%EC%9E%AC%ED%95%98%EB%8A%94-%EA%B0%92%EC%9D%B8%EC%A7%80-%EA%B2%80%EC%82%AC%ED%95%98%EB%8A%94-%ED%95%A8%EC%88%98)
        - [getEnumLen 함수와 isValidEnumVal 함수의 사용 예](#getenumlen-%ED%95%A8%EC%88%98%EC%99%80-isvalidenumval-%ED%95%A8%EC%88%98%EC%9D%98-%EC%82%AC%EC%9A%A9-%EC%98%88)
      - [상수 열거형 타입](#%EC%83%81%EC%88%98-%EC%97%B4%EA%B1%B0%ED%98%95-%ED%83%80%EC%9E%85)
        - [상수 열거형 타입 객체 사용 불가](#%EC%83%81%EC%88%98-%EC%97%B4%EA%B1%B0%ED%98%95-%ED%83%80%EC%9E%85-%EA%B0%9D%EC%B2%B4-%EC%82%AC%EC%9A%A9-%EB%B6%88%EA%B0%80)
    - [함수 타입](#%ED%95%A8%EC%88%98-%ED%83%80%EC%9E%85)
      - [변수를 함수 타입으로 정의](#%EB%B3%80%EC%88%98%EB%A5%BC-%ED%95%A8%EC%88%98-%ED%83%80%EC%9E%85%EC%9C%BC%EB%A1%9C-%EC%A0%95%EC%9D%98)
      - [선택 매개변수](#%EC%84%A0%ED%83%9D-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98)
      - [선택 매개변수 오른쪽에 필수 매개변수를 지정](#%EC%84%A0%ED%83%9D-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98-%EC%98%A4%EB%A5%B8%EC%AA%BD%EC%97%90-%ED%95%84%EC%88%98-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98%EB%A5%BC-%EC%A7%80%EC%A0%95)
      - [매개변수의 기본값 정하기](#%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98%EC%9D%98-%EA%B8%B0%EB%B3%B8%EA%B0%92-%EC%A0%95%ED%95%98%EA%B8%B0)
      - [나머지 매개변수](#%EB%82%98%EB%A8%B8%EC%A7%80-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98)
      - [this 타입](#this-%ED%83%80%EC%9E%85)
      - [원시 타입에 메서드 추가하기](#%EC%9B%90%EC%8B%9C-%ED%83%80%EC%9E%85%EC%97%90-%EB%A9%94%EC%84%9C%EB%93%9C-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0)
      - [함수 오버로드:여러 개의 타입 정의](#%ED%95%A8%EC%88%98-%EC%98%A4%EB%B2%84%EB%A1%9C%EB%93%9C%EC%97%AC%EB%9F%AC-%EA%B0%9C%EC%9D%98-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98)
      - [함수 오버로드를 사용하지 않은 코드](#%ED%95%A8%EC%88%98-%EC%98%A4%EB%B2%84%EB%A1%9C%EB%93%9C%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80-%EC%95%8A%EC%9D%80-%EC%BD%94%EB%93%9C)
        - [함수 오버로드를 사용한 코드](#%ED%95%A8%EC%88%98-%EC%98%A4%EB%B2%84%EB%A1%9C%EB%93%9C%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%93%9C)
      - [명명된 매개변수](#%EB%AA%85%EB%AA%85%EB%90%9C-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98)
      - [인터페이스로 명명된 매개변수의 타입 정의](#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%A1%9C-%EB%AA%85%EB%AA%85%EB%90%9C-%EB%A7%A4%EA%B0%9C%EB%B3%80%EC%88%98%EC%9D%98-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98)
    - [인터페이스](#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4)
      - [인터페이스로 객체 타입 정의](#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%A1%9C-%EA%B0%9D%EC%B2%B4-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98)
        - [인터페이스의 간단한 예](#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EC%9D%98-%EA%B0%84%EB%8B%A8%ED%95%9C-%EC%98%88)
      - [선택 속성](#%EC%84%A0%ED%83%9D-%EC%86%8D%EC%84%B1)
        - [undefined가 유니온 타입에 포함된 경우](#undefined%EA%B0%80-%EC%9C%A0%EB%8B%88%EC%98%A8-%ED%83%80%EC%9E%85%EC%97%90-%ED%8F%AC%ED%95%A8%EB%90%9C-%EA%B2%BD%EC%9A%B0)
      - [읽기 전용 속성](#%EC%9D%BD%EA%B8%B0-%EC%A0%84%EC%9A%A9-%EC%86%8D%EC%84%B1)
      - [정의되지 않은 속성값에 대한 처리](#%EC%A0%95%EC%9D%98%EB%90%98%EC%A7%80-%EC%95%8A%EC%9D%80-%EC%86%8D%EC%84%B1%EA%B0%92%EC%97%90-%EB%8C%80%ED%95%9C-%EC%B2%98%EB%A6%AC)
      - [인터페이스로 정의하는 인덱스 타입](#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%A1%9C-%EC%A0%95%EC%9D%98%ED%95%98%EB%8A%94-%EC%9D%B8%EB%8D%B1%EC%8A%A4-%ED%83%80%EC%9E%85)
        - [여러개의 인덱스를 정의하는 경우](#%EC%97%AC%EB%9F%AC%EA%B0%9C%EC%9D%98-%EC%9D%B8%EB%8D%B1%EC%8A%A4%EB%A5%BC-%EC%A0%95%EC%9D%98%ED%95%98%EB%8A%94-%EA%B2%BD%EC%9A%B0)
      - [그 밖 인터페이스로 할 수 있는 것](#%EA%B7%B8-%EB%B0%96-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%A1%9C-%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EA%B2%83)
        - [함수 타입에 속성값 추가하기](#%ED%95%A8%EC%88%98-%ED%83%80%EC%9E%85%EC%97%90-%EC%86%8D%EC%84%B1%EA%B0%92-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0)
        - [인터페이스로 클래스 구현하기](#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4%EB%A1%9C-%ED%81%B4%EB%9E%98%EC%8A%A4-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)
        - [인터페이스 확장하기](#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%ED%99%95%EC%9E%A5%ED%95%98%EA%B8%B0)
        - [인터페이스 합치기](#%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%ED%95%A9%EC%B9%98%EA%B8%B0)

## 타입스크립트란

- 타입스크립트는 자바스크립트의 모든 기능을 포함하면서 정적 타입을 지원하는 언어
- 정적 타입과 동적 타입을 비교해보면서 왜 JS에 정적 타입이 필요한지 학습
- JS에 정적 타입을 추가해 주는 언어와 도구는 다양
  - `Elm`, `ReasonML`, `PureScript`, `Flow`

### 동적 타입 언어와 정적 타입 언어

- 동적 타입 언어와 정적 타입 언어의 차이

| 동적 타입 언어                                    | 정적 타입 언어                                      |
| ------------------------------------------------- | --------------------------------------------------- |
| 타입에 대한 고민을 하지 않아도 되서 러닝커브 down | 변수를 선언할 때 마다 타입을 고민 -> 러닝 커브 up   |
| 코드의 양이 적을 때 생산성이 좋음                 | 콛의 양이 많을 때 동적 타입 언어에 비해 생성성 좋음 |
| 타입 오류가 런타임시 발견                         | 타임 오류가 컴파일 시 발견                          |

- 동적 타입 언어와 정적 타입 언어는 장단점이 서로 달라 프로젝트의 성격에 따라 선택
- 작은 규모의 프로젝트 -> 동적 타입
- 큰 규모 프로젝트 -> 정적 타입

#### 정적 타입 언어가 생산성이 높은 이유

- 정적 타입 언어의 코드는 타입으로 서로 연결
- 연관된 코드 간의 이동이 쉽고 변수명, 함수명 변경하는 리팩터링이 쉬움
- `import` 하지 않고 코드를 작성해도 단축키 한 번이면 `IDE`가 필요한 `import`코드 삽입
- 함수를 입력 하면 `매개변수` 종류, `반환값` 타입을 확인 가능

> 결론 : 타입을 정할 때는 귀찮지만 결론적으로 코딩이 편해짐

### 타입스크립트의 장점

- MS(마이크로소프트) 에서 개발하고 있으며 업데이트 버전이 꾸준히 나오는 중
- `JS`에 기능 추가 -> `TS`에도 빠르게 기능추가

- 타입스크립트는 다른 경쟁 언어에 비해 큰 생테계를 가지고 있음
- 유명한 라이브러리 -> 타입스크립트 타입 정의 파일을 가지고 있음

  - 타입 정의 라이브러리로 가지고 있거나, `DefinitelyTyped`라는 깃허브 장소에 포함

- `vscode` 또한 MS에서 제작 -> `Ts`에 대한 지원이 잘됨
- 타입스크립트 이용해서 자바스크립트 파일도 타입 검사
  - `레거시(legacy)` 프로젝트에서 유용

### 실습을 위한 준비

- 타입스크립트 홈페이지에서 코드 실행

```ts
let v1 = 123; // -1-
v1 = '123'; // 오류
```

1. v1의 타입을 명시적으로 입력하지 않아도 `Ts` 숫자 타입으로 인식
   - 자동 타입 인식 -> `type interface` 타입 추론
   - 타입 추론 덕분에 기존의 `Js` 코드를 크게 변경하지 않고 `Ts` 비교적 쉽게 적용 가능

#### Ts에서 타입 선언의 방법

```ts
let v1: number | string = 123; // -1-
v1 = 'abc'; // -2-
```

1. 변수 v1을 숫자나 문자열인 타입으로 정의
   - 변수 이름은 이름 오른쪽에 콜론(`:`)과 함께 타입을 선언가능
2. 변수 v1은 문자열도 포함하는 타입으로 타입 에러가 발생하지 않음

## Ts의 여러 가지 타입

- 타입 스크립트로 정의할 수 있는 여러가지 타입 학습

### Ts의 다양한 타입

- Ts에서 사용되는 기본 타입 학습

```ts
const size: number = 123;
const isBig: boolean = size >= 100;
const msg: string = isBig ? '크다' : '작다';

// -1-
const values: number[] = [1, 2, 3];
const values2: Array<number> = [1, 2, 3];
// -1-

values.push('a'); // 타입 에러 -2-

const data: [string, number] = [msg, size]; // -3-
data[0].substr(1);
data[1].substr(1); //타입 에러 -4-
```

1. 배열 타입은 두 가지 방법으로 정의 가능
2. 숫자 배열에 문자열을 입력하면 에러 발생
3. 문자열과 숫자로 구성된 `튜플(tuple)` 타입을 정의
4. 두 번째 아이템의 타입은 숫자인데 문자열의 메서드를 호출하면 타입 에러발생
   - `substr` -> 문자열 메서드

#### null과 undefined 타입

- `Js`에서 값으로 존재하는 `null`, `undefined`는 타입스크립트에서 각각 타입으로 존재

```ts
`use strict`;
// -1-
let v1: undefined = undefined;
let v2: null = null;
// -1-
v1 = 123; // 타입 에러 -2-

let v3: number | undefined = undefined; // -3-
v3 = 123;
```

1. `undefined`, `null`은 타입으로 사용이 가능
2. `undefined` 타입에 숫자를 입력하면 타입 에러 발생
3. `undefined`, `null` 타입은 다른 타입과 함께 `유니온` 타입으로 정의할 때 많이 사용

> 유니온 타입

     `파이프(|)`를 이용해서 여러 가지중에 하나를 표현
     제너릭의 표현의 한계를 해결해준다.
     `파이프(|)`를 맨압에 사용하는 것도 가능함

```ts
type Animal = Rabbit | Dog | Cat;
```

> 정리

     Js와는 다르게 Ts 에서는 `undefined`, `null`을 타입으로 표현가능
     Js 에서는 값으로 표현됨

#### 문자열 리터럴과 숫자 리터털 타입

- Ts 에서는 문자열 리터럴과 숫자 리터럴을 타입으로 정의 가능

```ts
'use strict';

let v1: 10 | 20 | 30; // -1-
v1 = 10;
v1 = 15; // 타입 에러 -2-

let v2: '경찰관' | '소방관'; // -3-
v2 = '의사';
```

1. 숫자 10, 20, 30은 각각 타입으로 사용
   - 변수 `v1`은 오직 숫자 10, 20, 30만 가질 수 있는 타입으로 정의
2. 지정된 숫자가 아닌 다른 숫자는 입력 불가
3. 변수 `v2`는 문자열 리터럴 타입으로 정의

> 정리

     문자열 리터럴과 숫자 리터럴 타입으로 변수 타입을 정의 가능하다.

#### any 타입

- `any` 타입은 모든 종류의 값을 허용하는 타입

```ts
let val: any;
val = 123;
val = '456';
val = () => {};
```

- any 타입에는 `숫자`, `문자열`, `함수`도 입력 가능
- `any` 타입은 기존 Js -> Ts로 `포팅`하는 경우 유용하게 사용가능

- 다만 `any` 타입을 난발하면 타입스크립트를 사용하는 의미가 퇴색

#### void와 never 타입

- 아무 값도 반환하지 않고 종료되는 함수의 반환 타입은 `void` 타입으로 정의 가능
- 항상 예외가 발생해서 비정상적 종료되거나 무한 루프 때문에 종료되지 않는 함수의 반환타입은 `never`타입으로 정의 가능

```ts
'use strict';
// -1-
function f1(): void {
  console.log('hello');
}
// -2-
function f2(): never {
  throw new Error('some error');
}
// -3-
function f3(): never {
  while (true) {}
}
```

1. 아무 값도 반환하지 않으므로 `void` 타입으로 정의
2. 함수가 항상 비정상적으로 종료되므로 `never` 타입으로 정의
3. 함수가 종료되지 않으므로 `never`타입으로 정의

> 정리

     void : 아무것도 반환 하지 않을 때
     never : 함수가 종료되지 않을 경우

#### object 타입

- `object` 타입은 `Js`에서 일반적으로 사용되는 객체의 타입

```ts
let v: object;
v = { name: 'abc' };
console.log(v.prop1); // 타입 에러 -1-
```

1. 객체의 속성에 대한 정보가 없기 때문에 특정 속성값에 접근하면 타입 에러 발생
   - 속성 정보를 포함해서 타입을 정의하기 위해서는 `interface`를 사용해야 함

#### 교차 타입과 유니온 타입

- 여러 타입의 교집합과 합집합을 각각 교차(`intersection`) 타입과 유니온(`union`) 타입으로
- 표현이 가능
- 교차 타입 -> `&`
- 유니온 타입 -> `|`

```ts
let v1: (1 | 3 | 5) & (3 | 5 | 7); // -1-
v1 = 3;
v1 = 1; // 타입 에러 -2-
```

1. 변수 `v1`의 타입은 3 | 5 와 같음
2. `v1`에 3또는 5가 아닌 값을 할당 불가

> 정리

     | : 유니온(union)
     & : 교차(intersection)

#### type 키워드로 타입에 별칭주기

- `type` 키워드를 사용해서 타입에 별칭을 줄 수 있음
- 타입 별칭은 타입을 선언할 때 편리하게 사용 가능

```ts
type Width = number | string; // -1-
let width: Width;
width = 100;
width = '100px';
```

1. number | string 타입에 Width라는 별칭을 부여
2. Width는 일반적인 타입처럼 사용될 수 있음

### 열거형 타입

- 열거형 타입은 `enum` 키워드를 사용해서 정의
- 역거형 타입의 각 원소는 `값`으로 사용될 수 있고 `타입`으로 사용 가능

```ts
// -1-
enum Fruit {
  Apple,
  Banana,
  Orange,
}
const v1: Fruit = Fruit.Apple; // -2-
const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana; // -3-
```

1. 열거형 타입을 이용해서 파일을 정의
2. 열거형 타입의 원소인 Apple을 값으로 사용
3. Apple 타입을 사용

#### 명시적으로 원소의 값 입력하기

```ts
enum Fruit {
  Apple, // -1-
  // -2-
  Banana = 5,
  Orange,
}
console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);
```

1. 열거형 타입의 첫 번째 원소에 값을 할당하지 않으면 자동으로 0이 할당
2. 열거형 타입의 각 원소에 숫자 또는 문자열 할당할 수 있다.
   - 명시적으로 값을 입력 X -> 이전 원소에서 1만큼 증가한 값이 할당

- 다른 코드들과 달리 열거형 타입은 컴파일 후에도 관련된 코드가 남음

```ts
var Fruit;
(function (Fruit) {
  Fruit[(Fruit['Apple'] = 0)] = 'Apple'; // -2-
  Fruit[(Fruit['Banana'] = 5)] = 'Banana';
  Fruit[(Fruit['Orange'] = 5)] = 'Orange';
})(Fruit || (Fruit = {})); // -1-
console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange);
```

1. 열거형 타입은 `객체`로 존재
2. 열거형 타입의 각 원소는 이름과 값이 양 방향으로 매핑(`mapping`) 됨
   - 열거형 타입은 객체로 존재하기 때문에 해당 객체를 `런타임`에 사용 가능

#### 열거형 타입의 객체 사용하기

```ts
enum Fruit {
  Apple,
  Banana = 5,
  Orange,
}
// -1-
console.log(Fruit.Banana); // 5
console.log(Fruit['Banana']); // 5
// -1-
console.log(Fruit[5]); // -2-
```

1. 열거형 타입은 객체이기 때문에 객체처럼 다룰 수 잇음
2. 각 원소의 이름과 값이 양방향으로 `매핑` -> 값을 이용해서 이름을 가져올 수 있음

> 정리

    열거형 타입 -> `객체`이므로 매핑이 되어있음
    값을 통해 이름을 가져오거나
    이름을 통해 값을 가져오기가 가능

#### 열거형 타입의 값으로 문자열 할당하기

```ts
enum Language {
  Korean = 'ko',
  English = 'en',
  Japanese = 'jp',
}
```

- 열거형 타입의 원소에 문자열을 할당하면 `단방향`으로 매핑

  - 이는 서로 다른 원소의 이름 또는 값이 같을 경우 충돌이 발생

- 결과

```js
{ Korean: 'ko', English: 'en', Japanese: 'jp' }
```

> 정리

    열거형 타입 문자열 -> 단방향
    열거형 타입 숫자 -> 양방향

#### 열거형 타입을 위한 유틸리티 함수

- 열거형 타입을 자주 사용하면 유틸리티 함수를 만들어서 사용하는게 좋음

##### 열거형 타입의 원소 개수를 알려주는 함수

```ts
function getEnumLength(enumObj: any) {
  const keys = Object.keys(enumObj);
  // enum 값이 숫자이면 두 개씩 들어가므로 문자열만 계산
  return keys.reduce(
    (acc, key) => (typeof enumObj[key] === 'string' ? acc + 1 : acc), // -1-
    0
  );
}
```

1. 원소가 숫자인 경우에는 양방향으로 매핑되기 때문에 주의해야 함
   - 객체의 속성값이 문자열인 경우에만 계산하면 열거형 타입에서 원소의 개수를 구할 수 있음

##### 열거형 타입에 존재하는 값인지 검사하는 함수

```js
function isValidEnumVal(enumObj: any, value: number | string) {
  if (typeof value === 'number') {
    return !!enumObj[value]; // -1-
  } else {
    return Object.keys(enumObj)
      .filter((key) => isNaN(Number(key)))
      .some((key) => enumObj[key] === value); // -2-
  }
}
```

1. 1의 값이 숫자이면 양방향으로 매핑 되어 있는지 검사
2. 값이 문자열이면 양방향 매핑에 의해 생성된 키를 제거하고 해당 값이 존재하는지 검사

##### getEnumLen 함수와 isValidEnumVal 함수의 사용 예

```js
enum Fruit {
  Apple,
  Banana,
  Orange,
}
enum Language {
  Korean = 'ko',
  English = 'en',
  Japanese = 'jp',
}
console.log(getEnumLength(Fruit), getEnumLength(Language));
console.log('1 in Fruit', isValidEnumVal(Fruit, 1));
console.log('5 in Fruit', isValidEnumVal(Fruit, 5));
```

- isValidEnumValue 함수는 서버로부터 받은 데이터를 검증할 때 유용하게 사용가능

#### 상수 열거형 타입

- 열거형 타입은 컴파일 후에도 남아 있기 때문에 번들 파일의 크기가 불필요하게 커짐
- 열거형 타입의 객체에 접근하지 않는다면 굳이 컴파일 후에 객체로 남겨둘 필요가 없음
- `상수(cost) 열거형` 타입을 사용하면 컴파일 결과에 열거형 타입의 객체를 남겨 놓지 않을 수 있음

```ts
const enum Fruit {
  Apple,
  Banana,
  Orange,
}
const fruit: Fruit = Fruit.Apple;

const enum Lan {
  Korean = 'ko',
  Eng = 'en',
  Jap = 'jp',
}

const lang: Lan = Lan.Korean;

console.log(fruit, lang);
```

- 열거형 타입의 `객체`를 생성하는 코드가 보이지 않음
- 열거형 타입이 사용된 코드는 `원소의 값`으로 대체 -> 코드 간소화

- But `상수 열거형`을 모든 경우에 사용할 수 있는 것이 아님
  - 열거형 타입을 상수로 정의 -> 열거형 타입의 객체 사용 불가

##### 상수 열거형 타입 객체 사용 불가

```ts
const enum Fruit {
  Apple,
  Banana,
  Orange,
}
console.log(getEnumLength(Fruit)); //-1-
```

- 컴파일 시 에러를 확인 가능하긴 함

### 함수 타입

- 함수의 타입을 정의하기 위해서는 `매개변수 타입`, `반환 타입` 필요
- `콜론(:)`을 이용해서 `매개변수 타입` `반환 타입` 정의 가능

```ts
function getInfoText(name: string, age: number): string {
  // -1-
  const nameText = name.substr(0, 10); // -2-
  const ageText = age >= 35 ? 'senior' : 'junior'; // -3-
  return `name : ${nameText}, age: ${ageText}`;
}
const v1: string = getInfoText('mike', 23);
const v2: string = getInfoText('mike', '23');
const v3: number = getInfoText('mike', 23);
```

1. `매개변수` 타입과 `반환` 타입을 정의
2. `매개변수 name`은 문자열 타입 -> `substr` 사용 가능
3. `매개변수 age`는 숫자형 타입 -> 크기 비교 가능

#### 변수를 함수 타입으로 정의

```ts
const getinfoText: (name: string, age: number) => string = function (
  name,
  age
) {};
```

- 이 내용은 책이 잘못됨
- 똑같이 입력해도 오류가 생김...

#### 선택 매개변수

- `선택 매개변수` : 반드시 입력하지 않아도 되는 매개변수
  - 매개변수 이름 오른쪽 `물음표(?)` 기호를 입력 시 `선택 매개변수`

```ts
// -1-
function getInfoText(name: string, age: number, lan?: string): string {
  const nextText = name.substr(0, 10);
  const ageText = age >= 35 ? 'sen' : 'jun';
  const langText = lan ? lan.substr(0, 10) : ''; // -2-
  return `name : ${nextText}, age: ${ageText}, lan : ${langText}`;
}

console.log(getInfoText('jang', 26));
console.log(getInfoText('dong', 25, 'ko'));
```

1. lan을 `선택 매개변수`로 지정
   - 함수 호출 시 `선택 매개변수`의 인수를 입력하지 않아도 `타입 에러` 안생김
2. 인수의 존재 여부를 검사하지 않고 호출 시 `타입 에러`
   ```ts
   const langText = lan ? lan.substr(0, 10) : '';
   ```

#### 선택 매개변수 오른쪽에 필수 매개변수를 지정

- 선택 매개변수 `물음표(?)` 오른쪽에 `필수` 매개변수 입력하면 오류생김
- 이럴 때는 `or(|)` 연산자 이용 -> `undefined`

```ts
function getInfoText(
  name: string,
  lang: string | undefined, // -1-
  age: number
): string {
  // ...
  return;
}

getInfoText('mike', undefined, 23); // -2-
```

1. `유니온 타입` 이용해서 `undefined` 입력 가능하게
2. 함수 호출 시 중간에 `undefined` 입력 가능

> 그러나 이런 방식은 가독성이 좋지 않음

    `매개변수` 개수가 많은 경우
    `비구조화` 분법을 사용해서 `명명된 매개변수`로 작성하는게 좋음
    뒤에 설명

#### 매개변수의 기본값 정하기

- 매개변수의 기본값을 정의 가능하다.

```ts
function getInfoText(
  name: string,
  age: number = 15, // -1-
  lang: 'korean' // -2-
): string {
  const nextText = name.substr(0, 10);
  const ageText = age >= 35 ? 'sen' : 'jun';
  const langText = lang ? lang.substr(0, 10) : ''; // -2-
  return `name : ${nextText}, age : ${ageText}, lang : ${langText}`;
}

const f1: (name: string, age?: number, lang?: string) => string = getInfoText; // -3-
```

1. 타입 오른쪽에 `=` 기호를 사용해서 매개변수 `기본값` 정의 가능
   - age의 인수를 입력하지 않으면 15가 기본값으로 사용
2. 타입을 `입력하지 않아도` 매개변수의 기본값 정의 가능
   - 기본값이 문자열 -> 타입도 문자열
3. `기본값`이 있는 매개변수는 `선택 매개변수`

#### 나머지 매개변수

```ts
function getInfoText(name: string, ...rest: string[]): string {
  // ...
}
```

> 나머지 매개변수

    `배열`로 정의가 가능하다.

#### this 타입

- 함수의 `this` 타입을 지정하지 않으면 기본적으로 `any` 타입이 사용된다.
- `any`타입을 자주 사용하는 것은 좋은 습관이 아니므로 `this` 타입을 지정해두는 것이 좋음

```ts
function getParam(index: number): string {
  const params = this.splt(','); // -1-
  if (index < 0 || params.length <= index) {
    return '';
  }
  return this.split('')[index];
}
```

1. `splt`로 오타를 내었지만 `this` type이 `any`가 되었기 때문에 컴파일 에러 X

- 함수의 `this` 타입은 첫 번째 매개변수 위치에서 정의 가능

```ts
function getParam2(this: string, index: number): string {
  const params = this.split(',');
  if (index < 0 || params.length <= index) {
    return '';
  }
  return this.split('')[index];
}
```

#### 원시 타입에 메서드 추가하기

- `원시(primitive)` 타입에 메서드를 등록할 때는 `인터페이스` 이용

```ts
// -1-
interface String {
  getParam(this: string, index: number): string;
}
String.prototype.getParam = getParam; // -2-
console.log('asdf, 1234, ok'.getParam(1)); // -3-
```

1. `interface`를 이용해서 이미 존재하는 문자열 타입에 `getParam` 메서드를 추가
2. 문자열의 `프로토타입`에 작성한 함수를 등록
3. 문자에 등록된 `getParam` 메서드를 호출 가능

> 정리

조금만 배우면 진짜 편하게 쓸 수 있을 것 같음
리액트에서 적용이 가능하도록 응용 해보기

#### 함수 오버로드:여러 개의 타입 정의

- 자바스크립트는 동적 타입 언어이므로 하나의 함수가 다양한 `매개변수` 타입과
- `반환` 타입을 가질 수 있음
- `함수 오버로드(overload)`를 사용하면 하나의 함수에 여러가지 타입 정의 가능

> `add` 함수를 만들어서 아래와 같은 일을 처리하고 싶다고 가정

    1.  두 매개변수가 모두 문자열이면 문자열 반환
    2.  두 매개변수가 모두 숫자이면 숫자 반환
    3.  두 매개변수를 서로 다른 타입으로 입력하면 안됨

#### 함수 오버로드를 사용하지 않은 코드

```ts
// -1-
function add(x: number | string, y: number | string): number | string {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  } else {
    const result = Number(x) | Number(y);
    return result.toString();
  }
}
const v1: number = add(1, 2); // -2- type error
console.log(add(1, '2')); // -3-
```

1. 모든 `매개변수`와 `반환값`의 타입은 문자열이거나 숫자
2. 모든 `매개변수`가 숫자이면 반환값도 숫자이지만 타입 에러 발생
3. 두 `매개변수`의 타입이 달라도 타입 에러가 발생하지 않음
   - 함수의 타입을 구체적으로 정의하지 않았기 때문에 발생하는 오류이다.

> 함수 `오버로드`를 사용하면 조건을 만족함는 함수 타입 작성 가능

##### 함수 오버로드를 사용한 코드

```ts
function add(x: number, y: number): number;
function add(x: string, y: string): string; // -1-
// -2-
function add(x: number | string, y: number | string): number | string {
  // ...
}
const v1: number = add(1, 2); // -3-
console.log(add(1, '2')); // type error 4
```

1. `매개변수`와 `반환 타입`의 모든 가능한 조합을 정의
2. 실제 구현하는 쪽에서 정의한 `타입`은 함수 `오버로드의 타입 목록`에서 제외
3. 두 매개변수의 `타입`이 숫자이면 `반환타입`도 숫자 `타입 에러`
   - 두 매개변수의 타입이 다르면 타입 에러 발생

#### 명명된 매개변수

```ts
function getInfoText({
  // -1-
  name,
  age = 15,
  language,
}: // -1-
{
  // -2-
  name: string;
  age?: number;
  language?: string;
  // -2-
}): string {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age: ${ageText}, language: ${language}`;
}
```

1. 모든 `매개변수`의 이름을 정의

- `매개변수`의 기본값이 있다면 같이 정의 하도록 함

2. 앞에 나열된 모든 매개변수에 대한 타입을 정의
   - `명명된 매개변수` 타입을 재사용 하려면 `interface`를 사용하면 된다.

#### 인터페이스로 명명된 매개변수의 타입 정의

```ts
// -1-
interface Param {
  name: string;
  age?: number;
  language?: string;
}
// -2-
function getInfoText2({ name, age = 15, language }: Param) {
  // ...
}
```

1. `명명된 매개변수` 타입을 `interface`로 정의
2. `Param` `interface`를 사용

## 인터페이스

- `Java` 에서의 `interface` -> `class` 구현가기 전 `메서드` 정의
- `Typescript` 에서의 `interface` -> 좀 더 다양한 것을 정의

### 인터페이스로 객체 타입 정의

- 인터페이스로 타입을 정의 할 때 -> `interface` 키워드를 사용

#### 인터페이스의 간단한 예

```ts
// -1-
interface Person {
  //-2-
  name: string;
  age: number;
  // -2-
}
const p1: Person = { name: 'mike', age: 23 };
const p2: Person = { name: 'mike', age: 'ten' }; // -3-
```

1. Person `interface`를 정의
2. 객체 내부에 존재하는 각 속성의 타입을 정의
3. age 속성 타입을 만족하지 못해 -> error
   - 하나 이상의 속성 타입을 만족하지 못하면 타입 에러가 발생하게 된다.

### 선택 속성

- 선택속성 : 객체에서 없어도 되는 속성을 말함
- `interface`에서의 선택 속성은 `?`를 사용

```ts
interface Person2 {
  name: string;
  age?: number;
}
const p2: Person2 = { name: 'mike' };
```

#### undefined가 유니온 타입에 포함된 경우

```ts
interface Person3 {
  name: string;
  age: number | undefined;
}
const p3: Person3 = { name: 'mike' }; // type error -1-
const p4: Person3 = { name: 'mike', age: undefined };
```

1. `선택 속성`과 달리 명시적으로 age 속성을 입력하지 않으면 타입 에러 발생

### 읽기 전용 속성

- 객체에서 `읽기 전용 속성` -> 값이 변하지 않는 속성
- `interface` 에서의 읽기 전용 속성은 `readonly` 키워드를 사용

```ts
interface ReadOnly {
  readonly name: string;
  age?: number;
}
const p5: ReadOnly = {
  name: 'mike', // -1-
};
p5.name = 'jone'; // -2-
```

1. 변수를 정의하는 시점에서는 값을 할당할 수 있음
2. 읽기 전용 속성의 값을 수정하려고 하면 컴파일 에러 발생

### 정의되지 않은 속성값에 대한 처리

- 보통은 `객체`가 `interface`에 정의되지 않은 속성값을 가지고 있어도 할당이 가능
- `리터럴`로 값을 초기화 하는 경우 -> `interface`에 정의되지 않은 속성값이 있으면 타입 에러 발생

```ts
interface Non {
  readonly name: string;
  age?: number;
}
const a1: Non = {
  name: 'mike',
  birthday: '1997', // type error -1-
};
const a2 = {
  name: 'mike',
  birthday: '1997', // -2-
};
const a3: Non = a2; // -3-
```

- [코드로 이동](../TypeScript/Practice/interface/정의되지않은속성값.ts)

1. `Person` 인터페이스에 정의되지 않은 속성을 `리터럴`로 입력하므로 타입 에러 발생
2. a2 객체에 Non 인터페이스에 정의되지 않은 속성 존재
3. a2가 Person에 정의되지 않은 속성을 포함하지만 `타입 에러 발생 하지 않음`
   - 이는 a3 타입이 a2 타입을 포함하는 더 큰 타입
   - `타입 호환성`

> 리터럴에서 에러 발생 -> 개발자 실수를 줄이기 위한 편의 기능

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

### 인터페이스로 정의하는 인덱스 타입

- 인터페이스에서 속성 이름을 구체적으로 정의하지 않고 값의 타입만 정의
  - `인덱스(index)` 타입이라고 지칭

```ts
interface Index {
  readonly name: string;
  age: number;
  [key: string]: string | number; // -1-
}
const p33: Index = {
  name: 'mike',
  birthday: '1997', //-2-
  age: '25', // type error // -3-
};
```

- [코드로 이동](Practice/interface/인덱스타입.ts)

1. 문자열로 된 `모든 속성 이름`에 대해 값이 문자열 또는 숫자라고 정의
2. birthday 속성을 입력해도 컴파일 에러가 발생하지 않음
3. age는 명시적으로 숫자로 정의 -> 문자열 입력 시 에러

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 여러개의 인덱스를 정의하는 경우

- 자바스립트에서 속성 이름에 숫자와 문자열 사용 가능
- 속성 이름에 숫자를 사용하면 문자열로 변환된 후 사용
- 타입스크립트에서는 숫자인 숫자인 속성 이름의 값 -> 문자열 속성 이름의 값으로 할당 가능한지 검사 후 사용

```ts
interface YearPriceMap {
  [year: number]: A; // -1-
  [year: string]: B; // -2-
}
```

1. 속성 이름이 숫자인 1번 코드의 A 타입은 2 번 코드의 B 타입에 할당 가능해야 함

> 인덱스 속성 이름을 숫자로 지정하고 싶다면 문자열 속성에 포함을 시켜야 함

### 그 밖 인터페이스로 할 수 있는 것

- 인터페이스로 함수 타입 정의하기

```ts
// -1-
interface GetInfoText {
  (name: string, age: number): string;
}
// -1-
const InfoText: GetInfoText = function (name, age) {
  const nameText = name.substr(0, 10);
  const ageText = age >= 35 ? 'senior' : 'junior';
  return `name: ${nameText}, age${ageText}`;
};
```

- [코드로 이동](../TypeScript/Practice/interface/함수타입정의.ts)

1. `interface`로 함수를 정의할 때는 속성 이름 없이 정의
   - 자바스크립에서는 함수도 속성값을 가질 수 있음

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 함수 타입에 속성값 추가하기

```ts
interface GetInfoText3 {
  (name: string, age: number): string;
  totalCall: number; // -1-
}
const getInfoText3: GetInfoText3 = function (name, age) {
  // -2-
  getInfoText3.totalCall += 1;
  console.log(`totalCall: ${getInfoText3.totalCall}`);
  // ...
};

getInfoText3.totalCall = 0;
// -2-
```

[파일로 이동](Practice/interface/함수타입_속성값추가.ts)

1. 숫자 타입의 속성값 정의
2. 타입스크립트는 totalCall 속성값이 숫자라는 것을 알고 있음

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 인터페이스로 클래스 구현하기

```ts
// -1-
interface Person {
  name: string;
  age: number;
  isYoungerThan(age: number): boolean;
}
// -1-

class SomePerson implements Person {
  //-2-
  name: string;
  age: number;
  // -3-
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  // -3-
  isYoungerThan(age: number) {
    return this.age < age;
  }
}
```

- [코드로 이동](Practice/interface/클래스구현.ts)

1. 세 개의 속성을 가진 `인터페이스`를 정의
2. `implements` 키워드를 사용해 interface 키워드 사용 -> `클래스` 구현 가능
   - `interface`에서 정의한 새 속성을 클래스 내부에서 구현
   - `하나의 속성`이라도 구현하지 않으면 컴파일 에러 발생
3. name, age 속성값은 `필숫값` -> 생성자에서 값 할당 안하면 `컴파일 에러`

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

> 리액트 에서의 `객체 지향 프로그래밍`

    타입스크립트에서 `클래스의 타입`을 정의하기 위해서는 알아야 할 내용 up
    그러나 `React` 에서는 객체지향 프로그래밍을 할 일이 많지 않음
    `클래스형 컴포넌트` -> `React Hook` 나오면서 의존도 down

##### 인터페이스 확장하기

- 인터페이스 확장해서 새로운 인터페이스 생성 가능

```ts
interface PersonExtend {
  name: string;
  age: number;
}
interface Korean extends PersonExtend {
  // -1-
  isLiveInSeoul: boolean;
}

/// -2-
// interface Korean {
//   name: string;
//   age: number;
//   isLiveInSeoul: boolean;
// }
/// -2-
```

1. PersonExtend 인터페이스를 `확장`해서 Korean 인터페이스 생성
2. 확장해서 만든 인터페이스는 추가된 내용이 주석같이 `밑에 추가`가 된다.

> 여러개의 인터페이스를 `확장` 시킬 수도 있다.

    `,`  연산자를 사용해서 확장 한다.

```ts
interface PersonExtend {
  name: string;
  age: number;
}

interface Programmer {
  Lang: string;
}

interface Korean extends PersonExtend, Programmer {
  isLiveInSeoul: boolean;
}
```

- [코드로 이동](Practice/interface/인터페이스확장.ts)
- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 인터페이스 합치기

- 교차 타입을 이용하면 여러 인터페이스를 하나로 함칠 수 있음
- 교차 타입은 집합에서의 교집합과 같은 기능

```ts
interface Person22 {
  name: string;
  age: number;
}
interface Product {
  name: string;
  price: number;
}
// -1-
type PP = Person22 & Product;
const pp: PP = {
  name: 'a',
  age: 23,
  price: 1000,
};
// -1-
```

1. type PP는 합쳐진 두 인터페이스의 모든 속성값을 포함
   - 교차 타입이 집합에서의 교집합과 같은 기능을 한다고 했지만
   - PP 타입이 name 속성만 포함하는게 아니라 헷갈릴 수 있음
   - 이는 속성의 교집합이 아닌 -> 타입이 가질 수 있는 값의 집합에 대한 교집합

- [코드로 이동](Practice/interface/교차타입_합치기.ts)
- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

## 타입 호환성

- `타입 호환성`은 어떤 타입을 다른 타입으로 취급해도 되는지 판단하는 것
- 정적 타입 언어의 가장 중요한 역할은 타입 호환성을 통해 `컴파일 타임에 호환되지 않는 타입`을 찾아내는 것
- 어떤 변수가 다른 변수에 할당 가능하기 위해서는 `해당 변수의 타입`이 `다른 쪽 변수의 타입`에 할당이 가능해야 함
- 할당 가능은 다음과 같이 `서브타입(subtype)`으로 표현 되기도 도 함

  - 타입 A가 B에 할당가능 -> 타입 A는 타입 B의 `서브타입` 이다.

- 할당 가능을 판단할 때는 타입이 가질 수 있는 값의 집합을 생각하면 이해가 쉬움
- A 타입의 집합이 B 타입의 값의 집합에 포함되면 A 타입은 B 타입에 할당 가능

- `숫자`, `문자열`, `인터페이스`, `함수`의 경우 어떤 조건을 만족해야 할당 가능한지 학습
- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

### 숫자와 문자열의 타입 호환성

- 숫자와 문자열 타입은 서로 포함 관계에 있지 않기 때문에 서로 할당 가능하지 않음
- 반면 숫자의 집합은 `number | string` 값의 집합에 포함되기 때문에
  - 숫자는 `number | string` 타입에 할당이 가능

```ts
function func1(a: number, b: number | string) {
  const v1: number | string = a; // -1-
  const v2: number = b; // type error // -2-
}
function func2(a: 1 | 2) {
  const v1: 1 | 3 = a; // type  error // -3-
  const v2: 1 | 2 | 3 = a; // -4-
}
```

- [코드로 이동](./Practice/type%20호환성/숫자와문자열.ts)

1. `number`는 `number | string` 타입에 `할당 가능`
2. `number | string` 타입은 숫자에 할당 가능하지 않음
3. `1 | 2` 타입은 `1 | 3` 타입에 할당 가능하지 않기 때문에 타입 에러
4. `1 | 2` 타입은 `1 | 2 | 3` 타입에 `할당 가능`

> 정리

     `number` -> `number | string` === true
     `number | string` -> `number` === false

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

### 인터페이스의 타입 호환성

- 타입스크립트는 값 자체의 타입보다는 `값이 가진 내부 구조`에 기반해서 `타입 호환성`을 검사
- 이를 `덕 타이핑(duck typing)` or `구조적 타이핑(structural typing)`

- 타입 스크립트 : `구조적 타이핑 도입 이유`

  - `동적 타입 언어`인 `자바스크립트`를 기반으로 하기 때문

- interface A 가 interface B로 할당 가능하려면 다음 조건 만족해야 함
  1. B에 있는 모든 필수 속성의 이름이 A에도 존재해야 함
  2. 같은 속성 이름에 대해 A의 속성이 B의 속성에 할당 가능해야 함

```ts
// -1-
interface PersonInterface {
  name: string;
  age: number;
}
interface ProductInterface {
  name: string;
  age: number;
}
// -1-
const person: PersonInterface = { name: 'mike', age: 23 };
const product: ProductInterface = person; // -2-
```

- [코드로 이동](./Practice/interface/인터페이스확장.ts)

1. Person과 Product는 이름이 다르지만 모든 속성 이름과 타입이 같음
2. 타입 이름은 다르지만 내부 구조가 같기 때문에 Person과 Product는 서로 할당이 가능

- 많은 수의 정적 타입 언어에서는 위 같은 `할당이 불가능함`

  - 그러나 `타입스크립트`의 경우 `구조적 타이핑`을 사용하기 때문에 가능

- 속성이 많을수록 타입에 더 많은 제약을 가하는 것이고
  - 해당 타입의 값의 집합이 작아짐을 뜻함
- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

### 선택 속성이 타입 호환성에 미치는 영향

- Person의 age가 `선택 속성`이라면 Person은 Product에 할당 가능하지 않음

```ts
interface PersonInterface {
  name: string;
  age?: number; // -1-
}
interface ProductInterface {
  name: string;
  age: number;
}
// -1-
const person1: PersonInterface = { name: 'mike', age: 23 };
const product1: ProductInterface = person; // type error // -2-
```

- [코드로 이동](./Practice/type%20호환성/선택속성in호환성.ts)

1. age가 `선택 속성`이면 Person 값의 집합은 Product 값의 집합보다 커지게 됨
2. Person은 Product에 할당가능 하지 않음
   - 반대로 Product의 age가 `선택 속성`이면 Product 값의 집합이 Person 값의 집합 보다 더 커짐
   - `반대의 경우는 할당이 가능함`

```ts
interface PersonInterface2 {
  name: string;
  age: number;
}
interface ProductInterface2 {
  name: string;
  age?: number;
}
// -1-
const person2: PersonInterface2 = { name: 'mike', age: 23 };
const product2: ProductInterface2 = person;
```

> 정리

     `선택 속성`이 포함된 경우라면 집합이 더 커지게됨

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

### 추가 속성과 유니온 타입이 타입 호환성에 미치는 영향

- `추가 속성`과 `유니온 타입`은 타입 호환성에 영향을 미침
- `추가 속성`이 있으면 값의 집합이 더 작아짐

- `유니온 타입`이 있으면 값의 집합은 더 커지게 됨 (`유니온 타입 === |`)

```ts
interface Person {
  name: string;
  age: number;
  gender: string; // -1-
}
interface Product {
  name: string;
  age: number | string; // -2-
}
```

- [코드로 이동](./Practice/type%20호환성/유니온type.ts)

1. `추가 속성`이 있으면 값의 집합은 더 작아지게 됨
   - Person을 Product에 할당하는 데 문제가 되지 않음
2. 속성 타입의 `범위가 넓어`지면 값의 `집합은 더 커짐`
   - Person 이 Product 에 할당이 가능하다는 사실에는 변함이 없음

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

### 함수의 타입 호환성

- 함수는 `호출하는 시점`에 문제가 없어야 할당 가능

- 함수 타입 A가 함수 타입 B로 할당 가능하기 위한 조건

1. A의 매개변수 개수가 B의 매개변수 `개수보다 적어`야 함
2. `같은 위치`의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당 가능해야 함
3. A의 `반환값`은 B의 `반환값`으로 할당 가능해야 함

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 예제

```ts
type F1 = (a: number, b: string) => number;
type F2 = (a: number) => number;
type F3 = (a: number) => number | string;
let f1: F1 = (a, b) => 1;
let f2: F2 = (a) => 1;
let f3: F3 = (a) => 1;
f1 = f2;
f2 = f1; // type error // -1-
f2 = f3; // type error // -2-
```

1. F2보다 F1의 `매개변수 개수`가 많으므로 F1 -> F2는 불가
2. F3의 `반환 타입`은 F1의 `반환 타입`으로 할당 가능하지 않으므로 F3 -> F2 불가

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 배열의 map 매서드를 통해 살펴보는 함수의 타입 호환성

```ts
function addOne(value: number) {
  return value + 1;
}
const result = [1, 2, 3].map<number>(addOne); // -1-
// (value: number, index: number, array: number[]) => number; // -2-
```

1. addOne 함수는 map `메서드`의 `매개변수로 할당` 가능

   - map `메서드`의 `제네릭`으로 입력한 number는 매개변수 함수의 `반환 타입`을 의미
   - `제네릭`은 뒷 부분에 설명

2. 주석은 1번 코드의 map `메서드`가 `입력 받는` 함수의 타입을 의미

   - addOne 함수는 이 타입에 할당 가능

- `map 메서드`

  1. map 메서드는 3 개의 `매개변수`를 넘겨줌 -> 4개의 매개변수를 사용하는 함수가 할당되면 문제
     - 네번째 `매개변수`가 전달되지 않음
  2. 만약 addOne 함수의 매개변수 `타입`이 `1 | 2 | 3` 이라면 문제가 됨

     - map 메서드는 `다른 숫자도 전달`할 수 있기 때문

  3. 만약 addOne 함수의 반환 타입이 `number | string` 이라면 문제가 됨

     - 1번 코드의 map 메서드는 `숫자 배열`을 반환해야 함
     - `제네릭이 number`이기 때문

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

## 타입스크립트 고급 기능

- 각종 패키지의 정의 파일을 들여다 보면 우리가 알지 못하는 고급 기능이 많이 사용
- 타입스크립트에서 타입을 정의하는데 많이 사용되는 타입들 학습
  1. `제네릭`
  2. `맵드 타입`
  3. `조건부 타입`

### 제네릭

- `제네릭(generic)`은 타입 정보가 `동적으로 결정`되는 타입
- `제네릭`을 통해 같은 규칙을 여러 타입에 적용할 수 있기 때문에 타입 코드 작성 시

  - 발생되는 `중복 코드 제거 가능`

- 배열의 크기와 초깃값을 입력받아서 배열을 생성하는 함수를 작성한다고 생각

```ts
// -1-
function makeNumArr(defaultValue: number, size: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
// -2-
function makeStringArr(defaultValue: string, size: number): string[] {
  const arr: string[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}

const arr1 = makeNumArr(1, 10);
const arr2 = makeStringArr('empty', 10);
```

- [코드로 이동](./Practice/advanced_feature/Generic/simple.ts)

1. 숫자 배열을 생성하는 함수
2. 문자열 배열을 생허나는 함수
   - `중복된 코드`가 상당히 많이 보임

- [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 함수 오버로드로 개선한 코드

- 숫자와 문자열만 필요하다면 `함수 오버로드`를 사용하면 됨

```ts
// -1-
function makeArr(defaultValue: number, size: number): number[];
function makeArr(defaultValue: string, size: number): string[];
// -1-
// @ts-ignore
function makeArr(defaultValue, size) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
```

- [코드로 이동](./Practice/advanced_feature/Generic/simple_refactor_overload.ts)

1. 숫자와 문자열 배열을 만들 수 있도록 함수 타입을 정의
   - 문제가 존재
     1. 타입을 추가할 때 마다 `코드 추가`
     2. 타입 종류 많아지만 `가독성이 떨어짐`

#### 제네릭으로 문제 해결하기

```ts
// -1-
function makeArray<T>(defaultValue: T, size: number): T[] {
  const arr: T[] = []; // -2-
  for (let i = 0; i < size; i++) {
    arr.push(defaultValue);
  }
  return arr;
}
// -3-
const arr11 = makeArray<number>(1, 10);
const arr22 = makeArray<string>('empty', 10);
// -3-
// -4-
const arr33 = makeArray(1, 10);
const arr44 = makeArray('empty', 10);
// -4-
```

- [코드로 이동](./Practice/advanced_feature/Generic/simple_refactor_with_generic.ts)

1. `타입 T`는 함수를 `사용하는 시점`에 입력되기 때문에 어떤 타입인지 `결정되지 않음`
2. `함수 내부`에서도 `타입 T의 정보`를 이용
3. 함수를 `호출`할 때 `타입 T`가 결정
   - `타입 T`의 정보는 마찬가지로 `<> 기호`를 사용해서 전달
4. makeArray 함수의 `첫 번째 매개변수`를 알면 타입 T도 알 수 있기 때문에 호출 시 타입 T의 정보를 명시적으로 `전달하지 않아도 됨`

#### 제네릭으로 스택 구현하기

- 제네릭은 데이터의 타입에 다양성을 부여해 주기 때문에 자료구조에서 많이 사용
- 제네릭을 이용해서 스택(stack) 클래스를 구현

```ts
class Stack<D> {
  private items: D[] = []; // -1-
  // -2-
  push(item: D) {
    this.items.push(item);
  }
  // -3-
  pop() {
    this.items.pop();
  }
}
// -4-
const numberStack = new Stack<number>();
numberStack.push(10);
const vStack = numberStack.pop();
// -4-
// -5-
const stringStack = new Stack<string>();
stringStack.push('a');
const vStringStack = stringStack.pop();
// -5-
let myStack: Stack<number>;
myStack = numberStack;
myStack = stringStack; // type error // -5-
```

- [코드로 이동](./Practice/advanced_feature/Generic/extends.ts)

1. `타입 D`를 아이템으로 하는 배열을 정의
2. `push` 메서드는 타입이 `D`인 아이템을 입력으로 받음
3. `pop` 메서드의 `반환 타입`은 `D`이다.
4. 숫자를 저장하는 스택을 생성해서 사용
5. 문자열을 저장하는 스택을 생성해서 사용
6. 숫자 스택에 문자열 스택 할당 불가

#### extends 키워드로 제네릭 타입 제한하기

- 지금까지 제네릭 타입에 아무 타입이나 입력 가능
- But 리액트와 같은 라이브러리의 API는 입력 가능한 값의 범위를 제한

  - 리액트의 속성값 전체는 객체 타입만 허용

- 타입스크립트의 제네릭은 타입의 종류를 제한할 수 있는 기능 제공
  - extends 키워드를 이용하면 제네릭 타입으로 입력할 수 있는 타입의 종류를 제한 가능

```ts
function identify<T extends number | string>(p1: T): T {
  return p1;
}
identify(1);
identify('a');
identify([]); // type error
```

- [코드로 이동](./Practice/advanced_feature/Generic/extends.ts)

1. 제네릭 T의 타입을 number | string에 할당 가능한 타입으로 제한
2. 타입 T는 숫자 또는 문자열 타입만 가능
3. 배열은 number | string 타입에 할당 가능하지 않기 때문에 타입 에러가 발생

##### extends 키워드를 이용한 제네릭 타입의 활용 예

```ts
// -1-
interface PersonExtends {
  name: string;
  age: number;
}
interface Korean2 extends PersonExtends {
  liveInSeoul: boolean;
}
// -1-
// -2-
function swapProperty<T extends PersonExtends, K extends keyof PersonExtends>(
  // -2-
  p1: T,
  p2: T,
  name: K
): void {
  const temp = p1[name];
  p1[name] = p2[name];
  p2[name] = temp;
}

const pE: Korean2 = {
  name: '홍길동',
  age: 23,
  liveInSeoul: true,
};

const p222: Korean2 = {
  name: '김삿갓',
  age: 31,
  liveInSeoul: false,
};
swapProperty(pE, p222, 'age'); // -3-
```

- [코드로 이동](./Practice/advanced_feature/Generic/extends_advanced.ts)

1. Korean2 인터페이스는 PersonExtends을 `확장해서 만들었음`
   - -> Korean2 타입은 PersonExtends 타입에 `할당 가능`
2. `제네릭 T`는 PersonExtends에 `할당 가능한` 타입이어야 함
   - `제네릭 K`는 `속성 이름`이어야 함
   - `keyof` 키워드는 `인터페이스`의 `모든 속성 이름을 유니온 타입으로 만들어줌`
3. pE, p222는 PersonExtends에 할당 가능하기 때문에 타입 에러가 발생하지 않음

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### extends 에러 발생

```ts
interface product {
  name: string;
  price: number;
}

const p11: product = {
  name: '시계',
  price: 10000,
};
const p22: product = {
  name: '자전거',
  price: 20000,
};
swapProperty(p11, p22, 'name'); // type error
```

- [코드로 이동](./Practice/advanced_feature/Generic/error_extends.ts)

### 맵드 타입

- `맵드(mapped)` 타입을 이용하면 `몇 가지 규칙으로 새로운 인터페이스`를 만들 수 있음
- 맵드 타입은 다음과 같이 기존 인터페이스의 `모든 속성들을`
  - -> `선택 속성`
  - -> `읽기 전용` 으로 만들어줌

```ts
// -1-
interface MPerson {
  name: string;
  age: number;
}
// -1-
// -2-
interface PersonOptional {
  name?: string;
  age?: number;
}
interface PersonReadOnly {
  readonly name: string;
  readonly age: number;
}
// -2-
```

- [코드로 이동](./Practice/advanced_feature/mapped_맵드/simple_mapped.ts)

1. `맵드 타입`의 입력으로 사용될 인터페이스
2. MPerson 맵드 타입을 적용해서 만들 수 있는 `인터페이스 예`

- 맵드 타입은 `in 키워드`를 `사용해서 정의`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 두 개의 속성을 불 타입으로 만드는 맵드 타입

```ts
type T1 = { [K in 'prop1' | 'prop2']: boolean }; // -1-
// {prop1: boolean; prop2: boolean;} // -2-
```

- [코드로 이동](./Practice/advanced_feature/mapped_맵드/bool.ts)

1. `in 키워드` `오른쪽`에는 `문자열의 유니온 타입`이 올 수 있음
2. 맵드 타입으로 만들어진 `T1 타입`의 모습

#### 인터페이스의 모든 속성을 불 타입 및 선택 속성으로 만들어 주는 맵드 타입

```ts
type MakeBool<T> = { [P in keyof T]?: boolean };
const pMap: MakeBool<MPerson> = {};
pMap.name = true;
pMap.age = false;
```

- [코드로 이동](./Practice/advanced_feature/mapped_맵드/all_mapped.ts)

#### Partial과 Readonly 내장 타입

- 타입스크립트 `내장 타입`인 `Partial`과 `Readonly`는 맵드 타입으로 만들어져 있음
- 아래에 두 내장 타입을 구현하는 코드 작성

```ts
type T11 = MPerson['name']; // string // -1-
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // -2-
type Partial2<T> = { [P in keyof T]?: T[P] }; // -3-
type T2 = Partial2<MPerson>;
type T3 = ReadOnly<MPerson>;
```

- [코드로 이동](./Practice/advanced_feature/mapped_맵드/Partial_Readonly.ts)

1. `인터페이스`에서 `특정 속성의 타입을 추출`할 때 사용되는 문법
   - `맵드 타입`에서 많이 쓰임
2. 인터페이스의 모든 속성을 `읽기 전용`으로 만들어주는 `맵드 타입`
   - `keyof T`에 의해 인터페이스 T의 `모든 속성 이름`이 `유니온 타입`으로 만들어짐
   - `T[P]`는 인터페이스 T에 있는 `속성 P의 타입을 그대로 사용`하겠다는 의미
3. 인터페이스의 `모든 속성`을 `선택 속성`으로 만들어주는 `맵드 타입`

> `Partial`, `ReadOnly`

    `Partial` : 모든 속성을 `선택 속성`
    `Readonly` : 모든 속성을 `유니온 타입`
    `T[P]` : T에 있는 속성 P를 그대로 사용

> 다시 정리하는 `유니온`과 `선택 속성`

    1.  유티온 타입 -> `|` -> `중에 하나`
    1.  선택 속성 -> ? `?` -> `있어도 되고 없어도 되고`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### Pick 내장 타입

- 타입스크립트 내장 타입인 `Pick`은 인터페이스에서 `원하는 속성만 추출`할 때 사용됨
- 맵드 타입으로 Pick을 구현한 코드

```ts
type Pick2<T, K extends keyof T> = { [P in K]: T[P] }; //-1-
interface PickPerson {
  name: string;
  age: number;
  lan: string;
}
type TPick = Pick2<PickPerson, 'name' | 'lan'>;
// type TPick = {name: string, lang: string;} // -2-
```

- [코드로 이동](./Practice/advanced_feature/mapped_맵드/Pick.ts)

1. `Pick`은 `인터페이스 T`와 `해당 인터페이스의 속성 이름 K`를 입력으로 받는다.
2. PickPerson에서 name,lan을 `추출한 결과`
   [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### Record 내장 타입

- 타입스크립트 내장 타입인 `Record`는 입력된 `모든 속성을 같은 타입`으로 만들어주는 내장 맵드 타입

```ts
interface PickPerson {
  name: string;
  age: number;
  lan: string;
}

type Record2<K extends string, T> = { [P in K]: T }; // -1-
type TRecord = Record2<'p1' | 'p2', PickPerson>;
// type type T1 = { p1: Person; p2: Person'}
```

- [코드로 이동](./Practice/advanced_feature/mapped_맵드/Record.ts)

1. K는 문자열의 서브타입
   - K로 입력된 모든 문자열을 속성 이름으로 하면서
   - T를 각 속성 타입으로 만든다.

> 모든 속성을 같은 타입으로 만든다.

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 열거형 타입과 맵드 타입

- 맵드 타입을 이용하면 열거형 타입의 활용도를 높일 수 있음
- 열거형 타입의 모든 원소를 속성 이름으로 가지는 객체가 있다고 가정

```ts
enum Fruit {
  Apple,
  Banana,
  Orange,
}
// -1-
const FRUIT_PRICE = {
  [Fruit.Apple]: 1000,
  [Fruit.Banana]: 1500,
  [Fruit.Orange]: 2000,
};
// -1-
```

- [코드로 이동](./Practice/advanced_feature/mapped_맵드/enum.ts)

1. 과일 가격 정보를 가지고 있는 객체
   - Fruit 열거형 타입에 새로운 파일을 추가한다면 FRUIT_PRICE에도 새로운 가격을 추가하는게 일반적
   - 그러나 Fruit 열거형 타입에 과일을 추가하고 -> 가격 정보 깜빡해도 에러 X
   - 그래서 맵드 타입 이용 -> 모든 원소를 속성으로 가지게 설정 가능

##### 맵드 타입을 이용한 FRUIT_PRICE 타입 정의

```ts
enum Fruit {
  Apple,
  Banana,
  Orange,
}
const FRUIT_PRICE = {
  [Fruit.Apple]: 1000,
  [Fruit.Banana]: 1500,
  //   [Fruit.Orange]: 2000,
};

const FRUIT_PRICE2: { [key in Fruit]: number } = {
  [Fruit.Apple]: 1000,
  [Fruit.Banana]: 1500,
  [Fruit.Orange]: 2000,
};
```

#### 총정리

- `맵드(mapped)` 타입을 이용하면 `몇 가지 규칙으로 새로운 인터페이스`를 만들 수 있음
- 맵드 타입은 다음과 같이 기존 인터페이스의 `모든 속성들을`
  - -> `선택 속성`
  - -> `읽기 전용` 으로 만들어줌

> `Partial`, `ReadOnly`

    `Partial` : 모든 속성을 `선택 속성`
    `Readonly` : 모든 속성을 `유니온 타입`
    `T[P]` : T에 있는 속성 P를 그대로 사용

> 다시 정리하는 `유니온`과 `선택 속성`

    1.  유티온 타입 -> `|` -> `중에 하나`
    1.  선택 속성 -> ? `?` -> `있어도 되고 없어도 되고`

- 타입스크립트 내장 타입인 `Pick`은 인터페이스에서 `원하는 속성만 추출`할 때 사용됨

- 타입스크립트 내장 타입인 `Record`는 입력된 `모든 속성을 같은 타입`으로 만들어주는 내장 맵드 타입

- 맵드 타입을 이용하면 열거형 타입의 활용도를 높일 수 있음
  - 필수 속성으로 가지게 가능
  - 안하면 오류 안생김

### 조건부 타입

- `조건부(conditional)` 타입은 입력된 `제네릭` 타입에 따라 타입을 결정할 수 있는 기능
- 조건부 타입은 extends 키워드와 ? 기호를 사용해서 정의

- 입력된 제네릭 타입이 문자열인지 여부에 따라 타입을 결정하는 조건부 타입 코드

#### 기본적인 조건부 타입의 예

```ts
// T extends U ? X : Y // -1-
type IsString<T> = T extends string ? 'yes' : 'no'; // -2-
type Ts = IsString<string>; // 'yes'
type Tn = IsString<number>; // 'no'
```

- [코드로 이동](./Practice/advanced_feature/조건부타입/simple.ts)

1. `조건부 타입`의 기본 구조
   - 입력된 제네릭 타입 T가 타입 U의 `서브 타입`이면 타입 `X 사용 or Y 사용`
2. IsStringType은 문자열의 `서브타입`이 입력되면 yes를 사용
   - 그렇지 않으면 no를 사용하는 `조건부 타입`

- `조건부 타입`에서 `유니온 타입`을 이용하면 유용한 `유틸리티 타입`을 많이 만들 수 있음
- `조건부 타입`에서 `유니온 타입`이 어떻게 처리되는지 학습

##### IsStringType에 유니온 타입 입력 결과

```ts
type TUnion = IsString<string | number>; // -1-
type TType = IsString<string> | IsString<number>; // -2-
```

- [코드로 이동](./Practice/advanced_feature/조건부타입/simple.ts)

1. `조건부 타입`에 `유니온 타입`이 `입력`되면 `각 타입을 하나씩 검사`해서 `타입을 결정`하고
   - `최종 결과`는 `유니온 타입`으로 만들어짐
2. T1과 T2는 `결과적으로 같은 타입`

#### Exclude, Extract 내장 타입

- 타입스크립트에 내장된 `Exclude`, `Extract` 타입은 조건부 타입으로 만들 수 있음

```ts
type Te = number | string | never; // string | number // -1-
type Exclude2<T, U> = T extends U ? never : T; // -2-
type Ttwo = Exclude2<1 | 3 | 5 | 7, 1 | 5 | 9>; // 3 | 7 // -3-
type TThree = Exclude2<string | number | (() => void), Function>; // string | number // -4-
type Extract3<T, U> = T extends U ? T : never; // -5-
type TFour = Extract3<1 | 3 | 5 | 7, 1 | 5 | 9>; // 1 | 5 // -6-
```

- [코드로 이동](./Practice/advanced_feature/조건부타입/Exclude_Extract.ts)

1. `유니온 타입`에 있는 `never` 타입 제거 -> `조건부 타입`에서 `자주` 사용되는 기능
2. `Exclude` 타입은 U의 `서브 타입을 제거`해주는 `유틸리티 타입`
3. `3, 7`은 `1 | 5 | 9` 타입의 서브타입이 아니므로 T2 타입은 `3 | 7`이 됨
4. `T3은 함수가 제거`된 `string | number` 타입
5. `Extract`는 `Exclude와 반대`로 동작하는 `유틸리티 타입`
6. `1, 5`는 `1 | 5 | 9` 에 포함되기 때문에 T4는 `1 | 5`가 됨

#### ReturnType 내장 타입

- 조건부 타입으로 만들어진 ReturnType 내장 타입은 함수의 반환 타입을 추출함

```ts
type ReturnType2<T> = T extends (...args: any[]) => infer R ? R : any; // -1-
type Tone = ReturnType2<() => string>; // string
function f1(s: string): number {
  return s.length;
}

type Tt2 = ReturnType2<typeof f1>; // number
```

- [코드로 이동](./Practice/advanced_feature/조건부타입/ReturnType.ts)

1. 입력된 타입 T가 함수이면 함수의 반환 타입이 사용
   - 그렇지 않으면 any 타입이 사요됨

- 타입 추론을 위해서 `infer` 키워드를 사용
  - `infer` 키워드로 `함수의 반환 타입`을 `R` 이라는 `변수`에 담을 수 있음
  - `infer` 키워드는 `조건부 타입`을 정의할 때 `extends 키워드 뒤`에 사용
  - `infer` 키워드는 `중첩해서 사용 가능`

```ts
type Unpacked<T> = T extends (infer U)[] // -1-
  ? U
  : T extends (...args: any[]) => infer U // -2-
  ? U
  : T extends Promise<infer U>
  ? U
  : T; // -3-

type Tz = Unpacked<string>; // string // -4-
type To = Unpacked<string[]>; // string
type Tt = Unpacked<() => string>; // string
type Tth = Unpacked<Promise<string>>; // string
type Tf = Unpacked<Promise<string>[]>; // Promise<string> // -5-
type Tfi = Unpacked<Unpacked<Promise<string>[]>>; // string
```

- [코드로 이동](./Practice/advanced_feature/조건부타입/ReturnType.ts)

1. `타입 T`가 `U의 배열`이면 `U`가 사용
2. `함수` -> `반환 타입`이 사용
3. `프로미스` -> 프로미스에 입력된 `제네릭 타입`이 사용
4. `아무것도 만족하지 않기` 때문에 `자기 자신`
5. `Promise<string>`의 배열 -> `Promise<string>`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 조건부 타입으로 직접 만들어 보는 유틸리티 타입 문자열 추출

- 조건부 타입을 사용해서 몇 가지 유틸리티 타입 생성
- 인터페이스에서 문자열 속성만 추출해서 사용하는 두 개의 유틸리티 타입

```ts
// -1-
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends String ? K : never;
}[keyof T]; // -2-
type StringProperties<T> = Pick<T, StringPropertyNames<T>>; // -3-
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1o = StringPropertyNames<Person>; // "name" | "nation"
type T2t = StringProperties<Person>; // {name: string; nation: string;}
```

- [코드로 이동](./Practice/advanced_feature/조건부타입/유틸리티_문자열추출.ts)

1. `타입 T`에서 `값이 문자열`인 `모든 속성`의 `이름`을 `유니온 타입`으로 만들어 주는 `유틸리티 타입`
2. `[keyof T]`는 인터페이스에서 `모든 속성의 타입을 유니온으로 추출`
   - `never 타입은 제거 됨`
3. `StringProperties`는 인터페이스에서 `문자열인 모든 속성을 추출`하는 유틸리티 타입
   [[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 일부 속성만 제거해 주는 유틸리티 타입 Omit

```ts
type Omit2<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>; // -1-
interface Person {
  name: string;
  age: number;
  nation: string;
}
type T1One = Omit2<Person, 'nation' | 'age'>;
const p: T1One = {
  name: 'mike', // -2-
};
```

- [코드로 이동](./Practice/advanced_feature/조건부타입/유틸리티_일부속성제거.ts)

1. 인터페이스 `T` 에서 입력된 속성 이름 `U를 제거`
2. Person에서 nation, age 속성을 제거 했으므로 `T1에는 name 속성만 남음`

> Omit

    `원하는 일부 속성만 제거`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 인터페이스를 덮어쓰는 유틸리티 타입 Overwrite

```ts
type Overwrite<T, U> = { [P in Exclude<keyof T, keyof U>]: T[P] } & U; // -1-
interface Person {
  name: string;
  age: number;
}
type T111 = Overwrite<Person, { age: string; nation: string }>;
const p2: T111 = {
  name: 'mike',
  // -2-
  age: '23',
  nation: 'korea',
  // -2-
};
```

- [코드로 이동](./Practice/advanced_feature/조건부타입/유틸리티_인터페이스덮어쓰기.ts)

1. 인터페이스 `T`에 인터페이스 `U를 덮어씌움`
2. age 속성의 타입은 `문자열로 변경`, nation 속성은 `새로 추가`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

### 생산성을 높이는 타입스크립트의 기능

- `정적 타입 언어`를 사용할 때의 `단점` -> `타입을 정의`하는 것

  - `시간과 노력`이 많이 들기 때문에 `생산성 저하 가능성`

- 타입스크립트에서는 `다양한 경우`에 대해 `타입 추론`을 해주기 때문에

  - `꼭 필요한 경우`에만 `타입을 정의`를 할 수 있음

- 타입스크립트에서 제공하는 `타입 가드(guard)` -> `타입 단언(assertion)` 코드를 최소화

#### 타입 추론

- 명시적으로 타입 코드를 `작성하지 않아도` `타입스크립트가 타입을 추론`할 수 있는 경우가 많음
- 타입 추론 덕분에 `덜 작성`하면서도 `같은 수준의 타입 안정성`을 `유지 가능`

##### let 변수의 타입 추론

```ts
let v1 = 123; // -1-
let v2 = 'abc';
v1 = 'a';
v2 = 456;
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/let.ts)

1. 타입을 명시하지 않았지만 변수 v1의 `타입은 숫자`
2. 위와 마찬가지
3. 잘못된 타입의 값을 입력하면 `타입 에러`가 발생

- 이처럼 타입을 명시하지 않아도 `컴파일 시점`에 `타입 에러`가 발생할 수 있음
- `let 변수`는 재할당 가능하기 때문에 `융통성` 있게 타입이 결정

- 반면 `const 변수`는 값이 변하지 않기 때문에 let 변수보다 `엄격하게` 타입이 결정

##### const 변수의 타입 추론

```ts
const v11 = 123; // -1-
const v22 = 'abc';
let v3: typeof v11 | typeof v22; // -2-
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/const.ts)

1. `const 변수`는 `리터럴 자체가 타입`이 됨
   - 따라서 `변수 v1의 타입`은 숫자가 아닌 `123`
2. `typeof` 키워드는 변수의 `타입을 추출`할 때 사용 가능
   - v3 는 `123 | 'abc'`가 된다.

##### 배열 객체의 타입 추론

```ts
const arr1 = [10, 20, 30]; // -1-
const [n1, n2, n3] = arr1; // -2-
arr1.push('a'); // type error // -3-

const arr2 = { id: 'abcd', age: 123, lan: 'kor' }; // -4-
//const arr2 = {id: string, age: number, lan: string}; // -5-
const { id, age, lan } = arr2; // -6-
console.log(id === age); // type error // -7-
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/arrary.ts)

1. 배열의 타입을 정의하지 않았지만 타입 추론 덕분에
   - -> 변수 arr1의 타입은 number[]가 됨
2. 비구조화 할당의 경우에도 타입 추론이 되며

- -> 세 변수의 타입은 모두 숫자가 됨

3. 숫자 배열에 문자열을 넣으면 타입 에러가 발생
4. 객체의 타입을 정의하지 않았지만 타입 추론 덕분에 변수 arr2의 타입은
   - -> 5번 주석과 같게 됨
5. 마찬가지로 비구조화 할당을 하면 자동으로 타입 정보가 포함

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 여러 가지 타입으로 구성된 배열의 타입 추론

```ts
// -1-
interface Person {
  name: string;
  age: number;
}
interface Korean extends Person {
  liveInSeoul: boolean;
}
interface Jap extends Person {
  liveInTokyo: boolean;
}
// -1-
const p1: Person = { name: 'mike', age: 23 };
const p2: Korean = { name: 'mike', age: 25, liveInSeoul: true };
const p3: Jap = { name: 'mike', age: 27, liveInTokyo: false };
const arr13 = [p1, p2, p3]; // -2-
const arr23 = [p2, p3]; // -3-
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/serveral_type.ts)

1. `Korean, Jap` 인터페이스는 Person을 확장해서 만들엇음
   - 변수 arr13과 arr23의 `타입을 유추`
2. 여러 가지 타입을 `하나로 통합하는 과정`을 거쳐야 함

- 다른 타입으로 할당 가능한 타입은 제거
- 제거 후 남은 모든 타입은 유니온 타입으로 만들어짐
- `Korean, Jap`는 `Person`에 `할당 가능` -> 변수 arr13 타입은 `Person[]`
- `Korean, Jap`는 서로 `할당 불가` -> arr23 타입은 `(Korean | Jap)[]`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 함수의 매개변수와 반환값에 대한 타입 추론

- 함수의 매개변수와 반환값도 타입추론이 적용

```ts
// -1-
function func1(a = 'abc', b = 10) {
  return `${a} ${b}`;
}
// -1-
func1(3, 6); // type error // -2-
const vFunc: number = func1('a', 1); // type error // -3-

// -4-
function func2(value: number) {
  if (value < 10) {
    return value;
  } else {
    return `${value} is too big`;
  }
}
// -4-
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/function.ts)

1. `기본값이 있는 매개변수`는 `자동`으로 타입 정보가 `추가`
   - 함수의 `반환값`도 `타입 추론`에 의해 `자동`으로 타입 정보가 `추가`
2. 첫 번째 매개변수는 `숫자`가 아니기 때문에 `타입 에러` 발생
3. `반환값`은 숫자가 아니기 때문에 `타입에러`가 발생
4. `return 키워드`가 `여러 번` 등장해도 `타입 추론은 잘 작동`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 타입 가드

- 타입 가드(guard)는 조건문을 이용해 타입의 범위를 좁히는 기능
- 타입 가드를 잘 활용하면 타입 단언(assertion) 코드를 피할 수 있으므로 생산성과 가독성 up

```ts
function print(value: number | string) {
  // -1-
  if (typeof value === 'number') {
    console.log((value as number).toFixed(2)); // -2-
  } else {
    console.log((value as string).trim()); // -3-
  }
}
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/typeguard/non_use.ts)

1. `typeof` 키워드를 이용해서 `value가` 숫자인지 검사
2. `타입 가드`가 없다면 `as` 키워드를 사용해서 타입스크립트에게 `value`는 `숫자`라고 알려야함
3. 숫자가 아니라면 당연히 문자열이지만 타입 가드가 없다면 `as` 키워드를 사용해서 `타입 단언`을 해야함

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### typeof 키워드

```ts
function print(value: number | string) {
  if (typeof value === 'number') {
    console.log(value.toFixed(2)); // -1-
  } else {
    console.log(value.trim()); // -2-
  }
}
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/typeguard/typeof.ts)

1. 타입스크립트는 `typeof`를 통해 `value를 숫자`로 인식
   - -> `숫자`에만 존재하는 `toFixed` 메서드를 바로 호출 가능
2. 마찬가지로 타입 스크립트는 `else 블록`에서 `value를 문자열`로 인식

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### instanceof 키워드

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class Product {
  name: string;
  price: number;
  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}
function print(value: Person | Product) {
  console.log(value.name);
  if (value instanceof Person) {
    console.log(value.age); // -1-
  } else {
    console.log(value.price); // -2-
  }
}
const person = new Person('mike', 23);
print(person);
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/typeguard/instanceof.ts)

1. `타입 가드` 덕분에 if 문 안에서 `Person의 age 속성에 접근`할 수 있음
2. 타입스크립트는 `else 블록`에서 value 타입이 Product라고 `인식`

- 인터페이스의 경우에는 `instanceof` `키워드`를 사용할 수 없음
- `instanceof` 오른쪽에는 `생성자 함수`만 올 수 있기 때문

> `instance`는 인터페이스에서 `사용 불가`

     `인터페이스`는 `타입 검사`에만 사용
     컴파일 후에는 `삭제` 되므로 `사용 불가`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 식별 가능한 유니온 타입

- 인터페이스를 구별하기 위한 한 가지 방법

  - -> 식별 가능한 유니온(discriminated) 타입 이용

- 인터페이스에서 식별 가능한 유니온 타입
  - -> 같은 이름의 속성을 정의
  - -> 속성의 타입은 모두 겹치지 않게 정의

```ts
interface Person {
  type: 'person'; // -1-
  name: string;
  age: number;
}
interface Product {
  type: 'product'; // -1-
  name: string;
  price: number;
}
function print(value: Person | Product) {
  // -2-
  if (value.type === 'person') {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/typeguard/식별가능유니온.ts)

1. 두 인터페이스에서 `type`이라는 `같은 이름의 속성`을 정의
   - 각 속성은 고유의 문자열 `리터럴 타입`으로 `정의`했기 때문에
   - `서로 겹치는 부분이 없다`.
2. `type` 속성의 값을 비교하는 것으로 `타입 가드가 동작`

- 따라서 단순히 `type` 속성을 비교하는 것만으로 두 타입을 완전히 구별할 수 있다.
- `식별 가능한 유니온 타입`은 서로 겹치지 않기 때문에 `switch 문에서 사용하기 좋음`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)™

##### switch 문에서 식별 가능한 유니온 타입 사용하기

```ts
interface Person {
  type: 'person'; // -1-
  name: string;
  age: number;
}
interface Product {
  type: 'product'; // -1-
  name: string;
  age: number;
}

function print(value: Person | Product) {
  switch (value.type) {
    case 'person':
      console.log(value.age);
      break;
    case 'product':
      console.log(value.price);
      break;
  }
}
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/typeguard/switch.ts)

1. 타입스크립트는 `case 구문` `안`으로 들어오면 `value 타입`을 정확히 알 수 있음

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 타입을 검사하는 함수

- 타입 가드를 활용하는 또 다른 방법으로 `타입을 검사하는 함수`를 작성하는 방법으로
  - -> `타입 가드 활용 가능`

```ts
// -1-
function isPerson(x: any): x is Person {
  // -1-
  return (x as Person).age !== undefined; // -2-
}
function print(value: Person | Product) {
  // -3-
  if (isPerson(value)) {
    console.log(value.age);
  } else {
    console.log(value.price);
  }
}
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/typeguard/with_function.ts)

1. `입력된 인수`가 Person 타입인지 `검사하는 함수`를 작성
   - `is 키워드`
   - 왼쪽 : `매개변수 이름`
   - 오른쪽 : `타입 이름`
2. `age 속성`이 있으면` Person 타입이라고 정의`
3. `isPerson` 함수를 이용하면 `타입 가드가 동작`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### in 키워드

```ts
interface Person2 {
  type: 'person'; // -1-
  name: string;
  age: number;
}
interface Product2 {
  type: 'product'; // -1-
  name: string;
  price: number;
}

function print(value: Person2 | Product2) {
  // -1-
  if ('age' in value) {
    //-1-
    console.log(value.age); // -2-
  } else {
    console.log(value.price);
  }
}
```

- [코드로 이동](./Practice/advanced_feature/생산성높히기/typeguard/in.ts)

1. 단순히 `age 속성`이 있는지 검사
2. `속성 이름의 존재`를 검사하는 것으로 `타입 가드 동작`

- 식별 가능한 유니온 타입보다 `속성 이름`을 검사하는 방법이 `좀 더 간편`
  - 그러나 `타입의 종류`가 많아지고 `같은 이름의 속성이 중복 사용` 되면
  - -> `식별 가능한 유니온 타입`을 사용하도록 함

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

> 정리

     `보통의 경우` : `in`을 사용해서 편하게 작성
     `특별한 경우` : `식별가능한 유니온 타입`을 사용해서 확인

> 인터페이스에서 식별 가능한 유니온 타입

    - -> `같은 이름의 속성`을 정의
    - -> `속성의 타입`은 `모두 겹치지 않게 정의`
