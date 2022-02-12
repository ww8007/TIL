# 5. 나의 첫 리액트 프로젝트

## 5.1 타입 스크립트

- 사용하는 것이 좋음

> 설치

    npx create-react-app my-app

- create-react-app으로 생성한 리액트 프로젝트
- ┣ 타이스크리브 라이브러리와 리액트의 타입이
- ┣ 정의된 타입 정의 파일을 설치할 필요가 있음

> 타입 설치

    yarn add typescript @types/node @types/react @types/react-dom @types/jest

- typescript : 타입스크립트 라이브러리
- ┣ @types/node : 노드의 타입이 정의된 타입 정의 파일
- ┣ @types/react : 리액트의 타입이 정의된 타입 정의 파일
- ┣ @types/react-dom : react-dom의 타입이 정의된 타입 정의 파일
- ┣ @types/jest : Jest의 타입이 정의된 타입 정의 파일

> tsconfig.json 추가

```json
{
	"compilerOptions": {
		"target": "ES5",
		"lib": ["dom", "DOM.Iterable", "ESNext"],
		"allowJs": true,
		"skipLibCheck": true,
		"esModuleInterop": true,
		"allowSyntheticDefaultImports": true,
		"strict": true,
		"forceConsistentCasingInFileNames": true,
		"noFallthroughCasesInSwitch": true,
		"module": "esnext",
		"moduleResolution": "node",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx"
	},
	"include": ["src", "custom.d.ts"]
}
```

> 파일 확장자 변경

    모두 .tsx, .ts로 변경

> reportWebVitals 변경

```ts
import { ReportHandler } from 'web-vitals';
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
			getCLS(onPerfEntry);
			getFID(onPerfEntry);
			getFCP(onPerfEntry);
			getLCP(onPerfEntry);
			getTTFB(onPerfEntry);
		});
	}
};

export default reportWebVitals;
```

> custom.d.ts 작성

- 파일에서 svg 파일을 타입스크립트에서 불러올 수 잇게 하도록 설정
- ┣ 여기서 생성하는 `d.ts` 파일 :
- ┣ 타`입 정의 파일로 타입스크립트가 인식하지 못하는 타입`이나
- ┗ `타입스크립트 내에서 사용할 수 있는 타입들을 정의할 때 사용`

```ts
declare module '*.svg' {
	import * as React from 'react';

	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement>
	> & { title?: string };
	const src: string;
	export default src;
}
```

> 하지만 너무 복잡함

    npx create-react-app my-app-ts --template=typescript

## 5.2 styled-components

- 보통 리액트는 컴포넌트를 기바능로 개발하게 되며
- ┣ 컴포넌트별로 CSS를 갖는 형식으로 스타일을 관리함
- ┣ 하지만 모든 CSS를 한 곳에서 관리하지 않다보면
- ┣ 클래스 명이 중복되어 잘못된 스타일이 적용될 수 잇음
- ┣ 만약 한 곳에서 모든 스타일을 관리하면
- ┣ 다음과 같은 장점을 얻음

1. 클래스 이름 버그 해결

- 보통 CSS에 클래스 이름을 생성하고
- ┣ 스타일을 작성한 다음 해당 이름을 HTML 태그에 적용함으로
- ┣ 스타일을 적용함
- ┣ 하지만 이러한 코딩 스타일은 중복 겹침 또는 철차 오류 발생

2. 더 쉬운 CSS 관리

- 일반적인 방식으로 스타일을 적용하면
- ┣ 스타일의 코드의 어디에서 사용되는지 알기 어려움
- ┣ styled-components는 모든 스타일이 모든 스타일이 특정
- ┣ 컴포넌트에 연결되어있기 때문에
- ┣ 사용되지 않는 불필요한 스타일을 쉽게 제거가 가능함

3. 간단한 동적 스타일 적용

- 동적인 스타일을 관리하기 위해
- ┣ 여러 클래스를 만들 필요가 없으며
- ┣ 컴포넌트의 상태에 따라 쉽고 직관적으로
- ┣ 동적 스타일을 적용이 가능함

4. CSS 자동구성

- 페이지에 렌더링되는 컴포넌트를 추적하여
- ┣ 해당 스타일을 완전히 자동으로 추가함
- ┣ 또한 코드 분할(Code splitting)과 결합하여
- ┣ 사용자가 필요한 최소한의 코드를 자동으로 추가함

> 설치

    yarn add styled-components @types/styled-components jest-styled-components
