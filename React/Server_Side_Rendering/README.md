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

### 서버 데이터를 클라이언트로 전달하기

- 서버사이드 렌더링 시 서버에서 생성한 데이터를 클라이언트로 전달하는 방법
- 서버에서 렌더링할 때 사용한 데이터를 클라이언트도 알아야 일관성 있게 화면을 갱신 가능
- 지금까지 작성한 프로젝트에서 클라이언트로 전달할 데잍터는 App 컴포넌트의 page 속성 값
  - page 속성값의 초기값을 home이라고 가정하고 코드를 작성

> url 에 따라 /home -> home을 초기값 사용 , /about -> about 초기값 사용

#### HTML에 서버 데이터 넣기

> ./template/index.html

```html
<head>
  <title>test-ssr</title>
  // -1-
  <script type="text/javascript">
    window.__INITIAL_DATA__ = __DATA_FROM_SERVER__;
  </script>
  // -2-
</head>
```

1. 서버는 `__DATA_FROM_SERVER__` 부분에 필요한 데이터를 채워서 전달
   - 클라이언트는 `window.__INITIAL_DATA__` 을 통해서 서버의 데이터를 받을 수 있음
   - 웹 서버 코드에서는 서버의 데이터를 HTML에 삽입해야 함
   - server.js 파일 수정

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import * as url from 'url';
const app = express();
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8'
);
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true); // -1-
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  // -2-
  const renderString = renderToString(<App page={page} />); // -3-
  const initialDate = { page }; // -4-
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(initialDate)); // -5-
  res.send(result);
});
app.listen(3000);
```

1. 문자열로 된 주솟값을 구조체로 변환하기 위해 url 모듈을 사용한다.
   - parsed Url 변수는 url의 경로와 쿼리 파라미터 등의 정보를 담고 있음
2. pathname 앞쪽의 슬래시를 제거해서 page 변수를 만듬
3. url로부터 계산된 페이지 정보를 App 컴포넌트의 속성값으로 사용
4. 클라이언트에게 전달할 초기 데이터
5. `__DATA_FROM_SERVER__` 문자열을 초기 데이터로 대체

#### 클라이언트에서 데이터 사용하기

- 클라이언트에서 서버의 데이터를 받아서 사용하는 코드가 필요

> index.js

```js
const initialData = window.__INITIAL_DATA__; //-1-
ReactDom.hydrate(
  <App page={initialData.page} />, //-2-
  document.getElementById('root')
);
```

1. 서버로부터 전달된 초기 데이터를 가져옴
2. 전달받은 page 데이터를 속성 값으로 입력

> 리덕스를 사용하는 프로젝트는 리덕스의 상태값을 `window.__INITIAL_DATA__`
> 로 전달해서 사용이 가능하다.

### 스타일 적용하기

- 리액트에서 스타일을 적용하는 방식은 다향
- 전통적인 방식으로 CSS 파일을 별도로 작성 후 HTML 파일에 연결하면 서버사이드 렌더링 시 특별한 고민할 필요가 없음
- 그러나 css-module, css-in-js 방식으로 작성한다면 서버 사이드 렌더링 시 추가 작업을 해야함
- 둘 다 자바스크르립트 코드가 실행되면서 스타일 코드 -> 돔으로 삽입 방식
- 서버에는 돔이 없으면 별도의 작업을 하지 않으면 서버사이드 렌더링 시 스타일 정보가 HTML에 포함되지 않음

> css-in-js 방식에서 가장 유명한 styled-components 사용해서 서버 사이드 렌더링 스타일 적용

#### styled-components로 스타일 적용해보기

> 설치

    npm i styled-components

> App.js

```js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Home from './Home';
import About from './About';

// -1-
const Container = styled.div`
  background-color: #aaaaaa;
  border: 1px solid blue;
`;
// -1-
export default function App({ pages }) {
  const [page, setPage] = useState(pages);
  useEffect(() => {
    window.onpopstate = (event) => {
      setPage(event.state);
    };
  }, []);

  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`);
    setPage(newPage);
  }
  const PageComponent = page === 'home' ? Home : About;
  return (
    // -2-
    <Container>
      <div className="container">
        <button data-page="home" onClick={onChangePage}>
          Home
        </button>
        <button data-page="about" onClick={onChangePage}>
          About
        </button>
        <PageComponent />
      </div>
    </Container>
  );
}
```

1. styled-components를 이용해서 스타일이 적용된 컴포넌트를 만든다.
2. 기존의 div 요소를 제거하고 Container 컴포넌트로 대체

- 문제점
  - 서버로부터 전달된 HTML을 살펴보면 스타일 코드가 없음
  - 스타일이 적용되지 않은 화면이 잠시 보이고 클라이언트에서 코드가 실행 된 후에
  - 스타일이 적용된다.
  - 이를 개선 하지 않으면 초기 화면은 깜빡이게 됨
  - 사용자의 브라우저가 자바스크립트 허용하지 않으면 스타일이 적용되지 않은 화면이 보이게 됨

#### 서버사이드 렌더링에 스타일 적용하기

- 위를 개선하기 위해서 서버사이드 렌더링 시 스타일을 적용해야함
- 서버사이드 렌더링 과정에서 스타일 추출 -> HTML에 삽입

> HTML에 스타일 코드를 넣기 위해서 ./template/index.html 파일 수정

```html
<!DOCTYPE html>
<html>
  <head>
    <title>test-ssr</title>
    <script type="text/javascript">
      window.__INITIAL_DATA__ = __DATA_FROM_SERVER__;
    </script>
    __STYLE_FROM_SERVER__ //-1-
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

1. 서버사이드 렌더링 시 추출된 스타일 코드를 넣을 예정
   웹 서버 코드에는 스타일 코드를 HTML에 삽입해야 함

> server.js

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import * as url from 'url';

import { ServerStyleSheet } from 'styled-components';

const app = express();
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8'
);
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const sheet = new ServerStyleSheet(); // -1-
  const renderString = renderToString(sheet.collectStyles(<App page={page} />)); // -2-
  const styles = sheet.getStyleTags(); // -3-
  const initialDate = { page };
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(initialDate))
    .replace('__STYLE_FROM_SERVER__', styles); //-4-
  res.send(result);
});
app.listen(3000);
```

1. 스타일을 추출하는 데 사용될 객체를 생성
2. collectStyles 메서드에 리액트 요소를 입력하면 스타일 정보를 수집하기 위한 코드가 리액트 요소에 삽입됨
   - 실제 스타일 정보는 renderToString 함수의 호출이 끝나야 수집할 수 있다.
3. getStylesTags 메서드 호출 하면 스타일 정보 추출
4. 추출된 스타일 코드를 HTML에 삽입

> 리액트 코드에서 스타일 정보 가져오기

    collectStyles : 스타일 정보를 수집하기 위한 코드 -> 리액트 요소
    getStylesTags : 스타일 정보 추출

#### 서버로부터 전달되는 HTML

```html
<style data-styled="active" data-styled-version="5.3.0"></style> -1-
<div class="sc-bdnxRM kmQaIS">
  -2- <button data-page="home">Home</button
  ><button data-page="about">About</button>
  <div><h3>This is about page</h3></div>
</div>
```

1. getStyleTags 메서드가 반환한 스타일 코드
2. App.js 파일의 Container 컴포넌트로부터 생성된 돔 요소
   - style 태그에서 정의된 클래스명 확인 가능

- 스타일 정보가 HTML에 포함되어 전달되므로 사용자는 자바스크립트가 실행 되지 않더라도 빠르게 스타일이 적용된 화면을 볼 수 있다.

### 이미지 모듈 적용하기

- 웹팩에서는 JS 뿐만 아닌 모든 파일이 모듈이 될 수 있음
- 그 중에서도 자주 쓰이는 이미지 파일을 모듈로 적용
- 이미지 파일은 대게 file-loader, url-loader를 이용해서 처리

> file-loader

    전달된 리소스 파일을 output 설정에 지정된 폴더로 복사
    JS 코드에는 복사된 파일의 경로가 반환

- 파일의 경로는 클라이언트와 서버가 모두 같은 정보를 공유해야함
- 그렇지 않으면 (서버사이드 렌더링 결과 !== 클라이언트 렌더링 결과)의 문제가 초래
  - 고로 클라이언트 코드에서 file-loader로 처리 -> 서버 코드 file-loader로 처리
  - 서버 코드에서 file-loader를 실행하기 위해 서버 코드도 --웹팩으로 번들링--

#### 서버 코드도 웹팩으로 번들링

- 지금까지는 서버 코드에 바벨만 적용

> ./webpack.config.js

- 파일 구조 변경하기

```js
const nodeExternals = require('webpack-node-externals'); // -1-

function getConfig(isServer) {} // -2-

module.exports = [getConfig(false), getConfig(true)]; // -3-
```

1. 서버 코드를 번들링할 때는 node_modules 폴더 밑에 있는 모듈까지 하나의 번들 파일로 만들 필요가 없음
   - 서버 코드는 언제든지 node_modules 폴더 밑에 있는 모듈을 가져와서
   - webpack-node-externals 모듈은 node_modules 폴더 밑에 있는 모듈을 번들 파일에서 제외 시켜주는 역할을 함
2. isSever 매개변수에 따라 웹팩 설정을 반환해주는 함수
3. 웹팩 설정 파일에서 배열을 내보내면 배열의 각 아이템 개수만큼 웹팩이 실행
   - 위의 코드에서는 클라이언트 -> 서버 순으로 번들링

- getConfig 코드

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

function getConfig(isServer) {
  return {
    // -1-
    entry: isServer
      ? { server: './src/server.js' }
      : { main: './src/index.js' },
    // -1-
    output: {
      filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js', //-2-
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    },
    target: isServer ? 'node' : 'web', //-3-
    externals: isServer ? [nodeExternals()] : [], //-4-
    node: {
      __dirname: false, // -5-
    },
    // -6-
    optimization: isServer
      ? {
          splitChunks: false,
          minimize: false,
        }
      : undefined,
    // -6-
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? '.babelrc.server.js' : '.babelrc.client.js' //-7-
              ),
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              emitFile: isServer ? false : true, //-8-
            },
          },
        },
      ],
    },
    plugins: isServer //-9-
      ? []
      : [
          new CleanWebpackPlugin(),
          new HtmlWebpackPlugin({ template: './template/index.html' }),
        ],
    mode: 'production',
  };
}
module.exports = [getConfig(false), getConfig(true)];
```

1. 서버와 클라이언트 각각 server.js, index.js 파일을 entry로 설정
2. 클라이언트 -> 브라우저 캐싱 효과 -> chunkhash
   - 서버 -> 필요없음
3. target 속성에 node를 입력해서 웹팩에 서버 코드를 번들링 한다고 알려줄 수 있음
   - 웹팩 -> node 입력시 노드에 특화된 번들링 과정을 거침
   - fs, path 모듈과 같이 노드에 내장된 모듈은 번들 파일에 포함 x
4. 서버 코드를 번들링 할 때는 node_modules 폴더 밑에 있는 모듈을 번들 파일에 포함시키지 않음
5. 이 설정을 하지 않으면 코드에서 `__dirname` 을 사용할 경우 절대 경로인 `('/')` 가 잡히게 된다. false를 입력할 경우 일반적인 노드의 `__dirname`으로 동작하게 됨
6. 서버 코드는 압축할 필요가 없음
7. 적절한 바벨 설정 파일을 입력
8. file-loader 실행 시 한쪽에서만 파일을 복사해도 충분하다.
9. 두 플러그인은 모두 클라이언트 코드 번들링 시에만 실행하면 됨

> 설치

    npm i webpack-node-externals file-loader

#### 이미지 모듈 사용하기

- 서버에서도 file-loader를 사용할 수 있도록 설정했기에 이미지 모듈 사용

> ./src/App.js

- 이미지 불러와서 렌더링 하는 코드 추가

#### package.json 파일에서 build 명령 수정

```js
    "scripts": {
        "build": "webpack",
        "start": "node dist/server.bundle.js"
    },
