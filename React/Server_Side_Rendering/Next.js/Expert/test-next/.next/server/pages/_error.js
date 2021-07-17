(function() {
var exports = {};
exports.id = 820;
exports.ids = [820];
exports.modules = {

/***/ 561:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ErrorPage; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);


ErrorPage.getInitialProps = ({
  res,
  err
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return {
    statusCode
  };
};

function ErrorPage({
  statusCode
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    children: [statusCode === 404 && '페이지를 찾을 수 없습니다.', statusCode === 500 && '알 수 없는 에러가 발생했습니다.', !statusCode && '클라이언트에서 에러가 발생했습니다.']
  });
}

/***/ }),

/***/ 282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(561));
module.exports = __webpack_exports__;

})();