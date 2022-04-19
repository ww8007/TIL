class Stack {
	constructor() {
		this.arr = [];
	}
	push = (item) => this.arr.push(item);

	pop = () => this.arr.pop();

	len = () => this.arr.length;
}

function solution(s) {
	const stack = new Stack();
	for (const item of s) {
		if (item === ')') {
			while (stack.pop() !== '(');
		} else stack.push(item);
	}

	return stack.arr.join('');
}

let str = '(A(BC)D)EF(G(H)(IJ)K)LM(N)';
console.log(solution(str));