```

## 서버사이드 렌더링 고급편

- 서버사이드 렌더링은 서버 리소스를 많이 사용
- 특히 렌더링 연산에 CPU 많이 사용
- 한순간에 트래픽이 몰리면 모든 요청을 처리할 수 없다.
- 높은 트래픽 대응 -> 여러가지 방법이 존재
- 서버가 사용자의 요청에 가장 빠르게 요청 하는 법 -> 서버 사이드 렌더링을 하지 않는것
- 평상시 : SSR
- 서버 부하 일정 수준 넘어가면 : CSR
- 검색 엔진 최적화가 중요한 사이트의 경우 엔진의 요청은 서버사이드 렌더링을 하는 것이 좋음

> 데이터 의존성이 낮은 페이지

    서버사이드 렌더링을 일부만 하는 방식으로 성능 문제 해결가능
    데이터 의존성이 있떠라도 범위가 작다면 일부만 하도록 가능

> 데이터 의존성이 없는 페이지

    빌드 시 미리 렌더링 해 놓을 수 있음
    사용자가 요청하면 단순히 정적 페이지를 서비스하면 되기 때문에 서버 리소스를 절약 가능

### 페이지를 미리 렌더링 하기

- 이전에 만들었던 Home 컴포넌트에 사용자 이름을 보여주는 UI 추가

```js
import React from 'react';
function Home({ username }) {
  return (
    <div>
      <h3>This is home page</h3>
      {username && <p>{`${username}님 안녕하세요`}</p>} //-1-
    </div>
  );
}
export default Home;
```

1. 속성값으로 받아온 사용자 이름이 존재하면 화면에 보여줌
   - 사용자 이름이 서버사이드 렌더링 시 존재하면 home 페이지는 사용자 마다 다르기 때문에 미리 렌더링 불가
   - 따라서 서버 사이드 렌더링 시 사용자 이름 없이 받아오고 클라이언트에서 마운트 이후에 이름을 API로 받아오도록 함
   - App.js 파일을 수정해서 마운트 이후에 Home 컴포넌트로 사용자 이름을 전달한다.

```js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from './icon.png';
import Home from './Home';
import About from './About';

const Container = styled.div`
  background-color: black;
  border: 1px solid blue;
`;
// -1-
function fetchUsername() {
  const usernames = ['mike', 'june', 'jamie'];
  return new Promise((res) => {
    const username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(() => res(username), 100);
  });
}
// -1-
export default function App({ pages }) {
  const [page, setPage] = useState(pages);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    window.onpopstate = (event) => {
      setPage(event.state);
    };
  }, []);
  useEffect(() => {
    fetchUsername().then((data) => setUsername(data)); // -2-
  });

  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`);
    setPage(newPage);
  }

  const PageComponent = page === 'home' ? Home : About;
  return (
    <Container>
      <button data-page="home" onClick={onChangePage}>
        Home
      </button>
      <button data-page="about" onClick={onChangePage}>
        About
      </button>
      <img src={Icon} />
      <PageComponent username={username} /> // -3-
    </Container>
  );
}
```

1. fetchUsername 함수는 API 통신으로 사용자 이름을 가져옴
2. 클라이언트 측에서 마운트 이후에 사용자 이름을 요청
3. 사용자 이름을 Home 컴포넌트로 전달
   - 물론 About 컴포넌트에서 사용자 이름이 필요 없지만 편의를 위해 리펙터링 생략

#### 일부 페이지에서 서버에서 미리 렌더링하도록 리펙터링

- 데이터 의존성이 낮은 일부 페이지만 미리 렌더링 하도록 리팩터링
- src 폴더 밑에 prerender.js 생성 -> 미리 렌더링 코드 작성

> npx prerender.js

