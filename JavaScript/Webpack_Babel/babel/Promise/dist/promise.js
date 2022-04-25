"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/values"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var p = _promise.default.resolve(10);

var obj = {
  a: 10,
  b: 20,
  c: 30
};
var arr = (0, _values.default)(obj);
var exist = (0, _includes.default)(arr).call(arr, 20);
console.log(p);

var hi = function hi() {
  console.log('hi');
};