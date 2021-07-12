# 웹펙과 바벨

## 목차

- [웹펙과 바벨](#%EC%9B%B9%ED%8E%99%EA%B3%BC-%EB%B0%94%EB%B2%A8)
  - [목차](#%EB%AA%A9%EC%B0%A8)
  - [기본 설명](#%EA%B8%B0%EB%B3%B8-%EC%84%A4%EB%AA%85)
  - [바벨 실행 및 설정하기](#%EB%B0%94%EB%B2%A8-%EC%8B%A4%ED%96%89-%EB%B0%8F-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
  - [바벨을 실행하는 여러 가지 방법](#%EB%B0%94%EB%B2%A8%EC%9D%84-%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94-%EC%97%AC%EB%9F%AC-%EA%B0%80%EC%A7%80-%EB%B0%A9%EB%B2%95)
  - [예시](#%EC%98%88%EC%8B%9C)
  - [웹펙의 babel-loader로 실행하기](#%EC%9B%B9%ED%8E%99%EC%9D%98-babel-loader%EB%A1%9C-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0)
  - [@babel/core 직접 이용](#babelcore-%EC%A7%81%EC%A0%91-%EC%9D%B4%EC%9A%A9)
  - [확장성과 유연성을 고려한 바벨 설정 방법](#%ED%99%95%EC%9E%A5%EC%84%B1%EA%B3%BC-%EC%9C%A0%EC%97%B0%EC%84%B1%EC%9D%84-%EA%B3%A0%EB%A0%A4%ED%95%9C-%EB%B0%94%EB%B2%A8-%EC%84%A4%EC%A0%95-%EB%B0%A9%EB%B2%95)
  - [extends 속성으로 다른 설정 파일 가져오기](#extends-%EC%86%8D%EC%84%B1%EC%9C%BC%EB%A1%9C-%EB%8B%A4%EB%A5%B8-%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)
  - [env 속성으로 환경별로 설정하기](#env-%EC%86%8D%EC%84%B1%EC%9C%BC%EB%A1%9C-%ED%99%98%EA%B2%BD%EB%B3%84%EB%A1%9C-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
  - [overrides 속성으로 파일별로 설정하기](#overrides-%EC%86%8D%EC%84%B1%EC%9C%BC%EB%A1%9C-%ED%8C%8C%EC%9D%BC%EB%B3%84%EB%A1%9C-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
  - [전체 설정 파일과 지역 설정 파일](#%EC%A0%84%EC%B2%B4-%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC%EA%B3%BC-%EC%A7%80%EC%97%AD-%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC)
  - [바벨과 폴리필](#%EB%B0%94%EB%B2%A8%EA%B3%BC-%ED%8F%B4%EB%A6%AC%ED%95%84)
  - [core-js 모듈의 모든 폴리필 사용하기](#core-js-%EB%AA%A8%EB%93%88%EC%9D%98-%EB%AA%A8%EB%93%A0-%ED%8F%B4%EB%A6%AC%ED%95%84-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [core-js 에서 필요한 폴리필을 직접 넣는 코드](#core-js-%EC%97%90%EC%84%9C-%ED%95%84%EC%9A%94%ED%95%9C-%ED%8F%B4%EB%A6%AC%ED%95%84%EC%9D%84-%EC%A7%81%EC%A0%91-%EB%84%A3%EB%8A%94-%EC%BD%94%EB%93%9C)
  - [@babel/preset-env 프리셋 이용하기](#babelpreset-env-%ED%94%84%EB%A6%AC%EC%85%8B-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0)
  - [바벨 플러그인 제작하기](#%EB%B0%94%EB%B2%A8-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%A0%9C%EC%9E%91%ED%95%98%EA%B8%B0)
    - [AST 문자 구조 들여다 보기](#ast-%EB%AC%B8%EC%9E%90-%EA%B5%AC%EC%A1%B0-%EB%93%A4%EC%97%AC%EB%8B%A4-%EB%B3%B4%EA%B8%B0)
    - [바벨 플러그인의 기본 구조](#%EB%B0%94%EB%B2%A8-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8%EC%9D%98-%EA%B8%B0%EB%B3%B8-%EA%B5%AC%EC%A1%B0)
    - [직접 제작한 플러그인을 사용하도록 설정하기](#%EC%A7%81%EC%A0%91-%EC%A0%9C%EC%9E%91%ED%95%9C-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8F%84%EB%A1%9D-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
- [웹팩](#%EC%9B%B9%ED%8C%A9)
  - [웹팩 초급편](#%EC%9B%B9%ED%8C%A9-%EC%B4%88%EA%B8%89%ED%8E%B8)
    - [웹팩 실행하기](#%EC%9B%B9%ED%8C%A9-%EC%8B%A4%ED%96%89%ED%95%98%EA%B8%B0)
    - [설정 파일 이용하기](#%EC%84%A4%EC%A0%95-%ED%8C%8C%EC%9D%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EA%B8%B0)
    - [로더 사용하기](#%EB%A1%9C%EB%8D%94-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
    - [자바스크립트 파일 처리하기](#%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%8C%8C%EC%9D%BC-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)
    - [CSS 파일 처리하기](#css-%ED%8C%8C%EC%9D%BC-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)
    - [기타 파일 처리하기](#%EA%B8%B0%ED%83%80-%ED%8C%8C%EC%9D%BC-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0)
    - [이미지 파일의 요청 횟수 줄이기](#%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%8C%8C%EC%9D%BC%EC%9D%98-%EC%9A%94%EC%B2%AD-%ED%9A%9F%EC%88%98-%EC%A4%84%EC%9D%B4%EA%B8%B0)
    - [프러그인 사용하기](#%ED%94%84%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
    - [html-webpack-plugin](#html-webpack-plugin)
    - [DefinePlugin](#defineplugin)
    - [ProvidePlugin](#provideplugin)
  - [웹팩 고급편](#%EC%9B%B9%ED%8C%A9-%EA%B3%A0%EA%B8%89%ED%8E%B8)
    - [나무 흔들기](#%EB%82%98%EB%AC%B4-%ED%9D%94%EB%93%A4%EA%B8%B0)
    - [나무 흔들기가 실패하는 경우](#%EB%82%98%EB%AC%B4-%ED%9D%94%EB%93%A4%EA%B8%B0%EA%B0%80-%EC%8B%A4%ED%8C%A8%ED%95%98%EB%8A%94-%EA%B2%BD%EC%9A%B0)
      - [동적 임포트 사용](#%EB%8F%99%EC%A0%81-%EC%9E%84%ED%8F%AC%ED%8A%B8-%EC%82%AC%EC%9A%A9)
    - [외부 패키지의 나무 흔들기](#%EC%99%B8%EB%B6%80-%ED%8C%A8%ED%82%A4%EC%A7%80%EC%9D%98-%EB%82%98%EB%AC%B4-%ED%9D%94%EB%93%A4%EA%B8%B0)
    - [바벨 사용시 주의 점](#%EB%B0%94%EB%B2%A8-%EC%82%AC%EC%9A%A9%EC%8B%9C-%EC%A3%BC%EC%9D%98-%EC%A0%90)
    - [코드 분할](#%EC%BD%94%EB%93%9C-%EB%B6%84%ED%95%A0)
    - [SplitChunksPlugin](#splitchunksplugin)
    - [util.js 모듈도 분활되도록 설정](#utiljs-%EB%AA%A8%EB%93%88%EB%8F%84-%EB%B6%84%ED%99%9C%EB%90%98%EB%8F%84%EB%A1%9D-%EC%84%A4%EC%A0%95)
    - [리액트 패키지 별도로 분할하도록 설정](#%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%8C%A8%ED%82%A4%EC%A7%80-%EB%B3%84%EB%8F%84%EB%A1%9C-%EB%B6%84%ED%95%A0%ED%95%98%EB%8F%84%EB%A1%9D-%EC%84%A4%EC%A0%95)
    - [동적 임포트](#%EB%8F%99%EC%A0%81-%EC%9E%84%ED%8F%AC%ED%8A%B8)
      - [webpack.config.js 내용 변경](#webpackconfigjs-%EB%82%B4%EC%9A%A9-%EB%B3%80%EA%B2%BD)
      - [html 파일 작성](#html-%ED%8C%8C%EC%9D%BC-%EC%9E%91%EC%84%B1)
      - [가독성 좋게 코드 변경](#%EA%B0%80%EB%8F%85%EC%84%B1-%EC%A2%8B%EA%B2%8C-%EC%BD%94%EB%93%9C-%EB%B3%80%EA%B2%BD)
    - [분할된 파일을 prefetch, preload로 빠르게 가져오기](#%EB%B6%84%ED%95%A0%EB%90%9C-%ED%8C%8C%EC%9D%BC%EC%9D%84-prefetch-preload%EB%A1%9C-%EB%B9%A0%EB%A5%B4%EA%B2%8C-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0)
      - [preload, prefetch 설정하기](#preload-prefetch-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0)
      - [html 결과](#html-%EA%B2%B0%EA%B3%BC)
    - [로더 제작하기](#%EB%A1%9C%EB%8D%94-%EC%A0%9C%EC%9E%91%ED%95%98%EA%B8%B0)
      - [csv 모듈을 사용하는 코드](#csv-%EB%AA%A8%EB%93%88%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%BD%94%EB%93%9C)
      - [웹팩 설정 webpack.config.js](#%EC%9B%B9%ED%8C%A9-%EC%84%A4%EC%A0%95-webpackconfigjs)
      - [my-csv-loader 설정](#my-csv-loader-%EC%84%A4%EC%A0%95)
    - [플러그인 제작하기](#%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%A0%9C%EC%9E%91%ED%95%98%EA%B8%B0)
      - [index 파일 작성](#index-%ED%8C%8C%EC%9D%BC-%EC%9E%91%EC%84%B1)
      - [webpack.config.js 작성](#webpackconfigjs-%EC%9E%91%EC%84%B1)
      - [플러그인 작성](#%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8-%EC%9E%91%EC%84%B1)

## 기본 설명

- 웹 애플리케이션을 제작할 경우 없어서는 안 되는 기반 기술 중 하나

> 기본 적 으로 설정해주는 것이 많지만 이해는 필요

    1. 제스트와 같은 테스트 프로그램
    1. 스토리북(storybook)과 같이 별도의 빌드 과정 필요
    1. 서버사이드 렌더링을 위해서 서버 측 코드를 빌드해야 할 때

## 바벨 실행 및 설정하기

- 바벨 설정을 제대로 이해하지 못하면 인터넷에 떠도는 바벨 설정을 무분별하게 가져오게 되는 경우가 많음
- 잘 가져오더라도 한 동안은 잘 돌아가는 것 처럼 보이지만 예상치 못한 부분에서 문제가 발생하기 마련

> 각자의 프로젝트에서 적함한 설정을 찾는 방법

- 폴리필에 대한 이해
  - 바벨과 폴리피의 관계를 이해하지 못하면 오래된 브라우저에서 에러가 발생하는 코드가 작성 될 가능성이 높음
  - core-js 패키지와 @babel/preset-env 프리셋을 통해 폴리필 관리 방법 학습

## 바벨을 실행하는 여러 가지 방법

1. @babel/cli
1. 웹펙에서 babel-loader
1. @babel/core 직접 설정
1. @babel/register 실행하기

- @babel/register 이용하면 노드에서 require 코드가 실행될 때 동적으로 바벨이 실행되게 할 수 있음
- 그러나 리엑트에서는 @babel/register를 이용할 일은 없으므로 제외

> 바벨

    입력과 출력이 모두 자바스크립트 코드인 컴파일러
    보통의 컴파일러
        고수준 -> 저수준
    초기의 바벨 : es6 -> es5
    지금의 바벨 : jsx, typescript, 코드 압축, 제안

> 설치

    npm i @babel/core @babel/cli @babel/plugin-transform-arrow-functions
    npm i @babel/plugin-transform-template-literals @babel/preset-react

## 예시

```js
const element = <div>babel test</div>;
const text = `element type is ${element.type}`;
const add = (a, b) => a + b;
```

1. 리액트 프리셋을 이용 -> JSX 문법을 변환할 예정
2. 템플릿 리터럴 플러그인 사용 -> 템플릿 리터럴 코드 변환
3. 화살표 함수 플러그인 -> 화살표 함수 변환

> 명령어

    npx babel src/code.js --presets=@babel/preset-react --plugins=@babel/plugin-transform-template-literals,@babel/plugin-transform-arrow-functions

- 출력 값

```js
const element = /*#__PURE__*/ React.createElement('div', null, 'babel test');
const text = 'element type is '.concat(element.type);

const add = function (a, b) {
  return a + b;
};
```

1. JSX -> createElement 함수 호출로 변환
1. template -> 문자열의 concat 메서드 호출로 변환
1. 화살표 함수 -> 일반 함수

- babel cli로 거의 모든 설정값을 표현할 수 있지만 설정할 내용이 많거나
- 실행환경에 따라 설정값이 다른 경우는 설정파일 따로 만드는 것이 좋음

- 바벨 6 까지는 [.babelrc]로 관리

  - 바벨 7 부터는 babel.config.js 파일로 관리

- Babel.config.js

```js
const presets = ['@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions',
];
module.exports = { presets, plugins };
```

> 컴파일된 결과를 파일로 저장하고 싶을 경우

    1. 파일 단위 처리
    npx babel src/code.js --out-file dist.js
    2. 폴더 단위 처리
    npx babel src --out-dir dist

## 웹펙의 babel-loader로 실행하기

> 설치

    npm i webpack webpack-cli babel-loader

```js
const path = require('path');

module.exports = {
  entry: './src/code.js',
    - 웹펙으로 번들링할 파일을 지정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'code.bundle.js',
  },
    - 번들링된 결과를 dist/code.bundle.js
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
    - 자바스크립트 파일을 babel-loader가 처리하도록 설정
    - 이전에 만들었던 Babel.config.js 파일의 내용을 설정값으로 사용
  },
  optimizer: { minimizer: [] },
    - 원래는 파일을 압축하는 것이 통상적이지만 실행되었는지 확을 위해 꺼둠
};
```

## @babel/core 직접 이용

```js
const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf-8');
// 컴파일할 파일의 내용을 가져온다.
const presets = ['@babel/preset-react'];
const plugins = [
  '@babel/plugin-transform-template-literals',
  '@babel/plugin-transform-arrow-functions',
];
// 바벨 플러그인과 프리셋을 설정
const { code } = babel.transformSync(source, {
  // transformSync 함수를 호출해서 바벨을 실행
  filename,
  presets,
  plugins,
  configFile: false,
  // babel.config.file을 사용하지 않도록함
});
console.log(code);
//로그로 출력
```

- 특징

  - 자유도가 높다는 장점을 가지고 있음
  - 같은 코드에 대해 두가지를 적용한다고 생각

- @babel/cli, babel-loader를 이용한다면 바벨을 두 번 실행해야함
- 하지만 @babel/core를 사용하면 **좀 더 효율적 코드** 작성 가능

> 바벨 컴파일 3단계

    1. 파싱(parsing) : 입력된 코드로부터 AST(abstract syntax tree) 생성
    1. 변환(transform) : AST를 원하는 형태로 변환
    1. 생성(generate) : AST를 코드로 출력

- AST
  - 코드의 구문(syntax)이 분석된 결과를 담고 잇는 구조체
  - 코드가 같다면 AST도 같기 때문에 같은 코드에 대해서 하나의 AST 만들어놓고 재사용 가능

## 확장성과 유연성을 고려한 바벨 설정 방법

- 바벨 설정 파일에서 사용할 수 있는 extends, env, overrides

- extends 속성을 이용하면 다른 설정 파일을 가져와서 확장 가능
- env, overrides 속성을 이용하면 환경별 또는 파일별로 다른 설정 가능

> npm i @babel/core @babel/cli @babel/plugin-transform-arrow-functions @babel/plugin-transform-template-literals @babel/preset-react babel-preset-minify

## extends 속성으로 다른 설정 파일 가져오기

- 먼저 프로젝트 루트에 common 폴더를 만들고 그 밑에 .babelrc 파일을 만든다.

```js
{
  "presets": ["@babel/preset-react"],
  "plugins": [
    [
      "@babel/plugin-transform-template-literals",
      {
        "loose": true
      }
    ]
  ]
}
```

- 플러그인에 옵션을 설정할 때는 배열로 만들어서 두 번째 자리에 옵션을 넣음
- 템플릿 리터럴 플러그인에 loose 옵션을 주면 문자열을 연결할 때 concat 메스드 대신 + 연산자를 사용한다.
- 프로젝트 루트에 src 폴더를 만들고 src 폴더 밑에 example-extends 생성

```js
{
  "extends": "../../common/.babelrc",
  "plugins": [
    "@babel/plugin-transform-arrow-function",
    "@babel/plugin-template-literals"
  ]
}
```

- extends 속성을 이용해서 다른 파일에 있는 설정을 가져온다.
- 가져온 설정에 플러그인을 추가한다.
- 템플릿 리터럴 플러그인은 가져온 설정에 이미 존재한다.
- 이때 플러그인 옵션은 현재 파일의 옵션으로 결정된다.

> extends로 가져온 플러그인을 재 사용하면 플러그인 사라짐

## env 속성으로 환경별로 설정하기

```js
{
  "presets": ["@babel/preset-react"],
  "plugins": [
    "@babel/plugin-transform-template-literals",
    "@babel/plugin-transform-arrow-functions"
  ],
  "env": {
    "production": {
      "presets": ["minify"]
    }
  }
}

```

- env 속성을 이용하면 환경별로 다른 설정을 줄 수 있음
- 프로덕션 환경에서는 압축 프리셋을 사용하도록 설정

  - "presets" : ["minify"]
  - 앞에서 추가한 프리셋은 유지되고 압축 프리셋이 추가되는 형태

- 바벨에서 현재 환경은 다음과 같이 결정됨
  - process.env.BABEL_ENV || process.env.NODE_ENV || "development"

> 개발 모드의 압축 프리셋 사용

    NODE_ENV=production npx babel ./src/example-env

- 위의 경우 압축 프리셋이 적용이 되어서 코드를 읽기 힘들다.

## overrides 속성으로 파일별로 설정하기

- src 폴더 밑에 example-overrides 폴더를 만든다.
- example-overrides 폴더 밑에 .babelrc 파일을 만든 다음 내용을 입력

```js
{
    // 리액트 프리셋, 템플릿 리터럴 플러그인 설정
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-template-transform-template-literals"],

  "overrides": {
    "include": "./service1",
    "exclude": "./service1/code2.js",
    "plugins": ["@babel/plugin-transform-arrow-functions"]
  }
}
```

- example-overrides : 폴더 밑에 .babelrc 파일을 만든 다음 내용을 입력
- exclude 로 설정한 파일들은 플러그인을 따로 설정할 수 있다는 것이 특징이다.

> overrides -> 파일별로 다른 설정이 가능하다는 것이 특징적

## 전체 설정 파일과 지역 설정 파일

- 바벨 설정 파일 종류
  1. 전체(project-wide) 설정 파일 : 모든 js 파일에 적용
  1. 지역(file-relative) 설정 파일 : 파일의 경로에 따라 결정

> 설치

    npm i @babel/core @babel/cli
    npm i @babel/plugin-transform-template-literals
    npm i @babel/plugin-transform-arrow-functions
    npm i @babel/preset-react

> .babelrc, .babelrc.js, package.json 이 지역 설정 파일

> 지역 바벨 설정의 특징

    package.json, babelrc, .babelrc.js 파일을 만날 때 까지 부모 폴더로 이동한다.
    src/service1/.babelrc 파일을 만났고 그 파일이 지역 설정 파일

> 프로젝트 루트 바벨

    루트 경로의 babel.config.js 파일이 전체 설정 파일

- 전체 설정 파일과 지역 설정 파일을 병합하게 됨
  이 경우 지역 설정 파일이 전체 설정을 덮어쓰게 된다.

## 바벨과 폴리필

- js의 최신 기능을 모두 사용하면서 오래된 브라우저를 지원하기 위해서는
- 바벨로 코드 문법을 변환하는 동시에 **폴리필**도 사용해야함

> 폴리필 - polyfill

    런타임에 기능을 주입하는 것을 말함
    런타임에 기능이 있는지 검사 -> 기능이 없는 경우에만 주입

> 오해하기 쉬운 점!!!

    바벨을 사용하더라도 폴리필에 대한 설정을 별도로 해야함
    ES8에 추가된 String.padStart 메서드는 폴리필을 이용해서 추가가능
    async await는 폴리필로 추가할 수 없음
    컴파일 타밈에서 코드를 변환해야 함

```js
if (!String.prototype.padStart) {
  String.prototype.padStart = func; // func는 padStart 폴리필 함수
}
```

## core-js 모듈의 모든 폴리필 사용하기

- core-js는 바벨에서 폴리필을 위해 공식적으로 지원하는 패키지
- 간단한 사용법은 core-js 모듈을 자바스크립트 코드로 불러오는 것

> core-js 모듈을 가져오면 해당 모듈의 모든 폴리필이 포함

    낮은 버전의 브라우저에서도 promise, Object.values 배열의 includes 메서드를 사용할 수 있다.

```js
import 'core-js';

const p = Promise.resolve(10);
const obj = {
  a: 10,
  b: 20,
  c: 30,
};
```

> core-js 모듈을 가져오면 해당 모듈의 모든 폴리필이 포함

    낮은 버전의 브라우저에서도 메서드 사용가능

- core-js의 경우 사용법이 간단하지만 필요하지 않은 폴리필까지 포함됨
  - 민감하지 않은 프로젝트에서 사용하기 좋다는 의미가 있음

## core-js 에서 필요한 폴리필을 직접 넣는 코드

```js
import 'core-js/features/promise';
import 'core-js/features/object/values';
import 'core-js/features/array/includes';

const p = Promise.resolve(10);
const obj = {
  a: 10,
  b: 20,
  c: 30,
};
const arr = Object.values(obj);
const exist = arr.includes(20);
```

> core-js 모듈은 폴리필을 추가하는 과정이 번거롭다.

    필요한 폴리필을 깜빡하고 포함시키지 않는 경우가 존재
    그러므로 크기에 민감한 프로젝트에는 적합하다.

## @babel/preset-env 프리셋 이용하기

- @babel/preset-env 프리셋은 실행 환경에 대한 정보를 설정해주면 자동으로 필요한 기능을 주입해 줌
- babel.config.js 파일에 필요한 내용을 입력하면 특정 버전의 브라우저를 위한 플러그인만 포함

```js
const presets = [
  '@babel/preset-env',
  {
    targets: '> 0.25%, not dead',
    // 0.25% 이상이고 업데이트가 종료되지 않은 브라우저를 입력
  },
];

module.exports = { presets };
```

- browserslist 패키지의 문법을 사용하여 브라우저 정보를 포함

> npm i @babel/core @babel/cli @babel/preset-env core-js

```js
const presets = [
  [
    // @babel/preset-env 프리셋을 사용
    '@babel/preset-env',
    {
      targets: {
        // 크롬 최소 버전 40
        chrome: '40',
      },
      // 폴리필
      useBuiltIns: 'entry',
      // 바벨에게 필요한 core-js 버전을 알려줌
      corejs: { version: 3, proposals: true },
    },
  ],
];

module.exports = { presets };
```

- useBuiltIns : 폴리필과 관련된 설정
  - entry를 입력하면 지원하는 브라우저에서 필요한 폴리필만 포함

```js
import 'core-js';

const p = Promise.resolve(10);
const obj = {
  a: 10,
  b: 20,
  c: 30,
};

const arr = Object.values(obj);
const exist = arr.includes(20);
```

- 위의 코드를 그냥 core-js 를 사용하면 모듈을 가져오는 코드가 수십줄에 걸쳐서 출력
- 출력 폴리필은 크롬 40 버전에서 없는 기능을 위함
- 실제로 사용한 기능에 비해서 불필요하게 많은 폴리필 코드가 추가 됨
- useBuiltIns 속성에 usage를 입력하면 코드에서 사용된 기능의 폴리필만 추가된다.

> usage를 입력할 때는 core-js 모듈을 가져오는 코드가 필요하지 않다.

    Babel.config.js 코드에 useBuiltIns -> usage
    useBuiltIns: 'usage',

- 파일에 코드와 관련된 세개의 폴리필 추가
- includes -> 바벨이 코드에서 변수의 타입을 추론 불가

  - typescript를 사용한다면 이 문제는 해결 될 수 있다.

- 크롬 버전을 올려 보면서 바벨을 실행하면 폴리필의 개수가 줄어듬
- 번들 파일의 크기를 최적화 할 목적이라면 필요한 폴리필을 직접 추가하는 방식이 가장 좋음

> 적당한 번들 파일의 크기를 유지하면서 폴리필 추가를 깜빡하는 실수를 막고 싶다

    @babel/preset-env 가 좋은 선택

## 바벨 플러그인 제작하기

- 바벨은 프리셋과 플러그인을 누구나 제작할 수 있도록 API 제공

### AST 문자 구조 들여다 보기

- 바벨은 문자열로 입력되는 코드를 AST(abstract syntax tree)라는 구조체로 만들어서 처리
- 플러그인에서는 AST를 기반으로 코드를 변경
- 플러그인 제작 -> AST 구조를 이해해야 가능

[astexplore](https://astexplorer.net/)

> 위의 사이트에 가서 원하는 문장을 입력 후 parser를 보면 됨

- AST 각 노드는 type 속성이 있음
  - 타입 종류는 너무 많기 때문에 모두 나열하는 것은 의미가 없고
  - 필요할 때 마다 문서를 찾거나 사이트에서 직접 확인하는 식으로 사용하면 됨

### 바벨 플러그인의 기본 구조

- 바벨 플러그인은 하나의 자바스크립트 파일로 만들 수 있음

```js
module.exports = function ({ types: t }) {
  -1;
  const node = t.BinaryExpression('+', t.Identifier('a'), t.Identifier('b'));
  console.log('isBinaryExpression: ', t.isBinaryExpression(node));
  return {};
};
```

1. types 매개변수를 가진 함수를 내보냄
1. types 매개변수를 이용해서 AST 노드를 생성 가능
   1. 위의 코드는 두 변수의 덧셈을 AST 노드로 만듬
1. types 매개변수는 AST 노드의 타입을 검사하는 용도로 사용
1. 빈 객체를 반환하면 아무일도 하지 않음

```js
module.exports = function ({ types: t }) {
  return {
    visitor: { -1
      Identifier(path) { -2
        console.log('Identifier name:', path.node.name);
      },
      BinaryExpression(path) {
        console.log('BinaryExpression operator:', path.node.operator);
      },
    },
  };
};
```

1. visitor 객체 내부에서 노드의 타입 이름으로 된 함수를 정의 가능
2. 해당 하는 타입의 노드가 생성되면 같은 이름의 함수가 호출
   - const v1 = a + b;
   - 3 번 호출
3. Identifier
   - const v1 = a + b;
   - 한 번 호출

> 설치

    npm i @babel/core @babel/cli

- 사이트에 들어가서 AST를 들어가서 다음과 같음

1. 콘솔 로그 코드 : ExpressionStatement 노드로 시작
2. 함수 또는 메서드를 호출하는 코드는 CallExpression 노드로 만들어줌
3. 메서드 호출은 CallExpression 노드 내부에서 MemberExpression 노드로 만들어짐
   AST 구조를 이용해 콘솔 로그를 제거하는 플러그인을 작성

> 콘솔로그의 AST

```json
{
  "type": "Program",
  "start": 0,
  "end": 18,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 18,
      "expression": {
        "type": "CallExpression",
        "start": 0,
        "end": 18,
        "callee": {
          "type": "MemberExpression",
          "start": 0,
          "end": 11,
          "object": {
            "type": "Identifier",
            "start": 0,
            "end": 7,
            "name": "console"
          },
          "property": {
            "type": "Identifier",
            "start": 8,
            "end": 11,
            "name": "log"
          },
          "computed": false,
          "optional": false
        },
        "arguments": [
          {
            "type": "Literal",
            "start": 12,
            "end": 17,
            "value": "asd",
            "raw": "'asd'"
          }
        ],
        "optional": false
      }
    }
  ],
  "sourceType": "module"
}
```

- 콘솔 로그를 제거하는 플러그인 코드

```js
module.exports = function ({ types: t }) {
  return {
    visitor: {
      ExpressionStatement(path) {
        if (t.isCallExpression(path.node.expression)) {
          if (t.isMemberExpression(path.node.expression.callee)) {
            const memberExp = path.node.expression.callee;
            if (
              memberExp.object.name === 'console' &&
              memberExp.property.name === 'log'
            ) {
              path.remove();
              // ... (모든 괄호 닫기)
            }
          }
        }
      },
    },
  };
};
```

- 나오는 ast 설정을 가지고 플러그인을 설정하면 됨

> function에 types를 제대로 설정해줘야함

### 직접 제작한 플러그인을 사용하도록 설정하기

- 모든 함수에 콘솔 로그를 추가해 주는 플러그인을 제작
- AST 구조를 먼저 파악하는 것이 중요

```json
{
  "type": "Program",
  "sourceType": "script",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "f1"
      },
      "params": [
        {
          "type": "Identifier",
          "name": "p1"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "VariableDeclaration",
            "kind": "let",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "v1"
                },
                "init": null
              }
            ]
          }
        ]
      },
      "async": false,
      "generator": false
    }
  ]
}
```

```js
module.exports = function ({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(path) { -1-
        if (path.node.id.name.substr(0, 2) === 'on') { -2-
          path
            .get('body')
            .unshiftContainer( -3-
              'body',
                -5-
              t.expressionStatement(
                t.callExpression(
                  t.memberExpression(
                    t.identifier('console'),
                    t.identifier('log')
                  ),
                  [t.stringLiteral(`call ${path.node.id.name}`)]
                )
              )
            );
            -5-
        }
      },
    },
  };
};
```

1. 노드 생성시 호출되는 함수를 정의
1. 함수 이름이 on으로 시작하는지 검사
   ```js
   path.node.id.name.substr(0, 2) === 'on';
   ```
1. body 배여릐 앞쪽에 노드를 추가하기 위해 unshiftContainer 메서드 호출
1. 콘솔 로드 노드 생성
   ```js
   console.log(`call ${함수 이름}`);
   ```

# 웹팩

## 웹팩 초급편

- 웹펙 = 모듈 번들러

> 모듈 : 각 리소스 파일을 말함
> 번들 : 웹팩 실행 후 나오는 결과 파일

- 하나의 번들 파일은 여러 모듈로 만들어짐
- 웹팩을 이용하면 우리가 제작한 여러가지 리소스를 사용자에게 전달하기 좋은 형태로 만들 수 있음

> 웹팩 필요의 이유

    2000년대 초반의 웹 페이지는 페이지가 바뀔 때 마다 새로운 HTML을 요청해서
    화면에 그리는 방식이였음
    자바스크립트는 돔을 조작하는 돔을 조작하는 간단한 역할 -> HTML script 태그에
    넣는 것 만으로 모든 역할을 수행 가능

- 다른 script를 이용해서 js 파일을 다운받게 할 경우 실수로 인해서 오작동을 일으킬 수 있다.

### 웹팩 실행하기

> 설치

    npm i webpack webpack-cli

- webpack-cli 를 이용하면 CLI(command line interface)에서 휍팩을 실행 가능

> webpack-cli 를 이용하지 않고 코드를 통해 직접 실행할 수도 있음

    cra나 next.js와 같은 프레임워크에서는 세밀하게 웹팩을 다뤄야 하므로
    webpack-cli를 이용하지 않고 코드에서 직접 실행을 함

### 설정 파일 이용하기

- webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js', -1-
    -2-
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
    -2-
  mode: 'production',    -3-
  optimization: { minimizer: [] }, -4-
};
```

1. index.js 모듈을 입력 파일로 사용
1. dist 폴더 밑에 main.js 번들 파일을 생성
1. 프로덕션 모드로 설정시 자바스크립트 코드 압축을 포함한 여러가지 최적화 기능이 기본으로 들어감
1. 번들 파일의 내용을 쉽게 사용하기 위해 압축하지 않도록 설정

> 웹팩의 경우 사용자의 실행환경에 따라서 달라질 수 있음

### 로더 사용하기

- 로더(loader)는 모듈을 입력으로 받아서 원하는 형태로 변환한 후 새로운 모듈을 출력
- 자바스크립트 파일뿐만 아닌 이미지, css, csv 모든 파일 가능
- 몇 가지 로더를 살펴보면서 다양한 형태의 모듈이 어떻게 처리될 수 학습

> npm i webpack webpack-cli

### 자바스크립트 파일 처리하기

> 자바스크립트 파일 처리 -> babel-loader

> 설치

    npm i babel-loader @babel/core @babel/preset-react react react-dom

- react 파일 만들기

```js
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="container">
      <h3 className="title">webpack example</h3>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

- @babel/presets 설정

```js
const presets = ['@babel/preset-react'];
module.exports = { presets };
```

- webpack.config.js 설정

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
-1-
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
-1-
  mode: 'production',
};
```

1. js 확장자를 갖는 모듈은 babel-loader가 처리하도록 설정
   - 웹팩을 실행하면 dist 폴더 밑 main.js 생김
   - html 까지 설정을 해줘야 제대로 동작하게 됨

- babel-loader를 설정하지 않고 웹팩을 실행하게 되면 웹팩이 jsx 문법을 이해하지 못해 오류가 생김

### CSS 파일 처리하기

> 설치

    npm i css-loader

> npm i css-loader

- css를 처리 하는 모듈이 없으면 오류가 생기기 때문에
  - webpack.config.js 파일에 코드 추가

```js
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      },
    ],
  },
```

- 위와 같이 설정하면 css의 모듈의 내용은 보이지만 적용이 되지 않은 상태
- 스타일에 실제로 적용하기 위해서는 style-loader가 필요

> 설치

    npm i style-loader

```js
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
},
```

- 로더를 배열로 입력하면 오른쪽 로더부터 실행
- style-loader는 css-loader가 생성한 css 데이터를 style 태그로 만들어서 HTML, head에 삽입
- 번들 파일이 실행되다가 에러가 발생 -> style 태그가 삽입되지 않을 수 있음
- css module 을 사용하면 스타일 코드를 지역화 가능

> css-module : css-loader가 제공해주는 기능

    css-loader는 css 코드에서 사용된 @import, uri()등의 처리도 담당

### 기타 파일 처리하기

- Png, Json, txt 파일에 대한 처리

- JSON의 경우 웹팩 모듈에서 기본적으로 처리해주기 때문에 별도의 로더를 설치하지 않아도 괜찮음
- 하지만 txt, png 의 경우 file-loader, raw-loader 설치하여 처리

> file-loader

    모듈의 내용을 그대로 복사해서 dist 폴더 밑 복사본을 생성
    모듈을 사용하는 쪽에는 해당 모듈의 경료를 넘겨줌

> raw-loader

    모듈의 내용을 그대로 자바스크립트 코드로 가져옴

- webpack.config.js 에 해당 내용 추가

```js
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
```

### 이미지 파일의 요청 횟수 줄이기

- 이미지 파일을 번들 파일에 포함시키면 브라우저의 파일 요청 횟수를 줄일 수 있음
- but 파일 크기가 너무 커지면 자바스크립트가 늦게 실행됨
- url-loader를 이용해 작은 크기의 이미지만 번들 파일에 포함

> 설치

    npm i url-loader

```js
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000000,
            },
          },
        ],
      },
```

- url-loader
  - 파일 크기가 설정 값 보다 작을 경우 번들 파일에 파일의 내용을 포함 시킴
  - 만약 파일 크기가 이 값보다 클 경우 다른 로더가 처리할 수 있도록 fallback 옵션 제공
  - fallback 옵션을 입력하지 않으면 file-loader가 처리하게 되어있음
  - limit 옵션에 파일 크기 보다 큰 값을 입력하면 파일의 경로가 아니라 데이터가 입력된 것을 확인 가능

### 프러그인 사용하기

- 플러그인은 로더보다 강력한 기능을 가짐
- 로더 : 특정 모듈에 대한 처리만 담당
- 플러그인 : 웹팩이 실행되는 전체 과정에 개입 가능

> 설치

    npm i webpack webpack-cli
    npm i @babel/core @babel/preset-react babel-loader react react-dom

- 바벨 로더를 사용하도록 설정하기

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',     -1-
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        -2-
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        -2-
        },
      },
    ],
  },
  mode: 'production',
};
```

1. chunkhash를 사용하면 파일의 내용이 수정될 때 마다 파일 이름이 변경되도록 가능
1. 자바스크립트 모듈을 처리가능하게 babel-loader를 설정
   - babel.config.js 파일로 바벨 설정 가능하지만
   - babel-loader 에서 직접 바벨 설정도 가능
   - babel.config.js 가 없어도 되는 장점이 존재!!!

### html-webpack-plugin

- 웹팩을 실행해서 나오는 결과물을 확인하기 위해서는 HTML 파일 수동 작성
- 위에서 chunkhash 옵션을 설정하였기 때문에 파일 변경 -> HTML 변경
- 이 작업 자동 : html-webpack-plugin

> 설치

    npm i clean-webpack-plugin html-webpack-plugin

- clean-webpack-plugin : 웹팩을 실행할 때마다 dist 폴더를 정리

  - 번들 파일의 내용이 변경될 때 마다 파일 이름도 변경되기 때문에
  - 이전에 생성된 번들 파일을 정리하는 용도로 사용

- 플러그인 옵션 추가

```js
  plugin: [
    new CleanWebpackPlugin(), -1-
    -2-
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
    -2-
  ],
```

1. 웹팩이 실행될 때 마다 dist 폴더를 정리 하도록 clean-webpack-plugin 설정
1. index.html 파일이 자동으로 생성 되도록 html-webpack-plugin 설정
   - 우리가 원하는 형태를 기반으로 index.html 파일이 생성되도록 template 옵션 설정

- html 파일에 기타 필요한 태그를 파일에 추가하면 html-webpack-plugin 이 생성하는 새로운 HTML 파일에 같이 포함됨

### DefinePlugin

- 모듈 내부에 있는 문자열을 대체
- 플러그인은 웹팩에 내장된 플러그인 -> 별도 설치가 필요없다.
- DefinePlugin으로 대체할 문자열을 index.js 파일에 추가

```js
    new webpack.DefinePlugin({
      APP_VERSION: '"1.2.3"',
      TEN: '10',
    }),
```

- 위와 같이 설정하고 싶은 문자열을 저렇게 집어 넣으면 된다.
- 문자열의 경우 '"이런 형식"' 을 지키는 것을 유의

### ProvidePlugin

- 자주 사용하는 모듈은 import 키워드를 사용해서 가져오는 것이 귀찮을 수 있음

```js
import React from 'react';
import $ from 'jquery';
```

> 착각하는 실수

    JSX 모듈을 사용하면 리액트 모듈을 사용하지 않는다고 느낄 수 있음
    But 바벨이 JSX 문법을 React.createElement 코드로 변환 -> 리액트 모듈 필요
    JSX 문법을 사용하는 파일을 작성한다면 import React롤 적어야 함

- ProvidePlugin 기능을 사용하면 미리 설정한 모듈을 자동으로 등록
- 웹팩이 기본적으로 내장되어 있기 때문에 별도로 설치할 필요 없음
- ProvidePlugin 기능을 확인하기 위해 index.js 수정

- plugins 쪽 코드이다.

```js
    new webpack.ProvidePlugin({
      React: 'react',
      $: 'jquery',
    }),
```

## 웹팩 고급편

- 웹팩을 이용해 애플리케이션의 번들 파일 최적화
- 로더와 플러그인 직접 제작하면서 웹팩이 내부적으로 어떻게 동작하는지 학습

### 나무 흔들기

- Tree shaking : 불필요한 코드를 제거해주는 기능
- 웹팩은 기본적으로 나무 흔들기 기능을 제공
  - but 웹팩이 기본적으로 모든 경우를 잘 처리 해주면 좋겠지만
  - 아닌 경우가 존재 하므로 학습
  - 나무 흔들기를 잘 이해하고 있어야 번들 파일의 크기를 최소로 유지할 수 있음

> 설치

    npm i webpack webpack-cli

```js
export function func1() {
  console.log('func1');
}
export function func2() {
  console.log('func2');
}
```

- ESM(ECMA script Modules) 문법을 사용하는 코드
- ESM은 자바스크립트 표준 모듈 시스템
  - import export 등의 키워드를 사용

```js
function func1() {
  console.log('func1');
}
function func2() {
  console.log('func2');
}

module.exports(func1, func2);
```

- 위는 common.js
- module.exports, require 등의 키워드를 많이 사용
- commonJS 문법은 노드에서 많이 사용

```js
import { func1 } from './util_esm';

func1();
```

- ESM 문법으로 작성된 모듈은 ESM 문법으로 가져오고 있음
- func1 함수만 사용하고 func2에 대해서는 사용을 하지 않았음
  - 그 결과 나무 흔들기로 func2 제거

### 나무 흔들기가 실패하는 경우

- index.js 파일에서 commonjs.js 사용

- 둘 의 차이점
  - common : module.exports
  - export function

> export function , export module 차이

    commonJS와 esm 차이이다.
    commonJS : module.export
    ESM : ECMAscript Modules

> 나무 흔들기가 동작되지 않는 경우

    1. 사용되는 모듈이 ESM이 아닌 경우
    2. 사용하는 쪽이 ESM이 아닌 다른 모듈 사용
    3. 동적(dynamic import)를 사용하는 경우

#### 동적 임포트 사용

```js
import('./util_esm').then((util) => util.func1());
```

- 동적 임포트를 사용 -> 동적으로 모듈을 가져올 수 있음
- But 동적 임포트 사용 -> 나무 흔들기 동작 X

- util_esm.js 모듈의 func2 함수를 사용하지 않는다고 무조건 제거시 문제 생김
  - 모듈 내부에서 자신의 함수를 호출하는 경우 웹팩이 해당 함수 제거 x

```js
const arr = [];
export function func1() {
  console.log('func1', arr.length);
}
export function func2() {
  arr.push(10); //  -1-
  console.log('func2');
}
func2(); // -2-
```

1. func2 함수는 전역 변수를 변경
2. 모듈이 평가(evaluation) 될 때 func2 함수가 실행
   - 모듈은 최초로 사용될 때 한 번 평가
   - 최초 평가 시 전역 변수 arr가 변경
   - 만약 나무 흔들기 단계에서 func2가 제거되면 func1 의도대로 동작 x

- 그러나 웹팩은 모듈이 평가되는 단계에서는 호출되는 함수를 제거 하지 X

### 외부 패키지의 나무 흔들기

- 외부 패키지에 대해서도 나무 흔들기가 적용됨
- But 외부 패키지는 저마다 다양한 방식의 모듈 시스템을 사용하기 때문에
- 나무 흔들기가 제대로 동작하지 않을 수 있음

- 예로 로다시 패키지 -> ESM이 아님

  - 나무 흔들기를 적용하여도 코드가 제거되지 않음

- lodash의 잘못된 사용 예

```js
import { fill } from 'lodash'; // -1-
const arr = [1, 2, 3];
fill(arr, 'a');
```

1. 여기서는 로다시의 fill 함수만 사용되지만 웹팩으로 만들어진 번들 파일에는 모든 로다시의 코드가 포함
   - 로다시는 각 함수를 별도의 파일로 만들어서 제공해줌
   - 그러므로 다음과 같이 특정 함수 모듈 추출 가능

- lodash 사용의 옮은 예

```js
import fill from 'lodash/fill';
```

> lodash 에서는 ESM 모듈 시스템을 사용하는 lodash-es 패키지를 별도로 제공

    import {fill} from 'lodash-es';

- lodash-es 모듈을 가져오는 경우에는 나무 흔들기가 제대로 적용

> 자신이 사용하는 패키지에 적용된 모듈 시스템이 무엇인지

    ESM이 아니라면 각 별도의 파일로 적용하는지의 여부를 파악해야 번들의 크기를 줄일 수 있음

### 바벨 사용시 주의 점

- 작성한 코드가 바벨로 컴파일 이후 ESM 문법으로 남아있어야함
- @babel/preset-env 플러그인을 사용한다면 babel.config.js 에서 다음과 같이 설정

```js
const presets = [
  [
    '@babel/preset-env',
    {
      modules: false, // -1-
    },
  ],
];
```

1. 모듈 시스템을 변경하지 않도록 설정
   - ESM 문법으로 컴파일된 코드는 웹팩에서 자체적으로 사용후 제거
   - 오래된 브라우저에 대한 걱정은 하지 않아도 괜찮음

### 코드 분할

- 애플리케이션의 전체 코드를 하나의 번들 파일로 만드는 것은 좋은 생각이 아닐 수 있음
- 불필요한 코드까지 전송되어 사용자의 요청으로부터 페이지가 랜더링 될 때 까지 시간이 오래 소요가 될 수 있음

> 번들 파일을 하나만 만들면 관리 부담이 적어지기 때문에 회사 내부 직원용 어플로는 적합

> 많은 사용자를 타겟으로 하는 서비스라면 응답 시간을 최소화 하기 위해 코드를 분활하는게 좋음

> 설치

    npm i webpack-cli react lodash clean-webpack-plugin

- 코드를 분활하는 가장 직관적 방법 : 웹팩의 entry 설정 값에 페이지별로 파일을 입력
- 두 개의 페이지를 가진 간단한 프로그램 작성

- 각 페이지 별로 entry 설정

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // -1-
  entry: {
    page1: './src/index1.js',
    page2: './src/index2.js',
  },
  // -1-
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new CleanWebpackPlugin()], //-2-
  mode: 'production',
};
```

1. 각 페이지의 자바스크립트 파일을 entry로 입력한다.
1. dist 폴더를 정리하기 위해 clean-webpack-plugin 사용한다.

### SplitChunksPlugin

- 웹팩에서는 코드 분할을 위해 SplitChunksPlugin을 기본적으로 내장
- 별도의 패키지를 설치하지 않고 설정 파일을 조금 수정하는 것 만으로 코드 분활 가능

```js
  entry: {
    page1: './src/index1.js', // -1-
  },
  optimization: {
    splitChunks: { // -2-
      chunks: 'all', // -3-
      name: 'vendor',
    },
  },
```

1. 이해가 쉽도록 하나의 페이지만 생성
1. optimization의 splitChunks 속성을 이용하면 코드를 분활할 수 있음
1. chunks 속성의 기본값 : 동적 임포트만 분할하는 async
   - 우리는 전체 코드 분할을 원하기 때문에 all로 설정

- 위의 상태로 웹팩을 비드하면 로다시와 리액트 모듈은 vendor.js 파일로 생성
- util.js 모듈은 파일의 크기가 작기 때문에 page1.js 파일에 포함
- splitChunks 속성을 제대로 이해하기 위해 기본값의 이해 필요

```js
module.exports = {
    optimization : {
        splitChunks: {
            chunks: 'async',    //-1-
            minSize: 30000,    // -2-
            minChunks: 1,    //-3-
            cacheGroups: {    //-4-
                default: {
                    minChunks: 2,    //-5-
                    priority: -20,
                    reuseExistingChunk = true,
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                }
            }
        }
    }
}
```

1. 동적 임포트만 코드를 분활하도록 설정
2. 파일 크기가 30kb 이상인 모듈만 분할 대상
3. 한 개 이상의 청크(chunk)에 포함되어 있어야 함
4. 파일 분할은 그룹별로 이루어짐

   - 기본적으로 외부 모듈(vendor) 내부 모듈 (default)로 설정
   - 외부 모듈 : 내부 모듈보다 비교적 낮은 비율로 코드 변경
   - 오래 캐싱된다는 장점이 존재

5. 내부 모듈은 두 개 이상의 번들 파일에 포함되어야 분할 됨

### util.js 모듈도 분활되도록 설정

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 10, // -1-
      minChunks: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 2,
          name: 'venders',
        },
        defaultVendors: {
          minChunks: 1, // -2-
          priority: 1,
          name: 'default',
        },
      },
    },
  },
};
```

1. 파일 크기에 제한에 걸리지 않도록 늦은 값을 설정
2. 정크 개수 제한을 최소 한 개로 설정
   - 이 상태로 웹팩을 실행하면 page1.js vendors.js default.js 세개의 번들 파일 생성
   - util.js -> default.js 에 포함

### 리액트 패키지 별도로 분할하도록 설정

```js
module.exports = {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        name: 'react.bundle',
        priority: 2, //-1-
        minSize: 100,
      },
    },
  },
};
```

- 우선 순위가 높아야 리액트 모듈이 vendors 그룹에 들어가지 않음

### 동적 임포트

- 동적 임포트(dynamic import)는 동적으로 모듈을 가져올 수 있는 기능
- 웹팩에서 동적 임포트를 사용하면 해당 모듈의 코드는 자동 분할
- 오래된 브라우저에서도 동작을 잘함!!!
  - 동적 임포트는 자바스크립트 표준이 될 것이 거의 확실

```js
function myFunc() {
  import('./util').then(
    (
      { add } // -1-
    ) =>
      import('lodash').then(({ default: _ }) =>
        console.log('value', _.fill([1, 2, 3], add(10, 20)))
      )
  );
}

myFunc();
```

1. import 함수를 사용하면 동적으로 모듈을 가져올 수 있음

> import

    promise 객체를 반환하기 때문에 then 메서드로 연결할 수 있다.
    index3.js 파일의 번들링을 위해 webpack.config.js 파일을 다음과 같이 수정

#### webpack.config.js 내용 변경

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    page3: './src/index3.js',
  },
  output: {
    filename: '[name].chunk.js',
    chunkFilename: '[name].chunk.js', // -1-
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new CleanWebpackPlugin()],
  mode: 'production',
};
```

1. chunkFilename 속성 이용해서 동적 임포트로 만들어지는 번들 파일의 이름 설정
   - 웹팩을 실행하면 page3.js, 1.chunk.js, 2.chunk.js 생성
   - 청크 파일에는 util.js 모듈과 로다시 모듈 파일 들어감
   - 웹팩 런타임 코드는 page3.js 파일에만 들어감

#### html 파일 작성

```html
<html>
  <body>
    <script type="text/javascript" src="./page3.js"></script>
    //-1-
  </body>
</html>
```

1. page3.js 의 내용만 script로 들어가면 된다.
   - 다른 두 파일의 경우 page3.js가 실행되면서 동적으로 임포트가 됨

#### 가독성 좋게 코드 변경

- 아래의 경우 좀 가독성이 떨어짐 .then ->

```js
function myFunc() {
  import('./util').then(({ add }) =>
    import('lodash').then(({ default: _ }) =>
      console.log('value', _.fill([1, 2, 3], add(10, 20)))
    )
  );
}

myFunc();
```

- import 함수가 promise를 반환하기 때문에 index3.js 파일을 아래와 같이 수정 가능

```js
async function myFunc() {
  const [{ add }, { default: _ }] = await Promise.all([
    //-1-
    import('./util'),
    import('lodash'),
  ]);
  console.log('value', _.fill([1, 2, 3], add(30, 20)));
}
myFunc();
```

1. Promise.all 함수를 이용해서 두 모듈을 동시에 가져옴

### 분할된 파일을 prefetch, preload로 빠르게 가져오기

- myFunc 함수가 버튼의 이벤트 처리 함수로 사용될 경우 버튼을 클릭하기 전 두 모듈을 가져오지 않음

  - 이 경우 꼭 필요할 때만 모듈을 가져오기 때문에 게으른 로딩(lazy loading)으로 불림
  - 게으른 로딩의 경우 파일의 크기가 큰 경우 응답 속도가 느리다는 단점이 존재

- 웹팩에서는 동적 임포트를 사용할 때 HTML -> prefetch, preload 기능을 사용할 수 있도록 옵션 제공

> prefetch

    가까운 미래에 필요한 파일이라고 브라우저에게 알림
    브라우저가 바쁘지 않을 경우 미리 다운로드 됨

> preload

지금 당장 필요한 파일이라고 브라우저에게 알림
HTML에서 preload 설정시 로딩 시 즉시 다운로드
preload 남발하면 부정적인 영향을 줄 수 있으므로 사용 주의

#### preload, prefetch 설정하기

```js
async function myFunc() {
  await new Promise((res) => setTimeout(res, 1000)); //-1-
  const [{ add }, { default: _ }] = await Promise.all([
    import(/* webpackPreload: true*/ './util'), //-2-
    import(/* webpackPrefetch: true*/ 'lodash'), //-3-
  ]);
  console.log('value', _.fill([1, 2, 3], add(30, 20)));
}
myFunc();
```

1. 너무 빠르면 prefetch 효과를 확인할 수 없으므로 1초 기다림
2. util.js 모듈은 preload로 설정
3. lodash 모듈은 prefetch로 설정

#### html 결과

1. 1.chunk.js 파일은 prefetch 적용
   - link 태그는 page3.js 파일이 실행되면서 웹팩에 의해서 삽입

> preload 기능을 사용한다고 하였지만 preload 설정이 HTML 파일에 적용 X

    사실 preload는 첫 페이지 요청 시 전달된 HTML 태그 안에 미리 설정
    웹팩이 지원할 수 있는 기능은 아님
    page3.js 파일이 평가 -> 2.chunk.js 파일을 즉시 다운로드 하면서 preload 흉내

### 로더 제작하기

- 로더는 모듈을 입력으로 받아서 원하는 형태로 변경 후 자바스크립트 코드를 반환한다.
- 로더가 자바스크립트 코드를 반환하기 때문에 웹팩은 CSS, PNG, CSV 확장자를 갖는 모듈로 처리 가능

- 여러 로더가 협력 관계에 있을 경우 중간 과정에서 처리 되는 css-loader 처럼 자바스크립트가
- 아닌 다른 형태의 데이터를 반환 가능

> style-loader 처럼 가장 마지막에 처리되는 로더는 항상 자바스크립트 코드를 반환함

> 설치

    npm i webpack webpack-cli

#### csv 모듈을 사용하는 코드

```js
import members from './member.csv';

for (const row of members.rows) {
  const name = row[1];
  const age = row[2];
  console.log(`${name} is ${age} years old`);
}
```

#### 웹팩 설정 webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.csv$/,
        use: './my-csv-loader', // -1-
      },
    ],
  },
  mode: production,
};
```

1. 다음에 만들 로더 파일의 이름, CSV 모듈을 처리

#### my-csv-loader 설정

- 아래에서 /n 으로 작성해서 오류 생겼었음
- 다음부터는 \n /n 구분해서 잘 작성

```js
module.exports = function (source) {
  // -1-
  const res = { header: undefined, rows: [] }; // -2-
  // -3-
  const rows = source.split('\n');
  for (const row of rows) {
    const cols = row.split(',');
    if (!res.header) {
      res.header = cols;
    } else {
      res.rows.push(cols);
    }
  }
  // -3-
  return `export default ${JSON.stringify(result)}`; // -4-
};
```

1. 로더의 모듈의 내용을 문자열로 입력받는 함수
2. 모듈을 사용하는 쪽에서 받게 될 데이터
3. 문자열로 입력된 CSV 모듈의 내용을 파싱해서 result 객체에 저장
4. result 객체의 내용이 담긴 자바스크립트 코드를 반환

> 실행

    node dist/main.js

### 플러그인 제작하기

- 플러그인은 웹팩의 처리 과정을 이해해야 작성할 수 있기 때문에 로더보다 작성이 까다로운 편
- DefinePlugin 처럼 플러그인은 모듈의 내용도 수정할 수 있기 때문에 로더가 할 수 있는 모든 일을 수행가능하다.

> 플러그인

    로더가 할 수 있는 모든 일을 수행 가능하다.
    제대로 이해하고 작성한다면 매우 강력한 도구가 될 수 있음

> 설치

    npm i webpack webpack-cli

#### index 파일 작성

```js
function index2() {
  console.log('this is index2');
  console.log('this size is bigger than index1');
}

index2();
```

#### webpack.config.js 작성

```js
const path = require('path');
const MyPlugin = require('/my-plugin'); //-1-

module.exports = {
  entry: {
    app1: './src/index1.js', //-2-
    app2: './src/index2.js', //-2-
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new MyPlugin({ showSize: true })], //-3-
  mode: 'production',
};
```

1. 다음에 만들 플러그인 불러오기
2. 두 개의 번들 파일을 만들도록 설정
3. 만들어진 플러그인을 사용하도록 설정
   - showSize 옵션을 입력으로 받아서 처리

#### 플러그인 작성

```js
class Myplugin {
  //-1-
  constructor(options) {
    //-2-
    this.options = options;
  }
  apply(compiler) {
    //-3-
    compiler.hooks.done.tap('MyPlugin', () => {
      //-4-
      console.log('bundling completed');
    });
    compiler.hooks.emit.tap('MyPlugin', (complication) => {
      //-5-
      let res = '';
      for (const filename in complication.assets) {
        //-6-
        if (this.options.showSize) {
          const size = complication.assets[filename].size();
          res += `${filename}(${size})\n`;
        } else {
          res += `${filename}\n`;
        }
      }
      complication.assets['fileList.txt'] = {
        //-7-
        source: function () {
          return res;
        },
        size: function () {
          return res.length();
        },
      };
    });
  }
}

module.exports(Myplugin);
```

1. 플러그인은 클래스로 정의 가능
2. 설정 파일에서 입력한 옵션이 생성자(constructor)의 매개변수로 넘어옴

- 이 플러그인은 showSize 옵션 처리 가능

3. apply 메서드에서는 웹펙의 각 처리 단계에서 호출될 콜백 함수를 등록 가능

- 콜백 함수를 등록할 수 있는 처리 단계가 다양하기 때문에 플러그인으로 할 수 있는 일도 증가

4. 웹팩이 실행이 호출되는 콜백 함수를 등록
5. 웹팩이 결과 파일을 생성하기 직전에 호출되는 콜백 함수를 등록
6. complication.assets 에는 웹팩이 생성할 파일의 목록이 들어있음
7. fileList.txt 파일이 생성되도록 설정
   - 웹팩 실행 시 dist 폴더 밑 fileList.txt
