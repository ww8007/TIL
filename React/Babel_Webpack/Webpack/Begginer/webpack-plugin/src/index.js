// import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div>
      <h3>안녕하세요 웹팩 플러그인 예제 입니다.</h3>
      <p>webpack-plugin을 사용합니다.</p>
      <p>{`앱 버전은 ${APP_VERSION}`}</p>
      <p>{`10 x 10 = ${TEN * TEN}`}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