```js
import fs from 'fs';
import path from 'path';
import { renderPage, prerenderPages } from './common'; //-1-

for (const page of prerenderPages) {
  const result = renderPage(page);
  fs.writeFileSync(path.resolve(__dirname, `../dist/${page}.html`), result); //-2-
}
```

1. 페이지를 렌더링하는 함수와 미리 렌더링할 페이지의 목록을 가져옴
   - src/common.js 파일은 잠시 후 작성
2. 페이지를 미리 렌더링 해서 dist 폴더 밑 저장

```js
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';
import { ServerStyleSheet } from 'styled-components';

// -1-
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf-8'
);
// -1-

export const prenderPages = ['home']; //-2-

export function renderPage(page) {
  const sheet = new ServerStyleSheet();
  const renderString = renderToString(sheet.collectStyles(<App page={page} />));
  const styles = sheet.getStyleTags();
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__STYLE_FROM_SERVER__', styles);
  return result;
}
```

- common.js 파일의 내용은 server.js 파일에서 작성했던 코드와 상당히 유사

1. dist/index.html 파일의 내용을 가져옴
2. 미리 렌더링할 페이지의 목록을 정의
3. 페이지를 미리 렌더링 해서 문자열을 반환하는
   - server.js 파일에서 렌더링하던 코드와 유사
   - renderPage 함수에 -> `__DATA_FROM_SERVER__ ` 문자열 그대로 둠 -> renderPage 데이터에 대한 정보를 모르기 때문에
   - prerender.js 파일에서는 `__DATA_FROM_SERVER__` 문자열을 변환하지 못한 채로 각 페이지의 HTML 파일을 저장한다.
   - 데이터는 서버에서 사용자 요청을 할 때 채워넣을 예정

#### 미리 렌더링한 페이지 활용하기

- 웹 서버 코드에서 미리 렌더링한 페이지를 활용하도록 sever.js 파일 수정

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';

import { renderPage, prerenderPages } from './common';

const app = express();
// -1-
const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`)
  );
  prerenderHtml[page] = pageHtml;
}
// -1-
const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8'
);
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const initialDate = { page };
  // -2-
  const pageHtml = prerenderPages.includes(page)
    ? prerenderHtml[html]
    : renderPage(page);
  //-2-
  //-3-
  const result = pageHtml.replace(
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialDate)
  );
  //-3-
  res.send(result);
});
app.listen(3000);
```

1. prerender.js 파일이 실행될 때 미리 렌더링해 놓은 페이지를 prerenderHtml 객체에 저장
2. 미리 렌더링된 페이지가 아닌 경우에만 새로 렌더링
3. `__DATA_FROM_SERVER__ ` 문자열을 초기 데이터로 대체

#### 웹팩 설정 및 결과 확인하기

- prender.js 파일을 서버에서 실행하기 위해서 웹팩으로 빌드

> ./webpack.config.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

function getConfig(isServer, name) {
  // -1-
  return {
    entry: {
      entry: { [name]: `./src/${name}` }, // -2-
    },
    output: {
      filename: isServer ? '[name].bundle.js' : '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
    },
    target: isServer ? 'node' : 'web',
    externals: isServer ? [nodeExternals()] : [],
    node: {
      __dirname: false,
    },
    optimization: isServer
      ? {
          splitChunks: false,
          minimize: false,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                __dirname,
                isServer ? '.babelrc.server.js' : '.babelrc.client.js'
              ),
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              emitFile: isServer ? false : true,
            },
          },
        },
      ],
    },
    plugins: isServer
      ? []
      : [new HtmlWebpackPlugin({ template: './template/index.html' })],
    mode: 'production',
  };
}
module.exports = [
  getConfig(true, 'index'),
  getConfig(true, 'server'),
  getConfig(true, 'prerender'), // -3-
];
```

1. getConfig 함수의 두 번째 매개변수로 이름 정보를 추가했다.
2. 각 이름에 해당하는 파일의 번들 파일을 생생헌다.
3. prerender.js 파일을 마지막에 번들링
   - 웹팩 빌드 후 일부 페이지 위해 package.json 파일 수정

> ./package.json

#### 생성된 home.html 파일의 내용

<!DOCTYPE html>
<html>
  <head>
    <title>test-ssr</title>
    <script>
      window.__INITIAL_DATA__ = __DATA_FROM_SERVER__; // -1-
    </script>
    <style data-styled="true" data-styled-version="5.3.0">
      .kmQaIS {
        background-color: black;
        border: 1px solid blue;
      } /*!sc*/
      data-styled.g1[id='sc-bdnxRM'] {
        content: 'kmQaIS,';
      } /*!sc*/
    </style>
    <script defer="defer" src="/dist/index.7e29e19e9565bbf054dc.js"></script>
  </head>
  <body>
    <div id="root">
      <div class="sc-bdnxRM kmQaIS">
        <button data-page="home">Home</button
        ><button data-page="about">About</button
        ><img src="/dist/29de4f72a026df827ec324f0c66f58d6.png" />
        <div><h3>This is about page</h3></div>
      </div>
    </div>
  </body>
</html>

1. `__DATA_FROM_SERVER__` 문자열은 그대로 존재
2. 렌더링된 페이지의 돔 요소가 들어있음
   - 사용자 이름을 보여주는 요소는 X
   - 사용자 이름을 보여 주는 돔 요소는 이후 클라이언트 렌더링할 때 추가됨

### 서버사이드 렌더링 캐싱하기

- 데이터가 많이 의존적인 페이지는 정적 페이지를 미리 렌더링하는 방식을 사용할 수 없음
- 그러나 데이터가 자주 변하지 않는 페이지라면 서버사이드 렌더링 결과를 캐싱해서 활용 가능
- 렌더링 결과를 1분만 캐싱해도 서버 부하를 크게 줄일 수 있음
- 1분 동안 수십만 페이지뷰가 발생해도 단 한 번만 서버사이드 렌더링을 하면 됨
- 제한된 메모리 안에 캐싱 데이터를 저장하려면 지울 데이터를 결정하는 알고리즘이 필요

> 설치

npm i lru-cache

- lur-cache 패키지는 정해진 최대 캐시 개수를 초과하면 LRU(least recently used) 알고리즘에 따라 가장 오랫동안 사용되지 않은 캐시를 제거

- 서버사이드 렌더링에서 캐싱 기능을 구현

> ./server.js

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import lruCache from 'lru-cache'; // -1-

import { renderPage, prerenderPages } from './common';

// -2-
const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});
// -2-

const app = express();

const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`)
  );
  prerenderHtml[page] = pageHtml;
}

