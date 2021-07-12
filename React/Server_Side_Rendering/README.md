# 서버 사이드 렌더링

- 서버 사이드 렌더링
  - 서버에서 리액트 코드를 실행해서 렌더링 하는 것

> 서버 사이드 렌더링 필요 이유

    1. 검색 엔진 최적화(search engine optimization, SEO)를 해야 하는 경우
    2. 빠른 첫 페이지 렌더링

- 많은 사용자를 대상으로 하는 사이트라면 검색 엔진 최적화를 위해서 서버사이드 렌더링은 필수조건
- 구글을 제외한 다른 검색 사이트는 검색엔진이 자바스크립트 코드를 실행하지 않기 때문에
- 클라인언트 렌더링만 하는 사이트는 내용이 없는 사이트와 동일하게 처리가 됨
  - 구글에서 서버 사이드 렌더링을 하는 사이트는 좀 더 높은 점수를 부여
- 서버사이드 렌더링을 하면 사용자가 요청한 사이트를 빠르게 보여 줄 수 있음
- 클라이언트 렌더링만 적용 -> 기기의 사양에 따라서 다른 속도
- 다음 내용에서는 Next.js 를 사용하지 않고 적용하는 방법 학습

## 서버사이드 렌더링 초급편

> 학습 내용

    1. 리액트에서 제공하는 renderToString, hydrate 함수를 사용
    2. 서버에서 생성된 데이터를 클라이언트로 전달하는 방법
    3. styled-components로 작성된 스타일이 어떻게 적용되나
    4. 서버용 번들 파일을 만드는 방법

> 설치

    npm i react react-dom

### 클라이언트에서만 렌더링 해보기

- 서버사이드 렌더링을 구현하기 위한 사전 작업으로 클라이언트에서만 렌더링하는 웹사이트 제작
- 웹사이트의 페이지를 나타내며 페이지 전환을 테스트하는 용도로 사용됨

#### About page 작성

```js
import React from 'react';

function About() {
  return (
    <div>
      <h3>This is About Page</h3>
    </div>
  );
}

export default About;
```

#### Homepage 작성

```js
import React from 'react';

function Home() {
  return (
    <div>
      <h3>This is home page</h3>
    </div>
  );
}

export default Home;
```

#### App.js 작성

```js
import React, { useEffect, useState } from 'react';
import About from './About';
import Home from './Home';

export default function App() {
  const [page, setPage] = useState(page);
  useEffect(() => {
    //  -1-
    window.onpopstate = (event) => {
      setPage(event.state);
    };
  }, []);
  //  -2-
  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`); //  -3-
    setPage(newPage);
  }
  const PageComponent = page === 'home' ? Home : About; // -4-
  return (
    <div className="container">
      <button data-page="home" onClick={onChangePage}>
        Home
      </button>
      <button data-page="about" onClick={onChangePage}>
        About
      </button>
      <PageComponent />
    </div>
  );
}
```

1. 단일 페이지 어플리케이션을 직접 구현하기 위해 onpopstate 이벤트 처리 함수를 등록
   - 브라우저에서 뒤로 가기 버튼 클릭하면 onpopstate 함수가 호출
2. 특정 페이지로 이동하는 버튼의 이벤트 처리 함수
3. pushState 메서드를 통해 브라우저에게 주소가 변경됨을 알림
4. page 상태값에 따라 렌더링할 페이지의 컴포넌트가 결정

#### index.js 작성

```js
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

ReactDom.render(<App page="home" />, document.getElementById('root')); // -1-
```

1. render 함수를 이용해서 App 컴포넌트를 돔 요소에 연결

#### 웹팩 설정하기

> touch webpack.config.js (root)

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader', // -1-
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './template/index.html' })], // -2-
  mode: 'production',
};
```

1. 모든 자바스크립트 파일을 babel-loader로 처리
2. template/index.html 파일을 기반으로 HTML 파일 생성
   - 2번 코드에서 입력한 HTML 템플릿 파일을 생성
   - 프로젝트 루트에 template 폴더를 생성, 밑에 index.html 파일을 생성

> mkdir template && touch index.html

#### 바벨 설정하기

> touch babel.config.js

- 자바스크립트 파일을 컴파일 하기 위해 바벨 설정 파일을 작성

```js
const presets = ['@babel/preset-react', '@babel/preset-env'];
const plugins = [];
module.exports = { presets, plugins };
```

> babel.config.js 파일의 설정은 babel-loader가 실행될 때 적용

#### 클라이언트 렌더링 확인하기

> 설치

    npm i webpack webpack-cli
    npm i @babel/preset-react @babel/preset-env
    npm i babel-loader

> npx webpack

- 브라우저에서 확인 시 두개의 버튼과 문구가 잘 보임
- But 의도된 대로 동작하지 않음 -> url이 file://로 시작하기 때문
  - 나는 live-server로 열어서 문제가 없었음...
- 직접 서버를 띄우는 방식을 이용하면 자동으로 해결

- 당연하게도 첫 요청에 대한 응답으로 돌아오는 HTML에는 버튼이나 문구를 표현하는 돔 요소가 없음
- 브라우저의 개발자 모드에서 네트워크 메뉴로 쉽게 호가인 가능
- 버튼이나 문구의 돔 요소는 자바스크립트가 실행되면서 추가
- 만약 브라우저에서 자바스립트 실행 허용 X -> 아무것도 안보임
- 나중에 서버사이드 렌더링을 구현하면 브라우저가 자바스크립트를 실행하지 않아도 화면의 내용을 확인 가능

> 버튼이나 문구의 돔 요소는 첫 HTML 파일에 나타나는 것은 js 코드가 동작하면서 추가
