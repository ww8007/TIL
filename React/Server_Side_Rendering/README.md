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
import React, { useEffect, useState } from 'react';

import Home from './Home';
import About from './About';

export default function App({ pages }) {
  const [page, setPage] = useState(pages);
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

> 책에 오류가 있음
> props로 받는 page 에 대해서 pages로 설정을 해줘야함

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

### 서버사이드 렌더링 함수 사용해보기: renderToString

- 리액트에서는 서버사이드 렌더링을 위해 네 개의 함수를 제공

1. renderToString : 동적
2. renderToNodeStream : 동적
3. renderToStaticMarkup : 정적
4. renderToStaticNodeStream : 정적

- renderToStaticMarkup, renderToStaticNodeStream
  - 정적 페이지를 렌더링 할 때 사용
  - 최초 렌더링 이후에도 계속해서 갱신 -> 나머지 두개 사용

#### 서버사이드 렌더링을 위한 패키지 설치

> 설치

    npm i express @babel/cli @babel/cli @babel/plugin-transform-modules-commonjs

- 웹 서버를 띄우기 위해 express 패키지 설치
- @babel/cli 서버에서 사용될 자바스크립트 파일을 컴파일 할 때 사용
- 서버에서도 리액트의 JSX 문법으로 작성된 모듈 시스템 -> commonJS로 변경해야 하기 때문에 바벨 필요
- ESM으로 작성된 모듈 시스템 -> commonJS

  - @babel/plugin-transform-modules-commonjs 패키지 설치

- 서버에서는 노드 환경에서 자바스크립트를 실행 commonJS 모듈 시스템이 필요

#### 웹 서버 코드 작성하기

> touch server.js

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server'; //-1-
import React from 'react';
import App from './App';

const app = express(); //-2-
//-3-
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf-8'
);
//-3-
app.use('/dist', express.static('dist')); //-4-
app.get('/favicon.ico', (res, req) => res.sendStatus(204)); //-5-
// -6-
app.get('*', (req, res) => {
  const renderString = renderToString(<App page="home" />); // -7-
  // -8-
  const result = html.replace(
    '<div id="root"></div>',
    `<div id="root">${renderString}</div>`
  );
  // -8-
  res.send(result); //-9-
});
app.listen(3000); //-10-
```

1. react-dom 패키지의 server 폴더 밑에 서버에서 사용되는 기능이 모여있음
2. express 객체인 app 변수 이용 미들웨어와 url 경로 설정을 할 수 있음
3. 웹팩 빌드 후 생성되는 index.html 파일의 내용을 가져옴
   - 서버사이드 렌더링 시 이 내용을 기반으로 새로운 HTML 파일을 생성 예정
4. url이 /dist 로 시작하는 경우에는 dist 폴덜 밑에 있는 정적 파일로 연결
   - 웹팩으로 빌드한 자바스크립트 파일이 이 코드에 의해서 서비스됨
5. 브라우저가 자동으로 요청하는 favicon.ico 파일이 6번에서 처리 되지 않도록 함
6. 나머지 모든 경우를 처리하는 함수 등록
7. renderToString 함수를 이용해서 App 컴포넌트를 랜더링
8. 렌더링된 결과를 반영해서 HTML을 완성
9. 완성된 HTML을 클라이언트에 전송
10. 매개변수는 포트 번호를 의미 -> 3000번 포트로 들어오는 클라이언트의 요청을 기다림

#### 바벨 설정하기

- 서버를 위한 바벨 설정이 필요
- 서버와 클라이언트에서 필요한 바벨 플러그인과 프리셋은 아래와 같음

| 구분       | 바벨 프리셋         | 바벨 플러그인                            |
| ---------- | ------------------- | ---------------------------------------- |
| 클라이언트 | @babel/preset-react | 없음                                     |
|            | @babel/preset-env   |                                          |
| 서버       | @babel/preset-react | @babel/plugin-transform-modules-commonjs |

> @babel/preset-env

     주로 오래된 브라우저를 지원하기 위한 용도로 사용
     오랜된 노드 버전을 사용하는게 아니라면 불필요
        -> 서버에서 @babel/preset-env 설정 안하는 이유

> @babel/plugin-transform-modules-commonjs

    서버에서 실행하는 노드를 위해 필요

- 바벨 플러그인과 프리셋 설정을 적용하기 위해 세 개의 설정 파일 생성

> touch .babelrc.common.js .babelrc.server.js .babelrc.client.js

#### 바벨 설정 파일의 내용

- babelrc.common.js

```js
// -1-
const presets = ['@babel/preset-react'];
const plugins = [];
module.exports = { presets, plugins };
// -1-
```

1. 공통으로 사용되는 설정은 .babel.common.js 파일에서 관리

- .babelrc.client.js

```js
const config = require('./.babelrc.common.js'); // -2-
config.presets.push('@babel/preset-env'); //-3-
module.exports = config;
```

2. 클라이언트와 서버 측 설정에서는 .common.js 파일의 설정을 가져와서 사용
3. 클라이언트에서 필요한 프리셋을 추가

- .babelrc.server.js

```js
const config = require('./.babelrc.common.js');
config.plugins.push('@babel/plugin-transform-modules-commonjs'); //-4-
module.exports = config;
```

4. 서버에서 필요한 플러그인을 추가

#### 웹팩 설정하기

- 웹팩 설정 파일에는 HTML에 추가되는 번들 파일의 경로와 바벨 설정 파일의 경로 수정

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/', // -1-
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '.babelrc.client.js'),
          },
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './template/index.html' })], // -2-
  mode: 'production',
};
```