const html = fs.readFileSync(
  path.resolve(__dirname, '../dist/index.html'),
  'utf8'
);
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const cacheKey = parseUrl.path; //-3-
  // -4-
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  // -4-
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const initialData = { page };
  const pageHtml = prerenderPages.includes(page)
    ? prerenderHtml[page]
    : renderPage(page);
  const result = pageHtml.replace(
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialData)
  );
  // -5-
  ssrCache.set(cacheKey, result);
  res.send(result);
  // -5-
});
app.listen(3000);
```

1. 캐싱 기능을 위해 lru-cache 패키지를 이용
2. 최대 100개의 페이지를 캐싱하고 각 아이템은 60초 동안 캐싱되도록 설정
3. cacheKey는 쿼리 파라미터를 포함하는 url로 함
   - 만약 페이지를 렌더링할 때 user-agent와 같은 추가 정보 이용 하면
   - cacheKey는 그 정보들을 모두 포함해야 함
4. 캐시가 존재하면 캐싱된 값을 사용한다.
5. 캐시가 존재하지 않으면 서버사이드 렌더링 후 그 결과를 캐시에 저장

> 빌드 후 브라우저에서 페이지를 입력하면 캐시 사용 로그가 출력되지 않음

    - 같은 페이지를 또 방문하면 캐시 사용 로그가 출력되는 것

### 서버사이드 렌더링 함수 사용해보기 : renderToNodeStream

- 리엑트는 서버사이드 렌더링을 위해 renderToString 함수 외 renderToNodeStream 함수도 제공
- renderToString : 모든 렌더링 과정이 끝나야 문자열로 된 결괏값을 반환
- renderToNodeStream : 호출 즉시 노드 스트림(stream) 객체를 반환

#### 노드의 스트림

- 스트림 : 배열이나 문자열 같은 데이터 컬렉션, 크기가 큰 데이터를 다룰 때 유용
- 스트림은 데이터를 청크 단위로 쪼개서 전달하기 때문에 데이터가 완전히 준비되지 않아도 전송 시작 가능

##### 크기가 큰 파일을 읽는 코드

```js
app.get('/readFile', (req, res) => {
  fs.readFile('./big_file.zip', (err, data) => {
    //-1-
    if (err) throw err;
    res.end(data);
  });
});
```

1. /readFile 요청이 오면 크기가 큰 파일을 읽어서 전달
   - 이 때 파일의 전체 내용을 메모리로 가져오기 때문에 메모리 여유가 없다면 부담이 될 수 있음
   - 스트림을 사용하면 큰 파일을 읽을 때도 메모리를 효율적으로 사용이 가능

##### 스트림을 이용한 파일 읽기

```js
app.get('readFile', (req, res) => {
  const fileStream = fs.createReadStream('./big_file.zip'); // -1-
  fileStream.pipe(res); //-2-
});
```

1. 파일을 읽기 위해 읽기 가능한 스트림(readable stream) 객체를 만든다.
2. 노드의 HTTP response 객체는 쓰기 가능한 스트림(writeable stream) 객체
   - 읽기 가능한 스트림에 쓰기 가능한 스트림을 연결
   - 데이터는 읽기 가능한 스트림에서 쓰기 가능한 스트림에서 쓰기 가능한 스트림 쪽으로 흐름

- 위의 코드는 메모리를 효율적으로 사용할 뿐만 아니라 첫 번째 청크가 준비되면 바로 전송을 시작
- 바로 전송을 시작 -> 데이터를 빠르게 전송가능

- 읽기와 쓰기가 모두 가능한 스트림(duplex stream) 객체도 존재
- 읽기와 쓰기가 모두 가능한 스트림은 다음과 같이 세 개 이상의 스트림을 연결할 때 사용됨

##### 여러 개의 스트림 연결하기

```js
readableStream
  .pipe(transformStream1)
  .pipe(transformStream2)
  .pipe(writableStream); //-1-
```

#### server.js 수정

1. 읽기 가능한 스트림과 쓰기 가능한 스트림 사이에 두 개의 읽기와 쓰기가 가능한 스트림을 연결

- readableStream -> transformStream -> transformStream2 -> writableStream
- 중간의 두 스트림은 스트림이 생성한 데이터를 기반으로 추가적인 작업을 할 수 있다.
- 데이터를 변환하거나 데이터가 처리되는 속도를 측정해서 콘솔로 측정 가능

- renderToNodeStream 함수를 이용하면 렌더링 데이터를 빠르게 전달할 수 있다는 장점이 있다.
- 렌더링하려는 페이지가 아무리 복잡하더라도 첫 번째 청크가 준비되면 바로 전송을 시작하기 때문

> npx server.js

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import lruCache from 'lru-cache';
// -1-
import { ServerStyleSheet } from 'styled-components';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
// -1-
import { renderPage, prerenderPages } from './common';

const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const app = express();

const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`),
    'utf8'
  );
  prerenderHtml[page] = pageHtml;
}
// -2-
const html = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8')
  .replace('__STYLE_FROM_SERVER__', '');
// -2-
app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const cacheKey = parseUrl.path;
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const initialData = { page };
  const isPrerender = prerenderPages.includes(page); // -3-
  // -4-
  const result = (isPrerender ? prerenderHtml[page] : html).replace(
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialData)
  );
  // -4-
  // -5-
  if (isPrerender) {
    ssrCache.set(cacheKey, result);
    res.send(result); // -5-
  } else {
    //-6-
    const ROOT_TEXT = '<div id ="root">';
    const prefix = result.substr(
      0,
      result.indexOf(ROOT_TEXT) + ROOT_TEXT.length
    );
    const postfix = result.substr(prefix.length);
    // -6-
    res.write(prefix); // -7-
    const sheet = new ServerStyleSheet();
    const reactElement = sheet.collectStyles(<App page={page} />);
    // -8-
    const renderStream = sheet.interleaveWithNodeStream(
      renderToNodeStream(reactElement)
    );
    // -8-

    renderStream.pipe(res, { end: false }); // -9-
    // -10-
    renderStream.on('end', () => {
      res.end(postfix);
    });
    // -11-
  }
});
app.listen(3000);
```

1. common.js 파일에 있던 내용의 상당 부분을 가져와야 하므로 관련된 모듈도 가져옴
2. dist/index.html 파일의 내용을 가져옴
   - 이 때 스트림 방식에서는 더 이상 `__STYLE_FROM_SERVER__`를 사용하지 않으므로 지움
3. 미리 렌더링하는 페이지인지 여부를 isPrerender 변수에 저장
4. HTML에 초기 데이터를 넣음
   - 미리 렌더링하는 페이지는 이 작업을 끝으로 HTML이 완성됨
5. 미리 렌더링하는 페이지를 캐시에 저장 후 전송
6. root 요소를 기준으로 이전 문자열과 이후 문자열로 나눔
7. 이전 문자열은 바로 전송
   - write 메소드는 여러 번 호출가능
8. renderToNodeStream 함수를 호출해서 읽기 가능한 스트림 객체를 만듬
   - 스트림 방식을 사용할 때는 `styled-components`의 `interleaveWithNodeStream `메서를 호출해야함
   - 이 메서드는 renderStream에서 스타일 코드가 생성되도록 하는 역할
   - 기존에는 스타일 코드를 `__STYLE_FROM_SERVER`부분에 삽입했지만 이제는 root 요소 내부에 삽입
9. `renderStream` 스트림과 `res` 스트림이 연결
   - `res`는 쓰기 가능한 스트림
   - `{end : false}` 옵션은 스트림이 종료됐을 때 `res.end` 메서드가 자동으로 호출되지 않도록 함
10. 스트림이 종료되면 마지막으로 postfix 데이터를 전송

#### 스트림 방식에서 캐싱 구현하기

- 현재깢의 구현으로는 스트림으로 전송된 데이터를 캐싱하지 못함
- 스트림 방식에서 캐싱 구현 -> 스트림으로 전송되는 청크 데이터에 접근 할 수 있어야함
- 이를 위해 두 스크림 사이 직접 구현한 스트림을 끼워 넣어야함
- 스트림으로 렌더링한 결과를 캐싱하기 위해 server.js 파일을 다음과 같이 수정

#### 스트림으로 렌더링한 결과를 캐싱하도록 server.js 수정

```js
import express from 'express';
import fs from 'fs';
import path from 'path';
import * as url from 'url';
import lruCache from 'lru-cache';
import { ServerStyleSheet } from 'styled-components';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Transform } from 'stream'; // -1-
import { renderPage, prerenderPages } from './common';

// -2-
function createCacheStream(cacheKey, prefix, postfix) {
  const chunks = []; // -3-
  return new Transform({
    // -4-
    // -5-
    transform(data, _, callback) {
      chunks.push(data);
      callback(null, data);
    },
    // -5-
    // -6-
    flush(callback) {
      const data = [prefix, Buffer.concat(chunks).toString(), postfix];
      ssrCache.set(cacheKey, data.join(''));
      callback();
    },
    // -6-
  });
}

const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});

const app = express();

const prerenderHtml = {};
for (const page of prerenderPages) {
  const pageHtml = fs.readFileSync(
    path.resolve(__dirname, `../dist/${page}.html`),
    'utf8'
  );
  prerenderHtml[page] = pageHtml;
}

const html = fs
  .readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf8')
  .replace('__STYLE_FROM_SERVER__', '');

