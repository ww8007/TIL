"use strict";

var _express = _interopRequireDefault(require("express"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _server = require("react-dom/server");

var _react = _interopRequireDefault(require("react"));

var _App = _interopRequireDefault(require("./App"));

var url = _interopRequireWildcard(require("url"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../dist/index.html'), 'utf8');

app.use('/dist', _express.default.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const renderString = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: page
  }));
  const initialDate = {
    page
  };
  const result = html.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`).replace('__DATA_FROM_SERVER__', JSON.stringify(initialDate));
  res.send(result);
});
app.listen(3000);