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
