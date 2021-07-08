# 웹펙과 바벨

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
