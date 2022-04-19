class Stack {
	constructor() {
		this.arr = [];
	}
	push = (item) => this.arr.push(item);

	pop = () => this.arr.pop();

	peek = () => this.arr[this.arr.length - 1];

	length = () => this.arr.length;
}

function solution(s) {
	let answer = 'YES';
	const stack = new Stack();
	for (const item of s) {
		if (item === '(') stack.push(item);
		else {
			if (stack.length() === 0) return 'NO';
			stack.pop();
		}
	}
	console.log(stack.length());
	if (stack.length()) return 'NO';
	return 'YES';
}

let a = '(())()';
let b = '(()))';
console.log(solution(a));