app.use('/dist', express.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const cacheKey = parseUrl.path;
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const initialData = { page };
  const isPrerender = prerenderPages.includes(page);
  const result = (isPrerender ? prerenderHtml[page] : html).replace(
    '__DATA_FROM_SERVER__',
    JSON.stringify(initialData)
  );
  if (isPrerender) {
    ssrCache.set(cacheKey, result);
    res.send(result);
  } else {
    const ROOT_TEXT = '<div id ="root">';
    const prefix = result.substr(
      0,
      result.indexOf(ROOT_TEXT) + ROOT_TEXT.length
    );
    const postfix = result.substr(prefix.length);
    res.write(prefix);
    const sheet = new ServerStyleSheet();
    const reactElement = sheet.collectStyles(<App page={page} />);
    const renderStream = sheet.interleaveWithNodeStream(
      renderToNodeStream(reactElement)
    );
    // -7-
    const cacheStream = createCacheStream(cacheKey, prefix, postfix);
    cacheStream.pipe(res);
    renderStream.pipe(cacheStream, { end: false });
    // -7-
    renderStream.on('end', () => {
      res.end(postfix);
    });
  }
});
app.listen(3000);
```

1. 중간에 삽입할 `스트림`을 만들기 위해 Transform 클래스를 가져옴
2. 중간에 삽입할 `스트림`을 생성해 주는 함수
3. `스트림`으로 전달된 모든 청크 데이터를 저장하는 배열
4. `Transform` 객체를 생성
   - `Transform`은 읽기와 쓰기가 가능한 `스트림`객체
5. 청크 데이터를 받으면 호출되는 함수
   - 전달받은 청크 데이터를 그대로 `chunks`배열에 넣음
6. 청크 데이터가 모두 전달된 후 호출되는 함수
   - 모든 청크 데이터와 prefix, postfix를 이용해서 하나의 완성된 HTML 데이터를 만들고 캐싱
7. 생성한 `스트림`을 두 `스트림` 사이에 연결
   - 순서 : renderStream -> cacheStream -> res

## 넥스트 초급편

- 효율적으로 개발하기 위해서는 더 많은 기능이 필요
- 이 때 사용할 수 있는 프레임워크 -> `Next.js`

- 넥스트와 CRA는 리액트를 기반으로 개발 환경을 구축한다는 점은 비슷
- CRA : 클라이언트 렌더링만 담당
- Next : 서버사이드 렌더링에 특화된 프레임워크

  > 서버 사이드 렌더링을 할 때 직접 구축할 여력이 안되면 넥스트

### 넥스트 시작

> 설치

    npm i next react react-dom

- 넥스트에서 모든 페이지 컴포넌트는 `pages` 폴더 밑에 만들어야 함
- 프로젝트 root -> mkdir pages -> touch page1.js

> mkdir pages && cd pages && touch page1.js

#### Page1.js

```js
function Page1() {
  return (
    <div>
      <p>This is Home Page</p>
    </div>
  );
}

export default Page1;
```

- 간단한 리액트 컴포넌트 생성
- 파일 상단에 리액트 모듈을 가져오는 `import` 키워드 안보임
- 넥스트는 리액트 모듈을 자동으로 포함시켜줌

> Next.js -> 리액트 모듈 자동으로 포함

- 개발자 모드로 확인 시 서버사이드 렌더링된 결과가 응답값으로 오는 것을 확인가능
- 아무런 설정을 하지 않아도 서버 사이드 렌더링이 되는 사이트 생성

#### 넥스트 번들 파일 분석

- 넥스트는 프로젝트 루트의 `.next` 폴더 밑에 번들 파일을 생성
- `.next` 폴더 밑 번들 파일 지우기

> rm -rf .next

- 프로덕션 모드로 빌드 후 싫행

> npx next build && npx next start

- 브라우저에서 page1 페이지 접속 하면 js 파일 전달

  1. `page1.js` : 작성한 페이지 코드
  2. `_app.js` : 모든 페이지의 최상단에서 실행되는 리액트 컴포넌트 코드가 들어있음
  3. `framework.[해시값].js` : 넥스트에서 사용하는 주요 패키지(ex : 리액트) 코드
  4. `[해시값].js` : 여러 페이지에서 공통으로 사용하는 코드
  5. `main-[해시값].js` : 웹팩 런타임 코드

- pages 폴더 : 각 페이지의 번들 파일
- chunks : 여러 페이지에서 고통으로 사용하는 번들 파일
- runtime : 웹팩과 넥스트의 런타임과 관련된 번들 파일

- `.next/server/static` : 서버에서 사용되는 파일

  - 이폴더의 번들 파일은 코드가 압축되어 있지 않음
  - `node_modules` 폴더 밑 외부 모듈의 코드가 번들 파일에 포함되어 있지 않음
  - Reason : 이 폴더의 번들 파일이 서버에서 실행되는 코드

- 특이점 : page1 페이지의 파일이 Js가 아닌 HTML 파일
- page1.js 파일은 변수를 사용하지 않아 렌더링 하는 결과는 항상 같음
- 넥스트는 정적인 페이지를 자동으로 렌더링 미리 렌더링해서 최적화함
- 동적인 페이지는 미리 렌더링하지 않으며 자바스크립트 파일로 만들어짐

- `_document.js` 파일은 서버 측에서 HTML 요소를 추가하는 용도로 사용

#### 넥스트의 기본 기능 사용하기

- 넥스트에서 이미지와 같은 정적 파일 사용 -> HTML head 태그와 스타일 코드 작성 방법

> mkdir static

- 그림 파일 하나 icon.png로 이름 변경 후 저장

##### page1.js

```js
import Head from 'next/head';

function Page1() {
  return (
    <div>
      <p>This is Home Page</p>
      <img src="/static/icon.png" /> // -1-
      <Head>
        // -2-
        <title>page1</title>
      </Head>
      <Head>
        <meta name="description" content="hello world" />
      </Head>
      // -2-
      <style jsx>{`
        // -3-
        p {
          color: blue;
          font-size: 18pt;
        }
      `}</style>
      // -3-
    </div>
  );
}

export default Page1;
```

1. 프로젝트 루트의 static 폴더 밑 정적 파일 생성, 경로 입력하면 정적 파일 서비스 가능
   - but 파일의 내용과 상관없이 항상 같은 경로가 사용되므로 브라우저 캐싱에 불리함
2. 넥스트에서 제공하는 `Head` 컴포넌트를 사용하면 `HTML head`태그에 원하는 돔 요소를 삽입 가능
   - 여러번 사용하는 것도 가능
   - 나중에 하나로 합쳐짐
3. 넥스트는 `styled-jsx` 패키지를 통해서 `css-in-js` 방식을 지원
   - 여기서 선언된 스타일은 이 컴포넌트 내 p 요소에만 적용
   - styled-components를 사용하는 방식도 가능함

#### 넥스트가 생성한 HTML 분석하기

> npx next build && npx next start

1. page1.js 에서 `Head` 컴포넌트를 사용해 입력한 돔 요소
2. page1.js 에서 styled-jsx 문법을 사용해서 입력한 스타일 코드
3. 서버에서 생성된 데이터
4. script 태그를 이용해서 여러 가지 자바스크립트 파일을 가져옴

#### 웹팩 설정 변경하기

- 넥스트에서는 정적 파일을 서비스 하기 위해 프로젝트 루트의 static 폴더를 이용
- 지금까지 살펴본 예제 코드는 정적 파일의 내용과 상관없이 항상 같은 파일 경로 사용
- 브라우저 캐싱을 최대로 활용하기 위해서는 파일의 내용이 변경되면 파일의 경로도 변경되는 것이 좋음
- 웹팩의 `file-loader`를 사용해서 기능 구현

> 설치

    npm i file-loader

- 넥스트는 CRA와 달리 웹팩 설정을 변경할 수 있음

> touch next.config.js && code next.config.js

```js
module.exports = {
  // -1-
  webpack: (config) => {
    // -2-
    config.module.rules.push({
      test: /.(png|jpg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash]', //-3-
            emitFile: false, //-4-
            publicPath: '/',
          },
        },
      ],
    });
    return config;
  },
};
```

1. 웹팩 설정을 변경하기 위한 함수
   - 이 함수의 첫 번째 매개변수로 넥스트의 웹팩 설정이 넘어옴
2. 넥스트의 웹팩 설정에 `file-loader`를 추가
3. 쿼리 파라미터 부분에 해시를 추가해서 파일의 경로도 수정되도록 함
4. 넥스트는 `static` 폴더의 정적 파일을 그대로 서비스하기 때문에 파일을 복사할 필요가 없음

- 앞에서 설정한 `file-loader`가 동작하기 위해 이미지를 모듈로 다뤄야 함
- page1.js 파일을 수정해서 기존의 src 속성값으로 입력했던 이미지 경로를 모듈의 경로로 사용하도록 변경

##### page1.js

```js
import Head from 'next/head';
import Icon from '../static/icon.png';
function Page1() {
  return (
    <div>
      <p>This is Home Page</p>
      <img src={Icon} />
      <Head>
        <title>page1</title>
      </Head>
      <Head>
        <meta name="description" content="hello world" />
      </Head>
      <style jsx>{`
        p {
          color: blue;
          font-size: 18pt;
        }
      `}</style>
    </div>
  );
}

