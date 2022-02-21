import * as L from 'fxjs/Lazy';
import * as C from 'fxjs/Concurrency';
import { reduce, go, each, map, range } from 'fxjs';
function f1(limit, list) {
	let acc = 0;
	for (const a of list) {
		if (a % 2) {
			const b = a * a;
			acc += b;
			console.log(a);
			if (--limit == 0) break;
		}
	}
	console.log(acc);
}
f1(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

///////////////////////////////////////////
// 리스트 프로세싱으로 변경
function f2(limit, list) {
	let acc = 0;
	for (const a of L.filter((a) => a % 2, list)) {
		acc += a * a;
		if (--limit == 0) break;
	}
	console.log(acc);
}
f2(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

///////////////////////////////////////////
const add = (a, b) => a + b;
function f3(limit, list) {
	console.log(
		reduce(
			add,
			L.take(
				limit,
				L.map(
					(a) => a * a,
					L.filter((a) => a % 2, list)
				)
			)
		)
	);
}
f3(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// /// go로 변경

function f4(limit, list) {
	go(
		list,
		L.filter((a) => a % 2),
		L.map((a) => a * a),
		L.take(limit),
		reduce(add),
		console.log
	);
}
f4(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

// // while을 range
function f5(end) {
	let i = 0;
	while (++i < end) {
		console.log(i);
	}
}

function f6(end) {
	go(L.range(1, end, 2), each(console.log));
}
f5(10);
f6(10);

//////////////////////////////////////////
// 추억의 별 그리기

const join = (sep) => reduce((a, b) => `${a}${sep}${b}`);

go(
	L.range(1, 6), // 별의 최대 개수
	L.map(range),
	L.map(map((_) => '*')),
	L.map(join('')),
	join('\n'),
	console.log
);

go(
	L.range(1, 6), // 별의 최대 개수
	L.map((s) =>
		go(
			L.range(s),
			L.map((_) => '*'),
			reduce((a, b) => `${a}${b}`)
		)
	),
	reduce((a, b) => `${a}\n${b}`),
	console.log
);

go(
	range(2, 10),
	map((a) =>
		go(
			range(1, 10),
			map((b) => `${a}x${b}=${a * b}`),
			join('\n')
		)
	),
	join('\n'),
	console.log
);
