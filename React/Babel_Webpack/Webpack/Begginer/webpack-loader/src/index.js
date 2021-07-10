import React from 'react';
import ReactDOM from 'react-dom';
import Style from './App.css';
console.log({ Style });
function App() {
  return (
    <div className="container">
      <h3 className="title">webpack example</h3>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
