function solution(s) {
	let stack = [];
	for (const each of s) {
		if (!isNaN(each)) stack.push(Number(each));
		else {
			let res;
			let rt = stack.pop();
			if (each === '*') res = stack.pop() * rt;
			if (each === '+') res = stack.pop() + rt;
			if (each === '-') res = stack.pop() - rt;
			if (each === '/') res = stack.pop() / rt;
			stack.push(res);
		}
	}

	return stack[0];
}

let str = '352+*9-';
console.log(solution(str));
