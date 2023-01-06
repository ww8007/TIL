interface Vector2D {
	x: number;
	y: number;
}

const calculateVectorLength = (vector: Vector2D) => {
	return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
};

interface NamedVector {
	name: string;
	x: number;
	y: number;
}

const v: NamedVector = { x: 3, y: 4, name: "my vector" };
console.log(calculateVectorLength(v));

interface Vector3D {
	x: number;
	y: number;
	z: number;
}

const normalizeVector = (vector: Vector3D) => {
	const length = calculateVectorLength(vector);
	return {
		x: vector.x / length,
		y: vector.y / length,
		z: vector.z / length
	};
};

console.log(normalizeVector({ x: 3, y: 4, z: 5 }));

const calculateLengthL1 = (vector: Vector3D) => {
	return Math.abs(vector.x) + Math.abs(vector.y) + Math.abs(vector.z);
};

const vec3D = { x: 3, y: 4, z: 5, address: "123 Main St" };
calculateLengthL1(vec3D);

class C {
	foo: string;
	constructor(foo: string) {
		this.foo = foo;
	}
}

const c = new C("instance of C");
const d: C = { foo: "object literal" };

interface Author {
	first: string;
	last: string;
}

interface PostGresDB {
	runQuery: (query: string) => any[];
}

const getAuthors = (db: PostGresDB): Author[] => {
	const authorRows = db.runQuery("SELECT * FROM authors");
	return authorRows.map((row) => ({ first: row.first, last: row.last }));
};
