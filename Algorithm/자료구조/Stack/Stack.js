class Stack {
	constructor() {
		this.arr = [];
	}
	push = (item) => this.arr.push(item);

	pop = () => this.arr.pop();

	peek = () => this.arr[this._arr.length - 1];
}

const stack = new Stack();
stack.push(1);
console.log(stack);
stack.push(2);
console.log(stack);
stack.push(3);
console.log(stack);
stack.pop();
console.log(stack);
