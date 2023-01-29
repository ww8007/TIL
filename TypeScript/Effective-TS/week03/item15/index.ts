interface Rocket {
	name: string;
	variant: string;
	thrust: string;
}

const rocket: Rocket = {
	name: "Falcon 9",
	variant: "Block 5",
	thrust: "7,607 kN"
};

interface Row1 {
	[column: string]: string;
}
interface Row2 {
	a: number;
	b?: number;
	c?: number;
	d?: number;
}

type Row3 =
	| { a: number }
	| { a: number; b: number }
	| { a: number; b: number; c: number }
	| { a: number; b: number; c: number; d: number };

type ABC = { [k in "a" | "b" | "c"]: k extends "b" ? string : number };

const a: ABC = { a: 1, b: "2", c: 3 };