export default Page1;
```

#### 서버에서 생성된 데이터를 전달하기

- 넥스트는 `getInitialProps` 함수를 이용해서 페이지 컴포넌트로 속성값을 전달
- 각 페이지의 `getInitialProps` 함수는 페이지 진입 직전에 호출됨
- 사용자가 첫 페이지를 요청하면 `getInitialProps` 함수는 서버에서 호출
- 이후 클라이언트에서 페이지 전환 -> 클라이언트에서 호출

- `getInitialProps` 함수가 반환하는 값은 페이지 컴포넌트의 속성값으로 입력됨
- 넥스트는 `getInitialProps` 함수가 서버에서 호출되는 경우 반환값을 클라이언트로 전달해줌

> getInitialProps

    컴포넌트의 속성값을 서버 -> 클라이언트
    첫 페이지 요청하면 서버
    그 후는 페이지 전환시 클라 -> 서버

> cd pages && mkdir page2.js && code page2.js

```js
import { async } from 'regenerator-runtime';
import { callApi } from '../src/api';

// -1-
Page2.getInitialProps = async ({ query }) => {
  const text = query.text || 'none'; // -2-
  const data = await callApi(); // -3-
  return { text, data }; // -4-
};

// -5-
export default function Page2({ text, data }) {
  return (
    <div>
      <p>this is homepage</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
    </div>
  );
}
```

1. `getInitialProps` 함수를 정의
   - 매개변수로 다양한 정보가 전달되지만 여기서는 쿼리 파라미터 정보만 사용
2. 쿼리 파라미터로부터 `text` 변수 생성
3. 데이터를 가져오기 위해 API를 호출
   - `getInitialProps` 함수 내부의 API 호출은 서버 또는 클라이언트에서 호출될 수 있다는 점을 기억
   - `async await` 분법을 사용했기 때문에 API 통신이 끝날 때 까지 기다림
4. `getInitialProps` 함수가 반환하는 값은 페이지 컴포넌트의 속성값으로 전달됨
5. 페이지 컴포넌트에서 `getInitialProps` 함수가 반환한 값을 사용

> touch api.js && code api.js

> npx next

- `getInitialProps` 함수가 서버에서 호출되더라도 이 함수에서 생성된 데이터는 항상 페이지 컴포넌트로 잘 전달된다는 것을 확인
- 서버에서 호출되는 경우를 경우를 특별히 신경 쓰지 않아도 되기 때문에 `getInitialProps` 코드를 편하게 작성할 수 있다.

> getInitialProps 함수를 통한 데이터 전송 Next.js의 큰 장점

#### getInitialProps에서 HTTP 요청 객체 이용하기

- `getInitialProps` 함수의 매개변수로 다양한 정보가 전달
  1. HTTP 요청과
  2. 응답 객체도 전달

##### user-agent 정보 추출하기

```js
//-1-
MyComponent.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent; //-2-
};
```

1. HTTP 요청 객체도 `getInitialProps` 함수의 매개변수로 전달됨

- 참고로 HTTP 요청과 응답 객체는 `getInitialProps` 함수가 서버에서 호출 되는 경우에만 전달됨

2. HTTP 요청 객체가 존재하면 헤더에서 `user-agent` 정보를 추출함

- 클라이언트에서 호출된 경우 브라우저의 `navigator` 전역 변수를 이용

> getInitialProps HTTP 요청

    HTTP 요청과 응답 객체 : 서버 호출만 포함
    클라이언트 -> `navigator`

#### 페이지 이동하기

- 넥스트는 페이지 이동을 위해서 `Link` 컴포넌트와 `Router` 객체를 제공

##### Link 컴포넌트를 이용해서 페이지 이동하기

- Link 컴포넌트를 이용해서 페이지를 이동하는 코드를 작성

- react와 동일하게 사용이 가능하다.

```js
import Head from 'next/head';
import Icon from '../static/icon.png';
import Link from 'next/link';
function Page1() {
  return (
    <div>
      // -1-
      <Link href="/page2">
        <a>페이지2로 이동</a>
      </Link>
      // ...
    </div>
  );
}

export default Page1;
```

1. Link 컴포넌트를 이용해서 page2로 이동 버튼을 만든다.
   - 사용자가 Link 컴포넌트의 자식 요소를 클릭하면 href 속성으로 전달된 페이지로 이동

##### Router 객체를 이용하여 page2.js 파일 수정

```js
import { async } from 'regenerator-runtime';
import { callApi } from '../api';
import Router from 'next/router';

Page2.getInitialProps = async ({ query }) => {
  const text = query.text || 'none';
  const data = await callApi();
  return { text, data };
};

export default function Page2({ text, data }) {
  return (
    <div>
      <button onClick={() => Router.push('/page1')}>pag1 으로 이동</button>
      //-1-
      <p>this is homepage</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
    </div>
  );
}
```

1. 버튼을 누르면 /page1로 이동

- 페이지 이동을 위해서 Router 객체를 이용하는 것과 Link 컴포넌트를 이용하는 것 사이에 기능적인 차이는 없음
- 다만 Router 객체가 좀 더 동적인 코드에 적합함
- 개발 모드로 넥스트를 실행

#### 에러 페이지 구현하기

- 별도로 에러 페이지를 구현하지 않았다면 넥스트에서 기본적으로 제공되는 에러 페이지가 사용됨
- 만약 에러 페이지를 직접 구현하고 싶다면 `pages`폴더 밑 `_error.js` 파일을 생성

```js
// -1-
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null; //-2-
  return { statusCode };
  //-2-
};

export default function ErrorPage({ statusCode }) {
  return (
    <div>
      //-3-
      {statusCode === 404 && '페이지를 찾을 수 없습니다.'}
      {statusCode === 500 && '알 수 없는 에러가 발생했습니다.'}
      {!statusCode && '클라이언트에서 에러가 발생했습니다.'}
      //-3-
    </div>
  );
}
```

1. 에러 페이지도 getInitialProps 함수를 사용 가능
2. 에러 코드를 페이지 컴포넌트의 속성값으로 전달
3. statusCode 변수의 값에 따라 다른 메시지를 출력
   - 만약 statusCode 변수의 값이 존재하지 않으면 클라이언트 측에서 발생한 에러

- 에러 페이지를 확인하기 위해 고의로 에러를 ㅅ발생

> ./pages/page2.js

##### getInitialProps 함수에서 예외가 발생하도록 page2.js 파일 수정하기

```js
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default function ErrorPage({ statusCode }) {
  return (
    <div>
      {statusCode === 404 && '페이지를 찾을 수 없습니다.'}
      {statusCode === 500 && '알 수 없는 에러가 발생했습니다.'}
      {!statusCode && '클라이언트에서 에러가 발생했습니다.'}
    </div>
  );
}
```

## 넥스트 고급편

- 프로젝트 규몰가 커지면 -> 코드 분할 신경 써야 하고 서버도 직접 띄워야함
- 여러 페이지 컴포넌트의 공통 기능을 분리하는 방법도 필요
- 넥스트의 styled-jsx -> styled-components 등 다른 패키지 적용 방법
- 서버사이드 렌더링 -> CPU 최적화가가 중요
  - 렌더링 결과를 캐싱하거나 미리 렌더링 하는 방법을 사용

### 페이지 공통 기능 구현하기

- 모든 페이지에서 공통으로 필요한 기능한 `pages/_app.js` 파일에서 구현할 수 있음
- 페이지가 전환되어도 메뉴 UI를 그대로 유지하고 싶다면 \_app.js 파일에서 구현하는 것이 좋음
- 간단한 메뉴 UI 구성 예제

> `cd ./pages && touch _app.js && code _app.js`

```js
import Link from 'next/link';

