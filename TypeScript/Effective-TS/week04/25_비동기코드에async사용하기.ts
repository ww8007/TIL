function timeout(milliseconds: number): Promise<never> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject("Timeout");
		}, milliseconds);
	});
}

async function fetchWithTimeout(url: string, ms: number) {
	return Promise.race([fetch(url), timeout(ms)]);
}

async function getNumber() {
	return 42;
}

const getNumber2 = async () => 42;

const getNumber3 = Promise.resolve(42);

const cache: { [url: string]: string } = {};

async function fetchWithCache(url: string) {
	if (url in cache) {
		return cache[url];
	}
	const response = await fetch(url);
	const text = await response.text();
	cache[url] = text;
	return text;
}

let requestStatus: "loading" | "success" | "error";
async function getUser(userId: string) {
	requestStatus = "loading";
	try {
		const response = await fetchWithCache(`/users/${userId}`);
		requestStatus = "success";
		return response;
	} catch (error) {
		requestStatus = "error";
		throw error;
	}
}

async function getJSON(url: string) {
	const response = await fetch(url);
	return response.json();
}

function panTo(where: readonly [number, number]) {
	// ...
}

panTo([10, 20]); // OK

const loc2 = [10, 20, 30] as const;
// panTo(loc2); // 'number[]' 형식의 인수는 '[number, number]' 형식의 매개 변수에 할당될 수 없습니다.

function callWithRandomNumbers(fn: (x: number, y: number) => void) {
	fn(Math.random(), Math.random());
}

callWithRandomNumbers((x, y) => {
	x; // number
	y; // number
});

const fn = (a: number, b: number) => {
	a; // number
	b; // number
};

callWithRandomNumbers(fn);
