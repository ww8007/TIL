const a: number = 5;
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;

// function add(x: number, y: number): number {
// 	return x + y;
// }

//type Add = (x: number, y: number) => number;
// interface Add {
// 	(x: number, y: number): number;
// }

// const add: Add = (x, y) => x + y;
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

// 1. 배열 표시
// const arr: string[] = ['123', '456'];
// const arr2: number[] = [123, 456];

// const arr3: Array<number> = [123, 456];

// // 튜플 : 길이가 고정된 배열
// const arr4: [number, number, string] = [123, 456, '123'];

const f: true = true;

// const add = (x: number, y: number) => x + y;

function add(x: number, y: number): number;

function add(x, y) {
	return x + y;
}

let aa = 123;
aa = 'hello' as unknown as number;

// 태그가 선택 되지만 있다는 것을 보장하지 못함
// const head = document.querySelector('#head')!;
// console.log(head);

const head = document.querySelector('#head');
if (head) {
	console.log(head);
}

// type World = 'word' | 'hell';

// const abc: World = 'hell';

// // type Greeting = "hello world"
// type Greeting = `hello ${World}`;

// const add: Greeting = '';

let arr: string[] = [];
let arr2: Array<string> = [];

function rest(a: string, ...args: string[]) {
	console.log(a, args);
}
