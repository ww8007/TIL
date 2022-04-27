// 일반 for문
function fibo(n) {
	const arr = [0, 1];
	for (let i = 2; i <= n; i++) {
		arr.push(arr[i - 2] + arr[i - 1]);
	}
	return arr[n];
}

// recursive
function recurFibo(n) {
	if (n < 2) {
		console.log(n);
		return n;
	}
	return recurFibo(n - 1) + recurFibo(n - 2);
}

// memo
const fibArr = [0, 1];
function memoFibo(n) {
	function fibo(n) {
		if (fibArr[n] !== undefined) return fibArr[n];
		fibArr[n] = fibo(n - 1) + fibo(n - 2);
		return fibArr[n];
	}
	console.log(fibArr);
	return fibo(n);
}

// console.time('1');
// console.log(fibo(10));
// console.timeEnd('1');
// console.time('2');
// console.log(recurFibo(10));
// console.timeEnd('2');
console.time('3');
console.log(memoFibo(10));
console.timeEnd('3');

console.log(fibArr);

// 피보나치 수열을 구현한 사용자 정의 이터러블
const fibonacci = {
	// Symbol.iterator 메서드를 구현하여
	// 이터러블 프로토콜을 준수함
	[Symbol.iterator]() {
		let [pre, cur] = [0, 1]; // 36.1 배열 디스트럭처링
		const max = 10; // 수열의 최대값

		// Symbol.iterator 메서드 :
		// next 메서드를 소유한 이터레이터를 반환해야 하고
		// next 메서드 : 이터레이터 result 객체를 반환해야함
		return {
			next() {
				[pre, cur] = [cur, pre + cur]; // 이터레이터 result 객체 반환
				return { value: cur, done: cur >= max };
			}
		};
	}
};

// 이터러블인 피보나치 객체를 순화할 때마다 next 메서드가 호출됨
for (const num of fibonacci) {
	console.log(num);
}

// 무한 이터러블을 생성하는 함수
const fibonacciFunc = () => {
	let [pre, cur] = [0, 1];

	return {
		next() {
			[pre, cur] = [cur, pre + cur];
			// 무한 구현 → done 삭제
			return { value: cur };
		},
		[Symbol.iterator]() {
			return this;
		}
	};
};

// 배열 디스트럭처링을 사용한 무한 이터러블에서
// 3개의 요소만 취득
const [f1, f2, f3, f4] = fibonacciFunc();
console.log(f1, f2, f3, f4); // 1 2 3
console.log(fibonacciFunc().next());
console.log(fibonacciFunc().next());
console.log(fibonacciFunc().next());
console.log(fibonacciFunc().next());
console.log(fibonacciFunc().next());
console.log(fibonacciFunc().next());

function* infinity(i) {
	while (i !== 0) yield i--;
}

const hi = infinity(10);

for (const item of hi) {
	console.log(item);
}
