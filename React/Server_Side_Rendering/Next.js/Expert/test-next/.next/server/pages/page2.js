/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/page2";
exports.ids = ["pages/page2"];
exports.modules = {

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"callApi\": function() { return /* binding */ callApi; }\n/* harmony export */ });\nfunction callApi() {\n  return Promise.resolve(123);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LW5leHQvLi9hcGkuanM/YThmOCJdLCJuYW1lcyI6WyJjYWxsQXBpIiwiUHJvbWlzZSIsInJlc29sdmUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBTyxTQUFTQSxPQUFULEdBQW1CO0FBQ3hCLFNBQU9DLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQixHQUFoQixDQUFQO0FBQ0QiLCJmaWxlIjoiLi9hcGkuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY2FsbEFwaSgpIHtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgxMjMpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./api.js\n");

/***/ }),

/***/ "./pages/page2.js":
/*!************************!*\
  !*** ./pages/page2.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page2; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! regenerator-runtime */ \"regenerator-runtime\");\n/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api */ \"./api.js\");\n\nvar _jsxFileName = \"/Users/ww8007/Desktop/Git/TIL/React/Server_Side_Rendering/Next.js/Expert/test-next/pages/page2.js\";\n\n\n\nPage2.getInitialProps = async ({\n  query\n}) => {\n  const text = query.text || 'none';\n  const data = await (0,_api__WEBPACK_IMPORTED_MODULE_2__.callApi)();\n  return {\n    text,\n    data\n  };\n};\n\nfunction Page2({\n  text,\n  data\n}) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n      children: \"this is homepage\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 13,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n      children: `text: ${text}`\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 14,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n      children: `data is ${data}`\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 15,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 12,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LW5leHQvLi9wYWdlcy9wYWdlMi5qcz9kNmZmIl0sIm5hbWVzIjpbIlBhZ2UyIiwiZ2V0SW5pdGlhbFByb3BzIiwicXVlcnkiLCJ0ZXh0IiwiZGF0YSIsImNhbGxBcGkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQUEsS0FBSyxDQUFDQyxlQUFOLEdBQXdCLE9BQU87QUFBRUM7QUFBRixDQUFQLEtBQXFCO0FBQzNDLFFBQU1DLElBQUksR0FBR0QsS0FBSyxDQUFDQyxJQUFOLElBQWMsTUFBM0I7QUFDQSxRQUFNQyxJQUFJLEdBQUcsTUFBTUMsNkNBQU8sRUFBMUI7QUFDQSxTQUFPO0FBQUVGLFFBQUY7QUFBUUM7QUFBUixHQUFQO0FBQ0QsQ0FKRDs7QUFNZSxTQUFTSixLQUFULENBQWU7QUFBRUcsTUFBRjtBQUFRQztBQUFSLENBQWYsRUFBK0I7QUFDNUMsc0JBQ0U7QUFBQSw0QkFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURGLGVBRUU7QUFBQSxnQkFBSyxTQUFRRCxJQUFLO0FBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGRixlQUdFO0FBQUEsZ0JBQUssV0FBVUMsSUFBSztBQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBREY7QUFPRCIsImZpbGUiOiIuL3BhZ2VzL3BhZ2UyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXN5bmMgfSBmcm9tICdyZWdlbmVyYXRvci1ydW50aW1lJztcbmltcG9ydCB7IGNhbGxBcGkgfSBmcm9tICcuLi9hcGknO1xuXG5QYWdlMi5nZXRJbml0aWFsUHJvcHMgPSBhc3luYyAoeyBxdWVyeSB9KSA9PiB7XG4gIGNvbnN0IHRleHQgPSBxdWVyeS50ZXh0IHx8ICdub25lJztcbiAgY29uc3QgZGF0YSA9IGF3YWl0IGNhbGxBcGkoKTtcbiAgcmV0dXJuIHsgdGV4dCwgZGF0YSB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZTIoeyB0ZXh0LCBkYXRhIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHA+dGhpcyBpcyBob21lcGFnZTwvcD5cbiAgICAgIDxwPntgdGV4dDogJHt0ZXh0fWB9PC9wPlxuICAgICAgPHA+e2BkYXRhIGlzICR7ZGF0YX1gfTwvcD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/page2.js\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ }),

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/***/ (function(module) {

"use strict";
module.exports = require("regenerator-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/page2.js"));
module.exports = __webpack_exports__;

})();