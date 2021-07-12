"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 실습1
// ReactDom.render(<App page="home" />, document.getElementById('root'));
// 실습2
_reactDom.default.hydrate( /*#__PURE__*/_react.default.createElement(_App.default, {
  page: "home"
}), document.getElementById('root'));