// -1-
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      // -2-
      <Link href="/page1">
        <a>page1</a>
      </Link>
      <Link href="/page2">
        <a>page2</a>
      </Link>
      // -2-
      <Component {...pageProps} />
      // -3-
    </div>
  );
}
```

1. Component 속성값은 : 현재 렌더링하려는 페이지의 컴포넌트
   - pageProps 속성값 : getInitialProps 함수가 반환한 값
2. 메뉴 UI 구성
3. 페이지 컴포넌트 렌더링

> npx next

    개발 모드로 next 실행

- 두 페이지 모두 `_app.js` 파일에서 구현한 메뉴 UI가 렌더링 되는 것을 확인 가능
- MyApp 컴포넌트는 페이지가 전환되는 경우에는 언마운트 되지 않음
- 메뉴 UI는 항상 유지되어야 하므로 `_app.js`파일에서 메뉴 UI를 구현하는 것이 자연스러움
- 컴포넌트가 언마운트 되지 않기 때문에 MyApp 컴포넌트에서 전역 상태값 관리 가능

> `_app.js`를 활용한 전역 상태 값 관리

    컴포넌트가 언마운트 되지 않기 때문에 전역으로 상태값을 관리 가능

### 넥스트에서의 코드 분할

- 넥스트는 기본적으로 페이지별로 번들 파일을 생성
- 동적 임포트(`dynamic import`) -> 모듈의 코드는 별도로 분리
- 여러 페이지 고통 사용 모듈 -> 별도 파일로 분할

#### 동적 임포트로 코드 분할하기

- 넥스트에서 동적 임포트시 코드 어떻게 분할 되는지 확인

> touch sayHello.js

```js
export function sayHello() {
  return 'hello~';
}
```

- 동적 임포트로 sayHello 모듈을 가져오는 코드 작성

```js
import { async } from 'regenerator-runtime';
import { callApi } from '../api';

Page2.getInitialProps = async ({ query }) => {
  const text = query.text || 'none';
  const data = await callApi();
  return { text, data };
};

export default function Page2({ text, data }) {
  function onClick() {
    import('../sayHello').then(({ sayHello }) => console.log(sayHello())); // -1-
  }
  return (
    <div>
      <p>this is homepage</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
      <button onClick={onClick}>sayHello</button>
      // -2-
    </div>
  );
}
```

1. 동적 임포트를 사용해서 sayHello 모듈을 가져옴
2. onClick 함수를 버튼에 연결

> rm -rf .next
> npx next build && npx next start

- 브라우저 접속 후 확인하면 버튼 클릭 -> js 파일 전송됨을 확인

- .next 폴더 확인

- `.next/static/chunks` 폴더 밑 `sayHello.js` 모듈의 코드를 포함하는 번들 파일 포함
- `.next/server` 폴더 밑 `sayHello.js` 모듈의 코드를 포함하는 번들 파일 포함

- 동적 임포트를 사용하면 클라이언트뿐만 아닌 서버를 위한 번들 파일도 생성
- `.next/server` 폴더 밑에 생성되는 파일은 서버사이드 렌더링 시 사용

#### getInitialProps 함수에서 동적 임포트 사용

- `getInitialProps` 함수에서 사용된 동적 임포트 동작 확인

> code ./pages/page2.js

```js
import { callApi } from '../api';

Page2.getInitialProps = async ({ query }) => {
  const { sayHello } = await import('../sayHello'); //-1-
  console.log(sayHello()); //-2-
  const text = query.text || 'none';
  const data = await callApi();
  return { text, data };
};

