function sayHello() {
	console.log('hello!!');
	console.log('Ellie');
}

function calculate(x, y) {
	console.log('calculating');
	const result = x + y;
	console.log('result: ', result);
	sayHello();
	return result;
}

calculate(2, 3);

const stop = 4;

console.log('.... looking ....');
for (let i = 0; i < 10; i++) {
	console.log('count');
	if (i === stop) break;
}
