///////////////////////////////
// add_maker
function add_maker(a) {
	return function (b) {
		return a + b;
	};
}

const add_10 = add_maker(10);
console.log(add_10);
console.log(add_10(3));

////////////////////////////////
// add_maker 응용

function f4(f1, f2, f3) {
	return f3(f1() + f2());
}

console.log(
	f4(
		function () {
			return 2;
		},
		function () {
			return 1;
		},
		function (a) {
			return a * a;
		}
	)
);
