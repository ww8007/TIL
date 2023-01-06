interface Person {
	name: string;
}

interface Lifespan {
	birth: Date;
	death?: Date;
}

type PersonSpan = Person & Lifespan;

const ps: PersonSpan = {
	name: "John",
	birth: new Date(1990, 1, 1),
	death: new Date(2010, 1, 1)
};

type K = keyof (Person | Lifespan);

function getKey<K extends string>(val: any, key: K) {
	// ...
}

getKey({}, "x");
getKey({}, Math.random() < 0.5 ? "x" : "y");
getKey({}, document.title);

const list = [1, 2]; // 타입은 number []
const tuple: [number, number] = list;
