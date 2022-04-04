import * as L from 'fxjs/Lazy';
import * as _ from 'fxjs';
import {
	each,
	entries,
	pipe,
	range,
	reduce,
	toArray,
	curry,
	map
} from '@fxts/core';

const object = () =>
	pipe(
		map((k) => ({ [k]: [] })),
		reduce(Object.assign)
	);

const dist = (minute) => {
	return {
		color: '#fff',
		mode: 'normal',
		minute,
		borderBottom: false,
		borderTop: true,
		borderWidth: 0.3
	};
};

// const pushTime = _.curry(
// 	_.pipe(
// 		_.range(1, 7),
// 		_.each((t) => v.push(dist(t * 10))),
// 		console.log
// 	)
// );

const result = pipe(
	range(9, 22),
	object,
	entries,
	console.log
	// each(([k, v]) =>
	// 	pipe(
	// 		range(7),
	// 		each((t) => v.push('hi'))
	// 	)
	// ),
);

console.log(result);

// console.log(pushTime([]));

const time = pipe(
	range(1, 6),
	map((t) => dist(t * 10)),
	console.log
);
