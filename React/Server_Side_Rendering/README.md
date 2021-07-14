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
2.
