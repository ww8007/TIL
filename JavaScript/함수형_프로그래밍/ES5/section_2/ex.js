function curry(fn) {
	return function (a, b) {
		return arguments.length === 2
			? fn(a, b)
			: function (b) {
					return fn(a, b);
			  };
	};
}

const add = (a, b) => {
	return curry(a + b);
};
// var add = curry(function (a, b) {
// 	return a + b;
// });

console.log(add(1, 2));