export default function Page2({ text, data }) {
  function onClick() {
    import('../sayHello').then(({ sayHello }) => console.log(sayHello()));
  }
  return (
    <div>
      <p>this is homepage</p>
      <p>{`text: ${text}`}</p>
      <p>{`data is ${data}`}</p>
      {/* <button onClick={onClick}>sayHello</button> */}
    </div>
  );
}
```

1. getInitialProps 함수에서 동적 임포트로 sayHello.js 모듈을 가져옴
2. sayHello 함수의 반환값을 콘솔로 출력

> npx next build && npx next start

- 이번 단계에서는 이전과 다르게 `sayHello.js` 모듈이 담긴 자바 스크립트 파일이 전송되지 않음
- `getInitialProps` 함수가 서버 측에서 실행되어 클라이언트로 별도의 파일을 내려줄 필요가 없기 때문
- page1 -> page2 이동하면 `getInitialProps` 함수가 클라이언트에서 실행

> 서버와 클라이언트 차이

    서버에서 실행되면 js 파일 전송 X
    클라에서 실행되면 js 파일 전송

#### 여러 페이지에서 공통으로 사용되는 코드 분할하기

- 넥스트는 여러 페이지에서 공통으로 사용되는 모듈을 별도의 번들 파일로 분할
- 웹팩의 `splitChunks` 설정을 통해 코드를 분할
- 코드 변경에 따른 캐시 무효화(`cache invalidation`)를 최소화하는 방향으로 설계

- 페이지에서 공통으로 사용할 모듈 생성

> mkdir src && cd src && touch util.js

- `page1.js`에서 파일을 사용하도록 설정

```js
import { add } from '../src/util';
<p>{`10 + 20 = ${add(10, 20)}`}</p>;
```

> rm -rf .next
> npx next build

- `util.js`의 모듈이 공통 모듈로 분리되지 않음을 확인 가능

- page1의 내용을 page2로 복사 후 npx build를 해보면
- js 모듈의 코드가 `.next/static/chunks` 폴더 밑에 포함되는 것을 확인 가능
- 두 페이지가 청크 파일을 공통으로 사용되는 것을 확인 가능

> 공통으로 만드는 모듈의 사용

    next는 `splitChunks`를 자동 지원하여 공통 적으로 사용하는 모듈에 대해서
    청크 파일을 공통으로 사용함을 알 수 있음

### 웹서버 직접 띄우기

- 지금까지는 넥스트에 내장된 웹 서버를 사용
- 내장된 웹 서버를 사용하지 않고 웹서버를 띄우면 좀 더 많은 일을 가능
- 내장된 웹서버 : 렌더링 결과 캐싱 불가
- 직접 띄운 웹서버 : 캐싱을 통해 더 많은 트래픽 처리 가능

> express를 통한 웹서버

    npm i express

> touch server.js

```js
const express = require('express');
const next = require('next');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production'; // -1-
// -2-
const app = next({ dev });
const handle = app.getRequestHandler();
// -3-
app.prepare().then(() => {
  const server = express();
  // -4-
  server.get('/page/:id', (req, res) => {
    res.redirect(`/page${req.params.id}`);
  });
  //-4-
  // -5-
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  // -5-
  // -6-
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
  // -6-
});
```

1. `NODE_ENV` 환경 변수에 따라 개발 모드와 프로덕션 모드 구분
2. 넥스트를 실행하기 위해 필요한 객체와 함수를 생성
3. 넥스트의 준비 과정이 끝나면 입력된 함수를 실행
4. `express` 웹 서버에서 처리할 `url` 패턴을 등록
   - 위의 코드에서는 `/page/1` 요청이 들어오면 `/page1`으로 리다이렉트
5. 나머지 모든 요청은 `handle` 함수로 처리
   - 만약 4번과 같은 코드가 없다면 내장된 웹서버와 같은 역할을 함
   - 이렇게 서버를 띄우는 이유가 여기에 있음

> 프로덕션 모드 실행

    npx next build
    NODE_ENV=production node server.js

### 서버사이드 렌더링 캐싱하기

- 넥스트에서 서버사이드 렌더링 결과를 캐싱
- `server.js` 파일 수정

```js
const express = require('express');
const next = require('next');
const url = require('url');
const lruCache = require('lru-cache'); // -1-
const { query } = require('express');
// -2-
const ssrCache = new lruCache({
  max: 100,
  maxAge: 1000 * 60,
});
// -2-
const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/page/:id', (req, res) => {
    res.redirect(`/page${req.params.id}`);
  });
  // -3-
  server.get(/^\/page[1-9]/, (req, res) => {
    return renderAndCache(req, res);
  });
  // -3-
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
// -4-
async function renderAndCache(req, res) {
  const parseUrl = url.parse(req.url, true);
  const cacheKey = parseUrl.path; // -5-
  // -6-
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  try {
    const { query, pathname } = parseUrl;
    const html = await app.renderToHtml(req, res, pathname, query); // -7-
    if (res.statusCode === 200) {
      ssrCache.set(cacheKey, html); // -8-
    }
    res.send(html);
  } catch (err) {
    app.renderError(err, req, res, pathname, query);
  }
}
```

1. 서버사이드 렌더링 결과를 캐싱하기 위해 lru-cache 패키지를 이용
2. 최대 100개의 항목을 저장하고 각 항목은 60초 동안 저장
3. `/page1, page2` 요청에 대해서 서버사이드 렌더링 결과를 캐싱
4. `renderAndCache` 함수에서 캐싱 기능을 구현
   - `async await` 문법을 사용
5. 쿼리 파라미터가 포함된 경로를 키로 사용
6. 캐시가 존재하면 캐시에 저장된 값을 사용한다.
7. 캐시가 없으면 넥스트의 `renderToHTML` 메서드 호출
   - `await` 키워드를 사용해서 처리가 끝날 때까지 기다림
8. `renderToHTML` 함수가 정상적으로 처리됐으면 그 결과를 캐싱

- 경로 설정이 잘못되어 있을 때는 err문에서 경로가 없다고 나왔는데
  - 요번에 보니 내가 잘못 설정한거 였음

### 페이지 미리 렌더링하기

- 페이지를 미리 렌더링하면 서버의 CPU 리소스를 절약 가능
- 넥스트에서 빌드 시 `getInitialProps` 함수가 없는 페이지는 자동으로 미리 렌더링됨
- 지금까지 작업한 프로젝트 빌드해서 `.next/server/static` 폴더를 확인해 보면

  - page1 : 미리 렌더링된 `HTML`파일로 만들어짐
  - page2 : 자바스크립트 파일로 만들어짐

- 고로 `getInitialProps` 함수는 꼭 필요한 경우에만 작성하는 것이 좋음
- `_app.js` 파일에서 `getInitialProps` 함수를 정의하면 모든 페이지가 미리 렌더링 되지 않음

> 추후 next 에서 사용하는 함수들 정리 예정

#### next export로 미리 렌더링 하기

- 넥스트에서 next export 명령어를 통해 전체 페이지를 미리 렌더링 할 수 있음
- next export 명령어는 빌드 후 실행해야 함

> npx next build && npx next export

- 명령어 실행 시 프로젝트 루트에 `out` 폴더가 생성

![image](https://user-images.githubusercontent.com/54137044/126030610-605edc9c-9bc1-471e-8c64-7bbcd78990c8.png)

- `404.html` : 에러 페이지가 미리 렌더링된 파일
- `page1.html` : `/page1` 요청에 대ㅐ해 미리 렌더링된 파일
- `page2.html` : `/page2` 요청에 대해 미리 렌더링된 파일
- `_next` 폴더 : 프로젝트 루트의 `.next`폴더에 있는 번들 파일과 같음
- `static` 폴더 : 이미지와 같은 정적 파일을 모아둔 곳

- next export 명령어 실행 후 생성된 `out`폴더만 있으면 서버에서 넥스트를 실행하지 않고 정적 페이지 서비스 가능
- 정적 페이지만 서비스하는 웹 서버 코드 작성

```js
const express = require('express');

const server = express();
server.use(express.static('out')); // -1-

server.listen(3000, (err) => {
  if (err) throw err;
});
```

1. 단순히 `out` 폴더 밑의 정적 파일을 서비스 하도록 설정

> node server.js

#### 넥스트의 exportPathMap 옵션 사용하기

- next의 `exportPathMap` 옵션을 이용하면 쿼리 파라미터를 이용해 정적 페이지를 만들 수 있음

> code next.config.js

```js
  // -1-
  exportPathMap: function () {
    return {
      '/page1': { page: '/page1' },
      '/page2-hello': { page: '/page2', query: { text: 'hello' } }, // -2-
      '/page2-world': { page: '/page2', query: { text: 'world' } }, // -2-
    };
  },
```

1. `next export` 명령 실행 시 `exportPathMap` 옵션이 사용
2. 쿼리 파라미터 정보를 이용해서 미리 렌더링 할 수 있음

> npx next build && npx next export
> node server.js

#### 동적 페이지와 정적 페이지를 동시에 서비스하기

- 동적 페이지를 서비스하기 위해 넥스트를 실행하면서
- 미리 렌더링한 페이지도 같이 서비스 할 수 있도록 구현

- 미리 렌더링한 HTML을 이용하도록 server.js 파일 수정

##### 미리 렌더링한 HTML을 이용하도록 server.js 파일 수정

```js
/// renderAndCache 제외한 코드
const fs = require('fs');
// -1-
const prerenderList = [
  { name: 'page1', path: '/page1' },
  { name: 'page2-hello', path: '/page2?text=hello' },
  { name: 'page2-world', path: '/page2?text=world' },
];
// -1-
// -2-
const prerenderCache = {};
if (!dev) {
  for (const info of prerenderList) {
    const { name, path } = info;
    const html = fs.readFileSync(`./out/${name}.html`, 'utf-8');
    prerenderCache[path] = html;
  }
}
// -2-
// -3-
async function renderAndCache(req, res) {
  const parseUrl = url.parse(req.url, true);
  const cacheKey = parseUrl.path;
  if (ssrCache.has(cacheKey)) {
    console.log('캐시 사용');
    res.send(ssrCache.get(cacheKey));
    return;
  }
  // -4-
  if (prerenderCache.hasOwnProperty(cacheKey)) {
    console.log('미리 렌더링한 HTML 사용');
    res.send(prerenderCache[cacheKey]);
    return;
  }
  // -4-
  // ...(try catch)
}
```

1. `next.config.js` 파일에서 설정한 `exportPathMap` 옵션의 내용과 같은 내용
   - `next.config.js` 파일을 파싱하는게 좋지만 코드를 이해하는데 방해
   - 직접 작성
2. `out` 폴더에 있는 미리 렌더링된 `HTML`파일을 읽어서 `prerenderCache`에 저장
   - `next export` 명령어는 `production`에서만 -> 사용
   - `out` 폴더의 내용을 읽는 작업은 `production` 에서만 사용
3. `renderAndCache` 함수에서 `prerenderCache` 변수를 이용
4. 미리 렌더링된 페이지라면 캐싱된 `HTML`를 사용

> npx next build && npx next export
> NODE_ENV=production node server.js

- 브라우저에서 http://loacalhost:3000/page2?text=hello 로 접속
- 서버의 콘솔 로그에 `미리 렌더링한 HTML 사용`
