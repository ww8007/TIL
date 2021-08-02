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

- `age와` `name값을` 필수적으로 입력해야지만 `제대로 동작`
- dist 폴더에 생성된 파일을 열러보면 JSX 코드가 React.createElement 코드로 변환
