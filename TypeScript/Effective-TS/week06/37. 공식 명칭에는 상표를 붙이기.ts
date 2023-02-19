calculateNorm(vec2D(1, 2));
const vec3D = { x: 1, y: 2, z: 3 };

type AbsolutePath = string & { _brand: "absolute" };
function listAbsolutePath(path: AbsolutePath) {
	//...
}
function isAbsolutePath(path: string): path is AbsolutePath {
	return path.startsWith("/");
}

function binarySearch<T>(xs: T[], x: T): boolean {
	let low = 0;
	let high = xs.length - 1;
	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		const y = xs[mid];
		if (x === y) return true;
		[low, high] = x < y ? [low, mid - 1] : [mid + 1, high];
	}
	return false;
}

type SortedList<T> = T[] & { _brand: "sorted" };

function isSorted<T>(xs: T[]): xs is SortedList<T> {
	for (let i = 1; i < xs.length; i++) {
		if (xs[i - 1] > xs[i]) return false;
	}
	return true;
}

type Meters = number & { _brand: "meters" };
type Seconds = number & { _brand: "seconds" };

const meters = (m: number): Meters => m as Meters;
const seconds = (s: number): Seconds => s as Seconds;

const oneKm = meters(1000);
const oneHour = seconds(3600);

const tenKm = oneKm * 10;
const v = oneKm / oneHour;
