const el = document.getElementById("foo");

if (!el) throw new Error('Unable to find element with id "foo"');
el;
el.innerHTML = "Hello World";

function contains(text: string, search: string | RegExp) {
	if (search instanceof RegExp) {
		search; // RegExp
		return !!search.exec(text);
	}
	search; // string
	return text.includes(search);
}

interface A {
	a: number;
}
interface B {
	b: number;
}
function pickAB(ab: A | B) {
	if ("a" in ab) {
		ab; // A
	}
	if ("b" in ab) {
		ab; // B
	}
	ab;
}

function foo(x: number | string | null) {
	if (!x) {
		x; //(parameter) x: string | number | null
	}
}

interface UploadEvent {
	type: "upload";
	fileName: string;
	contents: string;
}

interface DownloadEvent {
	type: "download";
	fileName: string;
	contents: string;
}

type AppEvent = UploadEvent | DownloadEvent;

function handleEvent(event: AppEvent) {
	if (event.type === "upload") {
		event; // UploadEvent
	}
	if (event.type === "download") {
		event; // DownloadEvent
	}
}

function isInputElement(el: Element): el is HTMLInputElement {
	return el.tagName === "INPUT";
}

function getElementContent(el: HTMLElement) {
	if (isInputElement(el)) {
		el; // HTMLInputElement
		return el.value;
	}
	el; // Element
	return el.textContent;
}

const jackson5 = ["Michael", "Janet", "Tito", "Jermaine", "Marlon"];
const members = ["Janet", "Michael"].map((who) =>
	jackson5.find((n) => n === who)
); // (string | undefined)[]

const members2 = ["Janet", "Michael"]
	.map((who) => jackson5.find((n) => n === who))
	.filter((who) => who !== undefined); // (string | undefined)[]

function isDefined<T>(x: T | undefined): x is T {
	return x !== undefined;
}
const members3 = ["Janet", "Michael"]
	.map((who) => jackson5.find((n) => n === who))
	.filter(isDefined); // string[]

declare let hasMiddle: boolean;
const firstName = { first: "Michael", last: "Jackson" };
const president = { ...firstName, ...(hasMiddle ? { middle: "Joseph" } : {}) };

declare let hasDates: boolean;
const nameTitle = { name: "Michael Jackson", title: "King of Pop" };
const pharaoh = {
	...nameTitle,
	...(hasDates ? { start: 1958, end: 2009 } : {})
};

pharaoh.start; // number | undefined

function addOption<T extends object, U extends object>(
	a: T,
	b: U | null
): T & Partial<U> {
	return { ...a, ...b };
}

const pharaoh2 = addOption(
	nameTitle,
	hasDates ? { start: 1958, end: 2009 } : null
);
pharaoh.start; // number | undefined

const borough = { name: "Brooklyn", location: [40.65, -73.95] };
const loc = borough.location; // [number, number]

interface Coordinate {
	x: number;
	y: number;
}

interface BoundingBox {
	x: [number, number];
	y: [number, number];
}

interface Polygon {
	exterior: Coordinate[];
	holes?: Coordinate[][];
	bbox?: BoundingBox;
}

function isPointInPolygon(point: Coordinate, polygon: Polygon) {
	const { bbox } = polygon;
	if (bbox) {
		const { x, y } = bbox;
		if (
			point.x < x[0] || // 객체가 undefined 일 수 있습니다.
			point.x > x[1] ||
			point.y < y[0] ||
			point.y > y[1]
		) {
			return false;
		}
	}
}
