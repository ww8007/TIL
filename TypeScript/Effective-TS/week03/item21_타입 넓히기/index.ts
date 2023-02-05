interface Vector3 {
	x: number;
	y: number;
	z: number;
}

function getComponent(v: Vector3, axis: "x" | "y" | "z") {
	return v[axis];
}

const x = "x";
let vec = { x: 10, y: 20, z: 30 };
getComponent(vec, x);
// string 형식의 인수는 '"x" | "y" | "z"' 형식의 매개변수에 할당할 수 없습니다.

const mixed = ["x", 1];

const v1 = {
	x: 1,
	y: 2
}; // 타입은 { x: number; y: number;}

const v2 = {
	x: 1 as const,
	y: 2
}; // 타입은 { x: 1; y: number;}

const v3 = {
	x: 1,
	y: 2
} as const; // 타입은 { readonly x: 1; readonly y: 2; }

const a1 = [1, 2, 3]; // 타입은 number[]
const a2 = [1, 2, 3] as const; // 타입은 readonly [1, 2, 3]

const pt = { x: 3, y: 4 };
const id = { name: "Jang" };
let namedPoint = {};

Object.assign(namedPoint, pt, id);
namedPoint;
