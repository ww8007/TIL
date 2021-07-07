const babel = require('@babel/core');
const fs = require('fs');

const filename = './src/code.js';
const source = fs.readFileSync(filename, 'utf-8');

const presets = ['@babel/preset-react'];

const { ast } = babel.transformSync(source, {
  filename,
  ast: true,
  code: false,
  presets,
  configFile: false,
  // babel.config.file을 사용하지 않도록함
});

const { code: code1 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-template-literals'],
  configFile: false,
});
const { code: code2 } = babel.transformFromAstSync(ast, source, {
  filename,
  plugins: ['@babel/plugin-transform-arrow-functions'],
  configFile: false,
});

console.log('code1:\n', code1);
console.log('code2:\n', code2);

//로그로 출력