1. publicPath 설정은 html-webpack-plugin이 HTML 생성 시 HTML 리소스 파일의 경로를 만들 때 사용됨
   - publicPath 설정 없이 생성된 HTML 파일은 브라우저에서 바로 실행되면
   - 문제가 없지만 --서버 사이드 렌더링--시에는 문제가 됨
   - 이전에 server.js 파일에서 url이 /dist로 시작하는 경우에만 dist 폴더에
   - 있는 파일을 서비스하도록 설정했기 때문에 publicPath도 같게 설정
2. 웹팩은 클라이언트 클라이언트 코드에 대해서만 실행할 예정
   - babel-loader가 클라이언트 설정으로 실행되도록 설정

#### 기타 설정 및 프로그램 실행하기

- 서버측 코드는 @babel/cli를 이용해서 바벨만 실행하고
- 클라이언트 측 코드 -> 웹팩을 실행

- 코드를 빌드하고 웹 서버를 띄우는 작업을 많이 하므로
  - package.json에 다음과 같이 명령어 추가

```json
"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        // -1-
        "build-server": "babel src --out-dir dist-server --config-file ./.babelrc.server.js",
        // -1-
        "build": "npm run build-server && webpack", //-2-
        "start": "node dist-server/server.js"   //-3-
    },
```

1. 서버 측 코드를 빌드
   - src 폴더 밑에 있는 모든 파일을 babelrc.server.js 설정으로 빌드
2. 서버와 클라이언트 코드를 모두 빌드
   - 클라이언트 측 빌드는 웹팩을 실행한다.
3. express 웹 서버를 띄운다.
   - 이 명령어는 빌드 후 실행해야함

- 서버사이드 렌더링을 하면 이미 돔요소가 만들어진 상태이기 때문에 클라이언트 측에서 또 다시 렌더링 할 필요가 없음
- 단 각 돔 요소에 필요한 이벤트 처리 함수를 연결해야 함

  - 이벤트 처리함수를 연결하지 않으면 화면은 잘 보이지만 사용자가 버튼을 눌러도 반응하지 않음

- 리액트에서 제공하는 --hydrate-- 함수는 서버사이드 렌더링의 결과로 만들어진 돔 요소에 필요한 이벤트 처리 함수를 붙여주는 역할

#### hydrate 함수를 사용하도록 index.js 파일 수정하기

```js
ReactDom.hydrate(<App page="home" />, document.getElementById('root'));
```

> npm run build
> npm start
