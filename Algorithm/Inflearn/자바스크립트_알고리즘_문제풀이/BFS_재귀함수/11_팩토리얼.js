function solution(n) {
	let answer;
	function DFS(n) {
		if (n === 1) return 1;
		else {
			return n * DFS(n - 1);
		}
	}
	answer = DFS(n);
	return answer;
}

let fibArr = [1, 2];
function memoFibo(n) {
	function fibo(n) {
		if (fibArr[n] !== undefined) return fibArr[n];
		fibArr[n] = fibo(n) * fibo(n - 1);
		return fibArr[n];
	}
	console.log(fibArr);
	return fibo(n);
}

console.log(solution(5));
console.log(memoFibo(5));
