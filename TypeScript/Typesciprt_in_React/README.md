## 타입스크립트 환경 구축하기

- `타입스크립트` 사용하기 위해 `프로젝트 환경`을 구축하는 방법을 학습
- 먼저 `cra`와 `넥스트`에서 `타입스크립트 환경`을 구축하는 방법 학습

### create-react-app과 넥스트에서 타입스크립트 사용하기

> 설치

     npx create-react-app typescript --template typescript

- cra는 `react-scripts 버전 2.1`부터 타입스크립트를 `정식으로 지원`
- 이후 소스 파일의 확장자를 `ts` 또는 `tsx`로 만들면 됨

### Next.js에서 타입스크립트 사용하기

- `넥스트`는 프레임워크 코드를 타입스크립트로 작성했을 정도로 `타입스크트에 친화적`
- `넥스트` 프로젝트 폴더에 `tsconfig.json` 파일이 있으면 타입스크립트 개발 환경이라고 인식

> 설치

      touch tsconfig.json
      npx next

### 프레임워크를 사용하지 않고 타입스크립트 환경 구축

> 구성

      mkdir ts-custom
      cd ts-custom
      npm init -y
      yarn add typescript react react-dom
      yarn add @types/react @types/react-dom
      npx tsc --init

#### tsconfig.json 파일에 설정하기

- 자동으로 생성된 tsconfig.json 파일에 설정을 추가

```json
{
  // ...
  "jsx": "react", // -1-
  "outDir": "./dist" // -2-
  // ...
}
```

1. `jsx 옵션을 react`로 설정하면 `JSX 문법으로 작성된 코드`가
   - -> `React.createElement` `함수 호출`로 변환
2. 컴파일된 `결과 파일은 dist 폴더에 생성`하도록 함

#### 타입스크립트로 간단한 리액트 코드 작성하기

- 간단한 리액트 `컴포넌트`를 생성
- 프로젝트 루트에 src 폴더를 만들고
  - src/App.tsx 파일 생성

> 설정

     mkdir src && cd src && touch App.tsx && code App.tsx

```tsx
import React, { ReactElement } from 'react';

export default function App({
  name,
  age,
}: {
  name: string;
  age: number;
}): ReactElement {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
}
```

- `두 개의 속성값`을 가지는 간단한 컴포넌트
- 두 속성값은 `필수 값`

- 이제 App 컴포넌트를 사용
  - src 폴더 밑 index.tsx 파일을 만들고 코드 입력

##### src/index.tsx

```ts
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App age={23} name={'jang'} />,
  document.getElementById('root')
);
```

- [코드로 이동](./ts-custom/src/index.tsx)

- `age와` `name값을` 필수적으로 입력해야지만 `제대로 동작`
- dist 폴더에 생성된 파일을 열러보면 JSX 코드가 React.createElement 코드로 변환

### 기타 환경 설정하기

- 타입스크립트로 `프로젝트를 구축`할 때 고민되는 몇 가지 중요한 `설정 방법`

#### 자바스크립트와 타입스크립트를 같이 사용하기

- `기존 프로젝트`에 타입스크립트를 `도입`하거나
- `다른 프로젝트`의 자바스크립트 코드를 `일부 가져와서 사용`해야 하는 경우

- `src/legacy.js` 파일을 생성 후 함수 작성

> 구성

     cd src && touch legacy.js && code legacy.js

```ts
import React, { ReactElement } from 'react';
import { getValue } from './legacy'; // -1-
export default function App({
  name,
  age,
}: {
  name: string;
  age: number;
}): ReactElement {
  const value = getValue();
  console.log(value.toFixed(2)); // -2-
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
    </div>
  );
}
```

- [코드로 이동](./ts-custom/src/App.tsx)

1. `타입스크립트`에서 `자바스크립트 파일`을 가져온다.
   - `npx tsc` 명령어를 실행 하면 자바스크립트를 가져오는 부분에서 `컴파일 에러` 발생
   - `tsconfig.json` 파일에 `"allowJs" : true` 옵션을 추가
2. -> 2번 코드에서 에러가 발생
   - `타입스크립트`가 getValue의 `반환 타입이 숫자`라는 것을 알았기 때문
   - `substr` 함수 호출을 `toFixed`로 수정하고 돌리면 오류 안생김

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 외부 패키지 사용하기

- 로다시 패키지 설치

> 설치

     yarn add lodash @types/lodash

```ts
import _ from 'lodash'

_. // -1-
```

1. `_.`을 입력하는 순간 로다시가 제공하는 `API 목록`을 IDE 상에서 확인 가능
   - `@types/lodash`를 설치했기 때문에 타입스크립트는 `로다시의 타입 정보 내장`

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

#### 자바스크립트가 아닌 모듈과 window 객체의 타입 정의하기

- `이미지`나 `폰트` 등의 `자바스크립트가 아닌`
  - -> `모듈`과 `window 객체`의 `타입을 정의`하는 방법

```ts
import React, { ReactElement } from 'react';
import { getValue } from './legacy';
import Icon from './icon.jpg'; // -1-
window.myValue = 123; // -2-
export default function App({
  name,
  age,
}: {
  name: string;
  age: number;
}): ReactElement {
  const value = getValue();
  console.log(value.toFixed(2));
  return (
    <div>
      <img src={Icon} />
      // ...
    </div>
  );
}
```

1. 확장자가 `jpg`인 파일을 가져오려고 하면 `컴파일 에러`가 발생
   - -> 타입스크립트는 jpg 모듈의 `타입을 모르기 때문`
2. 종종 `window 객체에 우리가 원하는 속성을 추가`하고 싶은 경우가 있음
   - -> 그러나 타입스크립트 `myValue 속성` 없다며 `에러 발생`

- `이미지 모듈`과 `window 객체`의 타입을 정의
- `src/types.ts` 파일 생성

> 설정

     touch type.ts && code type.ts

```ts
interface Window {
  myValue: number; // -1-
}

// -2-
declare module '*.jpg' {
  const content: string;
  export default content;
}
// -2-
```

- [코드로 이동](./ts-custom/src/type.ts)

1. `window 객체`에 `myValue 속성`을 추가
   - -> 이렇게 하면 기존에 정의된 `Window 타입`에 우리가 `작성한 속성이 추가`
2. 타입스크립트에 `jpg` 확장자를 가지는 `모듈의 타입이 문자열`이라고 알려줌

[[↑] Back to top](#%EB%AA%A9%EC%B0%A8)

##### 자바스크립트 최신 문법 사용하기

```ts
console.log('123'.padStart(5, '0')); // -1-
```

1. 문자열에 padStart 메서드가 없어서 컴파일 에러 발생
   - -> `문자열 padStart` 메서드는 `ES2017`에 추가
   - `JS 최신 기능 추가` -> `tsconfig.json` 파일에 다음 설정 추가

```json
{
  "compilerOptions": {
    "lib": [
      "dom",
      "ES5",
      "ScriptHost",
      "ES2017" // -1-
    ] /* Specify library files to be included in the compilation. */
  }
}
```

1. `lib 옵션`의 `기본값`은 `["dom", "es5", "scripthost"]`임
   - -> 기본값에 `es2017` 추가

> 주의점

     타입 스크립트는 폴리필을 추가 시켜주지 않음
     직접 추가 해야함

##### 다시 짚고 가는 웹팩과 바벨

- 바벨을 실행하는 여러 가지 방법
  1. @babel/cli
  2. 웹펙에서 babel-loader
  3. @babel/core 직접 설정

> 웹팩 설정

      yarn add babel-loader @babel/core @babel/preset-react react react-dom
