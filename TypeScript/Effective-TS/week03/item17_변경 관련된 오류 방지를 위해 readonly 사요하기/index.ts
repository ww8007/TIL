function printTriangles(n: number) {
	let nums = [];
	for (let i = 0; i < n; i++) {
		nums.push(i);
		console.log(arraySum(nums));
	}
}

function arraySum(arr: readonly number[]) {
	let sum = 0;
	for (const n of arr) {
		sum += n;
	}
	return sum;
}

printTriangles(5);

const novel =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const parseTaggedText = (lines: string[]): string[] => {
	const paragraphs: string[] = [];
	let currPara: readonly string[] = [];

	const addParagraph = () => {
		if (currPara.length) {
			paragraphs.push(currPara.join(" "));
			currPara = [];
		}
	};

	for (const line of lines) {
		if (line === "") {
			addParagraph();
		} else {
			currPara = [...currPara, line];
		}
	}
	addParagraph();
	return paragraphs;
};

interface Outer {
	inner: {
		x: number;
	};
}
type T = Readonly<Outer>;

const o: Readonly<Outer> = { inner: { x: 0 } };
// o.inner = { x: 3 }; // 오류
o.inner.x = 1; // 정상

let obj: { readonly [key: string]: number } = { a: 1, b: 2, c: 3 };
let obj2: Readonly<{ [k: string]: number }>;

// obj.hi = 445; // ... 형식의 인덱스 시그니처는 읽기 전용입니다.
obj = { ...obj, hi: 23 }; // 정상
obj = { ...obj, bye: 45 }; // 정상

interface ScatterProps {
	// Data
	xs: number[];
	ys: number[];

	// Display
	xRange: [number, number];
	yRange: [number, number];
	color: string;

	// Event
	onClick: (x: number, y: number, index: number) => void;
	onDoubleClick: (x: number, y: number, index: number) => void;
}

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
	let k: keyof ScatterProps;
	for (k in oldProps) {
		if (oldProps[k] !== newProps[k]) {
			return true;
		}
	}
	return false;
}

const shouldUpdate2 = (oldProps: ScatterProps, newProps: ScatterProps) => {
	return (
		oldProps.xs !== newProps.xs ||
		oldProps.ys !== newProps.ys ||
		oldProps.xRange !== newProps.xRange ||
		oldProps.yRange !== newProps.yRange ||
		oldProps.color !== newProps.color
		// onClick은 체크하지 않음
	);
};

const REQUIRES_UPDATE: { [k in keyof ScatterProps]: boolean } = {
	xs: true,
	ys: true,
	xRange: true,
	yRange: true,
	color: true,
	onClick: false,
	onDoubleClick: false
};

const shouldUpdate3 = (oldProps: ScatterProps, newProps: ScatterProps) => {
	let k: keyof ScatterProps;
	for (k in oldProps) {
		if (REQUIRES_UPDATE[k] && oldProps[k] !== newProps[k]) {
			return true;
		}
	}
	return false;
};
