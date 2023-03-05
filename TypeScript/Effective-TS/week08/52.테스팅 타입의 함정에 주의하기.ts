declare function map<U, V>(arr: U[], fn: (item: U) => V): V[];

map([1, 2, 3], (n) => Number(n)); // [2, 4, 6]

// test("square a number", () => {
// 	square(1);
// 	square(2);
// });

const lengths: number[] = map(["john", "paul"], (name) => name.length);

function assertType<T>(x: T) {}

assertType<number[]>(map(["john", "paul"], (name) => name.length));

const n = 12;
assertType<number>(n);

const beatles = ["john", "paul", "george", "ringo"];
assertType<{ name: string }[]>(
	map(beatles, (name) => ({ name, inYellowSubmarine: true }))
);

const add = (a: number, b: number) => a + b;
assertType<(a: number, b: number) => number>(add);

const double2 = (n: number) => n * 2;
assertType<(a: number, b: number) => number>(double2);

const g: (x: string) => any = () => 12;

const double3 = (n: number) => n * 2;
let p: Parameters<typeof double3> = null!;
assertType<[number, number]>(p);

let r: ReturnType<typeof double3> = null!;
assertType<number>(r);

declare function map<U, V>(
	arr: U[],
	fn: (this: U[], u: U, i: number, array: U[]) => V
): V[];

const beatles2 = ["john", "paul", "george", "ringo"];
assertType<number[]>(
	// any 형식의 인수는 (u: string) => any에 할당할 수 없습니다.
	map(beatles2, function (name, i, array) {
		assertType<string>(name);
		assertType<number>(i);
		assertType<string[]>(array);
		assertType<string>(this);
		return name.length;
	})
);

const beatles3 = ["john", "paul", "george", "ringo"];
map(
	beatles,
	function (
		name, // $ExpectType string
		i, // $ExpectType number
		array // $ExpectType string[]
	) {
		this; // $ExpectType string[]
		return name.length;
	}
); // $ExpectType number[]
