const xs = [1, 2, 3];
const x0 = xs[0];
const x1 = xs["1"];

function get<T>(array: T[], index: number): T {
	return array[index];
}

const keys = Object.keys(xs);
for (const key in xs) {
	key; // 타입이 string
	const x = xs[key]; // 타입이 number
}

for (const x of xs) {
	x; // 타입이 number
}

xs.forEach((x, i) => {
	i; // 타입이 number
	x; // 타입이 number
});

function checkedAccess<T>(xs: ArrayLike<T>, i: number): T {
	if (i < xs.length) {
		return xs[i];
	}
	throw new Error(`배열의 끝을 지나 ${i}번째 요소에 접근하려고 했습니다.`);
}
