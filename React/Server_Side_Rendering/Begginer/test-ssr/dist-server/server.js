"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _server = require("react-dom/server");

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("./App"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../dist/index.html'), 'utf8');

app.use('/dist', _express.default.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const renderString = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: "home"
  }));
  const result = html.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`);
  res.send(result);
});
app.listen(3000);