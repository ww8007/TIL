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
function memoFibo(n) {
	const fibArr = [0, 1];
	function fibo(n) {
		if (fibArr[n] !== undefined) return fibArr[n];
		fibArr[n] = fibo(n - 1) + fibo(n - 2);
		return fibArr[n];
	}
	return fibo(n);
}
console.time('1');
console.log(fibo(10));
console.timeEnd('1');
console.time('2');
console.log(recurFibo(10));
console.timeEnd('2');
console.time('3');
console.log(memoFibo(10));
console.timeEnd('3');
