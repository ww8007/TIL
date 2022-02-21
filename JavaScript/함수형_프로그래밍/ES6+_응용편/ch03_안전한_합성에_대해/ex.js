import * as _ from 'fxjs';
import * as L from 'fxjs/Lazy';
const f = (x) => x + 10;
const g = (x) => x - 5;
const fg = (x) => f(g(x));
// console.log(fg());

// _.go([], _.map(fg), _.each(console.log));

const users = [
	{ name: 'AA', age: 35 },
	{ name: 'BB', age: 26 },
	{ name: 'CC', age: 28 },
	{ name: 'CC', age: 34 },
	{ name: 'EE', age: 23 }
];

const user = _.find((u) => u.name == 'BB', users);
// if (user) console.log(user);

// _.each(
// 	console.log,
// 	L.take(
// 		1,
// 		L.filter((u) => u.name == 'DD', users)
// 	)
// );

_.go(
	users,
	L.filter((u) => u.name == 'CC'),
	L.map((u) => u.age),
	L.take(1),
	_.each(console.log)
);
