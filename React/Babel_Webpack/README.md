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
