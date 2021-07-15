/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 341:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(297));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function About() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, "This is about page"));
}

var _default = About;
exports.default = _default;

/***/ }),

/***/ 255:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = App;

var _react = _interopRequireWildcard(__webpack_require__(297));

var _styledComponents = _interopRequireDefault(__webpack_require__(914));

var _icon = _interopRequireDefault(__webpack_require__(103));

var _Home = _interopRequireDefault(__webpack_require__(33));

var _About = _interopRequireDefault(__webpack_require__(341));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Container = _styledComponents.default.div`
  background-color: black;
  border: 1px solid blue;
`;

function fetchUsername() {
  const usernames = ['mike', 'june', 'jamie'];
  return new Promise(res => {
    const username = usernames[Math.floor(Math.random() * 3)];
    setTimeout(() => res(username), 100);
  });
}

function App({
  pages
}) {
  const [page, setPage] = (0, _react.useState)(pages);
  const [username, setUsername] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    window.onpopstate = event => {
      setPage(event.state);
    };
  }, []);
  (0, _react.useEffect)(() => {
    fetchUsername().then(data => setUsername(data));
  });

  function onChangePage(e) {
    const newPage = e.target.dataset.page;
    window.history.pushState(newPage, '', `/${newPage}`);
    setPage(newPage);
  }

  const PageComponent = page === 'home' ? _Home.default : _About.default;
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement("button", {
    "data-page": "home",
    onClick: onChangePage
  }, "Home"), /*#__PURE__*/_react.default.createElement("button", {
    "data-page": "about",
    onClick: onChangePage
  }, "About"), /*#__PURE__*/_react.default.createElement("img", {
    src: _icon.default
  }), /*#__PURE__*/_react.default.createElement(PageComponent, {
    username: username
  }));
}

/***/ }),

/***/ 33:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(297));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Home({
  username
}) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", null, "This is home page"), username && /*#__PURE__*/_react.default.createElement("p", null, `${username}님 안녕하세요`));
}

var _default = Home;
exports.default = _default;

/***/ }),

/***/ 407:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.renderPage = renderPage;
exports.prerenderPages = void 0;

var _fs = _interopRequireDefault(__webpack_require__(747));

var _path = _interopRequireDefault(__webpack_require__(622));

var _server = __webpack_require__(250);

var _react = _interopRequireDefault(__webpack_require__(297));

var _App = _interopRequireDefault(__webpack_require__(255));

var _styledComponents = __webpack_require__(914);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../dist/index.html'), 'utf8');

const prerenderPages = ['home'];
exports.prerenderPages = prerenderPages;

function renderPage(page) {
  const sheet = new _styledComponents.ServerStyleSheet();
  const renderString = (0, _server.renderToString)(sheet.collectStyles( /*#__PURE__*/_react.default.createElement(_App.default, {
    page: page
  })));
  const styles = sheet.getStyleTags();
  const result = html.replace('<div id="root"></div>', `<div id="root">${renderString}</div>`).replace('__STYLE_FROM_SERVER__', styles);
  return result;
}

/***/ }),

/***/ 103:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "29de4f72a026df827ec324f0c66f58d6.png");

/***/ }),

/***/ 127:
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ 747:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 250:
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ 914:
/***/ ((module) => {

module.exports = require("styled-components");

/***/ }),

/***/ 835:
/***/ ((module) => {

module.exports = require("url");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {


var _express = _interopRequireDefault(__webpack_require__(127));

var _fs = _interopRequireDefault(__webpack_require__(747));

var _path = _interopRequireDefault(__webpack_require__(622));

var url = _interopRequireWildcard(__webpack_require__(835));

var _common = __webpack_require__(407);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
const prerenderHtml = {};

for (const page of _common.prerenderPages) {
  const pageHtml = _fs.default.readFileSync(_path.default.resolve(__dirname, `../dist/${page}.html`));

  prerenderHtml[page] = pageHtml;
}

const html = _fs.default.readFileSync(_path.default.resolve(__dirname, '../dist/index.html'), 'utf8');

app.use('/dist', _express.default.static('dist'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const parseUrl = url.parse(req.url, true);
  const page = parseUrl.pathname ? parseUrl.pathname.substr(1) : 'home';
  const initialDate = {
    page
  };
  const pageHtml = _common.prerenderPages.includes(page) ? prerenderHtml[html] : (0, _common.renderPage)(page);
  const result = pageHtml.replace('__DATA_FROM_SERVER__', JSON.stringify(initialDate));
  res.send(result);
});
app.listen(3000);
})();

/******/ })()
;