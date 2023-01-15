interface Person {
	name: string;
}

const alice: Person = { name: "Alice" };
const bob: Person = { name: "Bob" };

const people = ["alice", "bob", "jan"].map((name): Person => ({ name }));

const people1: Person[] = ["alice", "bob", "jan"].map(
	(name): Person => ({ name })
);

document.querySelector("#myButton")?.addEventListener("click", (e) => {
	e.currentTarget;
	const button = e.currentTarget as HTMLButtonElement;
	button;
});

const elNull = document.querySelector("#myButton");
const el = document.querySelector("#myButton")!;

const originalCharAt = String.prototype.charAt;
String.prototype.charAt = function (pos: number) {
	console.log(this, typeof this, pos);
	return originalCharAt.call(this, pos).toUpperCase();
};
console.log("primitive string".charAt(3));

interface Room {
	numDoors: number;
	ceilingHeightFt: number;
}

const r: Room = {
	numDoors: 2,
	ceilingHeightFt: 10
};

interface Options {
	darkMode?: boolean;
	[otherOptions: string]: unknown;
}

// const o: Options = { darkMode: true };

interface LineChartOptions {
	logScale?: boolean;
	invertedYAxis?: boolean;
	areaChart?: boolean;
}

const opts = { logScale: true };
const oo: LineChartOptions = opts;

// function rollDice(slides: number): number {}
// const rollDice2 = funcion(slides:number):number {}
// const rollDice3 = (slides:number):number => {}

// function add(a: number, b: number) {
//     return a + b;
// }

// type BinaryFn = (a: number, b: number) => number;
// const add: BinaryFn = (a, b) => a + b;

declare function fetch(
	input: RequestInfo,
	init?: RequestInit
): Promise<Response>;

async function checkFetch(input: RequestInfo, init?: RequestInit) {
	const response = await fetch(input, init);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response;
}

const checkFetch2: typeof fetch = async (input, init) => {
	const response = await fetch(input, init);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response;
};

type TDict = { [key: string]: unknown };
interface IDict {
	[key: string]: unknown;
}

type TFn = (x: number) => string;
interface IFn {
	(x: number): string;
}

type TPair<T> = {
	first: T;
	second: T;
};

interface IPair<T> {
	first: T;
	second: T;
}

type TState = { name: string; capital: string };

interface IStateWithPop extends TState {
	population: number;
}

type TStateWithPop = TState & { population: number };

class StateT implements TState {
	name: string = "";
	capital: string = "";
}

type Input = {};
type Output = {};

interface VariableMap {
	[name: string]: Input | Output;
}

type NamedVariable = (Input | Output) & { name: string };

type NamedNums = [string, ...number[]];

const hi: NamedNums = ["hi", 1, 2, 3];

interface Tuple {
	0: number;
	1: number;
	length: 2;
}

const t: Tuple = [1, 2];

const distance = (p1: [number, number], p2: [number, number]) => {
	const dx = p1[0] - p2[0];
	const dy = p1[1] - p2[1];
	return Math.sqrt(dx * dx + dy * dy);
};

interface Point2D {
	x: number;
	y: number;
}

const distance2 = (p1: Point2D, p2: Point2D) => {
	const dx = p1.x - p2.x;
	const dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
};

type HTTPFunction = (url: string, opts: Options) => Promise<Response>;

// const get: HTTPFunction = (url, opts) => {};
// const post: HTTPFunction = (url, opts) => {};

interface State {
	userId: string;
	pageTitle: string;
	recentFiles: string[];
	pageContents: string;
}

type TopNavState = {
	[k in "userId" | "pageTitle" | "recentFiles"]: State[k];
};

type TopNavState2 = Pick<State, "userId" | "pageTitle" | "recentFiles">;

interface SaveAction {
	type: "save";
}

interface LoadAction {
	type: "load";
}

type Action = SaveAction | LoadAction;
type ActionType = Action["type"];
type ActionRect = Pick<Action, "type">;

interface Options {
	width: number;
	height: number;
	color: string;
	label: string;
}

class UIWidget {
	constructor(private options: Options) {}

	update(opts: Partial<Options>) {
		this.options = { ...this.options, ...opts };
	}
}

const getUserInfo = (userId: string) => {
	return {
		userId,
		name: "John Doe"
	};
};

type UserInfo = ReturnType<typeof getUserInfo>;

type Pick1<T, K extends keyof T> = {
	[k in K]: T[k];
};
