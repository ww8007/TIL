# 4 리액트 테스트 react testing library

## 목차

- [4 리액트 테스트 react testing library](#4-리액트-테스트-react-testing-library)
  - [목차](#목차)
- [4.1 react-testing-library](#41-react-testing-library)
  - [4.2 react-testing-library의 장점](#42-react-testing-library의-장점)
  - [4.3 프로젝트 준비](#43-프로젝트-준비)
  - [4.4 react-testing-library 설치](#44-react-testing-library-설치)
  - [4.5 사용법](#45-사용법)

# 4.1 react-testing-library

- `Jest` : `Js 테스트 프레임워크`로
- ┣ JS로 전반적으로 테스트하기 위한
- ┗ 프레임워크임

- `리액트도 JS`이긴 하지만 JSX를 사용하므로
- ┣ 일반적인 JS는 아님
- ┣ 또한 JSX는 HTML의 DOM을 다루기 때문에
- ┗ `단순한 JS 테스로 정확한 오류를 잡아내기 힘듬`

- 리액트 뿐만 아닌 최근 프론트앤드 프레임워크
- ┣ 앵귤려, Vue 또한 JS에서 DOM을 직접 다루기 때문에
- ┣ `일반적인 JS 테스트 라이브러리로 모든 테스트를`
- ┗ `수행하기는 어려움`

- `@testing-library` : 이런 문제를 해결하고자 만들어진
- ┣ DOM 테스팅 라이브러리임
- ┣ `@testing-library`는 사용자 중심 방식으로
- ┗ `UI 컴포넌트를 테스트`하는데 도움을 주는 라이브러리임

## 4.2 react-testing-library의 장점

- 리액트 `컴포넌트를 테스트하기 위한 매우 가벼운 솔루션`
- ┗ `유지 보수가 가능한 리액트 컴포넌트용 테스트 코드` 작성 가능

- `Jest` : `JS 테스트 프레임워크로써`
- ┗ JS 테스트 코드를 작성하게 해줌

- `react-testing-library` 또한 같은 원리로
- ┣ 리액트 컴포넌트용 테스트 코드 작성을
- ┣ 도와줌
- ┣ 이 말은 즉 : 테스트 코드를 작성할 때
- ┣ `컴포넌트 세부 구현 사항을 포함하지 않으면서도`
- ┣ `신뢰할 수 있는 테스트 코드 작성`에 도움을 줌
- ┣ 이렇게 컴포넌트의 세부 구현 사항을 포함하지 않은
- ┣ 테스트 코드를 작성하면
- ┣ 컴포넌트의 `세부 구현 부분을 리팩토링`하여도
- ┣ `테스트 코드를 수정할 필요가 없음`
- ┣ 이로 인해 한번 작성한 테스트 코드는
- ┣ 긴 시간을 유지할 수 있으며 오랜 기간
- ┣ 유지 가능한 `테스트 코드는 테스트 코드를`
- ┗ `자주 수정하지 않아도 되므로 개발 생산성을 향상 시켜줌`

- `react-testing-library`는
- ┣ `react-dom 위에서 동작함`
- ┣ 다른 테스트 프레임워크 :
- ┣ `리액트 컴포넌트를 단순히 인스턴스`로 처리
- ┣ 그러나 li는 `실제 DOM 노드에서 작동하므로`
- ┗ `더 신뢰할 수 있는 테스트`

> 신뢰성

    실제 DOM 노드에서 작동함

- 또한 `사용자 중심의 테스트 유틸티티를 제공함`
- ┣ 사용자 중심의 테스트 유틸리티 :
- ┣ react-testing-library를 사용하여
- ┣ `DOM을 찾는 기능들`이 `실제 사용자가 DOM을 사용하는`
- ┣ `방식과 유사한 형태로 제공되고 있음`을 의미함
- ┣ EX) 텍스트로 폼(Form)요소를 찾거나
- ┣ `텍스트에서 링크 및 버튼을 찾는 테스트 코드는`
- ┗ `마치 사용자가 화면을 보면서 찾는 것`과 같은 형태

- `react-testing-library` :
- ┣ 테스트 실행기 또는 프레임워크가 아님
- ┣ 따라서 이를 사용하기 위해서는
- ┣ 다른 `테스트 프레임워크와 함께 사용해야 함`
- ┗ 여기서는 `Jest`를 사용함

## 4.3 프로젝트 준비

> 설치

    npx create-react-app react-testing-library-test

## 4.4 react-testing-library 설치

- create-react-app을 통해
- ┣ react를 생성하였다면
- ┗ 기본적으로 같이 설치가 됨

> 설치

    yarn add @testing-library/react

## 4.5 사용법

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
	render(<App />);
	const linkElement = screen.getByText(/learn react/i);
	expect(linkElement).toBeInTheDocument();
});
```

- render, screen을 불러와 테스트에 사용중
- ┣ 또한 Jest의 test함수(it 함수와 같은 역할)를 사용하여
- ┗ 테스트 명세를 작성한 테스트 코드임을 알 수 있음

- 테스트 코드를 살펴보면 우선
- ┣ `@testing-library/react`에서 불러온
- ┣ `render 함수` : `리액트 컴포넌트를 화면에`
- ┣ `표시`하기 위함이고
- ┣ `screen 함수` : `리액트 컴포넌트가 표시된 화면`
- ┣ 실제로 화면에 표시되지 않음
- ┣ 여기서 `render 함수는 메모리상에 DOM을 만들고`
- ┗ `screen을 통해 접근함을 알 수 있음`

- `react-testing-library` : render 함수를 사용하여
- ┣ App이라는 컴포넌트를 랜더링하였음
- ┣ 이렇게 렌더링된 컴포넌트에서
- ┣ `screen.getByText`를 통해
- ┣ 화면에서 `learn react`라는 글자를 가지고 있는
- ┣ 돔 요소(DOM Element)를 차족
- ┣ 찾은 요소를 `Jest의 expect().toBeInTheDocument()`를 사용하여
- ┗ 돔에 표시되어 있는지 확인

> 이제 테스트 코드를 실행하기 위한 package.json

```js
//package.json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

> 실행

    yarn test

> 테스트 명세서 수정

```js
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
	it('renders component correctly', () => {
		render(<App />);
		const linkElement = screen.getByText(/learn react/i);
		expect(linkElement).toBeInTheDocument();
	});
});
```

> 이미지가 잘 표시되는지 확인

```js
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
	it('renders component correctly', () => {
		const { container } = render(<App />);

		const linkElement = screen.getByText(/learn react/i);
		expect(linkElement).toBeInTheDocument();
		expect(container.getElementsByClassName('App-logo')).toHaveLength(1);
		expect(container.getElementsByClassName('App-logo')[0]).toHaveAttribute(
			'src',
			'logo.svg'
		);
	});
});
```

- render 함수 : 유용한 오브젝트들을 반환하는데
- ┣ 그중 하나인 container를 받아서 사용
- ┣ container : 리액트 컴포넌트에서 화면에 표시되는
- ┣ 부분을 담고 있는 오브젝트임
- ┣ 이 container를 사용하여
- ┣ getElementsByClassName 함수로
- ┣ 화면에 표시되고 있는
- ┣ `<img />`를 클래스 명으로 찾아서 가져 왔으며
- ┗ `가져온 HTML 요소 한개가 존재하는지를 toHaveLength 함수로 체크`

- 또한 geElementsByClassName 함수를 통해
- ┣ 우리가 찾고자 하는 이미지가 존재하는지 확인하였고
- ┣ 해당 이미지가 실제로 우리가 원하는 이미지를
- ┣ 표시하고 있는지
- ┣ `toHaveAttribute` 함수를 사용하여
- ┗ `<img />` 태그의 src를 가져와 비교하였음

> 설명문 p 확인

```js
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
	it('renders component correctly', () => {
		const { container } = render(<App />);

		const linkElement = screen.getByText(/learn react/i);
		expect(linkElement).toBeInTheDocument();
		expect(container.getElementsByTagName('p')).toHaveLength(1);
		expect(container.getElementsByTagName('p')[0]).toHaveTextContent(
			'Edit src/App.js and save to reload'
		);
	});
});
```

- container 오브젝트에서
- ┣ `getElementByTagName` 함수를 사용하여
- ┣ `<p>` 태그를 찾고 해당 태그가 한 개 존재하고 있음을
- ┣ `toHaveLength` 함수를 통해 테스트
- ┣ 해당 p 태그가 우리가 화면에 표시되길 원하는 문자열을
- ┣ 잘 표시하고 있는지 `toHaveTextContent` 함수를 사용하여
- ┗ 테스트 하였음

> 스냅샷 테스트

```js
// add
expect(container).toMatchSnapshot();

// result
  <App />
    ✓ renders component correctly (32 ms)

 › 1 snapshot written.
Snapshot Summary
 › 1 snapshot written from 1 test suite.

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 written, 1 total
Time:        0.552 s, estimated 1 s
```

> src/**snapshots**/App.test.js.snap

```html
// Jest Snapshot v1, https://goo.gl/fbAQLP exports[`<App /> renders component
correctly 1`] = `
<div>
	<div class="App">
		<header class="App-header">
			<img alt="logo" class="App-logo" src="logo.svg" />
			<p>
				Edit
				<code> src/App.js </code>
				and save to reload.
			</p>
			<a
				class="App-link"
				href="https://reactjs.org"
				rel="noopener noreferrer"
				target="_blank"
			>
				Learn React
			</a>
		</header>
	</div>
</div>
`;
```

- 이런 스탭샷 테스트는 우리가 리액트 컴포넌트를
- ┣ 수정하였을 때
- ┣ `수정한 내용이 의도치 않게 화면 표시를`
- ┣ `변경하는 실수`를 알 수 있게 해줌

- 만약 컴포넌트를 수정하여
- ┣ `화면 표시가 변경된 것이 의도된 수정`이였다면
- ┣ `스냅샷 테스트로 저장된 파일을 업데이트` 시켜줘야함
- ┣ 키보드의 `u` 키를 누르면
- ┗ 스냡샷으로 생성된 파일이 업데이트 됨
