# 타입스크립트

- 자바스크립트는 동적 타입 언어
- 따라서 변수의 타입은 런타임에 의해서 결정

- 반대로 정적 타입의 언어도 존재
- 정적 타입 언어의 변수의 타입 -> 컴파일 타임에 결정
  - 예로 `자바`, `C++`, `PHP`

> 동적 타입, 정적 타입

    동적 : 변수의 타입 -> 런타임 시점
    정적 : 변수의 타입 -> 컴파일 타임 시점

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

### 선택 매개변수

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

### 매개변수의 기본값 정하기

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

### 나머지 매개변수

```ts
function getInfoText(name: string, ...rest: string[]): string {
  // ...
}
```

> 나머지 매개변수

    `배열`로 정의가 가능하다.

### this 타입

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

### 원시 타입에 메서드 추가하기

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

### 함수 오버로드:여러 개의 타입 정의

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

#### 함수 오버로드를 사용한 코드

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

### 명명된 매개변수

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
