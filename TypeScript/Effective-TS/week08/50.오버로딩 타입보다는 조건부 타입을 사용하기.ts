// function double(x: number | string): number | string;
// function double(x: any) {
// 	return x + x;
// }

// function double<T extends number | string>(x: T): T;
// function double(x: any) {
// 	return x + x;
// }

// function double(x: number): number;
// function double(x: string): string;
// function double(x: any) {
// 	return x + x;
// }
// const num = double(1);
// const str = double("1");

// function f(x: number | string) {
// 	function double(x) {
// 		return x + x;
// 	}
// }

function double<T extends number | string>(
	x: T
): T extends string ? string : number;

function double(x: any) {
	return x + x;
}

const num = double(1);
const str = double("1");

// function double(x: string | number): string | number;
function f(x: number | string) {
	return double(x);
}
