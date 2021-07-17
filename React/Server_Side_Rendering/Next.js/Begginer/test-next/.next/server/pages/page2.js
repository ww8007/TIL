(function() {
var exports = {};
exports.id = 730;
exports.ids = [730];
exports.modules = {

/***/ 108:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Page2; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(282);
;// CONCATENATED MODULE: external "regenerator-runtime"
var external_regenerator_runtime_namespaceObject = require("regenerator-runtime");;
;// CONCATENATED MODULE: ./api.js
function callApi() {
  return Promise.resolve(123);
}
;// CONCATENATED MODULE: external "next/router"
var router_namespaceObject = require("next/router");;
var router_default = /*#__PURE__*/__webpack_require__.n(router_namespaceObject);
;// CONCATENATED MODULE: ./pages/page2.js






Page2.getInitialProps = async ({
  query
}) => {
  throw new Error('exception in getInitialProps');
  const text = query.text || 'none';
  const data = await callApi();
  return {
    text,
    data
  };
};

function Page2({
  text,
  data
}) {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("button", {
      onClick: () => router_default().push('/page1'),
      children: "pag1 \uC73C\uB85C \uC774\uB3D9"
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: "this is homepage"
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: `text: ${text}`
    }), /*#__PURE__*/jsx_runtime_.jsx("p", {
      children: `data is ${data}`
    })]
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
var __webpack_exports__ = (__webpack_exec__(108));
module.exports = __webpack_exports__;

})();