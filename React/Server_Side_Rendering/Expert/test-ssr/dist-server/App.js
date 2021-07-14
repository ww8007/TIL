"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Home = _interopRequireDefault(require("./Home"));

var _About = _interopRequireDefault(require("./About"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Container = _styledComponents.default.div`
  background-color: black;
  border: 1px solid blue;
`;

function App({
  pages
}) {
  const [page, setPage] = (0, _react.useState)(pages);
  (0, _react.useEffect)(() => {
    window.onpopstate = event => {
      setPage(event.state);
    };
  }, []);

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
  }, "About"), /*#__PURE__*/_react.default.createElement(PageComponent, null));
}