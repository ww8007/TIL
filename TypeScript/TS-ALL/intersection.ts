function add(x: string | number, y: string | number): string | number {
	return x + y;
}
const result: string | number = add(1, 2);
add(1, 2);
add('1', '2');
add(1, '2');

type A = {
	a: string;
};
type B = {
	b: string;
};

const aa: A | B = { a: 'hello', b: 'world' };
const bb: A & B = { a: 'hello', b: 'world' };

type AA = { hello: 'world' } & { zero: 'cho' };
const a: AA = { hello: 'world', zero: 'cho' };

type Animal = { breath: true };
type Mammal = Animal & { breed: true };
type Human = Mammal & { think: true };

const jang: Human = { breath: true, breed: true, think: true };

interface AAA {
	breath: true;
}

interface BBB extends AAA {
	breed: true;
}

const bbb: BBB = { breath: true, breed: true };

const target: { a: string } = { b: '문자열' };
