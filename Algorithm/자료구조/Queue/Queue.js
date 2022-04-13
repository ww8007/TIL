class Queue {
	constructor() {
		this._arr = [];
	}
	enqueue(item) {
		this._arr.push(item);
	}
	dequeue() {
		return this._arr.shift();
	}
}

const q1 = new Queue();

q1.enqueue(1);
console.log(q1);
