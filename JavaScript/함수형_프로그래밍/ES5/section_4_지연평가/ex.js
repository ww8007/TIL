import pkg from 'partial-js';

const { L, _ } = pkg;

var mi = 0;
var fi = 0;
pkg.go(
	pkg.range(100),
	pkg.map(function (val) {
		++mi;
		return val * val;
	}),
	pkg.filter(function (val) {
		++fi;
		return val % 2;
	}),
	pkg.sum(function (val) {
		return val > 100;
	}),
	console.log
);
console.log(mi, fi);
var mi = 0;
var fi = 0;

pkg.go(
	pkg.range(100),
	L.map(function (val) {
		++mi;
		return val * val;
	}),
	L.filter(function (val) {
		++fi;
		return val % 2;
	}),
	L.some(function (val) {
		return val > 100;
	}),
	console.log
);
console.log(mi, fi);
