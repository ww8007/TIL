function parseYAML(yaml: string): any {
	//...
}

interface Book {
	name: string;
	author: string;
}

// const book: Book = parseYAML(
// 	`name: "TypeScript Deep Dive" author: "Basarat Ali Syed"`
// );

function safeParseYAML(yaml: string): unknown {
	return parseYAML(yaml);
}

const book = safeParseYAML(
	`name: "TypeScript Deep Dive" author: "Basarat Ali Syed"`
) as Book;

// function processValue(val: unknown) {
// 	if (val instanceof Date) {
// 		val;
// 	}
// }

function isBook(val: unknown): val is Book {
	return (
		typeof val === "object" && val !== null && "name" in val && "author" in val
	);
}
function processValue(val: unknown) {
	if (isBook(val)) {
		val;
	}
}

function safeParseYAMLGeneric<T>(yaml: string): T {
	return parseYAML(yaml);
}

type Foo = {};
type Bar = {};

declare const foo: Foo;
let barAny = foo as any as Bar;
let barUnk = foo as unknown as Bar;
