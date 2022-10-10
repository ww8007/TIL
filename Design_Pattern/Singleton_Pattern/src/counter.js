// let instance;
// let counter = 0;

// class Counter {
// 	constructor() {
// 		if (instance) {
// 			throw new Error('하나의 인스턴스만 생성이 가능합니다.');
// 		}
// 		instance = this;
// 	}
// 	getInstance() {
// 		return this;
// 	}

// 	getCount() {
// 		return counter;
// 	}

// 	increment() {
// 		return ++counter;
// 	}

// 	decrement() {
// 		return --counter;
// 	}
// }

// const singletonCounter = Object.freeze(new Counter());
// export default singletonCounter;

let count = 0;

const counter = {
	increment() {
		return ++count;
	},
	decrement() {
		return --count;
	}
};

Object.freeze(counter);
export { counter };
