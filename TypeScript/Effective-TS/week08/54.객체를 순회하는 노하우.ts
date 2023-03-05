const obj = {
	one: "uno",
	two: "dos",
	three: "tres"
};

// for (const key in obj) {
// 	console.log(key, obj[key]);
// }

// for (k in obj) {
// 	console.log(k, obj[k]);
// }

interface ABC {
	a: string;
	b: string;
	c: string;
}

function foo(abc: ABC) {
	let k: keyof ABC; // "one" | "two" | "three"
	for (k in abc) {
		const v = abc[k];
	}
}

const x = { a: "a", b: "b", c: "c", d: new Date() };
foo(x);

function foo2(abc: ABC) {
	for (const [k, v] of Object.entries(abc)) {
		console.log(k, v);
	}
}
